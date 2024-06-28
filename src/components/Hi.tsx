import React from "react";
// props로 전달되는 데이터의 모양을 만들어준다.
// 모양을 만드는 방법은 interface 또는 type이 있다.
interface HiProps {
  nickname: string;
  age: number;
}

const Hi: React.FC<HiProps> = ({ nickname, age }) => {
  return (
    <div>
      반가워요 {nickname}님, 나이가 {age} 이군요
    </div>
  );
};

export default Hi;
