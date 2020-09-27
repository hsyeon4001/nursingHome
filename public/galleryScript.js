const prev = document.querySelector(".page__prev");
const next = document.querySelector(".page__next");
const nums = document.querySelector(".page__number");
const firstNum = document.querySelector(".page__number")
    .firstElementChild;
const lastNum = document.querySelector(".page__number").lastElementChild;
const posts = document.querySelectorAll(".board__post");

const postCnt = parseInt("<%= posts %>");
const remainPost = postCnt % 6;
let maxPage = Math.floor(postCnt / 6);
const link = document.location.href;


if (postCnt < 30) {
    if (remainPost !== 0) {
        maxPage += 1;
    }
    for (i = 4; i > maxPage - 1; i--) {
        nums.removeChild(nums.children[i]);
    }
}

prev.addEventListener("click", function (e) {
    if (parseInt(firstNum.innerText) !== 1) {
        for (i = 0; i < nums.length; i++) {
            let pageNum = parseInt(nums.children[i].innerText);
            nums.children[i].innerText = pageNum - 5;
        }
    }
});
next.addEventListener("click", function (e) {
    if (parseInt(lastNum.innerText) !== maxPage) {
        for (i = 0; i < nums.length; i++) {
            let pageNum = parseInt(nums.children[i].innerText);
            nums.children[i].innerText = pageNum + 5;
        }
    }
});

Array.prototype.forEach.call(nums, num => {
    num.setAttribute('href', '/gallery/' + nums.indexOf(num));
});

Array.prototype.forEach.call(posts, post => {
    let pid = post.value;
    post.firstElementChild.setAttribute('href', link + '/id/' + pid);
});