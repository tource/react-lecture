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
// 1번 전송데이터 포맷 만들기
const formData = new FormData();

// 2번 보낼데이터 (json 형식의 문자열로 만들기)
const infoData = JSON.stringify({
  속성명: 속성값,
  속성명: 속성값,
});

// 3번 Blob 바이너리 데이터 만들기
const 자료 = new Blob([infoData], { type: "application/json" });

// 4번 form-data에 키에 값으로 추가하기
formData.append("키명", 자료);

// 5번 이미지 파일 추가하기
formData.append("키명", 자료);

// 6번 axios로 전달
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

- Chrome > F12 > Network 탭 > XHR/fetch탭 > 각 내용 확인
