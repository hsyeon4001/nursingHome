var strArr = ["images/main1.jpg", "images/main2.jpg", "images/main3.jpg"];
var img = document.querySelector(".main__img-section--img > img");

function changeImg() {
    var strIdx = Math.round(Math.random() * 2);
    console.log(strIdx);
    img.src = strArr[strIdx];
}

setInterval(changeImg, 3000);

function init() {
    img.addEventListener("onload", changeImg);

}

init();
