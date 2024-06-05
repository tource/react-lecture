import {
  Link,
  Outlet,
  createSearchParams,
  useLocation,
  useNavigate,
} from "react-router-dom";

const Good = () => {
  // 현재 주소 및 패스 알아내기
  const location = useLocation();
  console.log(location);

  // 강제로 이동시키기
  const navigate = useNavigate();
  // 1. 많은 분들이 아래처럼 주소 및 쿼리스트링을 만듭니다.
  const noramlNavi = () => {
    // 만약 QueryString 을 만들어야 한다면?
    // 많은 분이 path 까지 같이 작성합니다.
    const demo = `/company/ceo?name=성환&age=10`;
    // console.log(demo);
    navigate(demo);
  };

  // 2. 조금 문법을 좋아하시는 분들은 아래를 사용합니다.
  const specialNavi = () => {
    const queryStr = createSearchParams({
      name: "길동",
      age: 100,
    }).toString();
    // console.log(queryStr);
    const fromUrl = {
      memo: "제품페이지에서 왔어요.",
      good: "제품 1번을 보고 있었지요.",
      favorite: "제품 1에 관심이 많네요.",
    };

    navigate(
      {
        pathname: "/company/ceo",
        search: queryStr,
      },
      { state: { fromUrl } },
    );
  };

  return (
    <div>
      <h1>제품소개</h1>

      <div>
        <button
          onClick={() => {
            noramlNavi();
          }}
        >
          많은 분들이 그냥 naviagte 이동하라
        </button>

        <button
          onClick={() => {
            specialNavi();
          }}
        >
          추천하는 이동하라
        </button>
      </div>

      <ul>
        <li>
          <Link to="/good/1">제품 소개</Link>
        </li>
        <li>
          <Link to="/good/delete/1">제품 삭제</Link>
        </li>
        <li>
          <Link to="/good/modify/1">제품 수정</Link>
        </li>
      </ul>

      <div style={{ border: "3px solid black" }}>
        <h2>레이아웃 유지 하고 화면 출력</h2>
        <Outlet />
      </div>
    </div>
  );
};

export default Good;
