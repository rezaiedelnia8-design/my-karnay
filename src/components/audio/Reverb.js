class KarnayReverb {

    constructor(audioContext) {

        this.ctx = audioContext;

    }

    createImpulse(seconds = 3, decay = 2.5) {

        const sampleRate = this.ctx.sampleRate;

        const length = sampleRate * seconds;

        const impulse = this.ctx.createBuffer(
            2,
            length,
            sampleRate
        );

        for (let channel = 0; channel < 2; channel++) {

            const data = impulse.getChannelData(channel);

            for (let i = 0; i < length; i++) {

                data[i] =
                    (Math.random() * 2 - 1) *
                    Math.pow(
                        1 - i / length,
                        decay
                    );

            }

        }

        return impulse;

    }

    create() {

        const convolver = this.ctx.createConvolver();

        convolver.buffer = this.createImpulse();

        return convolver;

    }

}

export default KarnayReverb;
