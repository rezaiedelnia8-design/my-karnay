import {
    CalendarDays,
    Clock,
    ExternalLink,
    MapPin,
    MessageSquare,
    Phone,
    Send,
    Sparkles,
} from "lucide-react";

import "./Contact.css";

function Contact() {
    return (
        <section
            id="contact-section"
            className="contact"
            dir="rtl"
        >
            {/* =========================
                Background Glow
            ========================= */}
            <div
                className="contact-bg"
                aria-hidden="true"
            >
                <div className="contact-glow contact-glow-top"></div>
                <div className="contact-glow contact-glow-bottom"></div>
            </div>

            <div className="contact-container">

                {/* =========================
                    Heading
                ========================= */}
                <div className="contact-heading">

                    <div className="contact-eyebrow">
                        <MapPin className="contact-eyebrow-icon" />

                        <span>
                            تماس با ما
                        </span>
                    </div>

                    <h2 className="contact-title">
                        با کرنای هم‌نوا شوید
                    </h2>

                    <p className="contact-subtitle">
                        پذیرای قدم‌های سبز شما در باشکوه‌ترین سازه معماری خاورمیانه
                    </p>

                </div>


                {/* =========================
                    Main Grid
                ========================= */}
                <div className="contact-grid">




                    {/* =========================
                        Contact Information
                    ========================= */}
                    <div className="contact-info-wrapper">

                        <div className="contact-card contact-info-card">

                            <div className="contact-info-list">

                                {/* Address */}
                                <div className="contact-info-item">

                                    <div className="contact-info-icon">
                                        <MapPin />
                                    </div>

                                    <div className="contact-info-content">

                                        <h4>
                                            نشانی سرای روایت کرنای
                                        </h4>

                                        <p>
                                           تهران، مجتمع تجاری بین‌المللی ایران‌مال (Iran Mall)، طبقه G1، واحد لوکس 7o8 (واحد ۷۰۸)
                                        </p>

                                    </div>

                                </div>


                                {/* Phone */}
                                <div className="contact-info-item">

                                    <div className="contact-info-icon">
                                        <Phone />
                                    </div>

                                    <div className="contact-info-content">

                                        <h4>
                                            خط ارتباط مستقیم
                                        </h4>

                                        <a
                                            href="tel:09127031602"
                                            className="contact-phone"
                                        >
                                            <bdi dir="ltr">
                                                ۰۹۱۲ ۷۰۳ ۱۶۰۲
                                            </bdi>
                                        </a>

                                    </div>

                                </div>


                                {/* Telegram */}
                                <div className="contact-info-item">

                                    <div className="contact-info-icon">
                                        <MessageSquare />
                                    </div>

                                    <div className="contact-info-content">

                                        <h4>
                                            کانال تلگرام استودیو
                                        </h4>

                                        <a
                                            href="https://t.me/karnaystudio"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="contact-telegram"
                                        >
                                            <span>
                                                t.me/karnaystudio
                                            </span>

                                            <ExternalLink />
                                        </a>

                                    </div>

                                </div>


                                {/* Working Hours */}
                                <div className="contact-info-item contact-info-item-last">

                                    <div className="contact-info-icon">
                                        <CalendarDays />
                                    </div>

                                    <div className="contact-info-content">

                                        <h4>
                                            ساعات پذیرش استودیو
                                        </h4>

                                        <p>
                                            شنبه تا پنج‌شنبه · ۱۰:۰۰ تا ۲۲:۰۰ · ایران‌مال، طبقه G1
                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>

                        </div>



                    <div className="contact-form-wrapper">

                        <div className="contact-card contact-form-card">

                            <div className="contact-card-heading">

                                <div className="contact-card-icon">
                                    <Sparkles />
                                </div>

                                <h3>
                                    ثبت درخواست ملاقات و همکاری خلاق
                                </h3>

                            </div>


                            <form className="contact-form">

                                {/* Honeypot */}
                                <div
                                    className="contact-honeypot"
                                    aria-hidden="true"
                                >
                                    <label htmlFor="reg-website">
                                        Website
                                    </label>

                                    <input
                                        id="reg-website"
                                        type="text"
                                        tabIndex="-1"
                                        autoComplete="off"
                                        name="website"
                                    />
                                </div>


                                {/* Name */}
                                <div className="contact-field">

                                    <label htmlFor="reg-name">
                                        نام گرانقدر شما / عنوان مجموعه *
                                    </label>

                                    <input
                                        id="reg-name"
                                        name="name"
                                        type="text"
                                        required

                                    />

                                </div>


                                {/* Contact */}
                                <div className="contact-field">

                                    <label htmlFor="reg-contact">
                                        شماره تماس یا ایمیل ارتباطی *
                                    </label>

                                    <input
                                        id="reg-contact"
                                        name="contact"
                                        type="text"
                                        required

                                    />

                                </div>


                                {/* Message */}
                                <div className="contact-field contact-message-field">

                                    <label htmlFor="reg-msg">
                                        شرح ایده، سلیقه و خدمات مورد نیاز شما *
                                    </label>

                                    <textarea
                                        id="reg-msg"
                                        name="message"
                                        rows="5"
                                        required

                                    />

                                </div>


                                {/* Submit */}
                                <button
                                    type="submit"
                                    id="reg-submit-btn"
                                    className="contact-submit"
                                >
                                    <span className="contact-submit-icon">
                                        <Send />
                                    </span>

                                    <span>
                                        ارسال پیام به کرنای استودیو
                                    </span>
                                </button>

                            </form>

                        </div>

                    </div>


                        {/* Response Time */}
                        <div className="contact-response">

                            <Clock />

                            <span>
                                پاسخ‌گویی تیم خلاقیت کرنای معمولاً ظرف ۲۴ ساعت کاری
                            </span>

                        </div>

                    </div>

                </div>
            




        </section>
    );
}

export default Contact;
