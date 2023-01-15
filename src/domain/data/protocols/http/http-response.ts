export enum HttpStausCode {
    noContent = 204,
    unathorazed = 401
    
}

export type HttpResponse = {
    statusCode: HttpStausCode
    body?: any
}