function confirmDelPost() {
    if (confirm("해당 게시글을 삭제하시겠습니까?") === true) {
        document.delForm.submit();
    }
    else {
        return false;
    };
};

function confirmDelUser() {
    if (confirm("해당 회원을 탈퇴시키시겠습니까?") === true) {
        document.delForm.submit();
    }
    else {
        return false;
    };
};