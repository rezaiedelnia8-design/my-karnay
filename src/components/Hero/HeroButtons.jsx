import "./HeroButtons.css";

import {
    FiDownload,
    FiFilm,
    FiSend
} from "react-icons/fi";


function HeroButtons() {

    const scrollToSection = (id) => {

        const element = document.getElementById(id);

        if (element) {

            element.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    };


    return (

        <div className="hero-buttons">

            {/* Telegram */}
            <a
                href="https://t.me/karnaystudio"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-btn telegram-btn"
            >

                <span>
                    عضویت در تلگرام
                </span>

                <FiSend />

            </a>


            {/* Teaser */}
            <button
                type="button"
                className="hero-btn teaser-btn"
                onClick={() =>
                    scrollToSection("trailer-section")
                }
            >

                <span>
                    مشاهده تیزر رسمی
                </span>

                <FiFilm />

            </button>


            {/* Catalog */}
            <button
                type="button"
                className="hero-btn catalog-btn"
                onClick={() =>
                    scrollToSection("catalog-section")
                }
            >

                <span>
                    دانلود کاتالوگ هنر
                </span>

                <FiDownload />

            </button>

        </div>

    );

}


export default HeroButtons;
