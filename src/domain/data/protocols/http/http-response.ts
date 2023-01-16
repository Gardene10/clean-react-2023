export enum HttpStausCode {
    ok = 200,
    noContent = 204,
    badRequest = 400,
    unathorazed = 401,
    noFound = 404,
    severerError = 500
    
}

export type HttpResponse<T> = {
    statusCode: HttpStausCode
    body?:T
}