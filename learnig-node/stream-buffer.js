const http = require('http');
const fs = require('fs');
//creating a server using raw node.js
const server = http.createServer();
//listener
server.on('request',(req,res)=>{
    console.log(req.url === '/read-file' && req.method  === 'GET');
    //streaming buffer reading
    // const readablestream = fs.createReadStream(__dirname + './texts/read.txt') 
    const readablestream = fs.createReadStream(process.cwd() + '/texts/read.txt') 
    readablestream.on('data',(buffer) =>{
        res.statusCode = 200;
        res.write(buffer);
    })
    readablestream.on('end',()=>{
        res.statusCode = 200;
        res.end("The streeming is over");
    })

    readablestream.on('error', (err) => {
        console.error('Error reading file:', err);
        res.statusCode = 500; // Internal Server Error
        res.end('Internal Server Error');
    });
    
    
})

server.listen(5000,()=>{
    console.log(`Server is listening on port 5000`);

})