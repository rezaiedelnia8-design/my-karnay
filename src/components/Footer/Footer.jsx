import {
    Award,
    ExternalLink,
    MapPin,
    Phone,
    Send,
} from "lucide-react";

import "./Footer.css";

function Footer() {
    return (
        <footer className="footer" dir="rtl">

            <div className="footer-container">

                {/* =========================
                    TOP
                ========================= */}

                <div className="footer-top">

                    {/* Logo */}
                    <div className="footer-brand">


                       <img
                                src="public/images/logo.png.png"
                                alt="Karnay Studio"
                                className="footer-logo-light"
                                />

                                <img
                                src="public/images/karnay-logo-light.png"
                                alt="Karnay Studio"
                                className="footer-logo-dark"
                                />


                        <div className="footer-brand-text">

                            <span className="footer-brand-title">
                                کرنای استودیو
                            </span>

                            <span className="footer-brand-subtitle">
                                سرای روایت کرنای
                            </span>

                        </div>

                    </div>


                    {/* Contact Links */}
                    <div className="footer-links">

                        {/* Phone */}
                        <a
                            href="tel:09127031602"
                            className="footer-link footer-phone"
                        >

                            <span className="footer-link-icon">
                                <Phone />
                            </span>

                            <bdi dir="ltr">
                                ۰۹۱۲ ۷۰۳ ۱۶۰۲
                            </bdi>

                        </a>


                        {/* Address */}
                        <div className="footer-link footer-address">

                            <span className="footer-link-icon">
                                <MapPin />
                            </span>

                            <span>
                                ایران‌مال، G1، واحد ۷۰۸
                            </span>

                        </div>


                        {/* Telegram */}
                        <a
                            href="https://t.me/karnaystudio"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="footer-link footer-telegram-link"
                        >

                            <span className="footer-link-icon">
                                <Send />
                            </span>

                            <span className="footer-telegram">
                                تلگرام

                                <ExternalLink />
                            </span>

                        </a>

                    </div>

                </div>


                {/* =========================
                    BOTTOM
                ========================= */}

                <div className="footer-bottom">

                    <p className="footer-credit">

                        <Award />

                        <span>
                            سرای روایت کرنای، راوی صدای ایران
                        </span>

                    </p>


                    <p className="footer-copyright">
                        © 2026 تمامی حقوق مادی و معنوی این وب‌سایت
                        برای «کرنای استودیو» محفوظ است.
                    </p>

                </div>

            </div>

        </footer>
    );
}

export default Footer;
