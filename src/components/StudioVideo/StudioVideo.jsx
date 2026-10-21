
import { useRef, useState, useEffect } from "react";
import "./StudioVideo.css";

import {
    Play,
    Pause,
    Volume2,
    VolumeX,
    Maximize2,
    Film,
} from "lucide-react";

function StudioVideo() {

    const videoRef = useRef(null);

    const [playing, setPlaying] = useState(false);
    const [muted, setMuted] = useState(false);

    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(108);

    const [isFullscreen, setIsFullscreen] = useState(false);

    /* ==========================================
       پخش / توقف
    ========================================== */

    const handleTogglePlay = async () => {

        const video = videoRef.current;

        if (!video) return;

        try {

            if (video.paused || video.ended) {

                if (video.ended) {
                    video.currentTime = 0;
                }

                await video.play();

            } else {

                video.pause();

            }

        } catch (error) {

            if (error.name !== "AbortError") {

                console.error(
                    "Playback failed:",
                    error
                );

            }

        }

    };


    /* ==========================================
       پخش از Overlay
    ========================================== */

    const handlePlay = async () => {

        const video = videoRef.current;

        if (!video) return;

        try {

            if (video.ended) {
                video.currentTime = 0;
            }

            await video.play();

        } catch (error) {

            if (error.name !== "AbortError") {

                console.error(
                    "Playback failed:",
                    error
                );

            }

        }

    };


    /* ==========================================
       کلیک روی خود ویدیو
       فقط پخش / توقف
    ========================================== */

    const handleVideoClick = () => {

        handleTogglePlay();

    };


    /* ==========================================
       جلوگیری از انتشار کلیک کنترل‌ها
    ========================================== */

    const stopControlPropagation = (event) => {

        event.stopPropagation();

    };


    /* ==========================================
       صدا
    ========================================== */

    const handleMute = (event) => {

        event.stopPropagation();

        const video = videoRef.current;

        if (!video) return;

        video.muted = !video.muted;

        setMuted(video.muted);

    };


    /* ==========================================
       تغییر زمان ویدیو
    ========================================== */

    const handleSeek = (event) => {

        event.stopPropagation();

        const video = videoRef.current;

        if (!video) return;

        const value = Number(
            event.target.value
        );

        video.currentTime = value;

        setCurrentTime(value);

    };


    /* ==========================================
       پایان ویدیو
    ========================================== */

    const handleEnded = () => {

        setPlaying(false);

        setCurrentTime(0);

    };


    /* ==========================================
       زمان فعلی
    ========================================== */

    const handleTimeUpdate = () => {

        const video = videoRef.current;

        if (!video) return;

        setCurrentTime(
            video.currentTime
        );

    };


    /* ==========================================
       اطلاعات ویدیو
    ========================================== */

    const handleLoadedMetadata = () => {

        const video = videoRef.current;

        if (!video) return;

        if (
            Number.isFinite(
                video.duration
            )
        ) {

            setDuration(
                video.duration
            );

        }

    };


    /* ==========================================
       Fullscreen
    ========================================== */

    const handleFullscreen = async (event) => {

        event.stopPropagation();

        const wrapper =
            videoRef.current?.parentElement;

        if (!wrapper) return;

        try {

            if (!document.fullscreenElement) {

                await wrapper.requestFullscreen();

            } else {

                await document.exitFullscreen();

            }

        } catch (error) {

            console.error(
                "Fullscreen failed:",
                error
            );

        }

    };


    /* ==========================================
       هماهنگ کردن Fullscreen
    ========================================== */

    useEffect(() => {

        const handleFullscreenChange = () => {

            setIsFullscreen(
                Boolean(
                    document.fullscreenElement
                )
            );

        };

        document.addEventListener(
            "fullscreenchange",
            handleFullscreenChange
        );

        return () => {

            document.removeEventListener(
                "fullscreenchange",
                handleFullscreenChange
            );

        };

    }, []);


    /* ==========================================
       فرمت زمان
    ========================================== */

    const formatTime = (time) => {

        if (!Number.isFinite(time)) {
            return "0:00";
        }

        const minutes =
            Math.floor(time / 60);

        const seconds =
            Math.floor(time % 60);

        return `${minutes}:${String(
            seconds
        ).padStart(2, "0")}`;

    };


    /* ==========================================
       Progress
    ========================================== */

    const progress =
        duration > 0
            ? (currentTime / duration) * 100
            : 0;


    return (

        <section className="studio-trailer"

        id="trailer-section"


        >

            {/* =================================
                HEADER
            ================================= */}

            <div className="studio-trailer-header">

                <div className="studio-trailer-eyebrow">

                    <Film
                        className="studio-trailer-eyebrow-icon"
                    />

                    <span>
                        تیزر رسمی استودیو
                    </span>

                </div>

                <h2>
                    سینمای تماشا و تیزر رسمی
                </h2>

                <p>
                    پیش‌نمایش سینمایی از فضای خلاق،
                    خدمات و هویت بصری کرنای استودیو
                </p>

            </div>


            {/* =================================
                VIDEO WRAPPER
            ================================= */}

            <div
                className={`studio-video-wrapper ${
                    playing
                        ? "is-playing"
                        : "is-paused"
                }`}
            >

                {/* =================================
                    VIDEO
                ================================= */}

                <video
                    ref={videoRef}
                    className="studio-video"
                    preload="metadata"
                    playsInline

                    /*
                     * کلیک مستقیم روی ویدیو:
                     * Play / Pause
                     */
                    onClick={handleVideoClick}

                    onPlay={() =>
                        setPlaying(true)
                    }

                    onPause={() =>
                        setPlaying(false)
                    }

                    onEnded={handleEnded}

                    onTimeUpdate={
                        handleTimeUpdate
                    }

                    onLoadedMetadata={
                        handleLoadedMetadata
                    }
                >

                    <source
                        src="public/videos/karnay-teaser-compressed.mp4"
                        type="video/mp4"
                    />

                    مرورگر شما از پخش ویدئو
                    پشتیبانی نمی‌کند.

                </video>


                {/* =================================
                    TOP GLOW
                ================================= */}

                <div
                    className="studio-video-top-glow"
                    aria-hidden="true"
                />


                {/* =================================
                    HOVER ZONE
                ================================= */}

                <div
                    className="studio-video-hover-zone"
                    aria-hidden="true"
                />


                {/* =================================
                    BOTTOM GLOW
                ================================= */}

                <div
                    className="studio-video-bottom-glow"
                    aria-hidden="true"
                />


                {/* =================================
                    PLAY OVERLAY
                    فقط هنگام توقف
                ================================= */}

                {!playing && (

                    <button
                        type="button"
                        className="studio-video-overlay"

                        onClick={(event) => {

                            event.stopPropagation();

                            handlePlay();

                        }}

                        aria-label="پخش تیزر رسمی"
                    >

                        <div className="studio-video-play">

                            <Play
                                className="studio-video-play-icon"
                                fill="currentColor"
                            />

                        </div>

                    </button>

                )}


                {/* =================================
                    TOP VIDEO HUD
                ================================= */}

                <div className="studio-video-topbar">

                    {/* لوگو و نام استودیو */}

                    <div className="studio-video-brand">

                        <img
                            src="public/images/logo.png.png"
                            alt="کرنای"
                            className="studio-video-logo"
                        />

                        <div className="studio-video-brand-name">

                            <strong>
                                KARNAY
                            </strong>

                            <span>
                                STUDIO
                            </span>

                        </div>

                    </div>


                    {/* وضعیت */}

                    <div className="studio-video-status">

                        <span className="studio-video-status-dot"></span>

                        <span>
                            {playing
                                ? "در حال پخش تیزر"
                                : "آماده پخش"
                            }
                        </span>

                    </div>

                </div>


                {/* =================================
                    BOTTOM CONTROLS
                ================================= */}

                <div
                    className="studio-video-controls"
                    onClick={
                        stopControlPropagation
                    }
                >

                    {/* =================================
                        PROGRESS
                    ================================= */}

                    <div
                        className="studio-video-progress"
                        onClick={
                            stopControlPropagation
                        }
                    >

                        <input
                            type="range"

                            min="0"

                            max={duration || 0}

                            step="0.01"

                            value={Math.min(
                                currentTime,
                                duration || 0
                            )}

                            onChange={
                                handleSeek
                            }

                            style={{
                                "--progress":
                                    `${progress}%`
                            }}

                            aria-label="موقعیت ویدئو"
                        />

                    </div>


                    {/* =================================
                        CONTROL ROW
                    ================================= */}

                    <div className="studio-video-control-row">


                        {/* PLAY / PAUSE */}

                        <button
                            type="button"

                            className="
                                studio-control-button
                                studio-main-control
                            "

                            onClick={
                                handleTogglePlay
                            }

                            aria-label={
                                playing
                                    ? "توقف ویدئو"
                                    : "پخش ویدئو"
                            }
                        >

                            {playing ? (

                                <Pause
                                    className="
                                        studio-video-control-play-icon
                                    "
                                />

                            ) : (

                                <Play
                                    className="
                                        studio-video-control-play-icon
                                    "

                                    fill="currentColor"
                                />

                            )}

                        </button>


                        {/* MUTE */}

                        <button
                            type="button"

                            className="
                                studio-control-button
                                studio-volume-control
                            "

                            onClick={
                                handleMute
                            }

                            aria-label={
                                muted
                                    ? "فعال کردن صدا"
                                    : "قطع صدا"
                            }
                        >

                            {muted ? (

                                <VolumeX />

                            ) : (

                                <Volume2 />

                            )}

                        </button>


                        {/* TIME */}

                        <div className="studio-video-time">

                            <span>
                                {formatTime(
                                    currentTime
                                )}
                            </span>

                            <span>
                                /
                            </span>

                            <span>
                                {formatTime(
                                    duration
                                )}
                            </span>

                        </div>


                        {/* FULLSCREEN */}

                        <button
                            type="button"

                            className="
                                studio-control-button
                                fullscreen-control
                            "

                            onClick={
                                handleFullscreen
                            }

                            aria-label={
                                isFullscreen
                                    ? "خروج از حالت تمام صفحه"
                                    : "تمام صفحه"
                            }
                        >

                            <Maximize2 />

                        </button>

                    </div>

                </div>

            </div>

        </section>

    );

}

export default StudioVideo;
