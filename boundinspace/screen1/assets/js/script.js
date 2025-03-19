const sound1 = document.getElementById("sound1");
const sound2 = document.getElementById("sound2");
const sound3 = document.getElementById("sound3");
const sound4 = document.getElementById("sound4");

// Initial timer value
let timer = 1000;

// Store the interval ID
let backgroundIntervalId = null;

function updateWebPage(data) {
    let vibration = data[0];
    console.log(vibration);

    // Define different timer values for different vibration levels
    let vibrationTimers = {
        "high1": 500,
        "high2": 1000,
        "high3": 1500,
        "high4": 2000,
        "low": 3000
    };

    // Get the appropriate timer value based on the vibration level
    let currentTimer = vibrationTimers[vibration] || vibrationTimers["low"];

    // Clear the existing interval if it exists
    if (backgroundIntervalId) {
        clearInterval(backgroundIntervalId);
    }

    // Set a new interval with the current timer value
    backgroundIntervalId = setInterval(() => {
        console.log("change");
        const randomNumber = Math.floor(Math.random() * 10);
        document.body.style.backgroundImage = `url(assets/img/${randomNumber}.webp)`;
    }, currentTimer);

    // Handle sounds and their timeouts
    let soundTimeouts = {
        "high1": null,
        "high2": null,
        "high3": null,
        "high4": null
    };

    const soundElements = {
        "high1": sound1,
        "high2": sound2,
        "high3": sound3,
        "high4": sound4
    };

    Object.keys(soundTimeouts).forEach(key => {
        if (vibration === key) {
            soundElements[key].play();

            // Clear any existing timeout
            if (soundTimeouts[key]) {
                clearTimeout(soundTimeouts[key]);
            }

            // Set a new timeout to pause the sound after 5 seconds
            soundTimeouts[key] = setTimeout(() => {
                console.log(`dentro ${key}`);
                soundElements[key].pause();
            }, 5000);
        } else {
            console.log(`dentro low`);
        }
    });
}

function changeBackground(time) {
    backgroundIntervalId = setInterval(() => {
        console.log("change");
        const randomNumber = Math.floor(Math.random() * 10);
        document.body.style.backgroundImage = `url(assets/img/${randomNumber}.webp)`;
    }, time);
}

// Initial call to start background change
changeBackground(timer);