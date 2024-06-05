# 회원기능

## 1. form태그의 이해 및 활용

### 1.1. 컴포넌트 생성

- /src/pages/member/test.html

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>회원가입</title>
  </head>
  <body>
    <h1>입력양식(Form)</h1>
    <h2>회원가입</h2>
    <div class="join-wrap">
      <form action="/member/join.php" method="get">
        <label for="email">email</label>
        <input type="text" id="email" name="email" class="email" />
      </form>
    </div>
  </body>
</html>
```

## 2. 회원가입

- /src/pages/member/Join.js

## 3. 회원로그인

## 4. 회원정보수정
