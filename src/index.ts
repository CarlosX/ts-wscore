import './paths';
import uWS from 'uWebSockets.js'
import SocketSession from './Networking/SocketSession'
import { v4 as uuidv4 } from 'uuid'
import Logger from '@services/LoggerService'
import dotenv from 'dotenv'
dotenv.config()

// read dir Handlers and import all files
// import all files in Handlers
;(() => {
    var fs = require('fs')
    var path = require('path')
    var files = fs.readdirSync(path.resolve(__dirname, 'Networking/Handlers'))
    files.forEach((file) => {
        require('./Networking/Handlers/' + file)
    })
})()

const app = uWS.App()
app.ws('/*', {
    open: (ws: any) => {
        const uuid = uuidv4()
        Logger.log(`new Connection ${uuid}`)
        ws.session = new SocketSession(ws, uuid)
        ws.send(JSON.stringify({ opcode: '0', data: 'Hi' }))
    },
    message: (ws: any, _data) => {
        let data: any = ''
        if (typeof _data === 'string') {
            data = JSON.parse(_data)
        } else {
            data = Buffer.from(_data).toString()
            data = JSON.parse(data)
        }

        if (!ws.session.HandleMessage(data)) {
            console.log(
                `[${ws.session.uuid}] [${data.opcode}] Packet not handled`
            )
        }
    },
    close: (ws: any, code, reason) => {
        Logger.log(`Closed connection: ${ws.session.uuid} [${code}] ${reason}`)
    },
})

app.listen(Number(process.env.SERVICE_PORT), () => {
    Logger.log(`Listening to port ${process.env.SERVICE_PORT}`)
})
