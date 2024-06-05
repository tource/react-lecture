import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
import "../css/calendar.css";
import moment from "moment";
import { useEffect, useState } from "react";

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
  //   const tileClassName = ({ date }) => {
  //     // date.getDay()는 요일을 리턴함
  //     // 0 은 일요일
  //     // console.log(date.getDay());
  //     const day = date.getDay();
  //     let classNames = "";
  //     if (day === 2) {
  //       // 화요일인 경우 샘플
  //       classNames += "rain";
  //     } else if (day === 4) {
  //       // 목요일
  //       classNames += "sun";
  //     }
  //     return classNames;
  //   };

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
    // console.log(dayResult);

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

  // 일자의 날짜 출력 포맷 변경하기
  const formatDay = (locale, date) => {
    return moment(date).format("D");
  };

  // 날짜 선택시 처리
  const [clickDay, setClickDay] = useState(moment().format("YYYY-MM-DD"));
  const [clickInfo, setClickInfo] = useState(null);
  useEffect(() => {
    // 죄송합니다.
    // 강제로 onClickDay 함수를 실행하면서 날짜를 전달하였습니다.
    onClickDay(moment().format());
  }, []);

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

  return (
    <div>
      <h1>캘린더출력</h1>
      <div>
        {clickDay}의 상세정보 : {clickInfo?.title}
      </div>
      <div style={scWrap}>
        <Calendar
          calendarType="gregory"
          formatShortWeekday={formatShortWeekday}
          tileClassName={tileClassName}
          tileContent={tileContent}
          formatDay={formatDay}
          onClickDay={onClickDay}
          value={clickDay}
        ></Calendar>
      </div>
    </div>
  );
};

export default Schedule;
