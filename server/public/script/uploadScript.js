document.getElementById("img").onchange = function () {
	document.getElementById("fileName").value = this.value.replace(
		"C:\\fakepath\\",
		""
	);
};
