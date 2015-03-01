# compare.js
```javascript

// 12>=10 is true, 12<20 is true, so result is true
console.log(compare(12,'[10,20)'));

// 12>10 is true, 12<11 is false, so result is false
console.log(compare(12,'(10,11)'));

//compare whether format is match
var data={
  a:"test string",
  b:43.3123,
  c:'87634sdfsdf34r34',
  d:NaN,
  e:[new Date,{f:/a/},'123']
};
var tester={
  a:String,
  b:Number,
  c:/^\d+/,
  d:'NaN',
  e:[Date,{f:RegExp},',+']
};
console.log(compare(data,tester)); //true
console.log(data); // now string '123' is become number 123
```
