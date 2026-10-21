function MobileMenu({ open }) {

    const scrollToSection = (id) => {
        const section = document.getElementById(id);

        if (section) {
            section.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    };

    return (
        <div className={open ? "mobile-menu active" : "mobile-menu"}>

            <button
                className="mobile-item"
                onClick={() => scrollToSection("about-scroll")}
            >
                <span>کرنای چیست</span>
                <span className="mobile-dot"></span>
            </button>


            <button
                className="mobile-item"
                onClick={() => scrollToSection("trailer-section")}
            >
                <span>تیزر هنری</span>
                <span className="mobile-dot"></span>
            </button>


            <button
                className="mobile-item"
                onClick={() => scrollToSection("catalog-section")}
            >
                <span>کاتالوگ استودیو</span>
                <span className="mobile-dot"></span>
            </button>


            <button
                className="mobile-item"
                onClick={() => scrollToSection("contact-section")}
            >
                <span>ارتباط و آدرس</span>
                <span className="mobile-dot"></span>
            </button>

        </div>
    );
}

export default MobileMenu;
