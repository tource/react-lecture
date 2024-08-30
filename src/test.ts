// Class 로 변환
class Person {
  // 인스턴스(new 활용 결과물) 의 속성
  public name: string;
  public age: number;
  private blood: string;
  protected money: number;
  // new 하면 자동 실행 (인스턴스 생성자)
  // 딱 1번만 실행이되요.
  constructor(name: string, age: number, blood: string, money: number) {
    this.name = name;
    this.age = age;
    this.blood = blood;
    this.money = money;
  }
  // new 해서 만들어지는 인스턴스 메서드
  public hi() {
    console.log("반가워");
  }
  // 클래스 메서드 (Static 메소드)
  public static say() {
    console.log("안녕");
  }
}
// 확장
class Gamer extends Person {
  constructor(name: string, age: number, blood: string, money: number) {
    super(name, age, blood, money);
    this.money = -5000;
  }
}

const who = new Gamer("hong", 10, "A", 500);
who.name;
who.age;
// who.blood = "O" // private 라서 에러
who.hi();
//who.money = -5000; // protected 라서 에러
Person.say();
