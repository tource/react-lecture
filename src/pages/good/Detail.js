import { useParams } from "react-router-dom";

const Detail = ({ title }) => {
  // js 자리
  // path로 전달된 params 출력해 보기
  // 예) /company/사과
  // 예) /company/딸기
  //   const params = useParams();
  //   console.log(params);
  // {id: `사과`}
  // 객체 구조 분해 할당을 권장함

  const { id } = useParams();

  return (
    <h1>
      {id} 제품 {title}상세
    </h1>
  );
};

export default Detail;
