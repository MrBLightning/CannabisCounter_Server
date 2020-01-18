import { RequestHandler } from "@nestjs/common/interfaces"

export type CorsOptions = {
    allowedOrigins: string[],
    allowCredentials?: boolean,
    methods?: string[],
    headers?: string[],
    maxAge?: string
}

const cors = (opts: CorsOptions): RequestHandler => {
    const options: CorsOptions = opts;
    options.allowedOrigins = options.allowedOrigins || []
    if (!options.hasOwnProperty('allowCredentials'))
        options.allowCredentials = true
    const methods = options.methods || ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS']
    const headers = options.headers || ['X-Requested-With', 'Content-Type']

    const allowedOrigins = options.allowedOrigins.map((origin: string) => {
        const anyHttp = !origin.match(/^https?:\/\//)
        let rand = 'WnqkQwirtbRoerjaSnei20ssbqQi',
            rand1 = rand + '1',
            rand2 = rand + '2'
        origin = origin.replace(/\*\./g, rand1);
        origin = origin.replace(/:\*/g, rand2);
        origin = escapeRegExp(origin);
        origin = origin.replace(new RegExp(rand1, 'g'), '(.*\\.)?');
        origin = origin.replace(new RegExp(rand2, 'g'), '(:\\d+)?');
        origin = anyHttp ? '^https?:\/\/' + origin + '$' : '^' + origin + '$';
        return new RegExp(origin);
    })

    // express middleware
    return (req, res, next) => {
        const origin = req.get('Origin') || "";
        let matched = false;
        for (let i = 0; i < allowedOrigins.length; i++)
            if (allowedOrigins[i].test(origin)) {
                matched = true
                break
            }
        if (!matched) return next();
        res.set('Access-Control-Allow-Origin', origin)
        if (methods.length)
            res.set('Access-Control-Allow-Methods', methods.join(', '))
        if (headers.length)
            res.set('Access-Control-Allow-Headers', headers.join(', '))
        if (options.maxAge)
            res.set('Access-Control-Max-Age', options.maxAge)
        if (options.allowCredentials)
            res.set('Access-Control-Allow-Credentials', 'true')
        if ('OPTIONS' == req.method) return res.sendStatus(200)
        next()
    }
}

function escapeRegExp(str: string) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

export default cors;