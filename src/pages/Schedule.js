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

  // 사용자가 API로 전달하기 가능
  const scheduleDelete = _pk => {
    alert(`삭제합니당 스케쥴 번호 ${_pk}`);
  };

  // 날짜의 범위 초기값
  const initRange = {
    start: "2024-06-01",
    end: "2024-06-07",
  };
  // 화면에 출력할 날짜 state 관리
  // react-calendar 에서는 Date 객체를 사용한다.
  // 단지 우리가 moment 로 글자를 변환해서 보여줄 뿐이다.
  const [selectedRange, setSelectedRange] = useState([
    new Date(initRange.start),
    new Date(initRange.end),
  ]);
  // Range를 사용하는 경우의 날짜 꾸미기
  const tileClassNameRange = ({ date }) => {
    // console.log(date);
    const checkDay = moment(date).format("YYYY-MM-DD");
    // 범위 안에 있는 변수를 찾자, 결과로 true와 false 리턴
    // 배열을 대상으로 매개변수로 요소를 전달하고
    // 요소를 전달받아서 함수를 실행하도록 하는
    // 고차함수의 일종
    const isRange = allData.some(
      item => checkDay >= item.startday && checkDay <= item.endday,
    );
    if (isRange) {
      return "sun";
    }

    // if (checkDay >= initRange.start && checkDay <= initRange.end) {
    //   // CSS 적용하기
    //   return "sun";
    // }
  };
  // Range 를 사용하는 경우의 내용출력하기
  const tileContentRange = ({ date }) => {
    const checkDay = moment(date).format("YYYY-MM-DD");
    // 만약 checkDay : 2024-06-01
    // 1. 배열의 각 요소를 찾는다.
    // 2. 찾은 요소의 값을 이용한다.
    const dayResults = allData.filter(item => {
      return checkDay >= item.startday && checkDay <= item.endday;
    });
    // console.log("필터링 된 내용 : ", dayResults);
    if (dayResults.length > 0) {
      return (
        <div>
          {dayResults.map(dayResult => (
            <div key={dayResult.pk}>
              <h2>{dayResult.title}</h2>
              <div>
                <button
                  onClick={() => {
                    scheduleDelete(dayResult.pk);
                  }}
                >
                  수정하기
                </button>
              </div>
              <div>
                <img
                  src={dayResult.img}
                  alt={dayResult.title}
                  style={{ width: "10px", height: "10px" }}
                />
              </div>
            </div>
          ))}
        </div>
      );
    }
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
      startday: "2024-06-01",
      endday: "2024-06-04",
      img: "/logo192.png",
    },
    {
      pk: 1,
      title: "영화보기",
      text: "내용 2",
      startday: "2024-05-01",
      endday: "2024-06-04",
      img: "/logo192.png",
    },
    {
      pk: 2,
      title: "책읽기",
      text: "내용 3",
      startday: "2024-06-05",
      endday: "2024-06-07",
      img: "/logo192.png",
    },
    {
      pk: 3,
      title: "그림그리기",
      text: "내용 4",
      startday: "2024-06-09",
      endday: "2024-06-15",
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
          // tileClassName={tileClassName}
          // tileContent={tileContent}
          formatDay={formatDay}
          onClickDay={onClickDay}
          // value={clickDay}
          selectRange={true}
          value={selectedRange}
          tileClassName={tileClassNameRange}
          tileContent={tileContentRange}
        ></Calendar>
      </div>
    </div>
  );
};

export default Schedule;
