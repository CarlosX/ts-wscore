import Logger from '@services/LoggerService'
import BaseSession from './BaseSession';

class SocketSession extends BaseSession {
    constructor(ws: any, uuid: any) {
        super(ws, uuid);
        Logger.info(`New SocketSession created for ${uuid}`);
    }
}

export default SocketSession
