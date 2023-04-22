import http from 'http'
import fs from 'fs'
import path from 'path'

// Agrega un manejador para las peticiones HTTP
const httpServer = http.createServer((req, res) => {
    // Si la ruta es la raíz, devuelve el archivo index.html
    if (req.url === '/') {
        const filePath = path.join(__dirname, '../public', 'index.html')
        const stream = fs.createReadStream(filePath)
        stream.pipe(res)
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' })
        res.end('Archivo no encontrado')
    }
})

httpServer.listen(8080, () => {
    console.log('Servidor HTTP iniciado en el puerto 8080')
})
