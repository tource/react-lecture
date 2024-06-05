import { useLocation, useSearchParams } from "react-router-dom";

const Ceo = () => {
  // 현재 주소 및 패스 알아내기
  const location = useLocation();
  console.log(location);
  console.log(location.pathname);
  console.log(location.search);
  console.log(location.state?.fromUrl);

  // JS 자리
  const [searchParams, setSearchParams] = useSearchParams();
  // company/ceo?name=홍길동&age=30
  const name = searchParams.get("name");
  const age = searchParams.get("age");

  return (
    <div>
      <h1>대표({name}) 소개</h1>
      <h2>{age}살</h2>
    </div>
  );
};

export default Ceo;
