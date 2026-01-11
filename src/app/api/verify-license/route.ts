import { NextResponse } from 'next/server';
import { GUMROAD_CONFIG } from '@/lib/gumroad';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { license_key } = body;

        if (!license_key) {
            return NextResponse.json({ success: false, message: "License key is required" }, { status: 400 });
        }

        const formData = new URLSearchParams();
        formData.append('product_permalink', GUMROAD_CONFIG.productPermalink);
        formData.append('product_id', GUMROAD_CONFIG.productId); // Added as per API requirement
        formData.append('license_key', license_key);

        const response = await fetch(GUMROAD_CONFIG.apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData,
        });

        const data = await response.json();

        // Pass through the Gumroad response logic
        if (data.success && !data.purchase.refunded && !data.purchase.chargebacked) {
            return NextResponse.json({ success: true, purchase: data.purchase });
        } else {
            return NextResponse.json({
                success: false,
                message: data.message || "Invalid or revoked license key."
            }, { status: 400 });
        }

    } catch (error) {
        console.error("License verification error:", error);
        return NextResponse.json({
            success: false,
            message: "Failed to verify license. Please try again."
        }, { status: 500 });
    }
}
