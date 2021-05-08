import socketIOClient from "socket.io-client";

const uuid = localStorage.getItem('io_uuid') !== null
    ? localStorage.getItem('io_uuid')
    : localStorage.setItem('io_uuid', Math.random().toString(24) + new Date());
console.log(uuid);
const _socket = socketIOClient('http://localhost:8080/', {
    query: {
        uuid
    }
});

_socket.on("connect", function (token ) {
    console.log("Web_socket connection established!");
    if (token) localStorage.setItem('io_token', token)
});

_socket.on("event", function (data) {
    console.log(data);
    var el = document.createElement("div");
    el.textContent = "'" + data.event + "' event received!";
    document.getElementById("events").appendChild(el);
});

_socket.on('disconnect', () => {
    console.log('disconnect')
});

_socket.on('connect_error', (e) => {
    console.log('disconnect', e)
});

export const socket = new Proxy(_socket, {});

