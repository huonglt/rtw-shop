export {};
type StringArray = Array<string>;
type NumberArray = number[];

type ObjectWithNameArray = Array<{ name: string }>;
interface Backpack<T> {
  add: (obj: T) => void;
  get: () => T;
}

//declare const backpack: Backpack<string>;
//const object = backpack.get();

function firstElement<T>(arr: T[]): T | undefined {
  return arr[0];
}

const s = firstElement(['a', 'b', 'c']);
const n = firstElement([1, 2, 3]);
const u = firstElement([]);

// multiple type parameters of a function
function map<Input, Output>(arr: Input[], func: (arg: Input) => Output): Output[] {
  return arr.map(func);
}

function longest<T extends { length: number }>(a: T, b: T) {
  if (a.length > b.length) {
    return a;
  }
  return b;
}

function minimumLength<T extends { length: number }>(obj: T, minimum: number): T | number {
  if (obj.length >= minimum) {
    return obj;
  }
  return minimum;
}

function combine<T>(arr1: T[], arr2: T[]): T[] {
  return arr1.concat(arr2);
}

const arr = combine<number | string>([1, 2, 3], ['a', 'b']);
console.log(`arr = ${JSON.stringify(arr)}`);

type Point = { x: number; y: number };
type P = keyof Point;

enum Direction {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'Right'
}
type down = keyof Direction;
//console.log(`down = ${JSON.stringify(down)}`);
//const longestArray = longest([1, 2], [1, 2, 3]);
//const longestString = longest('alice', 'bob');

//const parsed = map(['1', '2', '3'], (n) => parseInt(n));
//console.log(`s = ${s}`);
