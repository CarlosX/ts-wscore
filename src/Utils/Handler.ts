import 'reflect-metadata'

class Handler {
    constructor() {}
    [x: string]: (data?: any, args?: any) => void;
}

export default Handler
