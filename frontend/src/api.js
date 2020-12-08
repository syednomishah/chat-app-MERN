import dataSpew from 'socket.io-client';


const socket = dataSpew('http://localhost:5000');


function test(cb){
	if(typeof cb === "function"){
		socket.off('test').on('test', cb);
	} else {
		socket.emit('test');
	}
}

export {
    test
};