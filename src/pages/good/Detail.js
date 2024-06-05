import { useParams } from "react-router-dom";

const Deatil = () => {
  // js 자리
  // path 로 전달된 prams 출력해 보기
  // 예) /compnay/사과
  // 예) /compnay/딸기
  //   const params = useParams();
  //   console.log(params);
  // {id: '사과'}
  // 객체 구조 분해 할당을 권장함
  const { id } = useParams();

  return <h1>{id} 제품상세</h1>;
};

export default Deatil;
