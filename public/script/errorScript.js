function errRedirect() {
    let number = document.getElementById("cntNumber");
    number.innerText = parseInt(number.innerText) - 1;

    if (number.innerText === "0") {
        window.location.href = "/"
    }
}

setInterval(errRedirect, 1000);
