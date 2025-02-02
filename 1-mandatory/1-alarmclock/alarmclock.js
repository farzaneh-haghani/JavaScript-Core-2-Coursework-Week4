function setAlarm() {
  let second = document.querySelector("#alarmSet").value;
  let timeRemaining = document.querySelector("#timeRemaining");
  let setButton = document.querySelector("#set");
  const flash = ["red", "white"];

  let minute = parseInt(second / 60);
  second %= 60;

  const stopTimeRemaining = setInterval(() => {

    if (second === -1 && minute > 0) {
      minute--;
      second = 59;
    }

    if (second < 10)
      second = second.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
      })

    if (minute < 10)
      minute = minute.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
      })

    if (second >= 0) {
      timeRemaining.innerText = `Time Remaining: ${minute}:${second}`;
      second--;
    }

    if (second === -1 && minute === "00") {
      let i = 0;
      const stopFlashing = setInterval(() => {
        document.body.style.backgroundColor = flash[i++ % flash.length];
      }, 50)
      playAlarm()
      clearInterval(stopTimeRemaining);
      document.querySelector("#stop").addEventListener("click", () => {
        clearInterval(stopFlashing);
      })
    }
  }, 1000);
}

// DO NOT EDIT BELOW HERE

var audio = new Audio("alarmsound.mp3");

function setup() {
  document.getElementById("set").addEventListener("click", () => {
    setAlarm();
  });

  document.getElementById("stop").addEventListener("click", () => {
    pauseAlarm();
  });
}

function playAlarm() {
  audio.play();
}

function pauseAlarm() {
  audio.pause();
}

window.onload = setup;
