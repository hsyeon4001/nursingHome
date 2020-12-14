// common route
const COMMON = { path: "/*" };

// indexController
const MAIN = { path: "/", method: "GET" };
const POST = { path: "/post", method: "GET" };
const GALLERY = { path: "/gallery/:page", method: "GET" };
const NOTICE = { path: "/notice/:page", method: "GET" };
const JOIN = { path: "/join", method: "GET" };
const INTRODUCTION = { path: "/introduction", method: "GET" };
const WAY = { path: "/way", method: "GET" };
const ADMIT = { path: "/admit", method: "GET" };
const SPACE = { path: "/space", method: "GET" };
const AGENCY = { path: "/agency", method: "GET" };
const GALLERY_POSTVIEW = { path: "/gallery/:page/id/:id", method: "GET" };
const NOTICE_POSTVIEW = { path: "/notice/:page/id/:id", method: "GET" };
const ADMIN = { path: "/admin", method: "GET" };
const SEARCH = { path: "/search", method: "POST" };

// postController
const EDIT = { path: "/:id/edit", method: "GET" };
const CREATE_POST = { path: "/", method: "POST" };
const READ_POSTEDIT = { path: "/:id/edit", method: "GET" };
const UPDATE_POST = { path: "/:id/edit", method: "PUT" };
const DELETE_POST = { path: "/:id/delete", method: "DELETE" };

// signController
const SIGN_UP = { path: "/up", method: "POST" };
const SIGN_IN = { path: "/in", method: "POST" };
const SIGN_OUT = { path: "/out", method: "GET" };
const SIGN_DUPLICATION = { path: "/duplication", method: "POST" };

// adminController
const USER_ADMIN = { path: "/users", method: "GET" };
const UPDATE_USER_ADMIN = { path: "/users/:id/edit", method: "PUT" };
const DELETE_USER_ADMIN = { path: "/users/:id/delete", method: "DELETE" };
const POST_ADMIN = { path: "/posts", method: "GET" };
const DELETE_POST_ADMIN = { path: "/posts/:id/delete", method: "DELETE" };

exports.routesVariables = {
	common: COMMON,
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
	createPost: CREATE_POST,
	readPostEdit: READ_POSTEDIT,
	updatePost: UPDATE_POST,
	deletePost: DELETE_POST,
	signUp: SIGN_UP,
	signIn: SIGN_IN,
	signOut: SIGN_OUT,
	signDuplication: SIGN_DUPLICATION,
	admin: ADMIN,
	userAdmin: USER_ADMIN,
	updateUserAdmin: UPDATE_USER_ADMIN,
	deleteUserAdmin: DELETE_USER_ADMIN,
	postAdmin: POST_ADMIN,
	deletePostAdmin: DELETE_POST_ADMIN,
	search: SEARCH,
};
