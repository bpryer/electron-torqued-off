import * as SerialPort from 'serialport';
import { ComType, ICom } from '../messaging';

SerialPort.list((err: string, ports: SerialPort.portConfig[]) => {
  if (err) {
    let com: ICom = {
      payload: err,
      type: ComType.Error,
    };
    console.log(com);
  } else {
    let com: ICom = {
      payload: JSON.stringify(ports),
      type: ComType.PortList,
    };
    console.log(com);
  }
});
