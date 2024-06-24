# File

## 1. form 태그 구성

- `<input type="file"/>`
- `<... accept="image/png, image/gif, image/jpeg"/>`
- `<... onChange={(e) => handleFile(e)} />`

## 2. file 선택시 구성

- handleFile 선택시 실행
  : e.target.value 아니다.
  : e.target.file 아니다.
  : e.target.files 배열입니다.

```js
const [sendFile, setSendFile] = useState(null);
const handleFile = e => {
  const file = e.target.files[0];
  // 파일 보관
  setSendFile(file);
};
```

- 이미지 미리보기

```js
const [previewFile, setPreviewFile] = useState("");

const handleFile = e => {
  const file = e.target.files[0];
  const url = URL.createObjectURL(file);
  // 웹 브라우저 임시 파일 주소
  setPreviewFile(url);
};

<img src={previewFile} />;
```

## 3. 전송 데이터 만들기

```js
// 1 번 전송데이터 포맷 만들기
const formData = new FormData();

// 2 번 보낼데이터 (json 형식의 문자열로 만들기)
const infoData = JSON.stringify({
  속성명: 속성값,
  속성명: 속성값,
});

// 3 번 Blob 바이너리 데이터 만들기
const 자료 = new Blob([infoData], { type: "application/json" });

// 4 번 form-data 에 키에 값으로 추가하기
formData.append("키명", 자료);

// 5 번 이미지 파일 추가하기
formData.append("키명", 파일);

// 6 번 axios 로 전달
axiosPost함수(formData);
```

## 4. axios 전송하기

```js
const post기능명 = async data => {
  try {
    const header = { headers: { "Content-Type": "multipart/form-data" } };
    const response = await axios.post("/api/pet", data, header);
    //console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};
```

## 5. 전송 상태 확인하기

- Chorome > F12 > Network 탭 > XHR/fetch탭 > 각 내용 확인

# MultiFile

## 1. form 태그 구성

- multiple (여러 파일 선택)
- accept (파일 종류 구분)

```js
<input
  type="file"
  accept="image/jpg, image/png, image/gif"
  multiple
  onChange={e => handleFileChange(e)}
/>
```

## 2. form 태그 선택시 처리 함수

### 2.1. 파일 목록 보관

```js
const [sendFiles, setSendFiles] = useState([]);
....
const handleFileChange = e => {
    // console.log(e.target.files);
    // 출력결과 FileList {0: File, 1: File, length: 2}
    // Array.from(객체) : 객체를 배열로 만듦
    const filesArr = Array.from(e.target.files);
    // 파일 보관
    setSendFiles([...sendFiles, ...filesArr]);
  };
```

### 2.2. 미리보기 목록 보관

```js
const [previewFiles, setPreviewFiles] = useState([]);
....
const handleFileChange = e => {
    // Array.from(객체) : 객체를 배열로 만듦
    const filesArr = Array.from(e.target.files);
    // 파일 보관
    setSendFiles([...sendFiles, ...filesArr]);
    // 미리보기 URL 보관
    const imgUrlArr = filesArr.map(item => URL.createObjectURL(item));
    setPreviewFiles([...previewFiles, ...imgUrlArr]);
  };
```

### 2.3. 미리보기 JSX 출력함수

```js
const makeThumbnail = () => {
  return previewFiles.map((item, index) => (
    <img
      src={item}
      key={index}
      style={{ width: 80 }}
      onClick={e => {
        deleteFile(index);
      }}
    />
  ));
};
....
<div>{makeThumbnail()}</div>
```

### 2.4. 이미지 클릭시 목록에서 제거

```js
 const deleteFile = _index => {
    // console.log("삭제", _index);
    // 미리보기 배열에서 제거 : 기준 순서(index)
    const tempPreviewArr = previewFiles.filter(
      (item, index) => index !== _index,
    );
    setPreviewFiles(tempPreviewArr);
    // 전송 파일 배열에서 제거 : 기준 순서(index)
    const tempFileArr = sendFiles.filter((item, index) => index !== _index);
    setSendFiles(tempFileArr);
  };
....
const makeThumbnail = () => {
  return previewFiles.map((item, index) => (
    <img
      src={item}
      key={index}
      style={{ width: 80 }}
      onClick={e => {
        deleteFile(index);
      }}
    />
  ));
};
```

### 2.5. 별도에 디자인 된 버튼을 이용해서 업로드 하기

- <input type="file"> 을 숨기고 디자인 버튼에 기능 위임할 경우.
- style={{ display: "none" }}

```js
<input
  style={{ display: "none" }}
  ref={fileBt}
  id="filebt_id"
  type="file"
  accept="image/jpg, image/png, image/gif"
  multiple
  onChange={e => handleFileChange(e)}
/>
```

- cursor: "pointer" 버튼 모양 커서 보이기

```js
<div
  style={{
    width: 50,
    height: 50,
    background: "red",
    cursor: "pointer",
    color: "#fff",
  }}
  onClick={() => handleFileClick()}
>
  파일선택
</div>
```

- #filebt_id 는 <input type="file" id="filebt_id" />

```js
const handleFileClick = () => {
  document.querySelector("#filebt_id").click();
};
```

### 2.6. 별도에 디자인 된 버튼을 useRef 변환해서 업로드 하기

```js
const fileBt = useRef(null);
...
const handleFileClick = () => {
    // document.querySelector("#filebt_id").click();
    fileBt.current.click();
  };
```

- ref={fileBt}

```js
<input
  style={{ display: "none" }}
  ref={fileBt}
  id="filebt_id"
  type="file"
  accept="image/jpg, image/png, image/gif"
  multiple
  onChange={e => handleFileChange(e)}
/>
```

### 2.7. lable을 활용하여 업로드 하기 (추천 : 성환님 짱)

- <label htmlFor="filebt_id">파일을 선택하시오.</label>

```js
<label htmlFor="filebt_id">파일을 선택하시오.</label>
<input
  style={{ display: "none" }}
  ref={fileBt}
  id="filebt_id"
  type="file"
  accept="image/jpg, image/png, image/gif"
  multiple
  onChange={e => handleFileChange(e)}
/>
```

## 3. 데이터 전송하기

- 자세한 과정은 File 항목을 참조

```js
// 파일 전송
const handleSubmit = e => {
  // 기본 기능 막기
  e.preventDefault();
  // 각 항목 체크하기 생략
  // ........... 유효성 검사
  // 1 번 전송데이터 포맷 만들기
  const formData = new FormData();

  // 2 번 보낼데이터 (json 형식의 문자열로 만들기)
  const infoData = JSON.stringify({
    title: title,
    dDay: dday,
  });
  // 3 번 Blob 바이너리 데이터 만들기
  const 자료 = new Blob([infoData], { type: "application/json" });
  // 4 번 form-data 에 키에 값으로 추가하기
  formData.append("p", 자료);

  // 5 번 이미지 파일 추가하기
  sendFiles.forEach(item => {
    formData.append("files", item);
  });

  // 6 번 axios 로 전달
  axiosPost함수(formData);
};
// 7 번 post 로 form-data 보내기
const axiosPost함수 = async data => {
  try {
    const header = { headers: { "Content-Type": "multipart/form-data" } };
    const response = await axios.post("/api/pet", data, header);
    //console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};
```
