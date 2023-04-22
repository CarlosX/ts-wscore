import 'reflect-metadata'
import { PacketHandler } from '../../Utils/PacketDecorator'
import SocketSession from '../SocketSession'
import PacketOpcode, { GetPacketKeyByValue } from '../Constants/Opcode'
import Handler from '../../Utils/Handler'
import Logger from '@services/LoggerService'

class AccountHandler extends Handler {
    constructor() {
        super()
    }

    @PacketHandler(PacketOpcode.LOGIN)
    public handlerLogin(data?: any) {
        Logger.info(`[${this.uuid}] [${GetPacketKeyByValue(PacketOpcode.LOGIN)}] ${JSON.stringify(data)}`)
        this.Send(PacketOpcode.LOGIN, 'Login');
    }

    @PacketHandler(PacketOpcode.REGISTER)
    public handlerRegister(data?: any) {
        Logger.info(`[${this.uuid}] [${PacketOpcode.REGISTER}]`)
        this.Send(PacketOpcode.REGISTER, 'Register');
    }
}

SocketSession.RegisterHandler(new AccountHandler())
