const fs = require('fs');
//reading text asynchronous
fs.readFile('./texts/read.txt','utf-8',(err,data)=>{
    if(err)
    {
        throw Error('Error reading text')
    }
    console.log(data);
    //writting text asynchronously
    fs.writeFile('./texts/read2.txt',data,'utf-8',(err)=>{
        if(err)
        {
            throw Error ('Error writting data');
        }
    })
})
console.log('Testing asynchronous');