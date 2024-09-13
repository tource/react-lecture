# Vue

- [레퍼런스](https://vuejs.org/)
- Vue3 기준의 options 방식(최신)

## 환경셋팅

- Vue CLI 설치
  : `npm install -g @vue/cli`
  : `vue --version`

- VSCode 셋팅
  : Vue 3 Snippets
  : Vue VSCode Snippets
  : Volar Labs (Vue3 전용)
  : Vue - Official

- Vue Devtools 설치
  : https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd?pli=1

## 프로젝트 생성전 yarn 버전의 문제(! 주의 사항)

- `yarn --version`
  : 결과가 4.4.x 최신버전이라고 출력이 되면
  : `vue create teset` 명령으로 생성 하지 않는다.
  : `vue create test --packageManager npm` (강제로 npm으로 프로젝트 생성)

## 프로젝트 생성

- `vue create 프로젝트명`
  : `vue create test`

- yarn 2 가 설치된 경우  
  : `yarn --version`
  : `vue create test --packageManager npm`

- 실행
  : `npm run serve` 또는 `yarn serve`

## 문법

### 1. 템플릿 문법

```vue
<template>.....</template>
```

- App.vue

```vue
<template>
  <div>{{ message }}</div>
  <div>
    <!-- 문자열 출력 -->
    사용자 이름은 <strong>{{ name }} 입니다.</strong>
  </div>
  <div>
    <!-- 숫자형 출력 -->
    사용자 나이는 <strong>{{ age }} 입니다.</strong>
  </div>
  <div>
    <!-- html 태그 출력 -->
    {{ tag }}
    <p v-html="tag"></p>
  </div>
  <div>
    <!-- css 클래스 적용하기 -->
    {{ bgColor }}
    <p v-bind:class="bgColor">배경색을 빨강으로 적용함</p>
    <!-- 축약형 -->
    <p :class="bgColor">배경색을 빨강으로 적용함</p>
  </div>
  <div>
    <!-- 조건문 사용하기 -->
    <p v-if="visible">보이시나요?</p>
    <p v-if="unvisible">보이시나요?</p>
  </div>
  <div>
    <!-- 조건문 사용하기 -->
    <p v-show="condition">컨디션(display:none/block) 활용이에요.</p>
    <p v-show="!condition">컨디션(display:none/block) 활용이에요.</p>
  </div>
  <div>
    <!-- 반복문 : 배열인 경우 -->
    <ul>
      <li v-for="(con, index) in country" :key="index">
        <p>순서번호: {{ index }}</p>
        <p>내용출력: {{ con }}</p>
      </li>
    </ul>
  </div>

  <hr />

  <div>
    <!-- 반복문: 객체리터럴인 경우  -->
    <ul>
      <li v-for="(value, key, index) in user" :key="index">
        <p>index : {{ index }}</p>
        <p>key : {{ key }}</p>
        <p>value: {{ value }}</p>
      </li>
    </ul>
  </div>

  <hr />
  <div>
    <!-- 출력이 가능한 js 는 작성 가능 -->
    <p>{{ 10 * 20 * 30 }}</p>
    <ul>
      <li v-for="(con, index) in country" :key="index">
        <p>순서번호: {{ index }}</p>
        <p>내용출력: {{ con.toUpperCase() }}</p>
      </li>
    </ul>
  </div>

  <div>
    <!-- 이벤트 바인딩 -->
    <button v-on:click="handleClick">클릭하세요.</button>
    <button @click="handleClick">클릭하세요.</button>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},

  // 이벤트 연결될 함수
  methods: {
    handleClick() {
      alert("hello");
    },
  },

  // 출력할 데이터
  data() {
    return {
      message: "Hello World",
      name: "홍길동",
      age: 18,
      tag: "<h1>Hello는 반가워에요</h1>",
      visible: true,
      unvisible: false,
      condition: false,
      country: ["kr", "en", "jp"],
      user: {
        name: "박길동",
        age: 20,
        gender: "female",
      },
      bgColor: "red-bg",
    };
  },
};
</script>

<style src="./styles/style.css"></style>
<style>
.red-bg {
  background-color: red;
}
</style>
```

- 위의 코드에서 v- 시작하는 부분은 Directives (지시자) 라고 합니다.
- 데이터를 연결하는 데이터 바인딩 또는 이벤트 처리를 도와주는 문법입니다.
  : `v-bind` (html 템플릿에 데이터를 연결해서 표현할 때 활용, 축약형은 `:` 입니다.)
  : `v-if, v-else-if, v-else` (조건에 따라서 html 템플릿에 랜더링 결정하는 지시자)
  : `v-show` (html 템플릿에 `display:none` 랜더링 지시자)
  : `v-for` (리스트나 배열, 객체를 반복 랜더링할 때 활용하는 지시자)
  : `v-on` (기본 이벤트(click) 및 사용자 지정 이벤트 등록 지사자 `v-on:click="handleClick"`)
  : `@` (기본 이벤트 축약형 등록 지사자 `@click="handleClick"`)

### 2. 양방향 바인딩 (`v-model`)

- 주로 form 태그에서 활용을 합니다.

```vue
<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <label>Name : </label>
      <input type="text" id="name" v-model="name" />
      <p>입력된 Name : {{ name }} 입니다.</p>
    </div>
    <div>
      <label>나이 : </label>
      <input type="number" v-model="age" @input="handleAge" />
      <p>입력중 메세지 : {{ ageMessage }}</p>
    </div>
    <div>
      <label> 동의여부 : </label>
      <input type="checkbox" v-model="checked" />
      <p>체크박스 여부 : {{ checked ? "동의" : "미동의" }}</p>
    </div>
    <div>
      <label>
        옵션 1 : <input type="radio" value="a" v-model="picked" />
      </label>
      <label>
        옵션 2 : <input type="radio" value="b" v-model="picked" />
      </label>
      <p>선택된 옵션 : {{ picked }}</p>
    </div>
    <div>
      <label>국가 선택 : </label>
      <select v-model="country">
        <option disabled value="">하나의 국가를 선택하시오.</option>
        <option>한국</option>
        <option>미국</option>
        <option>일본</option>
      </select>
      <p>선택된 국가 : {{ country }}</p>
    </div>
    <div>
      <label>기타의견:</label>
      <textarea v-model="message"></textarea>
      <p>입력된 기타 의견 : {{ message }}</p>
    </div>

    <div>
      <label>첨부파일 : </label>
      <!-- 파일은 change 이벤트 입니다. -->
      <input type="file" @change="handleFile" />
      <p>첨부된 파일 : {{ fileName }}</p>
    </div>

    <div>
      <button type="submit">입력</button>
      <p>입력된 데이터 : {{ sendData }}</p>
    </div>
  </form>
</template>

<script>
export default {
  name: "App",
  components: {},
  // 이벤트 연결될 함수
  methods: {
    handleSubmit() {
      console.log(
        this.name,
        this.checked,
        this.picked,
        this.country,
        this.message,
      );
      this.sendData = `이름은 ${this.name} 이고 국가는 ${this.country} 입니다.`;
    },
    handleAge() {
      console.log(this.age);
      if (this.age < 18) {
        this.ageMessage = "성인이 아닙니다.";
      } else {
        this.ageMessage = "성인이시네요.";
      }
    },

    handleFile(event) {
      const file = event.target.files[0];
      if (file) {
        this.fileName = file.name;
      }
    },
  },
  // 출력할 데이터
  data() {
    return {
      name: "",
      age: 0,
      ageMessage: "",
      checked: false,
      picked: "",
      country: "",
      message: "",
      sendData: "",
      fileName: "",
    };
  },
};
</script>

<style src="./styles/style.css"></style>
<style>
.red-bg {
  background-color: red;
}
</style>
```

### 3. 컴포넌트 만들기

- SFC 라는 단어가 있습니다. (Single File Component)
- 추천 폴더는 components 폴더 생성후 배치
- Vue 에서는 컴퍼넌트 파일은 반드시 CamelCase 단어 2개이상 연결해서 만들어야 합니다.

### 3.1. 샘플 (`/src/components/HeaderComponent.vue`)

```vue
<template>
  <h1>사용자등록</h1>
</template>
<script>
export default {
  name: "HeaderComponent",
  methods: {},
  data() {},
};
</script>
<style></style>
```

### 3.2. 활용(배치)

- App.vue

```vue
<template>
  <HeaderComponent />
  <FormComponent />
</template>

<script>
import HeaderComponent from "@/components/HeaderComponent.vue";
import FormComponent from "@/components/FormComponent.vue";
export default {
  name: "App",
  components: { HeaderComponent, FormComponent },
  // 이벤트 연결될 함수
  methods: {},
  // 출력할 데이터
  data() {
    return {};
  },
};
</script>
<style></style>
```

### 3.3. props

- 컴포넌트의 사용자 속성
- HeaderComponent.vue

```vue
<template>
  <h1>{{ name }} 사용자님 {{ age }} 등록</h1>
</template>
<script>
export default {
  props: ["name", "age"],

  name: "HeaderComponent",
  methods: {},
  data() {},
};
</script>
<style></style>
```

- App.vue

```vue
<template>
  <HeaderComponent name="홍길동" age="20" />
  <FormComponent />
</template>
```

### 3.4. props에 데이터형 전달하기

- 기본은 문자열
- name 은 문자형
- age 는 숫자형

```vue
<HeaderComponent v-bind:name="`홍길동`" v-bind:age="20" />
<HeaderComponent :name="`홍길동`" :age="20" />
```

- userInfo 는 객체형

```vue
<template>
  <HeaderComponent
    v-bind:name="`홍길동`"
    v-bind:age="20"
    v-bind:user="userInfo"
  />
  <FormComponent />
</template>

..... data() { return { userInfo: { country: "KR", count: 5, }, }; },
```

```vue
<template>
  <h1>{{ name }} 사용자님 {{ age }} 등록 {{ user.country }}</h1>
</template>

<script>
export default {
  name: "HeaderComponent",
  //   유효성 검사까지 포함
  props: {
    name: {
      type: String,
    },
    age: {
      type: Number,
    },
    user: {
      type: Object,
      default: () => {
        return {
          country: "",
          count: 0,
        };
      },
    },
  },
  methods: {},
  data() {
    return {};
  },
};
</script>

<style></style>
```

### 3.5. props로 이벤트 함수 전달하기

```vue
<template>
  <HeaderComponent
    v-bind:name="`홍길동`"
    v-bind:age="20"
    :user="userInfo"
    @handleClick="handleClick"
  />
  <FormComponent />
</template>

<script>
import HeaderComponent from "@/components/HeaderComponent.vue";
import FormComponent from "@/components/FormComponent.vue";
export default {
  name: "App",
  components: { HeaderComponent, FormComponent },
  // 이벤트 연결될 함수
  methods: {
    handleClick() {
      alert("안녕하세요.");
    },
  },
  // 출력할 데이터
  data() {
    return {
      userInfo: {
        country: "KR",
        count: 5,
      },
    };
  },
};
</script>
<style></style>
```

```vue
<template>
  <!-- 인라인 이벤트 방식 -->
  <h1 @click="$emit('handleClick')">
    {{ name }} 사용자님 {{ age }} 등록 {{ user.country }}
  </h1>
  <button @click="handleBtClick">추천합니다.</button>
</template>

<script>
export default {
  name: "HeaderComponent",
  //   유효성 검사까지 포함
  props: {
    name: {
      type: String,
    },
    age: {
      type: Number,
    },
    user: {
      type: Object,
      default: () => {
        return {
          country: "",
          count: 0,
        };
      },
    },
  },
  methods: {
    // 이벤트 핸들러 방식
    handleBtClick() {
      this.$emit("handleClick");
    },
  },
  data() {
    return {};
  },
};
</script>

<style></style>
```

### 3.6. props 로 전달된 이벤트 함수에 매개변수 전달하기

```vue
<template>
  <HeaderComponent
    v-bind:name="`홍길동`"
    v-bind:age="20"
    :user="userInfo"
    @handleClick="handleClick"
    @handleClickArg="handleClickArg"
  />
  <FormComponent />
</template>

<script>
import HeaderComponent from "@/components/HeaderComponent.vue";
import FormComponent from "@/components/FormComponent.vue";
export default {
  name: "App",
  components: { HeaderComponent, FormComponent },
  // 이벤트 연결될 함수
  methods: {
    handleClick() {
      alert("안녕하세요.");
    },
    handleClickArg(a, b) {
      alert(`${a}/${b}`);
    },
  },
  // 출력할 데이터
  data() {
    return {
      userInfo: {
        country: "KR",
        count: 5,
      },
    };
  },
};
</script>
<style></style>
```

```vue
<template>
  <!-- 인라인 이벤트 방식 -->
  <h1 @click="$emit('handleClick')">
    {{ name }} 사용자님 {{ age }} 등록 {{ user.country }}
  </h1>
  <button @click="handleBtClick">추천합니다.</button>
</template>

<script>
export default {
  name: "HeaderComponent",
  //   유효성 검사까지 포함
  props: {
    name: {
      type: String,
    },
    age: {
      type: Number,
    },
    user: {
      type: Object,
      default: () => {
        return {
          country: "",
          count: 0,
        };
      },
    },
  },
  methods: {
    // 이벤트 핸들러 방식
    handleBtClick() {
      this.$emit("handleClickArg", 100, "안녕");
    },
  },
  data() {
    return {};
  },
};
</script>

<style></style>
```

## 4. css

### 4.1. 전체 css 적용

: global.css

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  outline-style: none;
}
ul,
li {
  list-style: none;
}
a {
  color: #000;
  text-decoration: none;
}
html {
}
body {
  background: #eaeaea;
}
```

- main.js

```js
import { createApp } from "vue";
import App from "./App.vue";
// import 를 이용한 css 불러들이기
import "./styles/global.css";
createApp(App).mount("#app");
```

### 4.2. 컴포넌트에 css 적용하기

: 주의 사항으로 <template> </template> 안쪽은 html 태그 입니다.
: class 를 적용시 className 이 아닙니다.
: class 는 class 로 작성합니다.

```vue
<template>
  <!-- 인라인 이벤트 방식 -->
  <h1 class="box" @click="$emit('handleClick')">
    {{ name }} 사용자님 {{ age }} 등록 {{ user.country }}
  </h1>
  <button @click="handleBtClick">추천합니다.</button>
</template>

<style>
.box {
  background: red;
}
</style>
```

### 4.3. 컴포넌트에 지역 css 적용하기

: React 에서는 파일명.module.css 였습니다.
: Vue 에서는 scoped 를 적용합니다.

```vue
<template>
  <!-- 인라인 이벤트 방식 -->
  <h1 class="box" @click="$emit('handleClick')">
    {{ name }} 사용자님 {{ age }} 등록 {{ user.country }}
  </h1>
  <button @click="handleBtClick">추천합니다.</button>
</template>

<style scoped>
.box {
  background: red;
}
</style>
```

### 4.4. 동적으로 인라인 style 적용하기

```vue
<template>
  <!-- 인라인 이벤트 방식 -->
  <h1 class="box" @click="$emit('handleClick')">
    {{ name }} 사용자님 {{ age }} 등록 {{ user.country }}
  </h1>
  <button
    :style="{ color: textColor, fontSize: fontSize + 'px' }"
    @click="handleBtClick"
  >
    추천합니다.
  </button>
</template>

<script>
export default {
  name: "HeaderComponent",
  //   유효성 검사까지 포함
  props: {
    name: {
      type: String,
    },
    age: {
      type: Number,
    },
    user: {
      type: Object,
      default: () => {
        return {
          country: "",
          count: 0,
        };
      },
    },
  },
  methods: {
    // 이벤트 핸들러 방식
    handleBtClick() {
      this.$emit("handleClickArg", 100, "안녕");
    },
  },
  data() {
    return {
      textColor: "blue",
      fontSize: 24,
    };
  },
};
</script>

<style scoped>
.box {
  background: red;
}
</style>
```

### 4.5. 배열 형태의 동적 인라인 style 적용하기

```vue
<template>
  <!-- 인라인 이벤트 방식 -->
  <h1 class="box" @click="$emit('handleClick')">
    {{ name }} 사용자님 {{ age }} 등록 {{ user.country }}
  </h1>
  <!-- 동적 인라인 css  -->
  <button
    :style="{ color: textColor, fontSize: fontSize + 'px' }"
    @click="handleBtClick"
  >
    추천합니다.
  </button>
  <!-- 배열 형태의 인라인 css -->
  <button :style="[btStyle, btFontSize]" @click="handleBtClick">
    추천합니다.
  </button>
</template>

<script>
export default {
  name: "HeaderComponent",
  //   유효성 검사까지 포함
  props: {
    name: {
      type: String,
    },
    age: {
      type: Number,
    },
    user: {
      type: Object,
      default: () => {
        return {
          country: "",
          count: 0,
        };
      },
    },
  },
  methods: {
    // 이벤트 핸들러 방식
    handleBtClick() {
      this.$emit("handleClickArg", 100, "안녕");
    },
  },
  data() {
    return {
      textColor: "blue",
      fontSize: 24,
      // 배열 형태의 css 데이터
      btStyle: { color: "red" },
      btFontSize: { fontSize: "20px" },
    };
  },
};
</script>

<style scoped>
.box {
  background: red;
}
</style>
```

### 4.6. SCSS 적용하기

- `npm install -D sass-loader@^10 sass`

```vue
<template>
  <!-- SCSS css 방식 -->
  <div class="box-wrap">
    <!-- 인라인 이벤트 방식 -->
    <h1 class="box" @click="$emit('handleClick')">
      {{ name }} 사용자님 {{ age }} 등록 {{ user.country }}
    </h1>
    <!-- 동적 인라인 css  -->
    <button
      :style="{ color: textColor, fontSize: fontSize + 'px' }"
      @click="handleBtClick"
    >
      추천합니다.
    </button>
    <!-- 배열 형태의 인라인 css -->
    <button :style="[btStyle, btFontSize]" @click="handleBtClick">
      추천합니다.
    </button>
  </div>
</template>

<script>
export default {
  name: "HeaderComponent",
  //   유효성 검사까지 포함
  props: {
    name: {
      type: String,
    },
    age: {
      type: Number,
    },
    user: {
      type: Object,
      default: () => {
        return {
          country: "",
          count: 0,
        };
      },
    },
  },
  methods: {
    // 이벤트 핸들러 방식
    handleBtClick() {
      this.$emit("handleClickArg", 100, "안녕");
    },
  },
  data() {
    return {
      textColor: "blue",
      fontSize: 24,
      // 배열 형태의 css 데이터
      btStyle: { color: "red" },
      btFontSize: { fontSize: "20px" },
    };
  },
};
</script>

<style scoped>
.box {
  background: red;
}
</style>
<!-- SCSS  -->
<style lang="scss" scoped>
.box-wrap {
  border: 5px solid red;
  padding: 5px;
}
</style>
```

## 5. router

- https://router.vuejs.org/
- `npm install vue-router@4`

### 5.1. 기본 설정

- `/src/router` 폴더생성
- `/src/router/index.js` 파일생성
- 화면 단위는 보통 `/src/views` 폴더 생성
- /src/views/HomeView.vue

```vue
<template>
  <div>
    <h1>Home Page</h1>
    <p>첫페이지입니다.</p>
  </div>
</template>

<script>
export default {
  name: "HomeView",
};
</script>

<style></style>
```

- /src/views/AboutView.vue

```vue
<template>
  <div>
    <h1>About Page</h1>
    <p>소개 페이지입니다.</p>
  </div>
</template>

<script>
export default {
  name: "AboutView",
};
</script>

<style></style>
```

### 5.2. 라우터 설정

- /src/router/index.js

```js
import { createMemoryHistory, createRouter } from "vue-router";

import HomeView from "@/views/HomeView.vue";
import AboutView from "@/views/AboutView.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/about", component: AboutView },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
```

### 5.3. 라우터 사용

- src/main.js

```js
import { createApp } from "vue";
import App from "./App.vue";
// import 를 이용한 css 불러들이기
import "./styles/global.css";
// 라우터 사용
import router from "./router/index.js";
// 코드 변경
// createApp(App).use(router).mount("#app");
const app = createApp(App);
app.use(router); // 라우터 사용
app.mount("#app");
```

- src/App.vue

```vue
<template>
  <div>
    <!-- 라우터 링크걸기 -->
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
    </nav>
  </div>
  <div>
    <!-- 라우터 내용 보여주기 -->
    <router-view></router-view>
  </div>
</template>

<script></script>

<style></style>
```

### 5.4. 동적 라우터 사용

- /src/veiws/UserView.vue

```vue
<template>
  <div>
    <h1>User Page</h1>
    <!-- 동적 데이터 출력 -->
    <p>{{ $route.params.id }}사용자 페이지입니다.</p>
  </div>
</template>

<script>
export default {
  name: "UserView",
};
</script>

<style></style>
```

- /src/router/index.js

```js
import { createMemoryHistory, createRouter } from "vue-router";

import HomeView from "@/views/HomeView.vue";
import AboutView from "@/views/AboutView.vue";
import UserView from "@/views/UserView.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/about", component: AboutView },
  // 동적 라우터
  { path: "/user/:id", component: UserView },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
```

- /src/App.vue

```vue
<template>
  <div>
    <!-- 라우터 링크걸기 -->
    <nav>
      <router-link to="/">Home</router-link>
      |
      <router-link to="/about">About</router-link>
      |
      <router-link to="/user/1">사용자 1</router-link>
      |
      <router-link to="/user/2">사용자 2</router-link>
      |
      <router-link to="/user/3">사용자 3</router-link>
    </nav>
  </div>
  <div>
    <!-- 라우터 내용 보여주기 -->
    <router-view></router-view>
  </div>
</template>

<script></script>

<style></style>
```

## 6. axios

- `npm i axios`
- `/src/api/` 폴더
- `/src/api/index.js` 파일 생성

```js
import axios from "axios";

const getUser = async () => {
  try {
    const res = await axios.get("https://jsonplaceholder.typicode.com/users");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export { getUser };
```

- `/src/views/HomeView.vue`

```vue
<template>
  <div>
    <h1>Home Page</h1>
    <p>첫페이지입니다.</p>
    <ul>
      <li v-for="user in users" :key="user.id">
        {{ user.id }} : {{ user.name }} : {{ user.username }}
      </li>
    </ul>
  </div>
</template>

<script>
import { getUser } from "@/api";
export default {
  name: "HomeView",
  data() {
    return {
      users: [], // API 에서 사용자 데이터 불러옴
    };
  },
  async mounted() {
    try {
      this.users = await getUser();
      console.log(this.users);
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style></style>
```

## 7. Vuex (상태관리도구)

- Vue 의 공식 상태 관리 도구
- https://vuex.vuejs.org/
- `npm install vuex@next --save`

### 7.1. Vuex 환경설정

- `/src/stores` 폴더 생성
- `/src/stores/index.js` 파일 생성

```js
import { createStore } from "vuex";

// 전역 저장소 생성
const store = createStore({
  // 전역 상태 데이터
  state: {
    count: 0, // 초기값
  },

  // 데이터 읽기
  getters: {
    getCount(state) {
      return state.count;
    },
  },

  // 데이터 변경
  mutations: {
    add(state, value) {
      state.count = state.count + value;
    },
    minus(state, value) {
      state.count = state.count - value;
    },
  },

  // 비동기 처리
  actions: {},
});

export default store;
```

- `/src/main.js`

```js
import { createApp } from "vue";
import App from "./App.vue";
// import 를 이용한 css 불러들이기
import "./styles/global.css";
// 라우터 사용
import router from "./router/index.js";
// vuex 사용
import store from "./stores/index.js";
// 코드 변경
// createApp(App).use(router).mount("#app");
const app = createApp(App);
app.use(router); // 라우터 사용
app.use(store); // vuex 사용
app.mount("#app");
```

### 7.2. Vuex 활용

- `/src/views/AboutView.vue`

```vue
<template>
  <div>
    <h1>About Page</h1>
    <p>소개 페이지입니다.</p>
    <p>Vuex state 의 counter : {{ getCount }}</p>
    <p>
      <button v-on:click="add(100)">증가</button>
      <button @click="minus(8)">감소</button>
    </p>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "AboutView",
  // 데이터를 계산해서 결과를 갱신함.
  computed: {
    // state 읽기
    ...mapGetters(["getCount"]),
  },
  methods: {
    // state 갱신
    ...mapMutations(["add", "minus"]),
  },
};
</script>

<style></style>
```

## 8. 빌드

- `npm run build`
