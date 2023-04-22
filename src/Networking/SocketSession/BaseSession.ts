import 'reflect-metadata';
import Handler from '../../Utils/Handler';

class BaseSession {
    public socket: any
    [x: string]: (data?: any, args?: any) => void
    public uuid: any = ''
    constructor(socket: any, uuid: any) {
        this.socket = socket
        this.uuid = uuid
    }

    public Send(opcode: any, data: any) {
        this.socket.send(JSON.stringify({ opcode, data }))
    }

    public HandleMessage(packet: any) {
        const prototype = Object.getPrototypeOf(this);
        const methodDescriptors = Object.getOwnPropertyDescriptors(prototype);

        for (const methodName in methodDescriptors) {
            if (methodName === 'constructor') {
                continue;
            }
            const methodDescriptor = methodDescriptors[methodName];
            const packetHandlerMetadata = Reflect.getMetadata('PacketHandler', methodDescriptor.value, methodName);
            if (packetHandlerMetadata === Number(packet.opcode)) {
                methodDescriptor.value.call(this, packet.data);
                return true;
            }
        }
        return false;
    }

    static RegisterHandler(handler: Handler) {
        const propertyNames = Object.getOwnPropertyNames(
            Object.getPrototypeOf(handler),
        )
        propertyNames.forEach((propertyName) => {
            const method = handler[propertyName]
            if (typeof method === 'function') {
                const metadata = Reflect.getMetadata(
                    'PacketHandler',
                    method,
                    propertyName,
                )
                if (metadata) {
                    this.prototype[propertyName] = method
                }
            }
        })
    }
}

export default BaseSession
