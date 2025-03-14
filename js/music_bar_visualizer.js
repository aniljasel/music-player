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
        gainNode.gain.value = Math.min(maxxbassControl.value / 100, 2);
        biquadFilter.frequency.value = Math.min(detailsControl.value * 20, 8000);
        biquadFilter.gain.value = midnightControl.value * 4;
        biquadFilter.Q.value = Math.min(widthControl.value / 25, 5);

        equalizerBands.forEach((band, index) => {
            band.gain.value = Math.min(Math.max((equalizerControls[index].value - 50) / 10, -6), 6);
        });
    }

    function toggleSoundEffects(enable) {
        if (enable) {
            source.disconnect();
            source.connect(gainNode);
            gainNode.connect(biquadFilter);
            equalizerBands[0].connect(biquadFilter);

            for (let i = 0; i < equalizerBands.length - 1; i++) {
                equalizerBands[i].connect(equalizerBands[i + 1]);
            }
            equalizerBands[equalizerBands.length - 1].connect(audioContext.destination);
        } else {
            source.disconnect();
            source.connect(audioContext.destination);
        }
    }

    let animationFrameId;
    function drawVisualizer() {
        animationFrameId = requestAnimationFrame(drawVisualizer);
        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(dataArray);

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const barWidth = (canvas.width / dataArray.length) * 10;
        let x = 0;

        for (let i = 0; i < dataArray.length; i++) {
            const barHeight = dataArray[i];
            ctx.fillStyle = `rgb(${barHeight + 25}, ${10 * (i / dataArray.length)}, 150)`;
            ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
            x += barWidth + 1;
        }
    }

    function stopVisualizer() {
        cancelAnimationFrame(animationFrameId);
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
    window.addEventListener("touchstart", startAudio, { passive: true, once: true });

    // ✅ Fix: Browser tab switch ke baad audio suspend na ho
    document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "visible" && audioContext.state === "suspended") {
            audioContext.resume();
        }
    });

    audio.addEventListener("canplay", startAudio);

    maxxbassControl.addEventListener('input', updateSoundEffects);
    detailsControl.addEventListener('input', updateSoundEffects);
    midnightControl.addEventListener('input', updateSoundEffects);
    widthControl.addEventListener('input', updateSoundEffects);
    equalizerControls.forEach(control => control.addEventListener('input', updateSoundEffects));

    updateSoundEffects();
});
