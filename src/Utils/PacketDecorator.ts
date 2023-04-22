import 'reflect-metadata'
import type PacketOpcode from '../Networking/Constants/Opcode'

function PacketHandler(opcode: PacketOpcode): any {
    return function (
        target: any,
        propertyKey: any,
        descriptor: PropertyDescriptor,
    ) {
        Reflect.defineMetadata('PacketHandler', opcode, target, propertyKey.name)
        return descriptor
    }
}

export { PacketHandler }
