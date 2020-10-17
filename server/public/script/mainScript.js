var strArr = ["image/main1.jpg", "image/main2.jpg", "image/main3.jpg"];
var img = document.querySelector(".main__img-section--img > img");

function changeImg() {
    var strIdx = Math.round(Math.random() * 2);
    img.src = strArr[strIdx];
}

setInterval(changeImg, 3000);

function init() {
    img.addEventListener("onload", changeImg);
}

init();
