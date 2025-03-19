let counter = 0;
const sound1 = document.getElementById("sound1");
const sound2 = document.getElementById("sound2");
const sound3 = document.getElementById("sound3");
const sound4 = document.getElementById("sound4");
let timer = 1000;


function updateWebPage(data) {

    // const dacVal = 4095;    // Arduino is 1023, ESP32 is 4095

    let vibration = data[0];
    console.log(vibration);

let soundTimeout = null;

if (vibration === "high1") {
    sound1.play();
    
    // Clear any existing timeout
    if (soundTimeout) {
        clearTimeout(soundTimeout);
    }
    
    // Set a new timeout to pause the sound after 5 seconds
    soundTimeout = setTimeout(() => {
        console.log("dentro high1");
        sound1.pause();
    }, 5000);
} else {
    console.log("dentro low");
}
let soundTimeout2 = null;

if (vibration === "high2") {
    sound2.play();
    
    // Clear any existing timeout
    if (soundTimeout2) {
        clearTimeout(soundTimeout2);
    }
    
    // Set a new timeout to pause the sound after 5 seconds
    soundTimeout2 = setTimeout(() => {
        console.log("dentro high2");
        sound2.pause();
    }, 5000);
} else {
    console.log("dentro low2");
}

let soundTimeout3 = null;

if (vibration === "high3") {
    sound3.play();
    
    // Clear any existing timeout
    if (soundTimeout3) {
        clearTimeout(soundTimeout3);
    }
    
    // Set a new timeout to pause the sound after 5 seconds
    soundTimeout3 = setTimeout(() => {
        console.log("dentro high3");
        sound3.pause();
    }, 5000);
} else {
    console.log("dentro low3");
}

let soundTimeout4 = null;

if (vibration === "high4") {
    sound4.play();
    
    // Clear any existing timeout
    if (soundTimeout4) {
        clearTimeout(soundTimeout4);
    }
    
    // Set a new timeout to pause the sound after 5 seconds
    soundTimeout4 = setTimeout(() => {
        console.log("dentro high4");
        sound4.pause();
    }, 5000);
} else {
    console.log("dentro low4");
}
    
}

function changeBackground(time) {
  setInterval(() => {
      //console.log("change");
      const randomNumber = Math.floor(Math.random() * 10);
      document.body.style.backgroundImage = `url(assets/img/${randomNumber}.webp)`;
      counter++;
     
  }, time);
}

changeBackground(timer);

