# Ant Design

- 알리바바
- 장점
  : UI 레이아웃 통일,
  : UI 코딩 및 CSS 작업 절약
  : 주로 관리자 웹서비스에 많이 활용
- 단점
  : UI CSS 수정이 어렵다.
  : 각 컴포넌트 사용법을 숙지하는 시간
- 학습법
  : 필요할때 하나씩 정리하시길 권장
  : 예) 사용자 별기능, 체크박스, 펼침, 버튼 인경우..

- https://ant.design/components/overview/
- `npm install antd --save`

## Form 작업해 보기

- /src/pages/JoinForm.js

### 1. form 의 초기값 셋팅

- 초기값
  : initialValues={{ Input: "Hello" }}
- Form.Item 은 필요시 name 있어야 합니다.
- Form.Item 안쪽에 컴포넌트를 배치하여야 합니다.

```js
import { Form, Input } from "antd";

const initialValues = {
  userid: "hong",
  userpass: "hello",
  nickname: "길동",
  email: "a@a.net",
};
const JoinForm = () => {
  return (
    <div>
      <Form
        style={{ width: 600, margin: "0 auto" }}
        initialValues={initialValues}
      >
        <Form.Item name={"userid"}>
          <Input />
        </Form.Item>

        <Form.Item name={"userpass"}>
          <Input.Password />
        </Form.Item>

        <Form.Item name={"nickname"}>
          <Input />
        </Form.Item>

        <Form.Item name={"email"}>
          <Input />
        </Form.Item>

        <Form.Item></Form.Item>
      </Form>
    </div>
  );
};

export default JoinForm;
```

### 2. Form.Item 의 옵션

- label 붙이기

```js
<Form.Item name={"userid"} label="아이디">
  <Input />
</Form.Item>
```

- placeholder 붙이기

```js
<Form.Item name={"userid"} label="아이디">
  <Input placeholder="아이디를 입력하세요." />
</Form.Item>
```

- 필수값 표시하기

```js
<Form.Item name={"userid"} label="아이디" required={true}>
  <Input placeholder="아이디를 입력하세요." />
</Form.Item>
```

- 필수값 및 안내 메시지 표시하기

```js
<Form.Item
  name={"userid"}
  label="아이디"
  rules={[
    { required: true, message: "아이디는 필수 항목입니다." },
    { min: 4, message: "아이디는 4자 이상 입력하세요." },
    { max: 8, message: "아이디는 8자 이하로 입력하세요." },
    {
      //   pattern: /^[\s]/,
      //   message: "공백만 입력하시면 안됩니다.",
    },
  ]}
>
  <Input placeholder="아이디를 입력하세요." />
</Form.Item>
```

### 3. 폼 요소 관련

- 입력중인 값 알아내기
  : onFieldsChange

```js
<Form
  style={{ width: 600, margin: "0 auto" }}
  initialValues={initialValues}
  onFieldsChange={(changeFileds, allFileds) => {
    onChangeFiled(changeFileds);
    //   console.log("allFileds", allFileds);
  }}
>
  ...
</Form>
```

- 확인 버튼 선택시 전체 폼의 데이터 알아내기
  : onFinish

```js
<Form
  style={{ width: 600, margin: "0 auto" }}
  initialValues={initialValues}
  onFieldsChange={(changeFileds, allFileds) => {
    onChangeFiled(changeFileds);
    //   console.log("allFileds", allFileds);
  }}
  onFinish={values => {
    onFinished(values);
  }}
>
  ...
</Form>
```

- 확인 버튼 선택시 오류 알아내기
  : onFinishFailed

```js
<Form
  style={{ width: 600, margin: "0 auto" }}
  initialValues={initialValues}
  onFieldsChange={(changeFileds, allFileds) => {
    onChangeFiled(changeFileds);
    //   console.log("allFileds", allFileds);
  }}
  onFinish={values => {
    onFinished(values);
  }}
  onFinishFailed={({ values, errorFields, outOfDate }) => {
    console.log("onFinishFailed", values, errorFields, outOfDate);
  }}
>
  ...
</Form>
```

- 필드 입력 변경시 최종 입력 값 알아내기
  : onValuesChange

```js
<Form
  style={{ width: 600, margin: "0 auto" }}
  initialValues={initialValues}
  onFieldsChange={(changeFileds, allFileds) => {
    onChangeFiled(changeFileds);
    //   console.log("allFileds", allFileds);
  }}
  onFinish={values => {
    onFinished(values);
  }}
  onFinishFailed={({ values, errorFields, outOfDate }) => {
    console.log("onFinishFailed", values, errorFields, outOfDate);
  }}
  onValuesChange={(changedValues, allValues) => {
    onValuesChanged(changedValues);
    // console.log(changedValues);
    // console.log(allValues);
  }}
>
  ...
</Form>
```

## 4. useState 와 연동하기

### 4.1. 초기값은 가능 하면 useState 사용하자.

- axios 연동에 의한 초기값을 미리 고려하자.
  : 생성, 수정을 미리고려함.

```js
const initState = {
  userid: "",
  userpass: "",
  nickname: "",
  email: "",
};
```

```js
// form 의 기본값
const [initialValues, setInitialValues] = useState(initState);
```

```js
<Form initialValues={initialValues}>...</Form>
```

### 4.2. 각 필드 내용 입력시 set을 하자

- onValuesChange 를 활용하시길 권장

```js
<Form
  initialValues={initialValues}
  onValuesChange={(changedValues, allValues) => {
    // changedValues :  각 필드의 현재값
    // allValues : 전체 필드의 현재값
    onValuesChanged(allValues);
  }}
>
  ...
</Form>
```

- 아래처럼 전체 필드 값을 객체 구조 분해 할당을 권장

```js
// 사용자 입력시 변경된 값 출력
const onValuesChanged = _fileld => {
  setInitialValues({ ..._fileld });
};
```

### 4.3. 내용 전송시(onSubmit) set을 해도 좋을 듯 하다

```js
<Form
  initialValues={initialValues}
  onValuesChange={(changedValues, allValues) => {
    // changedValues :  각 필드의 현재값
    // allValues : 전체 필드의 현재값
    onValuesChanged(allValues);
  }}
  onFinish={values => {
    onFinished(values);
  }}
>
  ...
</Form>
```

```js
// 확인 버튼시 최종 입력값
const onFinished = values => {
  console.log(values);
  setInitialValues({ ...values });
};
```
