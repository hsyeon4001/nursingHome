const prev = document.querySelector(".page__prev");
const next = document.querySelector(".page__next");
const nums = document.querySelector(".page__number");

const posts = document.querySelectorAll(".board__post");

const postCnt = parseInt(nums.dataset.count);
const remainPost = postCnt % 6;
let maxPage = Math.floor(postCnt / 6);
const link = document.location.href;
const boardType = link.split("/")[3];
const presentNum = link.split("/")[4];

if (postCnt < 30) {
	if (remainPost !== 0) {
		maxPage += 1;
	}
	for (i = 1; i < maxPage + 1; i++) {
		let pageA = document.createElement("a");
		let pageNum = document.createTextNode(i);
		pageA.setAttribute("href", "/" + boardType + "/" + i);
		pageA.appendChild(pageNum);
		nums.appendChild(pageA);
	}
}

prev.addEventListener("click", function (e) {
	if (postCnt >= 30 && parseInt(presentNum) !== 1) {
		for (i = 0; i < nums.length; i++) {
			let pageNum = parseInt(nums.children[i].innerText);
			nums.children[i].innerText = pageNum - 5;
		}
	}
});
next.addEventListener("click", function (e) {
	if (postCnt >= 30 && parseInt(presentNum) !== maxPage) {
		for (i = 0; i < nums.length; i++) {
			let pageNum = parseInt(nums.children[i].innerText);
			nums.children[i].innerText = pageNum + 5;
		}
	}
});

// console.log(nums.children, nums, lastNum);
// Array.prototype.forEach.call(nums, (num) => {
// 	console.log("hello?2");
// 	num.setAttribute("href", "/" + boardType + "/" + nums.indexOf(num));
// });

Array.prototype.forEach.call(posts, (post) => {
	let pid = post.value;
	post.firstElementChild.setAttribute("href", link + "/id/" + pid);
});
