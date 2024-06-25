export const Header = ({ login }) => {
  return (
    <header className="header">{login ? "정보수정" : "로그인필요"}</header>
  );
};
