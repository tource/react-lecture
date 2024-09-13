$(document).ready(function () {
  // 슬라이드 설정
  const sldieWidth = 400;
  const slideHeight = 500;
  const slideDelay = 1;

  // 슬라이드 목록
  const slides = $(".slide-box");
  $.each(slides, function (index, item) {
    $(item).css("left", sldieWidth * index);
  });
  const slideTotal = slides.length;
  const slideMinLeft = -1 * sldieWidth;
  const slideMaxLeft = slideTotal * sldieWidth - sldieWidth;

  // 타이머를 만들자.
  function moveSlide() {
    $.each(slides, function (index, item) {
      // 1. 각각의 슬라이드의 현재  left 값을 읽는다.
      let posLeft = $(item).css("left");
      posLeft = parseInt(posLeft);
      // 2. 이동해야 하는 left 값 계산
      let tgLeft = posLeft - sldieWidth;
      // 3. 최소 위치값을 벗어나면 최대 위치값으로 보내기
      if (tgLeft < slideMinLeft) {
        $(item).css("left", slideMaxLeft);
        tgLeft = slideMaxLeft - sldieWidth;
      }
      // 3. 이동적용
      // $(item).css("left", tgLeft);
      $(item).animate({ left: tgLeft });
    });
  }
  let timer = setInterval(moveSlide, slideDelay * 1000);

  const sldieWrap = $(".slide-wrap");
  sldieWrap.mouseenter(function () {
    console.log("마우스 오버");
    clearInterval(timer);
  });
  sldieWrap.mouseleave(function () {
    console.log("마우스 아웃");
    timer = setInterval(moveSlide, slideDelay * 1000);
  });
});
