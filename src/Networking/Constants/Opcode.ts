export enum PacketOpcode {
    LOGIN =  0x01,
    REGISTER= 0x02,
}

export const GetPacketKeyByValue = (opcode: number) => {
    return Object.keys(PacketOpcode)[Object.values(PacketOpcode).indexOf(opcode)];
}

export default PacketOpcode
