import 'reflect-metadata'
import type PacketOpcode from '../Networking/Constants/Opcode'
import { PACKET_META_KEY } from '@/Networking/Constants/Packet'

function PacketHandler(opcode: PacketOpcode): any {
    return function (
        target: any,
        propertyKey: any,
        descriptor: PropertyDescriptor,
    ) {
        Reflect.defineMetadata(PACKET_META_KEY, opcode, target, propertyKey.name)
        return descriptor
    }
}

export { PacketHandler }
