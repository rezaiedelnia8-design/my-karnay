
import Reverb from "./Reverb";

class KarnaySynth {

    constructor() {

        this.audioContext = null;

        this.masterGain = null;

        this.reverb = null;

        // Analyser برای Equalizer
        this.analyser = null;

        // حلقه به‌روزرسانی Equalizer
        this.animationFrame = null;

        this.oscillators = [];

        this.isPlaying = false;

        // مدت زمان دقیق پخش
        this.duration = 3.6;

        // زمان شروع پخش
        this.startTime = 0;

        // تایمر زمان
        this.timer = null;

        // Callback ها
        this.onStateChange = null;

        this.onTimeUpdate = null;

        // ارسال داده واقعی فرکانس به React
        this.onFrequencyData = null;
    }


    /* =====================================================
       اتصال React به وضعیت Synth
    ===================================================== */

    setCallbacks({
        onStateChange = null,
        onTimeUpdate = null,
        onFrequencyData = null
    } = {}) {

        this.onStateChange = onStateChange;

        this.onTimeUpdate = onTimeUpdate;

        this.onFrequencyData = onFrequencyData;
    }


    /* =====================================================
       تغییر وضعیت
    ===================================================== */

    notifyState() {

        if (typeof this.onStateChange === "function") {

            this.onStateChange(this.isPlaying);

        }

    }


    /* =====================================================
       مقداردهی AudioContext
    ===================================================== */

    init() {

        if (!this.audioContext) {

            this.audioContext =
                new (
                    window.AudioContext ||
                    window.webkitAudioContext
                )();


            /* =========================
               Master Gain
            ========================= */

            this.masterGain =
                this.audioContext.createGain();

            this.masterGain.gain.value = 0.8;


            /* =========================
               Analyser
            ========================= */

            this.analyser =
                this.audioContext.createAnalyser();

            /*
             * fftSize کوچک‌تر باعث می‌شود
             * Equalizer واکنش سریع‌تری داشته باشد.
             */

            this.analyser.fftSize = 256;

            /*
             * کمی Smooth بودن باعث می‌شود
             * میله‌ها خیلی پرش نداشته باشند.
             */

            this.analyser.smoothingTimeConstant = 0.72;


            /* =========================
               Reverb
            ========================= */

            this.reverb =
                new Reverb(this.audioContext);

            const reverbNode =
                this.reverb.create();


            const reverbGain =
                this.audioContext.createGain();

            reverbGain.gain.value = 0.18;


            reverbNode.connect(
                reverbGain
            );

            reverbGain.connect(
                this.audioContext.destination
            );


            /* =========================
               مسیر اصلی صدا
            ========================= */

            /*
             * قبلاً masterGain مستقیماً
             * به destination متصل بود.
             *
             * حالا ابتدا وارد Analyser می‌شود.
             */

            this.masterGain.connect(
                this.analyser
            );

            this.analyser.connect(
                this.audioContext.destination
            );

        }

    }


    /* =====================================================
       ANALYSER
       ارسال داده واقعی صدا به Equalizer
    ===================================================== */

    updateFrequencyData() {

        /*
         * اگر صدا در حال پخش نیست،
         * حلقه تحلیل را متوقف می‌کنیم.
         */

        if (
            !this.analyser ||
            !this.isPlaying
        ) {

            return;

        }


        /*
         * ساخت آرایه برای دریافت
         * داده‌های فرکانسی
         */

        const data =
            new Uint8Array(
                this.analyser.frequencyBinCount
            );


        /*
         * دریافت شدت واقعی فرکانس‌ها
         */

        this.analyser.getByteFrequencyData(
            data
        );


        /*
         * ارسال داده به SynthCard
         */

        if (
            typeof this.onFrequencyData ===
            "function"
        ) {

            this.onFrequencyData(data);

        }


        /*
         * اجرای دوباره در فریم بعد
         */

        this.animationFrame =
            requestAnimationFrame(
                () =>
                    this.updateFrequencyData()
            );

    }


    /* =====================================================
       توقف Analyser
    ===================================================== */

    stopFrequencyAnalysis() {

        if (this.animationFrame) {

            cancelAnimationFrame(
                this.animationFrame
            );

            this.animationFrame = null;

        }


        /*
         * Equalizer را به حالت اولیه
         * برمی‌گردانیم.
         */

        if (
            typeof this.onFrequencyData ===
            "function"
        ) {

            this.onFrequencyData(
                new Uint8Array(
                    this.analyser
                        ? this.analyser.frequencyBinCount
                        : 0
                )
            );

        }

    }


    /* =====================================================
       PLAY
    ===================================================== */

    async play() {

        if (this.isPlaying) return;


        this.init();


        /* =========================
           Resume AudioContext
        ========================= */

        if (
            this.audioContext.state ===
            "suspended"
        ) {

            await this.audioContext.resume();

        }


        const now =
            this.audioContext.currentTime;


        this.startTime = now;


        /* =========================
           Main Gain
        ========================= */

        const gain =
            this.audioContext.createGain();


        gain.gain.setValueAtTime(
            0,
            now
        );


        /*
         * Fade In
         */

        gain.gain.linearRampToValueAtTime(
            0.75,
            now + 0.25
        );


        /*
         * Fade Out
         * در انتهای 3.6 ثانیه
         */

        gain.gain.setValueAtTime(
            0.75,
            now + 3.25
        );


        gain.gain.linearRampToValueAtTime(
            0,
            now + this.duration
        );


        gain.connect(
            this.masterGain
        );


        /* =================================================
           Oscillator 1
        ================================================= */

        const osc1 =
            this.audioContext.createOscillator();

        osc1.type = "sawtooth";

        osc1.frequency.setValueAtTime(
            130,
            now
        );


        /* =================================================
           Oscillator 2
        ================================================= */

        const osc2 =
            this.audioContext.createOscillator();

        osc2.type = "triangle";

        osc2.frequency.setValueAtTime(
            131.5,
            now
        );


        /* =================================================
           Harmonic
        ================================================= */

        const harmonic =
            this.audioContext.createOscillator();

        harmonic.type = "triangle";

        harmonic.frequency.setValueAtTime(
            260,
            now
        );


        /* =================================================
           Low Pass Filter
        ================================================= */

        const filter =
            this.audioContext.createBiquadFilter();

        filter.type = "lowpass";

        filter.frequency.setValueAtTime(
            950,
            now
        );

        filter.Q.setValueAtTime(
            2,
            now
        );


        /* =================================================
           اتصال Oscillator ها
        ================================================= */

        osc1.connect(filter);

        osc2.connect(filter);

        harmonic.connect(filter);

        filter.connect(gain);


        /* =================================================
           شروع Oscillator ها
        ================================================= */

        osc1.start(now);

        osc2.start(now);

        harmonic.start(now);


        /* =================================================
           ذخیره منابع
        ================================================= */

        this.oscillators = [

            osc1,

            osc2,

            harmonic,

            filter,

            gain

        ];


        this.isPlaying = true;


        this.notifyState();


        /* =================================================
           شروع Equalizer واقعی
        ================================================= */

        this.updateFrequencyData();


        /* =================================================
           شروع Timer
        ================================================= */

        this.startTimer();


        /* =================================================
           پایان خودکار بعد از 3.6 ثانیه
        ================================================= */

        osc1.stop(
            now + this.duration
        );

        osc2.stop(
            now + this.duration
        );

        harmonic.stop(
            now + this.duration
        );


        /*
         * وقتی Oscillator اصلی تمام شد
         */

        osc1.onended = () => {

            if (this.isPlaying) {

                this.finish();

            }

        };

    }


    /* =====================================================
       TIMER
    ===================================================== */

    startTimer() {

        this.stopTimer();


        this.timer =
            setInterval(() => {

                if (
                    !this.audioContext ||
                    !this.isPlaying
                ) {

                    return;

                }


                const elapsed =
                    this.audioContext.currentTime -
                    this.startTime;


                const current =
                    Math.min(
                        elapsed,
                        this.duration
                    );


                if (
                    typeof this.onTimeUpdate ===
                    "function"
                ) {

                    this.onTimeUpdate(
                        current,
                        this.duration
                    );

                }


                /*
                 * پایان طبیعی
                 */

                if (
                    current >= this.duration
                ) {

                    this.finish();

                }

            }, 50);

    }


    /* =====================================================
       STOP TIMER
    ===================================================== */

    stopTimer() {

        if (this.timer) {

            clearInterval(
                this.timer
            );

            this.timer = null;

        }

    }


    /* =====================================================
       STOP
    ===================================================== */

    stop() {

        if (!this.isPlaying) return;

        if (!this.audioContext) return;


        const now =
            this.audioContext.currentTime;


        /*
         * Gain اصلی
         */

        const gain =
            this.oscillators[4];


        if (gain) {

            gain.gain.cancelScheduledValues(
                now
            );


            gain.gain.setValueAtTime(
                gain.gain.value,
                now
            );


            gain.gain.linearRampToValueAtTime(
                0,
                now + 0.15
            );

        }


        /*
         * توقف Oscillator ها
         */

        this.oscillators
            .slice(0, 3)
            .forEach((osc) => {

                try {

                    osc.stop(
                        now + 0.15
                    );

                // eslint-disable-next-line no-unused-vars
                } catch (error) {

                    // oscillator قبلاً متوقف شده

                }

            });


        this.stopTimer();


        /*
         * توقف تحلیل Equalizer
         */

        this.stopFrequencyAnalysis();


        /*
         * کمی صبر می‌کنیم تا Fade Out کامل شود
         */

        setTimeout(() => {

            this.reset();

        }, 170);

    }


    /* =====================================================
       پایان طبیعی صدا
    ===================================================== */

    finish() {

        if (!this.isPlaying) return;


        this.stopTimer();


        /*
         * توقف Equalizer
         */

        this.stopFrequencyAnalysis();


        this.isPlaying = false;


        /*
         * زمان را دقیقاً روی 3.6 قرار بده
         */

        if (
            typeof this.onTimeUpdate ===
            "function"
        ) {

            this.onTimeUpdate(
                this.duration,
                this.duration
            );

        }


        this.notifyState();


        /*
         * ریست بعد از پایان
         */

        setTimeout(() => {

            this.reset();

        }, 100);

    }


    /* =====================================================
       RESET
    ===================================================== */

    reset() {

        this.stopTimer();

        this.stopFrequencyAnalysis();


        this.oscillators = [];


        this.isPlaying = false;


        /*
         * برگرداندن زمان به صفر
         */

        if (
            typeof this.onTimeUpdate ===
            "function"
        ) {

            this.onTimeUpdate(
                0,
                this.duration
            );

        }


        /*
         * فرستادن وضعیت نهایی
         */

        this.notifyState();

    }


    /* =====================================================
       TOGGLE
    ===================================================== */

    toggle() {

        if (this.isPlaying) {

            this.stop();

        } else {

            this.play();

        }

    }

}


export default new KarnaySynth();
