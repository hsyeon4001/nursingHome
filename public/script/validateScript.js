var overlapChkBtn = document.getElementById("overlapChk");
var overlapRes = document.getElementById("overlapRes");
var joinSubmitBtn = document.getElementById("joinSubmit");

var id = document.getElementById("id");


function overlapChk() {
    if (id.value !== "") {
        var data = { 'id': id.value };
        data = JSON.stringify(data);
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === xhr.DONE) {
                if (xhr.status === 200 || xhr.status === 201) {
                    var result = xhr.responseText;
                    if (result.match("true")) {
                        overlapRes.innerText = "사용 불가능";
                    }
                    else {
                        overlapRes.innerText = "사용 가능";
                    }
                } else {
                    console.error(xhr.responseText);
                }
            }
        };
        xhr.open("POST", "/join/overlap");
        xhr.setRequestHeader('Content-type', "application/json");
        xhr.send(data);
    };
}

function joinSubmit() {
    if (overlapRes.innerText !== "사용 가능") {
        alert("아이디 중복 여부를 확인해주십시오.");
        return false;
    } else if (overlapRes.innerText === "사용 가능") {
        document.joinForm.submit();
    }
}

overlapChkBtn.addEventListener("click", overlapChk)
joinSubmitBtn.addEventListener("click", joinSubmit)
