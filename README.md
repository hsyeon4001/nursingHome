# - 요양원을 위한 웹 애플리케이션 -

# introduction

- 요양원 웹 애플리케이션 제작 프로젝트
- 개발기간 : 2020.09.13 ~ 2020.10.04 (3주)
- 개발인원 : 1인

# demo

- https://youtu.be/SJGSkLNoiFY

# model

![nursinghome_model](https://user-images.githubusercontent.com/56582747/95107176-8130ec80-0774-11eb-83e1-e90a865efd8a.JPG)

# technologies

- HTML, CSS
- Javascript
- Node.js
- MySQL
- Sequelize
- EJS
- multer
- bcrypt
- JWT

# Features

- 회원
  - 회원가입/로그인
    - 회원가입, 회원가입 시 데이터 유효성 검사 및 패스워드 암호화
    - 로그인 시 JWT access token 생성
  - 유저
    - JWT access token 검증 후 페이지 접근
    - 등급(grade) 별 페이지 접근 제한(게시판 페이지, 관리자 페이지)
  - 관리자
    - 회원 목록 조회, 등급 변경 권한 제공
    - 게시글 목록 조회, 게시글 삭제 권한 제공
- 게시글
  - 게시글 작성, 조회, 수정, 삭제 구현
  - 게시글 이미지 첨부 기능 구현
- 메뉴 별 정적 페이지
  - 정적 콘텐츠 제공
  - 네이버 지도 API 사용

---

# Updates

- 20.12.14 게시글 검색 기능 추가
