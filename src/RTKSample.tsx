import React from "react";
import Menu from "./components/Menu";
import { useDispatch, useSelector } from "react-redux";
import { changeEng, changeEtc, changeKor } from "./slices/langSlice";
import { AppDispatch, RootState } from "./store";

const RTKSample: React.FC = () => {
  // slice 정보 가져오기
  const themeState = useSelector((state: RootState) => state.themeSlice);
  //console.log(themeState); // {theme:"black"}
  // const colorObj = {
  //   color: themeState.theme,
  // };
  const langState = useSelector((state: RootState) => state.langSlice);
  const dispatch = useDispatch<AppDispatch>();
  const handleClickKR = () => {
    dispatch(changeKor());
  };
  const handleClickEN = () => {
    dispatch(changeEng());
  };
  const handleClickETC = () => {
    dispatch(changeEtc({ word: "울라불라 쉬었다 갈게요." }));
  };

  return (
    <div>
      <button
        onClick={() => {
          handleClickKR();
        }}
      >
        한국어
      </button>
      <button
        onClick={() => {
          handleClickEN();
        }}
      >
        영어
      </button>
      <button
        onClick={() => {
          handleClickETC();
        }}
      >
        기타
      </button>
      <h1 style={{ color: themeState.theme }}> {langState.word} RTK 샘플</h1>
      <Menu />
    </div>
  );
};

export default RTKSample;
