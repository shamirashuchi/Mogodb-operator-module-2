const fs = require('fs');
// reading a file text
const readText = fs.readFileSync('./texts/read.txt','utf-8');//utf-8 convert buffer to string
//console.log(readText);

//writting text
const writeText = fs.writeFileSync('./texts/write.txt',readText + 'This is my written text');
console.log(writeText);//write.txt file create kore lekhe dibe
//output undefined dibe

