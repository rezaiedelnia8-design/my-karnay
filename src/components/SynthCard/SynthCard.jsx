import { useEffect, useState } from "react";
import "./SynthCard.css";

import {
    Volume2,
    Play,
    Square,
    Info
} from "lucide-react";

import synth from "../audio/KarnaySynth";


function SynthCard() {


    const [playing, setPlaying] = useState(false);


    const [currentTime, setCurrentTime] = useState(0);



    const getInitialBars = () =>
        Array(18).fill(8).map((height, index) => {
            return index === 8 || index === 9 ? 18 : 8;
        });


    const [bars, setBars] = useState(
        getInitialBars()
    );



    useEffect(() => {



        synth.onStateChange = (state) => {


            setPlaying(state);



            if (!state) {


                setCurrentTime(0);



                setBars(
                    getInitialBars()
                );


            }
        };


        synth.onFrequencyData = (data) => {



            if (!data || data.length === 0)
                return;



            const newBars = [];



            const step =
                Math.floor(data.length / 18);



            /*
              معکوس کردن جهت
              چون سایت کرنای از سمت راست حرکت می‌کند
            */



            for (let i = 0; i < 18; i++) {



                let sum = 0;



                for (let j = 0; j < step; j++) {



                    const index =
                        ((17 - i) * step) + j;



                    if (index < data.length) {



                        sum += data[index];


                    }


                }



                const avg =
                    sum / step;




                newBars.push(


                    Math.max(
                        8,
                        Math.min(
                            52,
                            avg / 4
                        )
                    )


                );


            }



            setBars(newBars);
        };



        synth.onTimeUpdate = (time) => {


            setCurrentTime(time);


        };


        return () => {


            synth.onStateChange = null;


            synth.onFrequencyData = null;


            synth.onTimeUpdate = null;


        };



    }, []);




    const handlePlay = () => {


        synth.toggle();


    };



    const formatTime = () => {


        return `${currentTime.toFixed(1)} / 3.6 ثانیه`;


    };



    return (


        <div
            className="synth-card"
        >


            <div className="synth-header">

                <div
                    className={
                        `synth-title ${
                            playing
                            ? "is-playing"
                            : ""
                        }`
                    }
                >


                    <Volume2
                        className={`title-icon ${playing ? "is-playing" : ""}`}
                    />


                    <span>
                        آزمایشگاه سنتز کرنای
                    </span>


                </div>




                <div
                    className={
                        `synth-badge ${
                            playing
                            ? "playing-badge"
                            : ""
                        }`
                    }
                >


                    {
                        playing
                        ?
                        "در حال پخش"
                        :
                        "سنتز تک‌صدایی"
                    }


                </div>


            </div>



            <div className="synth-center">


                <div className="play-wrapper">


                    <div
                        className={
                            `play-circle ${
                                playing
                                ?
                                "is-playing"
                                :
                                ""
                            }`
                        }
                    >


                        <button

                            className={
                                `play-button ${
                                    playing
                                    ?
                                    "is-playing"
                                    :
                                    ""
                                }`
                            }


                            onClick={handlePlay}


                            title="دمیدن در کرنای"


                        >



                            {
                                playing

                                ?

                                <Square

                                    className="play-icon stop-icon"

                                    fill="currentColor"

                                />

                                :

                                <Play

                                    className="play-icon"

                                    fill="currentColor"

                                />

                            }


                        </button>


                    </div>



                    <div className="play-text">


                        <p>


                            {
                                playing

                                ?

                                formatTime()

                                :

                                "برای شنیدن طنین کرنای باستانی کلیک کنید"

                            }


                        </p>


                    </div>



                    <div className="equalizer">



                        {
                            bars.map(
                                (height, index) => (


                                    <span


                                        key={index}


                                        className={
                                            `eq-bar ${
                                                playing
                                                ?
                                                "is-playing"
                                                :
                                                ""
                                            }`
                                        }


                                        style={{
                                            height:
                                            `${height}px`
                                        }}


                                    />


                                )
                            )
                        }


                    </div>


                    <div className="synth-info">



                        <Info
                            className="info-icon"
                        />


                        <span>


                            سیستم با شبیه‌سازی گام حماسی و هارمونیک‌های غنی بوق کرنای،
                            فرکانس صوتی عمیقی را به صورت نوسانی سنتز می‌کند.


                        </span>


                    </div>


                </div>


            </div>


        </div>


    );


}


export default SynthCard;
