function confirmDelPost() {
	if (confirm("게시글을 삭제하시겠습니까?") === true) {
		document.delForm.submit();
	} else {
		return false;
	}
}
