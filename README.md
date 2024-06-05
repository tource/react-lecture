# react-calendar

- 캘린더는 대표적으로 2가지를 사용합니다.
  : react-calendar (https://projects.wojtekmaj.pl/react-calendar/)
  : full calendar (https://fullcalendar.io/)

## 1. react-calendar 설치

- `npm i react-calendar`

## 2. 날짜 관련 라이브러리 설치

- moment (활용함)
  : 대표적 날짜 처리 라이브러리(react-calendar 활용)
  : https://momentjs.com/
  : `npm install moment --save`

- dayjs
  : 주로 Ant-design 에서 활용
  : https://day.js.org/docs/
  : `npm install dayjs`

## 3. 캘린더 컴포넌트 페이지 만들기

- /src/pages/Schedule.js

```js
const Schedule = () => {
  return <div>캘린더출력</div>;
};

export default Schedule;
```

- /src/components/layout/Header.js (링크추가)

```js
<li>
  <NavLink
    to="/schedule"
    className={({ isActive }) => (isActive ? "active-link" : "")}
  >
    일정
  </NavLink>
</li>
```

- /src/App.js

```js
<Route path="/schedule" element={<Schedule />}></Route>
```

## 4. 캘린더 기본형 구성

- <Calendar> 컴포넌트 배치
- CSS 기본 값을 배치
  : 추천은 css원본을 복사하여서 새로운 css 배치
  : 복사본 css 를 수정해서 사용 권장
  : /src/css/calendar.css 생성 후 적용

```js
import Calendar from "react-calendar";
//import "react-calendar/dist/Calendar.css";
import "../css/calendar.css";

const Schedule = () => {
  const scWrap = {
    width: "80%",
    margin: "0 auto",
  };
  return (
    <div>
      <h1>캘린더출력</h1>
      <div style={scWrap}>
        <Calendar></Calendar>
      </div>
    </div>
  );
};

export default Schedule;
```

## 5. 캘린더 기능

### 5.1. 캘린더의 날짜 출력을 US 달력으로 변경하고 글자 변경 적용

```js
import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
import "../css/calendar.css";
import { locale } from "moment";

const Schedule = () => {
  const scWrap = {
    width: "80%",
    margin: "0 auto",
  };

  // 날짜 요일 출력
  const weekName = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const formatShortWeekday = (locale, date) => {
    const idx = date.getDay();
    return weekName[idx];
  };

  return (
    <div>
      <h1>캘린더출력</h1>
      <div style={scWrap}>
        <Calendar
          calendarType="gregory"
          formatShortWeekday={formatShortWeekday}
        ></Calendar>
      </div>
    </div>
  );
};

export default Schedule;
```

### 5.2. 캘린더의 특정날짜에 사용자 클래스 적용하기

```js
import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
import "../css/calendar.css";
import { locale } from "moment";

const Schedule = () => {
  const scWrap = {
    width: "80%",
    margin: "0 auto",
  };

  // 날짜 요일 출력
  const weekName = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const formatShortWeekday = (locale, date) => {
    const idx = date.getDay();
    return weekName[idx];
  };

  // 특정 날짜 클래스 적용하기
  const tileClassName = ({ date }) => {
    // date.getDay()는 요일을 리턴함
    // 0 은 일요일
    // console.log(date.getDay());
    const day = date.getDay();
    let classNames = "";
    if (day === 2) {
      // 화요일인 경우 샘플
      classNames += "rain";
    } else if (day === 4) {
      // 목요일
      classNames += "sun";
    }
    return classNames;
  };

  return (
    <div>
      <h1>캘린더출력</h1>
      <div style={scWrap}>
        <Calendar
          calendarType="gregory"
          formatShortWeekday={formatShortWeekday}
          tileClassName={tileClassName}
        ></Calendar>
      </div>
    </div>
  );
};

export default Schedule;
```

### 5.3. 캘린더의 외부 API 를 이용한 특정 내용 출력하기

```js
// 외부 데이터의 내용을 날짜에 출력하기
// axios.get("todos") 리턴결과
const todoApi = [
  {
    pk: 0,
    title: "점심먹기",
    text: "내용 1",
    day: "2024-06-04",
    img: "/logo192.png",
  },
  {
    pk: 1,
    title: "영화보기",
    text: "내용 2",
    day: "2024-05-31",
    img: "/logo192.png",
  },
  {
    pk: 2,
    title: "책읽기",
    text: "내용 3",
    day: "2024-06-17",
    img: "/logo192.png",
  },
  {
    pk: 3,
    title: "그림그리기",
    text: "내용 4",
    day: "2024-06-29",
    img: "/logo192.png",
  },
];
const [allData, setAllData] = useState([]);
useEffect(() => {
  setAllData(todoApi);

  return () => {};
}, []);

const tileContent = ({ date }) => {
  // console.log("내용 : ", date);
  const checkDay = moment(date).format("YYYY-MM-DD");
  // console.log("변환 : ", day);
  // 아래 구문은 api 데이터의 날짜와 현재 체크 날짜를 비교한다.
  const dayResult = allData.find((item, index, arr) => checkDay === item.day);
  console.log(dayResult);

  if (dayResult) {
    return (
      <div>
        <h2>{dayResult.title}</h2>
        <div>
          <img
            src={dayResult.img}
            alt={dayResult.title}
            style={{ width: "10px", height: "10px" }}
          />
        </div>
      </div>
    );
  }
};
```

```js
<Calendar
  ...
  tileContent={tileContent}
></Calendar>
```

### 5.4. 캘린더의 외부 API 를 이용한 날짜 내용, css 꾸미기

```js
// 외부 데이터의 내용을 날짜에 출력하기
// axios.get("todos") 리턴결과
const todoApi = [
  {
    pk: 0,
    title: "점심먹기",
    text: "내용 1",
    day: "2024-06-04",
    img: "/logo192.png",
  },
  {
    pk: 1,
    title: "영화보기",
    text: "내용 2",
    day: "2024-05-31",
    img: "/logo192.png",
  },
  {
    pk: 2,
    title: "책읽기",
    text: "내용 3",
    day: "2024-06-17",
    img: "/logo192.png",
  },
  {
    pk: 3,
    title: "그림그리기",
    text: "내용 4",
    day: "2024-06-29",
    img: "/logo192.png",
  },
];
const [allData, setAllData] = useState([]);
useEffect(() => {
  setAllData(todoApi);

  return () => {};
}, []);

// 내용 출력하기
const tileContent = ({ date }) => {
  // console.log("내용 : ", date);
  const checkDay = moment(date).format("YYYY-MM-DD");
  // console.log("변환 : ", day);
  // 아래 구문은 api 데이터의 날짜와 현재 체크 날짜를 비교한다.
  const dayResult = allData.find((item, index, arr) => checkDay === item.day);
  console.log(dayResult);

  if (dayResult) {
    return (
      <div>
        <h2>{dayResult.title}</h2>
        <div>
          <img
            src={dayResult.img}
            alt={dayResult.title}
            style={{ width: "10px", height: "10px" }}
          />
        </div>
      </div>
    );
  }
};
// 날짜 css 꾸미기
const tileClassName = ({ date }) => {
  const checkDay = moment(date).format("YYYY-MM-DD");
  const dayResult = allData.find(item => checkDay === item.day);
  if (dayResult) {
    return "sun";
  }
};
```

```js
<Calendar
  ....
  tileClassName={tileClassName}
  tileContent={tileContent}
></Calendar>
```

### 5.5. 캘린더 기본 출력 날짜 변경하기

```js
// 일자의 날짜 출력 포맷 변경하기
const formatDay = (locale, date) => {
  return moment(date).format("D");
};
```

```js
<Calendar
 ....
  formatDay={formatDay}
></Calendar>
```

### 5.6. 캘린더 날짜 선택시 처리하기

- useState 를 이용해서 내용을 출력

```js
// 날짜 선택시 처리
const [clickDay, setClickDay] = useState("");
const [clickInfo, setClickInfo] = useState(null);
const onClickDay = (value, event) => {
  const checkDay = moment(value).format("YYYY-MM-DD");
  setClickDay(checkDay);

  const dayResult = allData.find(item => checkDay === item.day);
  if (dayResult) {
    setClickInfo(dayResult);
  } else {
    setClickInfo(null);
  }
};
```

- 옵셔널체이닝(?.)을 체크 하자.

```js
<div>
  {clickDay}의 상세정보 : {clickInfo?.title}
</div>
<Calendar
 ....
  onClickDay={onClickDay}
></Calendar>
```

### 5.7. 캘린더 기본 날짜값 설정

```js
const [clickDay, setClickDay] = useState(moment().format("YYYY-MM-DD"));
```

```js
<Calendar
  ...
  value={clickDay}
></Calendar>
```
