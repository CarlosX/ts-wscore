export type WSWebSocket = uWS.WebSocket<unknown> & {
    session: SocketSession
}

export type PacketData = {
    opcode: PacketOpcode,
    data: unknown
}
