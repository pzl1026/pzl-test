// 布尔
let isdone: boolean = false;

// 数字
let decLiteral: number = 6;
let hexLiteral: number = 0xf00d;

// 字符串
let str: string = 'str';

// 数组
let list: number[] = [1, 2, 3];
let list2: Array<number> = [1, 2, 3];
let list3: [number, string] = [10, 'pp'];
let list4: any[] = [1, '33', false];

// 枚举
enum Color { Red, Green = 8, Blue };
let c: Color = Color.Red;
let c1: string = Color[2];

console.log(c1);

// Any
let nosure: any = 4;
nosure = "maybe";
nosure = false;

// void
function warnuser(): void {
    console.log('this is test');
}
let unusable: void = undefined;

// null undefined
let u: undefined = undefined;
let n: null = null;

// never 永远无法达到终点
function err(msg: string): never {
    throw new Error(msg);
}

function infiniteLoop(): never {
    while (true) { }
}

// object
declare function create(o: object | null): void;

//类型断言
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;

console.log(strLength, 'kkk44');





