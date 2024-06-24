import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

const MulitiFile = () => {
  // 파일 선택 태그
  const fileBt = useRef(null);
  useEffect(() => {}, []);
  // 입력항목
  const [title, setTitle] = useState("");
  const [dday, setDday] = useState("");
  // File 객체를 관리
  const [sendFiles, setSendFiles] = useState([]);
  // 이미지 미리보기 URL 관리
  const [previewFiles, setPreviewFiles] = useState([]);

  // 이미지 미리 보기 JSX 만들기 함수
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

  // 강제로 input type="file" 을 클릭한 것처럼 js 에서 실행
  const handleFileClick = () => {
    // document.querySelector("#filebt_id").click();
    fileBt.current.click();
  };
  // 파일 목록
  const handleFileChange = e => {
    // console.log(e.target.files);
    // 출력결과 FileList {0: File, 1: File, length: 2}
    // Array.from(객체) : 객체를 배열로 만듦
    const filesArr = Array.from(e.target.files);
    // 파일 보관
    setSendFiles([...sendFiles, ...filesArr]);
    // 미리보기 URL 보관
    const imgUrlArr = filesArr.map(item => URL.createObjectURL(item));
    setPreviewFiles([...previewFiles, ...imgUrlArr]);
    // filesArr.map(item => {
    //   return URL.createObjectURL(item);
    // });
    // filesArr.map(item => {
    //   const url = URL.createObjectURL(item);
    //   return url;
    // });
  };
  // 파일 목록에서 특정 항목 삭제
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

  useEffect(() => {
    console.log(sendFiles);
    console.log(previewFiles);
  }, [sendFiles, previewFiles]);
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

  return (
    <div style={{ width: "80%", margin: "0 auto" }}>
      <h1>멀티 파일 업로드</h1>
      <form onSubmit={e => handleSubmit(e)}>
        <fieldset>
          <legend>기본정보</legend>
          <label htmlFor="title">제목</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <label htmlFor="dday">D-day</label>
          <input
            type="date"
            id="dday"
            value={dday}
            onChange={e => setDday(e.target.value)}
          />
        </fieldset>
        <fieldset>
          <legend>파일정보</legend>
          <div>{makeThumbnail()}</div>
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
        </fieldset>
        <fieldset>
          <button type="submit">등록</button>
          <button type="reset">재작성</button>
        </fieldset>
      </form>
    </div>
  );
};

export default MulitiFile;
