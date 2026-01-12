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
        formData.append('increment_uses_count', 'true'); // Tell Gumroad to count this verification

        console.log("Verifying gumroad license:", license_key);
        console.log("Payload:", Object.fromEntries(formData));

        const response = await fetch(GUMROAD_CONFIG.apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData,
        });

        const data = await response.json();
        console.log("Gumroad Response:", JSON.stringify(data, null, 2));

        // Pass through the Gumroad response logic
        if (data.success && !data.purchase.refunded && !data.purchase.chargebacked) {

            // CUSTOM LIMIT CHECK
            // Gumroad returns 'uses' count in the purchase object. 
            // Since we sent 'increment_uses_count', the 'uses' value returned includes THIS attempt.
            // So if uses > 3, this attempt pushed it over the limit.
            if (data.purchase.uses > 3) {
                return NextResponse.json({
                    success: false,
                    message: "License limit reached (Max 3 devices)."
                }, { status: 400 });
            }

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
