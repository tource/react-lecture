interface Person {
  name: string;
  age: number;
}
type Who = "a" | "b" | "c";

// type NewType = Record<Who, Person>;
type NewType = {
  [Name in Who]: Person;
};
/*
    type NewType = {
        a: Person;
        b: Person;
        c: Person;
    }
*/

const members: NewType = {
  a: { name: "a", age: 1 },
  b: { name: "a", age: 1 },
  c: { name: "a", age: 1 },
};
