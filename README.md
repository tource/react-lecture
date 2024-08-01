# Tailwind CSS

- 비슷한 css 라이브러리
  : BootStrap(https://getbootstrap.kr/)
- 클래스명을 통한 레이아웃 구성, 단 클래스명 중복
- https://tailwindcss.com/docs/installation
- VSCode 플러그인 설치
  : Tailwind CSS IntelliSense
- 참조학습자료
  : https://paullabworkspace.notion.site/Tailwind-CSS-c3aebde0f224435ba615fc12e6abc843

## 1. 설치법 규칙대로

- `npm install -D tailwindcss`
- / 에 tailwind.config.js 파일 생성

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

- /index.css 내용 추가
  : 리액트 어플리케이션에서 tailwindcss 쓰려고

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## 2. 테스트

- /src/App.js

```js
const App = () => {
  return <h1 className="text-3xl font-bold underline">Hello world!</h1>;
};

export default App;
```

## 3. 환경 설정에 대한 이해

- https://tailwindcss.com/docs/configuration
