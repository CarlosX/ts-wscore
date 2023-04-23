import Logger from '@services/LoggerService'
import BaseSession from './BaseSession'
import { WSWebSocket } from '@/typings/Socket'

class SocketSession extends BaseSession {
    constructor(ws: WSWebSocket, uuid: string) {
        super(ws, uuid)
        Logger.info(`New SocketSession created for ${uuid}`)
    }
}

export default SocketSession
