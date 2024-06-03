import { Link } from "react-router-dom";

const Header = ({ children }) => {
  return (
    <header className="header">
      <ul>
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/company">회사소개</Link>
          <ul>
            <li>
              <Link to="/company/ceo?name=홍길동&age=30">대표 소개</Link>
            </li>
            <li>
              <Link to="/company/history">회사 연혁</Link>
            </li>
            <li>
              <Link to="/company/partner">파트너사</Link>
            </li>
            <li>
              <Link to="/company/location">회사위치</Link>
            </li>
          </ul>
        </li>
        <li>
          <Link to="/good">제품소개</Link>
        </li>
      </ul>

      {children}
    </header>
  );
};

export default Header;
