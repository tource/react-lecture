import { NavLink } from "react-router-dom";
import "../../css/header.css";
const Header = ({ children }) => {
  // js 자리
  // 현재 패스와 같은 경우에 보여줄 css Object 생성
  const ActiveLink = {
    color: "red",
    fontWeight: "bold",
  };

  return (
    <header className="header">
      <ul>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            홈
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/company"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            회사소개
          </NavLink>
          <ul>
            <li>
              <NavLink
                to="/company/ceo?name=홍길동&age=30"
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                대표 소개
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/company/history"
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                회사 연혁
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/company/partner"
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                파트너사
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/company/location"
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                회사위치
              </NavLink>
            </li>
          </ul>
        </li>
        <li>
          <NavLink
            to="/good"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            제품소개
          </NavLink>
        </li>
      </ul>

      {children}
    </header>
  );
};

export default Header;
