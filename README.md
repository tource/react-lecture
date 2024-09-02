# Next.js

- [Next.js 레퍼런스](https://nextjs.org/docs/getting-started/installation)

- [NVM](https://jang8584.tistory.com/295)

- Next.js 는 Vercel 회사에 리액트를 기반으로 한 프로젝트 솔루션 입니다.
  : Create-React-App / Vite 로 생성한 프로젝트는 개별 회사가 알아서 package 설치 후 관리
  : 회사마다 모두 프로젝트에 활용한 라이브러리가 다르다.
  : 반면에 Next.js 는 기본 셋팅이 되어져 있고, 추가로 라이브러리 활용이 가능함.

- 참고 사항
  : Next.js 는 Node.js 서버가 있어야 실행이 됩니다.
  : SSR (Server-Side-Redering) 과 CSR (Client-Side-Rendering) 동시에 가능함.  
  : App Router 방식 (최신 - 폴더 기준으로 미리 용도에 맞는 파일이 정해져 있음.)
  : Pages Router 방식 (기존 - 업계에서는 활용중인 방식)

## 프로젝트 생성

- 한글 폴더가 있으면 생성이 안됩니다.
- 샘플프로젝트 경로
  : D > next-sample 폴더 생성
  : `node -v` (20이상)
  : React 18 버전 이상
  : `nvm ls`
  : `npx create-next-app@latest`

## 프로젝트 컨벤션

- Prettier 설치 및 셋팅
  : `npm install prettier eslint-plugin-prettier eslint-config-prettier --dev`

- Pretter 및 ESLint 셋팅
  : `.eslintrc.json` 파일명 변경 `.eslintrc.js`

- vscode 에서의 셋팅도 프로젝트 별도로 관리
  : `/.vsocde` 폴더 생성
  : `/.vscode/settings.json` 생성

```json
{
  "editor.formatOnSave": false,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "eslint.workingDirectories": [
    {
      "mode": "auto"
    }
  ]
}
```

- 프로젝트 실행
  : `npm run dev`

- 참고 사항으로 Node.js 에서 디버깅 메시지 출력됨.

## 프로젝트 폴더 및 파일 구조

- .next 폴더
  : `npm run dev` 명령을 통해 미리보기 하면 생성됨
  : .gitignore 에 명시되어 있으므로 GitHub 제외

- .vscode 폴더
  : 개별 프로젝트마다 vscode 셋팅 관리

- node_modules
  : 프로젝트에 활용되는 라이브러리 관리 폴더
  : package.json 에서 관리

- pages
  : 실제 보여지는 page 파일들
  : 자동으로 패스로 파일이 연결됩니다.
  : 패스에 즉, 라우터에 연결되는 페이지는 소문자.js, 소문자.tsx, 소문자.jsx
  : Pages Router 라고 호칭하게 된 이유
  : `http://localhost:3000/` ==> pages/index.js
  : `http://localhost:3000/todo` ==> pages/todo.js
  : `http://localhost:3000/ceo` ==> pages/ceo.js
  : `http://localhost:3000/ceo/location` ==> pages/ceo/location.js

- pages/api 폴더(너무 신경쓰지 마세요.)
  : API 서버리스 함수 작성 코드 배치 영역
  : 클라이언트에서 직접 호출할 수 있는 API 주소
  : http://localhost:3000/api/hello 시 리턴됨

- `pages/_app.js`
  : 파일 삭제 또는 파일명 변경 하지 않습니다.
  : Next.js 어플리케이션의 커스텀 APP 컴포넌트를 정의하는 곳
  : 모든 페이지에 공통으로 렌더링됨.
  : 전역 스타일 또는 상태관리 로직 추가하는 파일

- `pages/_document.js`
  : Next.js 어플리케이션의 커스터 Document 를 정의하는 곳
  : 서버사이드에서만 렌더링되는 HTML 과 태스를 커스터마이징 할 수 있다.
  : 주로 메타태그, 폰트링크, 초기 CSS 설정 등을 추가할 때 사용.
  : 메타태그는 웹브라우저에서 페이지를 출력시 기본 환경 셋팅 안내 내용

- `pages/index.js`
  : Next.js 어플리케이션의 루트 페이지
  : 홈페이지로서 `/` 경로에 해당함.

- public 폴더
  : 이미지, 폰트 등과 같은 정적 리소스 보관
  : 상대경로로 접근하여 활용함.
  : 웹페이지에서 활용하는 정적 파일은 모두 이곳에 보관함.

- styles 폴더
  : css 파일들을 보관하는 장소
  : 전역스타일, 컴포넌트별 스타일, 페이지 스타일등을 보관

- `styles/globals.css`
  : 전역 CSS

- `styles/Home.module.css`
  : 모듈 CSS

- `.eslintrc.js`
  : ESLint(문법검증도구) 및 Prettier(문서포맷설정도구) 설정 관련

- `.gitignore`
  : gitHub 파일 관리 설정

- `jsconfig.json`
  : VSCode 에서 js 프로젝트를 구성하기 위한 설정 파일

- `next.config.mjs`
  : Next.js 설정 파일.
  : 프로젝트 환경설정
  : 빌드 설정

- `package-lock.json`
  : 라이브러리 의존성 관련 설정
  : 새로 프로젝트 생성시 node_modules 폴더와 함께 삭제한 후 재설정 가능

- package.json
  : 프로젝트 실행 및 설정 관련
  : dependency 및 devDependency
  : 실행 명령

## 페이지 이동(라우터) : Next.js Router

- Next.js 파일라우터 시스템
- pages 폴더는 반드시 존재해야 함.
- pages 폴더의 구조에 따라서 자동으로 라우터가 생성됨.
- pages 의 기본 파일은 소문자로 생성함.

### 기본 라우터

- `주소/` : pages/index.js 출력
- `주소/about` : pages/about.js 출력

### 중첩 라우터

- `주소/blog` : pages/blog/index.js 출력
- `주소/blog/firt-blog` : pages/blog/first-blog.js 출력

### 동적 라우터

- `주소/blog/1` : pages/blog/1.js 출력
- `주소/blog/2` : pages/blog/2.js 출력
- `주소/blog/3` : pages/blog/3.js 출력
- `주소/blog/4` : pages/blog/4.js 출력

- `주소/blog/5` : pages/blog/[id].js 출력

### API 라우터

- API 의 리턴 결과값 출력
- `주소/api/hello` : pages/api/hello.js
- `http://localhost:3000/api/hello`

### 샘플 라우터

- Not Found Page : pages/404.js

```js
const NotFoudPage = () => {
  return <div>주소가 잘못되었습니다.</div>;
};

export default NotFoudPage;
```

- `주소/` : pages/index.js

```js
const Home = () => {
  return <div> 안녕하세요. </div>;
};

export default Home;
```

- `주소/about` : pages/about.js

```js
const About = () => {
  return <div>서비스 소개입니다.</div>;
};

export default About;
```

- `주소/blog` : pages/blog/index.js

```js
const Blog = () => {
  return <div>Blog 첫페이지 입니다.</div>;
};

export default Blog;
```

- `주소/blog/first` : pages/blog/first.js

```js
const First = () => {
  return <div>첫 내용</div>;
};

export default First;
```

- `주소/blog/1` : pages/blog/[id].js
- `주소/blog/2` : pages/blog/[id].js
- `주소/blog/3` : pages/blog/[id].js

```js
import { useRouter } from 'next/router';

const BlogDetail = () => {
  const router = useRouter();
  console.log(router);
  const { id } = router.query;
  return <div> {id} 페이지 입니다.</div>;
};

export default BlogDetail;
```

### 샘플 공통 레이아웃

- `_app.js`
  : 파일 삭제 또는 파일명 변경 하지 않습니다.
  : Next.js 어플리케이션의 커스텀 APP 컴포넌트를 정의하는 곳
  : 모든 페이지에 공통으로 렌더링됨.
  : 전역 스타일 또는 상태관리 로직 추가하는 파일

```js
import '@/styles/globals.css';
import Link from 'next/link';

export default function App({ Component, pageProps }) {
  return (
    <div>
      <header>
        <nav>
          <ul>
            <li>
              <Link href="/">홈</Link>
            </li>
            <li>
              <Link href="/about">소개</Link>
            </li>
            <li>
              <Link href="/blog">블로그</Link>
            </li>
            <li>
              <Link href="/blog/1">블로그/1</Link>
            </li>
            <li>
              <Link href="/blog/2">블로그/2</Link>
            </li>
            <li>
              <Link href="/blog/3">블로그/3</Link>
            </li>
          </ul>
        </nav>
      </header>
      <Component {...pageProps} />
    </div>
  );
}
```

### 샘플 공통 레이아웃 : 컴포넌트 이용

- `components` 폴더 생성
  : `components/Layout.js` 컴포넌트 파일 생성

```js
import Link from 'next/link';
import React from 'react';

const Layout = ({ children }) => {
  return (
    <div>
      <header>
        <nav>
          <ul>
            <li>
              <Link href="/">홈</Link>
            </li>
            <li>
              <Link href="/about">소개</Link>
            </li>
            <li>
              <Link href="/blog">블로그</Link>
            </li>
            <li>
              <Link href="/blog/1">블로그/1</Link>
            </li>
            <li>
              <Link href="/blog/2">블로그/2</Link>
            </li>
            <li>
              <Link href="/blog/3">블로그/3</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>{children}</main>
      <footer>하단</footer>
    </div>
  );
};

export default Layout;
```

- `pages/index.js`

```js
import Layout from '@/components/Layout';
import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
```

### 샘플 페이지별 레이아웃 : 레이아웃 이용

- `layouts` 폴더에 각 페이지별 레이아웃 생성
  : `layouts/BlogLayout.js` 생성

```js
import Link from 'next/link';
import React from 'react';

const BlogLayout = ({ children }) => {
  return (
    <div>
      <header>
        <h1>블로그 레이아웃 </h1>
        <nav>
          <ul>
            <li>
              <Link href="/">홈</Link>
            </li>
            <li>
              <Link href="/about">소개</Link>
            </li>
            <li>
              <Link href="/blog">블로그</Link>
            </li>
            <li>
              <Link href="/blog/1">블로그/1</Link>
            </li>
            <li>
              <Link href="/blog/2">블로그/2</Link>
            </li>
            <li>
              <Link href="/blog/3">블로그/3</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>{children}</main>
      <footer>하단</footer>
    </div>
  );
};

export default BlogLayout;
```

: `layouts/CommonLayout.js` 생성

```js
import Link from 'next/link';
import React from 'react';

const CommonLayout = ({ children }) => {
  return (
    <div>
      <header>
        <h1>일반 레이아웃 </h1>
        <nav>
          <ul>
            <li>
              <Link href="/">홈</Link>
            </li>
            <li>
              <Link href="/about">소개</Link>
            </li>
            <li>
              <Link href="/blog">블로그</Link>
            </li>
            <li>
              <Link href="/blog/1">블로그/1</Link>
            </li>
            <li>
              <Link href="/blog/2">블로그/2</Link>
            </li>
            <li>
              <Link href="/blog/3">블로그/3</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>{children}</main>
      <footer>하단</footer>
    </div>
  );
};

export default CommonLayout;
```

- index.js 적용

```js
import CommonLayout from '@/layouts/CommonLayout';
import React from 'react';

const Home = () => {
  return <div> 안녕하세요. </div>;
};

export default Home;

Home.getLayout = function getLayout(page) {
  return <CommonLayout>{page}</CommonLayout>;
};
```

- about.js 적용

```js
import CommonLayout from '@/layouts/CommonLayout';

const About = () => {
  return <div>서비스 소개입니다.</div>;
};

export default About;

About.getLayout = function getLayout(page) {
  return <CommonLayout>{page}</CommonLayout>;
};
```

- 404.js 적용

```js
import CommonLayout from '@/layouts/CommonLayout';

const NotFoudPage = () => {
  return <div>주소가 잘못되었습니다.</div>;
};

export default NotFoudPage;

NotFoudPage.getLayout = function getLayout(page) {
  return <CommonLayout>{page}</CommonLayout>;
};
```

- blog/index.js

```js
import BlogLayout from '@/layouts/BlogLayout';

const Blog = () => {
  return <div>Blog 첫페이지 입니다.</div>;
};

export default Blog;
Blog.getLayout = function getLayout(page) {
  return <BlogLayout>{page}</BlogLayout>;
};
```

- blog/first.js

```js
import BlogLayout from '@/layouts/BlogLayout';

const First = () => {
  return <div>첫 내용</div>;
};

export default First;

First.getLayout = function getLayout(page) {
  return <BlogLayout>{page}</BlogLayout>;
};
```

- blog/[id].js

```js
import BlogLayout from '@/layouts/BlogLayout';
import { useRouter } from 'next/router';

const BlogDetail = () => {
  const router = useRouter();
  // console.log(router);
  const { id } = router.query;
  return <div> {id} 페이지 입니다.</div>;
};

export default BlogDetail;

BlogDetail.getLayout = function getLayout(page) {
  return <BlogLayout>{page}</BlogLayout>;
};
```

- `_app.js` 적용

```js
import Layout from '@/components/Layout';
import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
  // 컴포넌트에서 기능을 가져옴
  const getLayout = Component.getLayout ?? (page => page);
  // 화면에 그리기
  return getLayout(<Component {...pageProps} />);
}
```
