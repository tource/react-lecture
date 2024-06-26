const App = () => {
  const handleChangeForm = e => {
    console.log(e.type);
    console.log(e.target);
    console.log(e.target.name);
    console.log(e.target.value);
  };
  const handleSubmit = e => {
    // 반드시 처리한다. 기본기능 막는다.
    // 데이터 유효성 검증을 위해서 막음.
    e.preventDefault();
  };
  return (
    <div>
      <form
        onSubmit={e => {
          handleSubmit(e);
        }}
      >
        <fieldset>
          <legend>회원가입</legend>
          <label htmlFor="user">아이디</label>
          <input
            type="text"
            name="user"
            id="user"
            placeholder="아이디 입력해주세요."
            onChange={e => {
              handleChangeForm(e);
            }}
          />
          <input type="button" name="idcheck" value="중복확인" />
          <br />
          <label htmlFor="pw">비밀번호</label>
          <input
            type="password"
            name="pw"
            id="pw"
            onChange={e => {
              handleChangeForm(e);
            }}
          />
          <br />
        </fieldset>

        <fieldset>
          <legend>정보입력</legend>
          <label htmlFor="age">나이</label>
          <input
            type="number"
            name="age"
            id="age"
            onChange={e => {
              handleChangeForm(e);
            }}
          />
          <br />
          <label htmlFor="gm">남성</label>
          <input
            type="radio"
            name="gender"
            value="m"
            id="gm"
            checked={true}
            onClick={e => {
              handleChangeForm(e);
            }}
          />
          <label htmlFor="gf">여성</label>
          <input
            type="radio"
            name="gender"
            value="f"
            id="gf"
            onClick={e => {
              handleChangeForm(e);
            }}
          />

          <br />
          <label htmlFor="js">JS</label>
          <input
            type="checkbox"
            name="js"
            id="js"
            onClick={e => {
              handleChangeForm(e);
            }}
          />
          <label htmlFor="css">CSS</label>
          <input
            type="checkbox"
            name="css"
            id="css"
            onClick={e => {
              handleChangeForm(e);
            }}
          />
          <label htmlFor="html">HTML</label>
          <input
            type="checkbox"
            name="html"
            id="html"
            onClick={e => {
              handleChangeForm(e);
            }}
          />
          <br />
          <label htmlFor="level">성적등급</label>
          <select
            name="level"
            id="level"
            onChange={e => {
              handleChangeForm(e);
            }}
          >
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
          </select>
          <br />
          <label htmlFor="file">파일첨부</label>
          <input
            type="file"
            name="file"
            id="file"
            onChange={e => {
              handleChangeForm(e);
            }}
          />
          <br />
          <label htmlFor="etc">기타사항</label>
          <textarea
            name="etc"
            id="etc"
            onChange={e => {
              handleChangeForm(e);
            }}
          ></textarea>
        </fieldset>

        <fieldset>
          <legend>버튼들</legend>
          <input type="reset" value="다시작성" />
          <input type="submit" value="작성완료" />
          <button type="submit">버튼 작성 완료</button>
          <input type="image" src="images/a.jpg" />
        </fieldset>
      </form>
    </div>
  );
};

export default App;
