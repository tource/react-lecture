# React 용 Editor

- React Quill
  : https://github.com/zenoamaro/react-quill
- Toast Editor
  : https://ui.toast.com/tui-editor
- CKEditor
  :https://ckeditor.com/

# React Quill

- https://quilljs.com/docs/quickstart
- `npm i react-quill`

## 1. page 생성

- /src/pages/Write.js 생성

```js
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const Write = () => {
  const Wrap = {
    width: "80%",
    margin: "0 auto",
  };
  const [value, setValue] = useState("");
  return (
    <div>
      <h1>글작성</h1>
      <div style={Wrap}>
        <form>
          <ReactQuill onChange={setValue} />
          <div>{value}</div>
        </form>
      </div>
    </div>
  );
};

export default Write;
```

## 2. 위의 코드는 크로스 사이트 스크립트 공격 가능성이 있다.

- XSS 위험이 존재함.
- 이를 방지하기 위한 라이브러리 설치 필요.
  : https://www.npmjs.com/package/dompurify
  : `npm i dompurify`

```js
import React, { useState } from "react";

import DOMPurify from "dompurify";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const Write = () => {
  const Wrap = {
    width: "80%",
    margin: "0 auto",
  };
  const [value, setValue] = useState("");
  return (
    <div>
      <h1>글작성</h1>
      <div style={Wrap}>
        <form>
          <ReactQuill onChange={setValue} />
          <div>{value}</div>
          <div dangerouslySetInnerHTML={{ __html: value }} />
          {/* 올바르게 HTML을 출력하는 법 */}
          <div
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(value) }}
          />
        </form>
      </div>
    </div>
  );
};

export default Write;
```

## 3. toolbar 옵션 활용

```js
import React, { useState } from "react";

import DOMPurify from "dompurify";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const Write = () => {
  const Wrap = {
    width: "80%",
    margin: "0 auto",
  };
  const [value, setValue] = useState("");
  // 모듈 활용
  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ font: [] }],
        [{ align: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ list: "ordered" }, { list: "bullet" }, "link"],
        [
          {
            color: [
              "#000000",
              "#e60000",
              "#ff9900",
              "#ffff00",
              "#008a00",
              "#0066cc",
              "#9933ff",
              "#ffffff",
              "#facccc",
              "#ffebcc",
              "#ffffcc",
              "#cce8cc",
              "#cce0f5",
              "#ebd6ff",
              "#bbbbbb",
              "#f06666",
              "#ffc266",
              "#ffff66",
              "#66b966",
              "#66a3e0",
              "#c285ff",
              "#888888",
              "#a10000",
              "#b26b00",
              "#b2b200",
              "#006100",
              "#0047b2",
              "#6b24b2",
              "#444444",
              "#5c0000",
              "#663d00",
              "#666600",
              "#003700",
              "#002966",
              "#3d1466",
              "custom-color",
            ],
          },
          { background: [] },
        ],
        ["image", "video"],
        ["clean"],
      ],
    },
  };

  return (
    <div>
      <h1>글작성</h1>
      <div style={Wrap}>
        <form>
          <ReactQuill onChange={setValue} modules={modules} />
          <div>{value}</div>
          <div dangerouslySetInnerHTML={{ __html: value }} />
          {/* 올바르게 HTML을 출력하는 법 */}
          <div
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(value) }}
          />
        </form>
      </div>
    </div>
  );
};

export default Write;
```

## 4. 이미지 처리

- 이미지는 직접 처리한다.

```js
// 이미지 핸들러
const imageHandler = () => {
  console.log("이미지 처리하기");
};
```

```js
handlers: {
    image: imageHandler,
},
```

## 4.1. handler 처리

- 1. React Quill 참조를 보관한다.
     : const quillRef = useRef(null);
- 2.  useRef 참조
      : <ReactQuill ref={quillRef} onChange={setValue} modules={modules} />

## 4.2. 이미지 처리

```js
const imageHandler = () => {
  const editor = quillRef.current.getEditor();
  // 1. 이미지 업로드를 위한 응용
  const input = document.createElement("input");
  input.setAttribute("type", "file");
  input.setAttribute("accept", "image/*");
  // <input type="file" accept="image/*" />
  input.click(); // 강제클릭
  input.addEventListener("change", async () => {
    try {
      // 가장 정석적인 방법은 아래와 같습니다.
      /*
         1. 화면에 선택된 이미지를 보여주기 전에
         2. 백엔드로 이미지를 전송한다.
         3. 전송이 완료되면, 결과 즉, 파일위치를 문자열로 받는다.
         4. 받은 문자열로 <img src="받은문자열" /> 을 생성한다.
         5. 최종 <img src="받은문자열" /> 을 Quill 에 작성한다.
        */

      const file = input.files[0];
      //const tempUrl = URL.createObjectURL(file);
      //setImgUrl(tempUrl);

      console.log(file);
      const formData = new FormData();
      formData.append("pics", file);
      formData.append("data", JSON.stringify({ age: 1 }));
      const header = { headers: { "Content-Type": "multipart/form-data" } };
      const res = await axios.post("백엔드주소", formData, header);
      const imgUrl = "서버주소" + res.data;

      // editor 에 배치한다.
      const range = editor.getSelection();
      editor.insertEmbed(range.index, "image", tempUrl);
      // 강제로 마우스 커서 위치를 이동한다.
      editor.setSelection(range.index + 1);
    } catch (error) {
      console.log(error);
    }
  });
};
```
