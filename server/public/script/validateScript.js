var duplicationChkBtn = document.getElementById("duplicationCheck");
var checkRes = document.getElementById("checkRes");
var joinSubmitBtn = document.getElementById("joinSubmit");

var id = document.getElementById("id");


function duplicationCheck() {
    if (id.value !== "") {
        var data = { 'id': id.value };
        data = JSON.stringify(data);
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === xhr.DONE) {
                if (xhr.status === 200 || xhr.status === 201) {
                    var result = xhr.responseText;
                    if (result.match("true")) {
                        checkRes.innerText = "사용 불가능";
                    }
                    else {
                        checkRes.innerText = "사용 가능";
                    }
                } else {
                    console.error(xhr.responseText);
                }
            }
        };
        xhr.open("POST", "/sign/duplication");
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

duplicationChkBtn.addEventListener("click", duplicationCheck)
joinSubmitBtn.addEventListener("click", joinSubmit)
