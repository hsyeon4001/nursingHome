var duplicationChkBtn = document.getElementById("duplicationCheck");
var idCheckRes = document.getElementById("checkRes");
var joinSubmitBtn = document.getElementById("joinSubmit");
var pw = document.getElementById("password");
var id = document.getElementById("id");
var userName = document.getElementById("name");
var job = document.getElementsByName("job");
var pwPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/g;
var idPattern = /^[0-9a-z]{6,12}$/g;
var namePattern = /^[가-힣]{2,}$/g;

function duplicationCheck() {
	if (!id.value.match(idPattern)) {
		console.log(id.value);
		return (idCheckRes.innerText = "사용 불가능");
	}
	if (id.value !== "") {
		var data = { id: id.value };
		data = JSON.stringify(data);
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function () {
			if (xhr.readyState === xhr.DONE) {
				if (xhr.status === 200 || xhr.status === 201) {
					var result = xhr.responseText;
					if (result.match("true")) {
						checkRes.innerText = "사용 불가능";
					} else {
						checkRes.innerText = "사용 가능";
					}
				} else {
					console.error(xhr.responseText);
				}
			}
		};
		xhr.open("POST", "/sign/duplication");
		xhr.setRequestHeader("Content-type", "application/json");
		xhr.send(data);
	}
}

function joinSubmit() {
	var jobCheck = false;
	for (i = 0; i < job.length; i++) {
		if (job[i].checked === true) {
			jobCheck = true;
		}
	}
	if (
		idCheckRes.innerText === "사용 가능" &&
		pw.value.match(pwPattern) &&
		userName.value.match(namePattern) &&
		jobCheck
	) {
		return document.joinForm.submit();
	} else {
		alert("입력 내용을 확인해주십시오.");
		return false;
	}
}

duplicationChkBtn.addEventListener("click", duplicationCheck);
joinSubmitBtn.addEventListener("click", joinSubmit);
