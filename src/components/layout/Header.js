import styled from "@emotion/styled";

export const Header = ({ login }) => {
  const LogoDiv = styled.div`
    background-color: ${props.bg};
    width: ${props.w}px;
    height: ${props.h}px;
    visibility: ${props.visible ? "visible" : "hidden"};
    margin: 0 auto;
    border: 5px solid red;
  `;
  const GnbDiv = styled.div`
    width: 80%;
    nav {
      background-color: yellow;
    }
  `;
  const MemberDiv = styled.div``;
  const HomeBt = styled.a``;
  return (
    <header>
      <LogoDiv bg={"yellow"} w={200} h={300} visible={false}>
        <HomeBt href="http://www.naver.com">네이버</HomeBt>
      </LogoDiv>
      <GnbDiv>
        <nav className="menu"></nav>
      </GnbDiv>
      <MemberDiv className="member"></MemberDiv>
    </header>
  );
};
