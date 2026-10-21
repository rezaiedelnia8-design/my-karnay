import "./Hero.css";
import { useEffect, useState } from "react";
import { HiOutlineArrowDown } from "react-icons/hi";
import HeroButtons from "./HeroButtons";

function Hero() {

    const [isDark, setIsDark] = useState(() => {
    return document.body.classList.contains("dark-mode");
});

useEffect(() => {

    const updateTheme = () => {
        setIsDark(
            document.body.classList.contains("dark-mode")
        );
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);

    observer.observe(document.body, {
        attributes: true,
        attributeFilter: ["class"],
    });

    return () => {
        observer.disconnect();
    };

}, []);


    return (
        <section className={`hero ${isDark ? "hero-dark" : "hero-light"}`}>

            {/* Background Video */}
            <video
                className="hero-video"
                autoPlay
                muted
                loop
                playsInline
            >
                <source
                    src="public/videos/karnay-teaser-compressed.mp4"
                    type="video/mp4"
                />
            </video>

            {/* Overlay */}
            <div className="hero-overlay"></div>

            {/* Hero Content */}
            <div className="hero-content">

                {/* =========================
                    DESKTOP
                ========================= */}
                <div className="hero-desktop-layout">

                    <div className="hero-brand-box">

                        <div className="hero-brand-glow"></div>

                        <div className="hero-brand-panel">

                            <div className="hero-ring hero-ring-outer"></div>
                            <div className="hero-ring hero-ring-inner"></div>

                            <img
                                src="public/images/logo.png.png"
                                alt="Karnay Studio"
                                className="hero-brand-logo"
                            />

                            <h3>
                                سرای روایت کرنای
                            </h3>

                            <p>
                                راوی صدای ایران — طنین باستانی کرنای
                                در قالب خلاقیت مدرن.
                            </p>

                            <div className="hero-brand-dots">
                                <span></span>
                                <span></span>
                                <span className="active"></span>
                                <span></span>
                                <span></span>
                            </div>

                        </div>
                    </div>

                    {/* =========================
                        HERO TEXT
                    ========================= */}
                    <div className="hero-text-side">

                        <div className="hero-title-nastaliq-wrap">

                            <h1 className="hero-title-nastaliq">

                                <span className="hero-nastaliq-karnay">
                                    کرنای
                                </span>

                                <span className="hero-title-purple">
                                    استودیو
                                </span>

                            </h1>

                        </div>

                        <p className="hero-description hero-desktop-description">


                       یک رسانه پرصلایت برای رویاهای برند شما.
<br />
 ما با هم تلفیقی از هنر سنتی و تکنولوژی های نوین دیجیتال را در قاب های باشکوه متجلی می سازیم.
<br/>
مستقر در قلب فضاهای لوکس بازار بزرگ ایران مال.




                           </p>
                        <HeroButtons />

                    </div>

                </div>

                {/* =========================
                    MOBILE / TABLET
                ========================= */}
                <div className="hero-mobile-content">

                    <img
                        src="public/images/logo.png.png"
                        alt="Karnay Studio"
                        className="hero-logo"
                    />

                    <h1 className="hero-title">
                        کرنای{" "}
                        <span className="hero-title-purple">
                            استودیو
                        </span>
                    </h1>

                    <p className="hero-description">

یک رسانه پرصلایت برای رویاهای برند شما.
<br />
 ما با هم تلفیقی از هنر سنتی و تکنولوژی های نوین دیجیتال را در قاب های باشکوه متجلی می سازیم.
<br/>
مستقر در قلب فضاهای لوکس بازار بزرگ ایران مال.





                    </p>

                    <HeroButtons />

                </div>

                {/* =========================
                    SCROLL
                ========================= */}
                <div className="hero-scroll">

                    <button
                        className="scroll-btn"
                        type="button"
                        aria-label="رفتن به بخش بعدی"
                        onClick={() => {
                            window.scrollTo({
                                top: window.innerHeight,
                                behavior: "smooth",
                            });
                        }}
                    >
                        <HiOutlineArrowDown />
                    </button>

                </div>

            </div>

        </section>
    );
}

export default Hero;
