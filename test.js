// 'use strict';

// var students = {
//     Sam: {
//         focus: 100,
//         wisdom: 50
//     },
//     Sally: {
//         focus: 100,
//         wisdom: 60
//     },
//     Bill: {
//         focus: 90,
//         wisdom: 50
//     },
//     Sharon: {
//         focus: 110,
//         wisdom: 40
//     }
// };

// var test = 'slide.funny';

// console.info(test.split('.').length);
// var m = new Map();

// let a = function () {
//     this.focus += 5;
//     this.wisdom -= 10;
// }
// let b = function () {
//     this.wisdom += Math.round(this.focus * 0.1);
//     this.focus -= 10;
// }
// let q = 'slide.funny';
// let weq = 'slide';
// let kek = { 'slide' : [a]};
// m.set(students.Bill, kek);
// console.info(m.get(students.Bill).q !== undefined); 
// console.info(m);
// // m.get(students.Bill).slide.push(b);
// kek = m.get(students.Bill);
// kek[q] = [b];
// // m.set(students.Bill, Object.assign(m.get(students.Bill), { q : [b]}));
// console.info(m);
// console.info(Object.keys(m.get(students.Bill))
//     .filter((value) => value === q || value.split('.')[0] === q));

// console.info(m);

// let context = m.get(students.Bill);
// console.info(context);
// let keys = Object.keys(context);
// console.info(keys);

// m.forEach((value, key) => {
//     console.info(value);
//     value[q][0].bind(key)();
//     console.info(key);
// });
// console.info(m);

// let ar = [1, 2, 3];
// let obj = {1 : 1, 2 : 2, 3 : 3};
// console.info(obj['']);
// console.info(ar.slice(0, ar.length).join('.'));

// let test = [5, 6, 7];
// test.forEach((value, index) => {
//     console.info(value, index)
// })
