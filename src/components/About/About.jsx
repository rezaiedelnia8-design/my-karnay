import "./About.css";
import { Award } from "lucide-react";
import SynthCard from "../SynthCard/SynthCard";

function About() {
    return (
        <section className="about"
        id="about-scroll">

            <div className="container">

                <div className="about-wrapper">

                    {/* =========================
                        ABOUT CONTENT - LEFT
                    ========================= */}
                    <div className="about-content">

                        <div className="about-heading">

                            <Award className="about-heading-icon" />

                            <span className="about-heading-text">
                                مفهوم هنری نام کرنای
                            </span>

                        </div>

                        <h2 className="about-title">
                            بانگ اساطیری کرنای
                        </h2>

                        <p className="about-subtitle">
                            از کهن‌ترین شیپورهای حماسی ایران زمین تا طنین رسانه امروز شما
                        </p>

                        <div className="about-text">

                            <p>
                                «کرنای» یکی از کهن‌ترین سازهای بادی و رزمی ایران باستان است؛
                                بوقی بلند و باصلابت که هم در نبردهای اساطیری و شاهنامه‌ای
                                برای به صدا درآوردن خروش ارتش، و هم در جشن‌ها و رویدادهای
                                بزرگ برای اعلام خبرهای بااهمیت نواخته می‌شد.
                                صلابت صدای کرنای، تجسمی از عظمت هویت ایرانی و رسانه‌ای رسا
                                برای ابلاغ مهم‌ترین پیام‌هاست.
                            </p>

                            <p>
                                ریشه‌گزینی برند ما در نام «کرنای» انتخابی تزیینی نیست؛
                                بازآفرینی اراده‌ای عمیق برای فریاد هنر، معماری خلاقانه
                                و تیزرهای تبلیغاتی شماست.

                                <br />

                                ما مجهز به خلاقیت بی‌مرز، شیپور هستیم که شکوه، کیفیت و
                                اصالت نگاه شما را به گوش جهان می‌رسانیم.
                                    کرنای، طنین بلند پیروزی هنر
                                    شماست.


                            </p>

                        </div>

                        <div className="about-tags">

                            <span>سنتز فرکانسی آنلاین</span>

                            <span>ساز حماسی و باستانی</span>

                            <span>بانسر باستانی و طنین هنر</span>

                        </div>

                    </div>


                    {/* =========================
                        SYNTH CARD - RIGHT
                    ========================= */}
                    <div className="about-card">

                        <SynthCard />

                    </div>

                </div>

            </div>

        </section>
    );
}

export default About;
