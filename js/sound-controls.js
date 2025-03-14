// Initialize AudioContext and create nodes
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const source = audioContext.createMediaElementSource(audioPlayer);

// Create nodes for sound effects
const gainNode = audioContext.createGain();
const biquadFilter = audioContext.createBiquadFilter();
const equalizerBands = [];

// Select control elements
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

// Create and configure equalizer bands
equalizerControls.forEach((control, index) => {
    const eq = audioContext.createBiquadFilter();
    eq.type = 'peaking';
    eq.frequency.value = [31, 63, 125, 250, 500, 1000, 2000, 4000, 8000, 16000][index];
    eq.Q.value = 1;
    equalizerBands.push(eq);
});

// Connect audio nodes in sequence
source.connect(audioContext.destination); // Initial connection to play audio normally

// Function to update sound effects based on user input
function updateSoundEffects() {
    gainNode.gain.value = maxxbassControl.value / 100; // Update gain value for MaxxBass
    biquadFilter.frequency.value = detailsControl.value * 10; // Update frequency for Details
    biquadFilter.gain.value = midnightControl.value * 2; // Update gain for Midnight
    biquadFilter.Q.value = widthControl.value / 50; // Update Q factor for Width

    equalizerBands.forEach((band, index) => {
        band.gain.value = (equalizerControls[index].value - 50) / 10; // Update gain for each equalizer band
    });
}

// Add event listeners to update sound effects on input
maxxbassControl.addEventListener('input', updateSoundEffects);
detailsControl.addEventListener('input', updateSoundEffects);
midnightControl.addEventListener('input', updateSoundEffects);
widthControl.addEventListener('input', updateSoundEffects);
equalizerControls.forEach(control => control.addEventListener('input', updateSoundEffects));

// Initialize sound effects
updateSoundEffects();

// Handle enabling and disabling audio effects
const soundBtn = document.getElementById('sound-btn');

soundBtn.addEventListener('click', () => {
    soundBtn.classList.toggle('sound-btn-on');
    
    if (soundBtn.classList.contains('sound-btn-on')) {
        enableAudioEffects();
    } else {
        disableAudioEffects();
    }
});

function enableAudioEffects() {
    // Connect audio nodes
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
    updateSoundEffects(); // Ensure sound effects are applied
}

function disableAudioEffects() {
    // Disconnect sound effects nodes and connect source directly to destination
    gainNode.disconnect();
    biquadFilter.disconnect();
    equalizerBands.forEach(band => band.disconnect());
    source.disconnect();
    source.connect(audioContext.destination); // Reconnect directly to play audio normally
}
