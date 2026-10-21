import "./Catalog.css";

import {
    BookOpen,
    Download,
    FileText,
    Send
} from "lucide-react";

import { useState } from "react";

function Catalog() {

    const [isDownloading, setIsDownloading] = useState(false);
    const [downloadProgress, setDownloadProgress] = useState(0);


    /* =========================================================
       DOWNLOAD
       ========================================================= */

    const startDownload = () => {

        if (isDownloading) return;

        setIsDownloading(true);
        setDownloadProgress(0);


        const xhr = new XMLHttpRequest();

        xhr.open("GET", "public/catalog.pdf.pdf", true);

        xhr.responseType = "blob";


        let realProgress = 0;
        let displayedProgress = 0;


        /*
         * جلوگیری از پرش ناگهانی درصد
         */
        const progressTimer = setInterval(() => {

            if (displayedProgress < realProgress) {

                displayedProgress += 1;

                setDownloadProgress(
                    Math.min(displayedProgress, 99)
                );
            }

        }, 60);


        /*
         * دریافت درصد واقعی دانلود
         */
        xhr.onprogress = (event) => {

            if (!event.lengthComputable) return;


            realProgress = Math.floor(
                (event.loaded / event.total) * 100
            );


            /*
             * قبل از پایان روی 99 نگه می‌داریم
             */
            if (realProgress >= 100) {
                realProgress = 99;
            }
        };


        /*
         * دانلود کامل شد
         */
        xhr.onload = () => {

            clearInterval(progressTimer);


            if (xhr.status >= 200 && xhr.status < 300) {

                let finalProgress = displayedProgress;


                /*
                 * رسیدن نرم به 100%
                 */
                const finishTimer = setInterval(() => {

                    finalProgress += 1;


                    if (finalProgress >= 100) {

                        finalProgress = 100;

                        setDownloadProgress(100);

                        clearInterval(finishTimer);


                        /*
                         * کمی 100% را نگه می‌داریم
                         */
                        setTimeout(() => {

                            const blob = xhr.response;

                            const url =
                                window.URL.createObjectURL(blob);


                            const link =
                                document.createElement("a");


                            link.href = url;

                            link.download =
                                "catalog.pdf.pdf";


                            document.body.appendChild(link);

                            link.click();

                            link.remove();


                            window.URL.revokeObjectURL(url);


                            /*
                             * بازگشت کامل به حالت عادی
                             */
                            setTimeout(() => {

                                setDownloadProgress(0);

                                setIsDownloading(false);

                            }, 500);


                        }, 500);

                    } else {

                        setDownloadProgress(
                            finalProgress
                        );
                    }

                }, 25);

            } else {

                setDownloadProgress(0);

                setIsDownloading(false);

                console.error(
                    "خطا در دانلود فایل:",
                    xhr.status
                );
            }
        };


        /*
         * خطای شبکه
         */
        xhr.onerror = () => {

            clearInterval(progressTimer);

            setDownloadProgress(0);

            setIsDownloading(false);

            console.error(
                "خطا در اتصال به فایل PDF"
            );
        };


        /*
         * شروع درخواست
         */
        xhr.send();
    };


    /* =========================================================
       CIRCLE PROGRESS
       ========================================================= */

    /*
     * دایره اصلی = 160px
     *
     * دایره داخلی = 144px
     * چون inset = 8px
     */
    const circleSize = 144;

    const strokeWidth = 3;


    const radius =
        (circleSize - strokeWidth) / 2;


    const circumference =
        2 * Math.PI * radius;


    const progressOffset =
        circumference -
        (downloadProgress / 100) *
        circumference;


    return (

        <section
            id="catalog-section"
            className="catalog"
        >


            {/* =================================================
                BACKGROUND GLOW
            ================================================= */}

            <div
                className="catalog-bg"
                aria-hidden="true"
            >

                <div
                    className="catalog-glow catalog-glow-top"
                />

                <div
                    className="catalog-glow catalog-glow-bottom"
                />

            </div>


            <div className="catalog-container">


                {/* =================================================
                    HEADING
                ================================================= */}

                <div className="catalog-heading">

                    <div className="catalog-eyebrow">

                        <BookOpen
                            className="catalog-eyebrow-icon"
                        />

                        <span>
                            سرای روایت کرنای
                        </span>

                    </div>


                    <h2 className="catalog-title">
                        کاتالوگ جامع استودیو
                    </h2>


                    <p className="catalog-subtitle">
                        معرفی لوکس خدمات و تجهیزات تخصصی
                    </p>

                </div>



                {/* =================================================
                    MAIN CARD
                ================================================= */}

                <div className="catalog-card">


                    {/* =================================================
                        INFORMATION
                    ================================================= */}

                    <div className="catalog-info">

                        <h3 className="catalog-info-title">
                            آرت‌بوک خدمات و تجهیزات
                        </h3>


                        <ul className="catalog-list">


                            <li>

                                <div className="catalog-meta-chip">

                                    <FileText
                                        className="catalog-meta-icon"
                                    />

                                    <span>
                                        تعداد صفحات: ۱۸ صفحه
                                    </span>

                                </div>

                            </li>



                            <li>

                                <div className="catalog-meta-chip">

                                    <FileText
                                        className="catalog-meta-icon"
                                    />

                                    <span>
                                        حجم فایل: ۶۷ مگابایت (PDF رسمی)
                                    </span>

                                </div>

                            </li>



                            <li>

                                <div className="catalog-meta-chip">

                                    <FileText
                                        className="catalog-meta-icon"
                                    />

                                    <span>
                                        فرمت: Adobe PDF — Karnay catalog.pdf
                                    </span>

                                </div>

                            </li>


                        </ul>

                    </div>



                    {/* =================================================
                        DOWNLOAD
                    ================================================= */}

                    <div className="catalog-download">


                        {/* =================================================
                            DOWNLOAD CIRCLE
                        ================================================= */}

                        <button
                            id="catalog-ring-btn"
                            type="button"
                            className={`catalog-download-ring ${
                                isDownloading
                                    ? "is-downloading"
                                    : ""
                            }`}
                            aria-label="دریافت کاتالوگ"
                            aria-busy={isDownloading}
                            onClick={startDownload}
                        >


                            {/* =================================================
                                PROGRESS SVG
                            ================================================= */}

                            <svg
                                className="catalog-progress-ring"
                                width={circleSize}
                                height={circleSize}
                                viewBox={`0 0 ${circleSize} ${circleSize}`}
                                aria-hidden="true"
                            >

                                {/* Base Track */}

                                <circle
                                    className="catalog-progress-track"
                                    cx={circleSize / 2}
                                    cy={circleSize / 2}
                                    r={radius}
                                    fill="none"
                                    strokeWidth={strokeWidth}
                                />


                                {/* Purple Progress */}

                                <circle
                                    className="catalog-progress-bar"
                                    cx={circleSize / 2}
                                    cy={circleSize / 2}
                                    r={radius}
                                    fill="none"
                                    strokeWidth={strokeWidth}
                                    strokeLinecap="round"
                                    strokeDasharray={circumference}
                                    strokeDashoffset={
                                        progressOffset
                                    }
                                />

                            </svg>



                            {/* =================================================
                                INNER CIRCLE
                            ================================================= */}

                            <div className="catalog-ring-inner" />



                            {/* =================================================
                                DOWNLOAD ICON
                            ================================================= */}

                            <span
                                className={`catalog-download-icon ${
                                    isDownloading
                                        ? "is-hidden"
                                        : ""
                                }`}
                            >

                                <Download />

                            </span>



                            {/* =================================================
                                PERCENTAGE
                            ================================================= */}

                            {isDownloading && (

                                <span className="catalog-progress-text">
                                    {downloadProgress}%
                                </span>

                            )}

                        </button>



                        {/* =================================================
                            ACTION BUTTONS
                        ================================================= */}

                        <div className="catalog-actions">


                            {/* =================================================
                                PRIMARY DOWNLOAD BUTTON
                            ================================================= */}

                            <button
                                id="catalog-action-btn"
                                type="button"
                                className={`catalog-primary-btn ${
                                    isDownloading
                                        ? "is-downloading"
                                        : ""
                                }`}
                                onClick={startDownload}
                                disabled={isDownloading}
                                aria-busy={isDownloading}
                            >


                                {/* =================================================
                                    WHITE PROGRESS OVERLAY
                                ================================================= */}

                                {isDownloading && (

                                    <span
                                        className="catalog-btn-progress"
                                        style={{
                                            width:
                                                `${downloadProgress}%`
                                        }}
                                        aria-hidden="true"
                                    />

                                )}



                                {/* =================================================
                                    BUTTON CONTENT
                                ================================================= */}

                                <span className="catalog-btn-content">

                                    <Download />

                                    <span>

                                       دریافت کاتالوگ
                                    </span>

                                </span>


                            </button>



                            {/* =================================================
                                CONTACT BUTTON
                            ================================================= */}

                            <button
                                id="catalog-contact-btn"
                                type="button"
                                className="catalog-secondary-btn"
                            >

                                <Send />

                                <span>
                                    تماس با ما
                                </span>

                            </button>


                        </div>


                    </div>


                </div>


            </div>


        </section>
    );
}


export default Catalog;
