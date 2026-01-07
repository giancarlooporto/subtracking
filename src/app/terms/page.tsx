import { siteConfig } from '../../../siteConfig';

export default function TermsOfService() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-300 py-12 px-4 sm:px-6 lg:px-8 font-light">
            <div className="max-w-3xl mx-auto space-y-8">
                {/* Header */}
                <div className="border-b border-slate-800 pb-8">
                    <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Terms of Service</h1>
                    <p className="text-sm text-slate-500">Last Updated: January 6, 2026</p>
                </div>

                {/* Intro */}
                <section className="space-y-4">
                    <p>
                        Please read these Terms of Service ("Terms") carefully before using the <strong>{siteConfig.siteName}</strong> application
                        ("App", "Service", "us", "we", or "our") located at https://subtracking.app.
                    </p>
                    <p>
                        By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the Service.
                    </p>
                </section>

                {/* 1. Not Financial Advice */}
                <section className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 space-y-2">
                    <h2 className="text-lg font-bold text-red-200 uppercase tracking-wide">1. Important: Not Financial Advice</h2>
                    <p className="text-red-100/80">
                        {siteConfig.siteName} is a tracking and organizational tool only. We are not a financial institution, financial advisor, or tax professional.
                        The data, calculations, "Ghost Meter" alerts, and "Billing Pulse" visualizations are based solely on the information you manually input.
                    </p>
                    <p className="text-red-100/80">
                        We do not guarantee the accuracy of renewal dates, billing amounts, or potential savings. You are solely responsible for verifying your actual billing
                        statements with your service providers. We are not liable for any overdraft fees, missed payments, or unwanted subscription renewals that occur while using this App.
                    </p>
                </section>

                {/* 2. Pro Features & refund */}
                <section className="space-y-4">
                    <h2 className="text-xl font-semibold text-white">2. Payments & Refunds</h2>
                    <ul className="list-disc pl-5 space-y-2 text-slate-400">
                        <li>
                            <strong>License Keys:</strong> Certain premium features ("Pro") may be unlocked via a paid license key. These payments are processed
                            securely by our Merchant of Record, Gumroad.
                        </li>
                        <li>
                            <strong>Refund Policy:</strong> Since this is a digital product, all sales are generally final. However, we may offer refunds at our
                            sole discretion within 14 days of purchase if the App does not work on your device as described. Contact support@subtracking.app for assistance.
                        </li>
                    </ul>
                </section>

                {/* 3. User Data & Responsibility */}
                <section className="space-y-4">
                    <h2 className="text-xl font-semibold text-white">3. Your Data Responsibilities</h2>
                    <p>
                        This App uses a "Local-First" architecture. Your data is stored in your device's browser storage. You acknowledge that:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-slate-400">
                        <li>You are responsible for backing up your own data (using the JSON export feature).</li>
                        <li>Clearing your browser cache or cookies will delete your data permanently.</li>
                        <li>We have no access to your data and cannot restore it if lost.</li>
                    </ul>
                </section>

                {/* 4. Limitation of Liability */}
                <section className="space-y-4">
                    <h2 className="text-xl font-semibold text-white">4. Limitation of Liability</h2>
                    <p className="uppercase text-xs font-bold tracking-widest text-slate-500 mb-2">PLEASE READ CAREFULLY</p>
                    <p>
                        TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL {siteConfig.siteName.toUpperCase()}, ITS CREATORS, OR AFFILIATES BE LIABLE FOR ANY
                        INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER
                        INTANGIBLE LOSSES, RESULTING FROM (I) YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE SERVICE; (II) ANY CONDUCT OR CONTENT OF ANY
                        THIRD PARTY ON THE SERVICE; OR (III) UNAUTHORIZED ACCESS, USE, OR ALTERATION OF YOUR TRANSMISSIONS OR CONTENT.
                    </p>
                    <p>
                        OUR TOTAL LIABILITY TO YOU FOR ANY CLAIM ARISING OUT OF OR RELATING TO THESE TERMS OR THE USE OF THE SERVICE IS LIMITED TO THE AMOUNT PAID BY YOU
                        FOR THE SERVICE, IF ANY.
                    </p>
                </section>

                {/* 5. "As Is" Warranty */}
                <section className="space-y-4">
                    <h2 className="text-xl font-semibold text-white">5. "As Is" and "As Available" Disclaimer</h2>
                    <p>
                        The Service is provided on an "AS IS" and "AS AVAILABLE" basis. We make no warranties, expressed or implied, regarding the operation of the
                        App or the information, content, or materials included. We do not warrant that the App will be free of bugs, errors, or interruptions.
                    </p>
                </section>

                {/* 6. Governing Law */}
                <section className="space-y-4">
                    <h2 className="text-xl font-semibold text-white">6. Governing Law</h2>
                    <p>
                        These Terms shall be governed and construed in accordance with the laws of the Province of Alberta and the federal laws of Canada applicable therein,
                        without regard to its conflict of law provisions. Any disputes arising under these Terms shall be resolved exclusively in the courts located in Alberta, Canada.
                    </p>
                </section>

                {/* Contact */}
                <section className="pt-8 border-t border-slate-800">
                    <p className="text-sm">
                        Questions about these Terms? Contact us at <a href="mailto:legal@subtracking.app" className="text-indigo-400 hover:text-indigo-300">legal@subtracking.app</a>
                    </p>
                </section>

                {/* Back Button */}
                <div className="pt-8">
                    <a href="/" className="text-sm text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-2">
                        ← Back to App
                    </a>
                </div>
            </div>
        </div>
    );
}
