import * as SerialPort from 'serialport';
import { ComType, ICom } from '../messaging';

// get the port number from the argv
let port = process.argv[2];

if (!port) {
  // throw error
}

let comPort = new SerialPort('COM3');

comPort.on('open', (data: any) => {
  let com: ICom = {
    payload: data ? data.toString() : '',
    type: ComType.Message,
  };
  console.log(com);
});

comPort.on('data', (data: Buffer) => {
  let incomming = data.toString().trim();
  let value = /[-+]?[0-9]*\.?[0-9]+/g.exec(incomming);
  if (value) {
    let com: ICom = {
      buffer: data.toString(),
      payload: value.toString(),
      type: ComType.ComData,
    };
    console.log(com);
  }
});

comPort.on('disconnect', (err: Error) => {
  let com: ICom = {
    payload: err,
    type: ComType.Disconnect,
  };
  console.log(com);
});


setInterval(() => {
  comPort.write('1');
}, 3000);
