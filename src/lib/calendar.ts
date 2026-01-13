import { Subscription } from '../types';

const formatDate = (d: Date) => {
    return d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
};

const getRRULE = (cycle: string) => {
    switch (cycle) {
        case 'weekly': return 'FREQ=WEEKLY';
        case 'biweekly': return 'FREQ=WEEKLY;INTERVAL=2';
        case 'monthly': return 'FREQ=MONTHLY';
        case 'quarterly': return 'FREQ=MONTHLY;INTERVAL=3';
        case 'yearly': return 'FREQ=YEARLY';
        default: return '';
    }
};

const createEventBlock = (sub: Subscription, isTrial: boolean) => {
    const dateStr = isTrial ? sub.trialEndDate : sub.renewalDate;
    if (!dateStr) return '';

    const [y, m, d] = dateStr.split('-').map(Number);
    const eventDate = new Date(y, m - 1, d, 12, 0, 0); // Noon

    const start = formatDate(eventDate);
    const end = formatDate(new Date(eventDate.getTime() + 60 * 60 * 1000)); // 1 hour

    const summary = isTrial ? `🚨 Trial Ending: ${sub.name}` : `💳 Bill Due: ${sub.name}`;
    const priceStr = (isTrial ? (sub.regularPrice || sub.price) : sub.price).toFixed(2);
    const description = isTrial
        ? `Your trial for ${sub.name} ends soon. It will renew at $${priceStr}.`
        : `Payment of $${priceStr} due for ${sub.name}.`;

    const rrule = !isTrial ? `RRULE:${getRRULE(sub.billingCycle)}` : '';

    const block = [
        'BEGIN:VEVENT',
        `SUMMARY:${summary}`,
        `DESCRIPTION:${description}`,
        `DTSTART:${start}`,
        `DTEND:${end}`,
    ];

    if (rrule) block.push(rrule);

    block.push(
        'BEGIN:VALERT',
        'TRIGGER:-P1D', // 1 day before
        'ACTION:DISPLAY',
        `DESCRIPTION:${summary} Reminder`,
        'END:VALERT',
        'END:VEVENT'
    );

    return block.join('\r\n');
};

export function generateICSFile(sub: Subscription, type: 'trial' | 'renewal' = 'renewal') {
    const eventBlock = createEventBlock(sub, type === 'trial');
    if (!eventBlock) return;

    const icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PROID:-//SubTracking//NONSGML v1.0//EN',
        eventBlock,
        'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    const fileName = type === 'trial' ? `${sub.name}_Trial_Alert` : `${sub.name}_Renewal_Sync`;
    link.setAttribute('download', `${fileName.replace(/\s+/g, '_')}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

export function generateBulkICSFile(subscriptions: Subscription[]) {
    const eventBlocks = subscriptions.map(sub => {
        const blocks = [];
        // Always add renewal
        blocks.push(createEventBlock(sub, false));
        // Add trial if active
        if (sub.isTrial && sub.trialEndDate) {
            blocks.push(createEventBlock(sub, true));
        }
        return blocks.join('\r\n');
    }).filter(Boolean).join('\r\n');

    const icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PROID:-//SubTracking//NONSGML v1.0//EN',
        eventBlocks,
        'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `SubTracking_All_Bills.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
