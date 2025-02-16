const input = document.getElementById("box");
const button = document.getElementById("button");
const display = document.getElementById("output");
const parent  = document.getElementById('parent');
document.getElementById('stopButton').style.visibility = "hidden";
display.style.visibility = 'hidden';
let running = false;
let intervalId;
let input1; 
let start;

function update() {
    const currentTime = new Date().getTime();
    const endTime = start + (input1 * 1000); 
    const difference = endTime - currentTime; 
    

    if (difference >= 0) {
        display.textContent = timeformat(Math.floor(difference / 1000)); 
        
    } else {
        
        display.textContent = "00:00"; 
        clearInterval(intervalId); 
        running = false;
        parent.style.visibility = 'visible';
        display.style.visibility  = 'hidden';
        music.pause();
        music.currentTime = 0;
}
}
function timeformat(seconds) {
    const minutes = Math.floor(seconds / 60);
    seconds = seconds % 60; 
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

button.addEventListener('click', () => {
    if (!running) {
        input1 = timeStringToSeconds(input.value);
        start = new Date().getTime(); 
         
        intervalId = setInterval(update, 1000);
        running = true;
        parent.style.visibility = 'hidden';
       document.getElementById('stopButton').style.visibility = 'visible';
       display.style.visibility = 'visible';
       display.style.color ='white';
      const music =  document.getElementById('background-music');
      music.play();
    }
    
   
});

function timeStringToSeconds(timeString) {
    const parts = timeString.split(':');
    const minutes = parseInt(parts[0], 10);
    const seconds = parseInt(parts[1], 10);
    return (minutes * 60) + seconds; 
}
document.getElementById('stopButton').addEventListener('click', () => {
    clearInterval(intervalId);
    display.textContent="00:00";
    running = false;
    parent.style.visibility = 'visible';
    document.getElementById('stopButton').style.visibility = "hidden";
    display.style.visibility = 'hidden';
    music.pause();
    music.currentTime = 0;
});