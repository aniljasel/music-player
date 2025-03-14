document.addEventListener("DOMContentLoaded", function () {
    const audio = document.getElementById("audio-player");
    const canvas = document.getElementById("visualizer");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth * 0.8;
    canvas.height = 150;

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    const gainNode = audioContext.createGain();
    const biquadFilter = audioContext.createBiquadFilter();
    const equalizerBands = [];

    const maxxbassControl = document.getElementById('maxxbass');
    const detailsControl = document.getElementById('details');
    const midnightControl = document.getElementById('midnight');
    const widthControl = document.getElementById('width');
    const equalizerControls = [
        document.getElementById('eq-31'),
        document.getElementById('eq-63'),
        document.getElementById('eq-125'),
        document.getElementById('eq-250'),
        document.getElementById('eq-500'),
        document.getElementById('eq-1k'),
        document.getElementById('eq-2k'),
        document.getElementById('eq-4k'),
        document.getElementById('eq-8k'),
        document.getElementById('eq-16k')
    ];

    equalizerControls.forEach((control, index) => {
        const eq = audioContext.createBiquadFilter();
        eq.type = 'peaking';
        eq.frequency.value = [31, 63, 125, 250, 500, 1000, 2000, 4000, 8000, 16000][index];
        eq.Q.value = 1;
        equalizerBands.push(eq);
    });

    const source = audioContext.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(audioContext.destination);

    let soundEffectsEnabled = false;
    document.getElementById('sound-btn').addEventListener('click', function() {
        this.classList.toggle('sound-btn-on');
        soundEffectsEnabled = !soundEffectsEnabled;
        toggleSoundEffects(soundEffectsEnabled);
    });

    function updateSoundEffects() {
        gainNode.gain.value = Math.min(maxxbassControl.value / 100, 2); // Increase gain value for MaxxBass
        biquadFilter.frequency.value = Math.min(detailsControl.value * 20, 8000); // Increase frequency for Details
        biquadFilter.gain.value = midnightControl.value * 4; // Increase gain for Midnight
        biquadFilter.Q.value = Math.min(widthControl.value / 25, 5); // Increase Q factor for Width

        equalizerBands.forEach((band, index) => {
            band.gain.value = Math.min(Math.max((equalizerControls[index].value - 50) / 10, -6), 6);
        });
    }

    function toggleSoundEffects(enable) {
        if (enable) {
            source.disconnect(audioContext.destination);
            source.connect(gainNode);
            gainNode.connect(biquadFilter);
            equalizerBands.forEach((band, index) => {
                if (index === 0) {
                    biquadFilter.connect(band);
                } else {
                    equalizerBands[index - 1].connect(band);
                }
            });
            equalizerBands[equalizerBands.length - 1].connect(audioContext.destination);
            updateSoundEffects();
            analyser.connect(audioContext.destination); // Connect analyser to destination
        } else {
            gainNode.disconnect();
            biquadFilter.disconnect();
            equalizerBands.forEach(band => band.disconnect());
            source.connect(audioContext.destination);
            analyser.connect(audioContext.destination); // Connect analyser to destination
        }
    }

    function drawVisualizer() {
        requestAnimationFrame(drawVisualizer);
        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(dataArray);

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const barWidth = (canvas.width / dataArray.length) * 10; // Increase bar width
        let x = 0;

        for (let i = 0; i < dataArray.length; i++) {
            const barHeight = dataArray[i];
            const r = barHeight + (25 * (i / dataArray.length));
            const g = 10 * (i / dataArray.length);
            const b = 150;

            ctx.fillStyle = `rgb(${r},${g},${b})`;
            ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

            x += barWidth + 1;
        }
    }

    function startAudio() {
        if (audioContext.state === "suspended") {
            audioContext.resume();
        }
        if (audio.paused) {
            audio.play();
        }
        drawVisualizer();
    }

    window.addEventListener("click", startAudio, { once: true });
    window.addEventListener("touchstart", startAudio, { once: true });

    audio.addEventListener("canplay", startAudio);

    maxxbassControl.addEventListener('input', updateSoundEffects);
    detailsControl.addEventListener('input', updateSoundEffects);
    midnightControl.addEventListener('input', updateSoundEffects);
    widthControl.addEventListener('input', updateSoundEffects);
    equalizerControls.forEach(control => control.addEventListener('input', updateSoundEffects));

    updateSoundEffects();
});
