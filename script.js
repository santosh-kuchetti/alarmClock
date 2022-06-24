const selectMenu = document.querySelectorAll('select'),
    currentTime = document.querySelector('h2'),
    setAlarmBtn = document.querySelector('button'),
    content = document.querySelector('.content');
    
let alarmTime;
let ringTone = new Audio("./asset/alarm.mp3");
let isAlarmSet = false;

for (let i = 12; i > 0; i--){
    i = i < 10 ? '0' + i : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML('afterend', option);
}
for (let i = 59; i >= 0; i--){
    i = i < 10 ? '0' + i : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML('afterend', option);
}
for (let i = 2; i > 0; i--){
    let ampm = i == 1 ? 'AM' : 'PM';
    let option = `<option value="${ampm}">${ampm}</option>`;
    selectMenu[2].firstElementChild.insertAdjacentHTML('afterend', option);
}

setInterval(() => {

    // getting hours, minutes,seconds
    let date = new Date(),
    h = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds(),
    ampm = "AM";
    
    if (h >= 12) {
        h = h - 12;
        ampm = "PM";
    }

    // if hour value is 0, set this value to 12
    h = h == 0 ? 12 : h;

    // adding 0 before hr, min, sec if this value is less than 10

    h = h < 10 ? '0' + h : h;
    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;

    currentTime.innerText = `${h}:${m}:${s} ${ampm}`;

    if (alarmTime == `${h}:${m} ${ampm}`) {
        ringTone.play();
        ringTone.loop = true;
    }

}, 1000)

function setAlarm() {

    if(isAlarmSet) {  // if isAlaramSet is true when we click
        alarmTime = "";  // clear the value of alarmTime so that it won't repeat 

        ringTone.pause();   // pause the ringTone
        selectMenu[0].selectedIndex = "0";  //deselecting the selected tags (we can deselect any one of them among 3 tags, but i select all tegs sothat it looks good that all are deselected rather one or two deselected) and set back to Hour, Minute, AM/PM inorder to stop the alarm sound. Because while alarm ringing when we click the button it pause. But when we click it again, it rings again. Beacuse our selected values are still showing the right time that we set
        selectMenu[1].selectedIndex = "0";  
        selectMenu[2].selectedIndex = "0";  
        
        content.classList.remove('disable');
        setAlarmBtn.innerText = 'Set Alarm';
        return isAlarmSet = false;    // return the isAlarm value to false
    }
    

    // getting hour, minute, ampm from select tag value

    const time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;
    if (time.includes('Hour') || time.includes('Minute') || time.includes('AM/PM')) {
        return alert('Please, select valid time to set Alarm')
    }
    isAlarmSet = true;
    alarmTime = time;

    content.classList.add('disable');
    setAlarmBtn.innerHTML = 'Clear Alarm';
    
    
    

}



setAlarmBtn.addEventListener('click', setAlarm);