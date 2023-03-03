export enum HttpStausCode {
    ok = 200,
    noContent = 204,
    badRequest = 400,
    unauthorized = 401,
    forbidden = 401,
    noFound = 404,
    severerError = 500
    
}

export type HttpResponse<T> = {
    statusCode: HttpStausCode
    body?:T
}