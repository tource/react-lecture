import { useState } from "react";
import { Gallery } from "../components/Gallery";
import { Info } from "../components/Info";
import { Notice } from "../components/Notice";
import { QuickLink } from "../components/QuickLink";
import { Slide } from "../components/Slide";
import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";
import { Main } from "../components/layout/Main";

export const Home = () => {
  const age = 100;
  const [level, setLevel] = useState(0);
  const [gogo, setGogo] = useState(() => {});

  return (
    <>
      <Header
        gogo={gogo}
        setGogo={setGogo}
        level={level}
        setLevel={setLevel}
        title={"제목"}
        age={age}
        study={true}
        hobby={["축구", "야구", "배구"]}
        say={() => {
          console.log("안녕");
        }}
        info={{ lastName: "길동", firstName: "홍" }}
        comp={<Header />}
      />
      <Main>
        <Slide />
        <Info>
          <Notice />
          <Gallery />
          <QuickLink />
        </Info>
      </Main>
      <Footer />
    </>
  );
};
