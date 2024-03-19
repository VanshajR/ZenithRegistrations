const day = document.getElementById("days");
const hour = document.getElementById("hours");
const minute = document.getElementById("minutes");
const second = document.getElementById("seconds");


let date = new Date("Feb 16, 2024 17:00:00");


function time(){
    let today = new Date();
    let distace = date - today;
    let days = Math.floor(distace / (1000*60*60*24));
    let hours = Math.floor((distace % (1000*60*60*24)) / (1000*60*60));
    let minutes = Math.floor((distace % (1000*60*60)) / (1000*60));
    let seconds = Math.floor((distace % (1000*60)) / (1000));
    day.innerHTML = days;
    hour.innerHTML = hours;
    minute.innerHTML = minutes;
    second.innerHTML = seconds;
}

setInterval(time , 1000);
