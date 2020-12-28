var signBtn = document.getElementById("sign");
var signId = document.getElementById("sign_id");
var signPw = document.getElementById("sign_pw");
// var signForm = document.getElementsByName("signForm");

function signCheck() {
	console.log(signId.value, signPw.value);
	if (signId.value && signPw.value) {
		return document.signForm.submit();
	} else {
		alert("아이디와 비밀번호를 입력해주십시오.");
		return false;
	}
}

signBtn.addEventListener("click", signCheck);
