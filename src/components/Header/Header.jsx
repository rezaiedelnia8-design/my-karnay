import { useEffect, useState } from "react";

import {
    FiMoon,
    FiSun,
    FiGlobe
} from "react-icons/fi";

import {
    HiBars3,
    HiXMark
} from "react-icons/hi2";

import "./Header.css";

import DesktopMenu from "../DesktopMenu";
import MobileMenu from "../MobileMenu";


function Header() {

    const [open, setOpen] = useState(false);

    const [isScrolled, setIsScrolled] = useState(false);

    const [isDarkMode, setIsDarkMode] = useState(false);


    /* ===============================
       Scroll
    =============================== */

    useEffect(() => {

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        handleScroll();

        window.addEventListener(
            "scroll",
            handleScroll,
            { passive: true }
        );

        return () => {
            window.removeEventListener(
                "scroll",
                handleScroll
            );
        };

    }, []);


    /* ===============================
       Dark / Light Mode
    =============================== */

    useEffect(() => {

        if (isDarkMode) {

            document.body.classList.add("dark-mode");

            localStorage.setItem(
                "theme",
                "dark"
            );

        } else {

            document.body.classList.remove(
                "dark-mode"
            );

            localStorage.setItem(
                "theme",
                "light"
            );
        }

    }, [isDarkMode]);


    /* ===============================
       Theme Toggle
    =============================== */

    const toggleTheme = () => {
        setIsDarkMode(
            previous => !previous
        );
    };


    /* ===============================
       Header
    =============================== */

    return (
        <>
            <header
                className={`header ${
                    isScrolled
                        ? "is-scrolled"
                        : ""
                }`}
            >

                <div className="container">


                    {/* ===============================
                        Logo
                    =============================== */}

                    <div className="header-right">

                        <div className="header-logo">


                                <img
                                src="public/images/logo.png.png"
                                alt="Karnay Studio"
                                className="header-logo-light"
                                />

                                <img
                                src="public/images/karnay-logo-light.png"
                                alt="Karnay Studio"
                                className="header-logo-dark"
                                />



                            <div className="logo-text">

                                <h2>
                                    KARNAY
                                </h2>

                                <span>
                                    Studio
                                </span>

                            </div>

                        </div>

                    </div>


                    {/* ===============================
                        Desktop Menu
                    =============================== */}

                    <div className="header-center">

                        <DesktopMenu />

                    </div>


                    {/* ===============================
                        Header Actions
                    =============================== */}

                    <div className="header-left">


                        {/* Language */}

                        <button
                            type="button"
                            className="language-btn"
                            title="Change Language"
                        >

                            <FiGlobe />

                            <span>
                                English
                            </span>

                        </button>


                        {/* Dark / Light */}

                        <button
                            type="button"
                            className="circle-btn"
                            onClick={toggleTheme}
                            aria-label={
                                isDarkMode
                                    ? "فعال کردن حالت روز"
                                    : "فعال کردن حالت شب"
                            }
                            title={
                                isDarkMode
                                    ? "Light Mode"
                                    : "Dark Mode"
                            }
                        >

                            {isDarkMode ? (
                                <FiSun />
                            ) : (
                                <FiMoon />
                            )}

                        </button>


                        {/* Hamburger */}

                        <button
                            type="button"
                            className="menu-btn"
                            onClick={() =>
                                setOpen(
                                    previous =>
                                        !previous
                                )
                            }
                            aria-label={
                                open
                                    ? "بستن منو"
                                    : "باز کردن منو"
                            }
                            aria-expanded={open}
                        >

                            {open ? (
                                <HiXMark />
                            ) : (
                                <HiBars3 />
                            )}

                        </button>

                    </div>

                </div>

            </header>


            {/* Mobile Menu */}

            <MobileMenu
                open={open}
            />

        </>
    );
}


export default Header;
