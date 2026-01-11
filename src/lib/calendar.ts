export function generateICSFile(name: string, price: number, date: string) {
    // Set alert 2 days before
    const trialDate = new Date(date);
    const eventDate = new Date(trialDate);

    // Format date for ICS (YYYYMMDDTHHMMSSZ)
    const formatDate = (d: Date) => {
        return d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    const start = formatDate(trialDate);
    const end = formatDate(new Date(trialDate.getTime() + 60 * 60 * 1000)); // 1 hour duration

    const icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PROID:-//SubTracking//NONSGML v1.0//EN',
        'BEGIN:VEVENT',
        `SUMMARY:🚨 Trial Ending: ${name}`,
        `DESCRIPTION:Your trial for ${name} ends in 2 days. It will renew at $${price.toFixed(2)}.`,
        `DTSTART:${start}`,
        `DTEND:${end}`,
        'BEGIN:VALERT',
        'TRIGGER:-P2D', // 2 days before
        'ACTION:DISPLAY',
        `DESCRIPTION:Reminder: ${name} Trial Ending`,
        'END:VALERT',
        'END:VEVENT',
        'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${name.replace(/\s+/g, '_')}_Trial_Alert.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
