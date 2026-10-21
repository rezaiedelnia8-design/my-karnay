import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import "./ScrollToTop.css";

function ScrollToTop() {
    const [visible, setVisible] = useState(false);
useEffect(() => {

    const handleScroll = () => {

        const aboutHeading =
            document.querySelector(".about-heading");

        if (!aboutHeading) return;

        const headingTop =
            aboutHeading.getBoundingClientRect().top;

        // وقتی عنوان About وارد viewport شد
        const shouldShow =
            headingTop <= window.innerHeight;

        setVisible(shouldShow);
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
        window.removeEventListener("scroll", handleScroll);
    };

}, []);

    const scrollToTop = () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    };

    if (!visible) return null;

    return (
        <button
            className="scroll-to-top"
            onClick={scrollToTop}
            title="بازگشت به بالا"
            aria-label="بازگشت به بالای صفحه"
        >
            <ArrowUp />
        </button>
    );
}

export default ScrollToTop;
