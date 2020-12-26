document.getElementById("img").onchange = function () {
	let ext = this.value.split(".")[1].toLowerCase();
	console.log(ext);
	if (ext === "jpg" || ext === "jpeg") {
		document.getElementById("fileName").value = this.value.replace(
			"C:\\fakepath\\",
			""
		);
	} else {
		return alert("jpg, jpeg 형식의 파일만 지원합니다.");
	}
};
