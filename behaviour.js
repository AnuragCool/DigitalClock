window.onload = () => {
  var today = new Date();
  var flag = 0;
  var hours = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();

  var flag = 0;
  
  if (hours >= 12 && hours <= 23) {
    // console.log(hours);
    flag = 1;
    if (hours != 12) {
      hours = hours % 12;
    }
  }
  if (hours === 0) {
    hours = 12;
    flag = 0;
  }
  var day = today.getDay();
  console.log(day);
  init(hours, min, sec,flag,day);
};

var dark = 0;
document.querySelector(".toggle").addEventListener("click", () => {
  if (dark === 0) {
    document.querySelector("main").classList.remove("light");
    document.querySelector("main").classList.add("dark");
    document.querySelector(".clock").classList.remove("light-text");
    document.querySelector(".clock").classList.add("dark-text");
    document.querySelector("video").setAttribute("src", "./sky.mp4");
    var ele = document.querySelectorAll(".display");
    for (var i = 0; i < ele.length; i++) ele[i].classList.add("glow");
    document.querySelector(".toggle").innerHTML =
      '<i style="color:orange" class="fas fa-sun"></i>';
    document.querySelector(".toggle").style.backgroundColor = "white";
    dark = 1;
  } else {
    document.querySelector("video").setAttribute("src", "./06.mp4");
    var ele = document.querySelectorAll(".display");
    for (var i = 0; i < ele.length; i++) ele[i].classList.remove("glow");
    document.querySelector("main").classList.add("light");
    document.querySelector("main").classList.remove("dark");
    document.querySelector(".clock").classList.remove("dark-text");
    document.querySelector(".clock").classList.add("light-text");
    document.querySelector(".digital-clock .clock p").classList.remove("glow");
    document.querySelector(".toggle").innerHTML = '<i class="fas fa-moon"></i>';
    dark = 0;
  }
});

function init(hours, min, sec,flag,day) {
  var secDisplay = "",
    hoursDisplay = "",
    minDisplay = "";

  setInterval(() => {
    if (flag === 0) {
      document.querySelector(".am").classList.add("active");
      document.querySelector(".pm").classList.remove("active");
    } else {
      document.querySelector(".am").classList.remove("active");
      document.querySelector(".pm").classList.add("active");
    }
    document.querySelector(`.day-${day}`).classList.add("active");
    sec += 1;
    if (sec === 60) {
      sec = 0;
      min += 1;
    }
    if (min === 60) {
      min = 0;
      if (hours === 11) {
        hours = 12;
        if (flag === 0) flag = 1;
        else {
            flag = 0;
            day=(day+1)%7;
        }
      } else {
        hours += 1;
        hours = hours % 12;
      }
    }
    if (sec >= 0 && sec < 10) secDisplay = 0;
    else secDisplay = parseInt(sec / 10);
    if (hours >= 0 && hours < 10) hoursDisplay = 0;
    else hoursDisplay = parseInt(hours / 10);
    if (min >= 0 && min < 10) minDisplay = 0;
    else minDisplay = parseInt(min / 10);

    document.querySelector(".sec-1").innerHTML = secDisplay;
    document.querySelector(".sec-2").innerHTML = sec % 10;
    document.querySelector(".hours-1").innerHTML = hoursDisplay;
    document.querySelector(".hours-2").innerHTML = hours % 10;

    document.querySelector(".min-1").innerHTML = minDisplay;
    document.querySelector(".min-2").innerHTML = min % 10;
  }, 1000);
}
