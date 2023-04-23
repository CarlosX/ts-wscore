import 'reflect-metadata'

class Handler {
    constructor() {}
    [x: string]: (...args: any[]) => unknown;
}

export default Handler
