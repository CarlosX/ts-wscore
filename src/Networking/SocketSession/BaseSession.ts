import 'reflect-metadata'
import Handler from '../../Utils/Handler'
import { PacketData, WSWebSocket } from '@/typings/Socket'
import { PacketOpcode } from '../Constants/Opcode'
import { PACKET_META_KEY } from '../Constants/Packet'

class BaseSession {
    [x: string]: unknown
    public socket: WSWebSocket
    public uuid: string = ''
    constructor(socket: WSWebSocket, uuid: string) {
        this.socket = socket
        this.uuid = uuid
    }

    public Send(opcode: PacketOpcode, data: object) {
        this.socket.send(JSON.stringify({ opcode, data }))
    }

    public HandleMessage(packet: PacketData) {
        const prototype = Object.getPrototypeOf(this)
        const methodDescriptors = Object.getOwnPropertyDescriptors(prototype)

        for (const methodName in methodDescriptors) {
            if (methodName === 'constructor') continue
            const methodDescriptor = methodDescriptors[methodName]
            const packetHandlerMetadata = Reflect.getMetadata(
                PACKET_META_KEY,
                methodDescriptor.value,
                methodName
            )
            if (packetHandlerMetadata === Number(packet.opcode)) {
                methodDescriptor.value.call(this, packet.data)
                return true
            }
        }
        return false
    }

    static RegisterHandler(handler: Handler) {
        const propertyNames = Object.getOwnPropertyNames(
            Object.getPrototypeOf(handler)
        )
        propertyNames.forEach((propertyName) => {
            const method = handler[propertyName]
            if (typeof method !== 'function') return
            const metadata = Reflect.getMetadata(
                PACKET_META_KEY,
                method,
                propertyName
            )
            if (metadata) {
                this.prototype[propertyName] = method
            }
        })
    }
}

export default BaseSession
