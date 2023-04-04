let myInterval = setInterval(playCountDown, 1000);
let timerflashing;
const alarms = document.querySelectorAll(".alarm");

function playCountDown() {
    
    let seconds = dataCountDown[3];
    let minutes = dataCountDown[2];
    let hours = dataCountDown[1];
    let days = dataCountDown[0];
    
    seconds.innerHTML--;
    
    if (seconds.innerHTML < 0) {
        seconds.innerHTML = 59;
        minutes.innerHTML--;
        
        if (minutes.innerHTML < 0) {
            minutes.innerHTML = 59;
            hours.innerHTML--;
            
            if (hours.innerHTML < 0) {
                hours.innerHTML = 23;
                days.innerHTML--;

                if (days.innerHTML < 0) {
                    seconds.innerHTML = 0;
                    minutes.innerHTML = 0;
                    hours.innerHTML = 0;
                    days.innerHTML = 0;                    
                    myInterval = clearInterval(myInterval);
                    timerflashing = setInterval(countDownEnd, 500);
                    
                    alarmPlay();
                }
            }
        }
    }
};

function countDownEnd() {
    dataCountDown.forEach(element => {
        element.classList.toggle("timerFlashing");
    });
};

function alarmPlay () {
    alarms.forEach(alarm => {
        if (alarm.hasAttribute("current")) {
            alarm.play()
        }
    })
}

function alarmPause () {
    alarms.forEach(alarm => {
        if (alarm.hasAttribute("current")) {
            alarm.pause()
            alarm.currentTime = 0;
        }
    })
}

const countDownSettingsButton = document.querySelector(".ph-clock-countdown");
const modalSettings = document.querySelector(".alarm__container")
const closeModalButton = document.querySelector(".ph-x");

countDownSettingsButton.addEventListener("click", (e) => {
    modalSettings.classList.toggle("sr-only");
})

closeModalButton.addEventListener("click", () => {
    modalSettings.classList.toggle("sr-only");
})


const settingsInputField = document.querySelectorAll(".timer-content input");
const settingsPlayButton = document.querySelector("button.play");
const dataCountDown = document.querySelectorAll(".timer-content h3");

settingsPlayButton.addEventListener("click", () => {
    
    timerflashing = clearInterval(timerflashing);
    myInterval = clearInterval(myInterval);
    
    settingsInputField.forEach((input, index) => {
        if (input.value == "") {
            dataCountDown[index].innerHTML = 0
        } else {
            dataCountDown[index].innerHTML = input.value;
        }
    });
    dataCountDown[3].innerHTML = 0;
    
    dataCountDown.forEach(element => {
        element.classList.remove("timerFlashing");
    });
    
    alarmPause();

    myInterval = setInterval(playCountDown, 1000);
    
    modalSettings.classList.toggle("sr-only");

});


settingsInputField.forEach((input, index) => {
    input.addEventListener("input", (e) => {
        if (settingsInputField[0].value >= 0 && settingsInputField[1].value < 24 && settingsInputField[2].value < 60) {
            if (input.value.length == 2) {
                if (index < settingsInputField.length - 1) {
                    settingsInputField[index + 1].focus();
                } else {
                    settingsPlayButton.focus();
                }
            }
        } else {
            input.value = ""
        }
    });
    
    input.addEventListener("click", () => {
        input.select();
    });
});

const alarmButton = document.querySelector(".alarm__change");
const modalAlarmList = document.querySelector(".alarm-container");
const alarmList = document.querySelectorAll(".alarm-content");
const returnButton = document.querySelector(".ph-arrow-u-up-left");

alarmButton.addEventListener("click", (e) => {
    const alarmSelected = e.target.innerText;
    alarmList.forEach(alarm => {
        if (alarm.innerText == alarmSelected) {
            alarm.classList.add("selected");
        }
    })
    modalAlarmList.classList.remove("sr-only")
})

returnButton.addEventListener("click", () => {

    alarmPause();

    alarmList.forEach((item, i) => {
        if (i > 0) {
            item.querySelector("img").classList.add("sr-only");
        }
    });
    modalAlarmList.classList.add("sr-only")
})

alarmList.forEach((alarmItem, index) => {
    alarmItem.addEventListener("click", () => {
        alarmList.forEach((item, i) => {
            item.classList.remove("selected");
            if (i > 0) {
                item.querySelector("img").classList.add("sr-only");
                item.lastElementChild.removeAttribute("current");

                item.lastElementChild.pause();
                item.lastElementChild.currentTime = 0;
            }
        });

        alarmItem.classList.add("selected");
        if (index > 0) {
            alarmItem.querySelector("img").classList.remove("sr-only");
            alarmItem.lastElementChild.setAttribute("current", "")
            
            alarmItem.lastElementChild.play();
        }
        

        alarmButton.innerHTML = alarmItem.firstElementChild.innerHTML
        alarmButton.lastChild.textContent = alarmItem.textContent;
    })
})