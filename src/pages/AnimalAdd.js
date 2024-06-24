// {
//     "petImage": "string",
//     "p": {
//       "userId": 9007199254740991,
//       "petName": "string",
//       "petCategory": "string",
//       "petIcon": 1073741824,
//       "petBackColor": "string"
//     }
//   }

import axios from "axios";
import { useState } from "react";

const AnimalAdd = () => {
  const [userId, setUserId] = useState(9007199254740991);
  const [petName, setPetName] = useState("string");
  const [petCategory, setPetCategory] = useState("string");
  const [petIcon, setPetIcon] = useState(1073741824);
  const [petBackColor, setPetBackColor] = useState("string");
  // 이미지 파일
  const [petImg, setPetImg] = useState(null);

  const handleFile = e => {
    const file = e.target.files[0];
    // 전송파일 보관
    setPetImg(file);
    // 미리보기용 url
    const url = URL.createObjectURL(file);
    console.log(url);
  };
  const handleSubmit = e => {
    e.preventDefault();
    // 1. form-data 를 만든다.
    const formData = new FormData();
    const infoData = JSON.stringify({
      userId: userId,
      petName: petName,
      petCategory: petCategory,
      petIcon: petIcon,
      petBackColor: petBackColor,
    });
    const dto = new Blob([infoData], { type: "application/json" });
    // console.log(dto);
    formData.append("p", dto);
    formData.append("petImage", petImg);

    postPetImage(formData);
  };

  const postPetImage = async data => {
    try {
      const header = { headers: { "Content-Type": "multipart/form-data" } };
      const response = await axios.post("/api/pet", data, header);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={e => handleSubmit(e)}>
        <input
          type="file"
          accept="image/png, image/gif, image/jpeg"
          onChange={e => handleFile(e)}
        />
        <button type="submit">전송</button>
      </form>
    </div>
  );
};

export default AnimalAdd;
