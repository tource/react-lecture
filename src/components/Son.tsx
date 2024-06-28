import React from "react";
interface SonProps {
  children?: React.ReactNode; // 자식 요소
}

const Son = ({ children }: SonProps): JSX.Element => {
  return (
    <div>
      Son 입니다.
      {children}
    </div>
  );
};

export default Son;
