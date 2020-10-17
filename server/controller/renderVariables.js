// indexController 
const MAIN = { sub: "Main" };
const POST = { sub: "Post", path: "늘봄소식", headline: "게시글작성" }
const GALLERY = {
        sub: "Gallery",
        path: "늘봄소식",
        headline: "갤러리",
    }
const NOTICE = {
    sub: "Notice",
    path: "늘봄소식",
    headline: "공지사항",
}
const JOIN = { sub: "Join", path: "회원관리", headline: "회원가입" }
const INTRODUCTION = { sub: "Introduction", path: "시설소개", headline: "늘봄소개" }
const WAY = { sub: "Way", path: "시설소개", headline: "오시는길" }
const ADMIT = { sub: "Admit", path: "입소안내", headline: "입소절차" }
const SPACE = { sub: "Space", path: "입소안내", headline: "늘봄공간" }
const AGENCY = { sub: "Agency", path: "문의하기", headline: "상담문의" }
const GALLERY_POSTVIEW = { sub: "Gallery Detail", path: "늘봄소식", headline: "갤러리" }
const NOTICE_POSTVIEW = { sub: "Notice Detail", path: "늘봄소식", headline: "공지사항" }
const ADMIN = { sub: "Admin", path: "관리", headline: "관리 메뉴" }

// postController
const EDIT = { sub: "Edit", path: "늘봄소식", headline: "게시글수정" }

// adminController
const USER_ADMIN = { sub: "Admin Users", path: "관리", headline: "회원 관리" }
const POST_ADMIN = { sub: "Admin Posts", path: "관리", headline: "게시글 관리" }

exports.indexVariables = {
    main: MAIN,
    post: POST,
    gallery: GALLERY,
    notice: NOTICE,
    join: JOIN,
    introduction: INTRODUCTION,
    way: WAY,
    admit: ADMIT,
    space: SPACE,
    agency: AGENCY,
    galleryPostView: GALLERY_POSTVIEW,
    noticePostView: NOTICE_POSTVIEW,
    edit: EDIT,
    admin: ADMIN,
    userAdmin: USER_ADMIN,
    postAdmin: POST_ADMIN

}
