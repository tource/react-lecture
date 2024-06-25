# CSS

## 1. link css 방식(외부파일)

### 1.1. 최초 css 관련 초기 설정 적용

- normalize.css : https://necolas.github.io/normalize.css/
- reset.css : https://meyerweb.com/eric/tools/css/reset/
- cdn 방식
  : public/index.html 에 작성

  ```html
  <!doctype html>
  <html lang="ko">
    <head>
      <meta charset="utf-8" />
      <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />
      <meta
        name="description"
        content="Web site created using create-react-app"
      />
      <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
      <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
      <title>리액트 학습</title>
      <link
        rel="stylesheet"
        href="https://necolas.github.io/normalize.css/8.0.1/normalize.css"
      />
    </head>
    <body>
      <noscript>You need to enable JavaScript to run this app.</noscript>
      <div id="root"></div>
    </body>
  </html>
  ```

  - 참고사항 (폰트어썸)
    : https://cdnjs.com/libraries/font-awesome

  ```html
  <!doctype html>
  <html lang="ko">
    <head>
      <meta charset="utf-8" />
      <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />
      <meta
        name="description"
        content="Web site created using create-react-app"
      />
      <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
      <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
      <title>리액트 학습</title>
      <link
        rel="stylesheet"
        href="https://necolas.github.io/normalize.css/8.0.1/normalize.css"
      />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
      />
    </head>
    <body>
      <noscript>You need to enable JavaScript to run this app.</noscript>
      <div id="root"></div>
    </body>
  </html>
  ```

### 1.2. 앱 전체 css 초기화 파일

- src/index.css 를 권장함.

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
ul,
li {
  list-style: none;
}
a {
  text-decoration: none;
  color: #000;
}
img {
  vertical-align: middle;
}
html {
  font-size: 12px;
}
body {
  font-family: "Noto Sans KR", sans-serif;
  letter-spacing: 0.25;
  font-weight: 400;
  word-break: keep-all;
}
```

- src/index.js 에서 css 파일 적용
  : `import "./index.css";`
  : ./ 는 현재 폴더를 말함.

- 앱에 특성화된 css 기초 내용(권장 사항 회사마다 다름)
  : src/App.css
  : src/App.js 에 `import "./App.css";`

### 1.3. JSX 에 css 적용시

- `<div className="클래스명">내용</div>`

## 2. module css 방식(외부파일)

- module 방식은 협업시에 class 명 및 css 선택자가 우선권 문제를 해결하기 위해서
- header.css 와 App.css 가 충돌나는 샘플
- Header.js

```js
import "../../css/header.css";

export const Header = ({ login }) => {
  console.log("Header Header Header");
  return (
    <header className="header">{login ? "정보수정" : "로그인필요"}</header>
  );
};
```

- header.css

```css
.active-link {
  color: red;
  font-weight: bold;
}
.header {
  background-color: green;
}
```

- App.css

```css
.header {
  background-color: orange;
}
```

- 위의 방식으로 진행시 어느 css 가 우선권일지 고민된다.
  : 이에 대한 해결책으로 module 방식이 활용됨.
  : css/header.module.css
  : 파일명의 확장자 앞에 .module 을 붙여줌

```css
.active-link {
  color: red;
  font-weight: bold;
}
.header {
  background-color: green;
}
```

- Header.js

```js
// import "../../css/header.css";
import 이름 from "../../css/header.module.css";

export const Header = ({ login }) => {
  console.log("Header Header Header");
  return (
    <header className={이름.header}>{login ? "정보수정" : "로그인필요"}</header>
  );
};
```

## 3. SCSS 방식

- 설치
  : `npm i -D sass`
  : 플로그인 Live Sass Complier
- 기본적인 폴더 구조
  : src/scss 폴더

### 3.1. css 파일 생성

- css 파일과 map 파일이 생성됨
- 일반적인 css 역할과 같다.
  : `src/scss/main.scss`

### 3.2. css 프로그래밍 적용

- `파일명에 _를 붙여서 생성`
  : `src/scss/_valiables.scss`
  ```scss
  $wide-screen: 2028px;
  $pc-screen: 1280px;
  $notebook-screen: 1020px;
  $tablet-screen: 960px;
  $mobile-screen: 760px;
  $min-mobile-screen: 480px;
  $main-color: "red";
  ```

### 3.3. scss 에 변수활용

- 중요한 것은 `@import "파일이름"`
- `_는 제외`

```scss
@import "valiables";
.wrap {
  position: relative;
  background: $main-color;
}
@media screen and (max-width: $wide-screen) {
  .wrap {
    background: orange;
  }
}
```

### 3.4. scss 에 함수활용(MixIn)

- `src/scss/_mixin.scss`

```scss
@mixin bt($cc) {
  border: 5px solid $cc;
}
```

- 활용하기

```scss
@import "mixin";
.wrap {
  position: relative;
  background: $main-color;
  .header button {
    @include bt(blue);
  }
}
```

## 4. 객체 css inline 방식 ( {속성명:속성값} )

```js
<div className="wrap" style={{ backgroundColor: "red", fontSize: "12px" }}>
  <Home />
</div>
```

```js
// 객체 변수 설정을 해서 활용을 추천
const WrapStyle = { backgroundColor: "red", fontSize: "12px" };
return (
  <div className="wrap" style={WrapStyle}>
    <Home />
  </div>
);
```

- 외부 파일로 CSS 객체 모음
  : src/css/AppCss.js

```js
export const WrapStyle = { backgroundColor: "red", fontSize: "12px" };
export const DivStyle = { backgroundColor: "red", fontSize: "12px" };
```

```js
import { Home } from "./pages/Home";
import "./App.css";
import { WrapStyle, DivStyle } from "./css/AppCss";
const App = () => {
  // js 자리
  return (
    <div className="wrap" style={WrapStyle}>
      <Home />
    </div>
  );
};

export default App;
```

## 5. CSS-in-JS css 방식(emotion)

### 5.1. 설치

- `npm i @emotion/react @emotion/styled`

### 5.2. 플러그인

- vscode-styled-components

### 5.3. 왜 CSS-in-JS 를 쓰는가?

- HTML 태그 만으로는 역할을 설명하지 못한다.

```html
<div>슬라이드</div>
<div>게시판</div>
<div>공지사항</div>
```

- styled 적용시 태그를 만들면서 내용을 표현할 수 있다.

```html
<SlideDiv>슬라이드</SlideDiv>
<BoardDiv>게시판</BoardDiv>
<NoticeDiv>공지사항</NoticeDiv>
```

- 클래스 만으로는 레이아웃을 구분하기 어렵다.

```html
<div className="slide">슬라이드</div>
<div className="board">게시판</div>
<div className="notice">공지사항</div>
```

- styled 적용시 css 표현을 포함한다.

```html
<SlideDiv>슬라이드</SlideDiv>
<BoardDiv>게시판</BoardDiv>
<NoticeDiv>공지사항</NoticeDiv>
```

### 5.4. 태그에 의미 부여한 방식으로 변경

```js
export const Header = ({ login }) => {
  return (
    <header>
      <div className="logo"></div>
      <div className="gnb">
        <nav className="menu"></nav>
      </div>
      <div className="member"></div>
    </header>
  );
};
```

```js
import styled from "@emotion/styled";

export const Header = ({ login }) => {
  const LogoDiv = styled.div``;
  const GnbDiv = styled.div``;
  const MemberDiv = styled.div``;
  const HomeBt = styled.a``;
  return (
    <header>
      <LogoDiv className="logo">
        <HomeBt href="http://www.naver.com">네이버</HomeBt>
      </LogoDiv>
      <GnbDiv className="gnb">
        <nav className="menu"></nav>
      </GnbDiv>
      <MemberDiv className="member"></MemberDiv>
    </header>
  );
};
```

### 5.5. CSS 도 함께 적용하기

```js
import styled from "@emotion/styled";

export const Header = ({ login }) => {
  const LogoDiv = styled.div`
    background-color: red;
    width: 80%;
    margin: 0 auto;
    border: 5px solid red;
  `;
  const GnbDiv = styled.div`
    width: 80%;
    nav {
      background-color: yellow;
    }
  `;
  const MemberDiv = styled.div``;
  const HomeBt = styled.a``;
  return (
    <header>
      <LogoDiv>
        <HomeBt href="http://www.naver.com">네이버</HomeBt>
      </LogoDiv>
      <GnbDiv>
        <nav className="menu"></nav>
      </GnbDiv>
      <MemberDiv className="member"></MemberDiv>
    </header>
  );
};
```

### 5.6. Props 전달하기

```js
<LogoDiv bg={"yellow"} w={200} h={300} visible={false}>
  <HomeBt href="http://www.naver.com">네이버</HomeBt>
</LogoDiv>
```

```js
const LogoDiv = styled.div`
  background-color: ${props.bg};
  width: ${props.w}px;
  height: ${props.h}px;
  visibility: ${props.visible ? "visible" : "hidden"};
  margin: 0 auto;
  border: 5px solid red;
`;
```

### 5.7. 외부파일로 라이브러리 형태로 제공
