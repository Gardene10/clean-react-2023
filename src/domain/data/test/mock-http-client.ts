import { HttpPostClient, HttpPostParams } from '../protocols/http/http-post-client'
import { HttpResponse, HttpStausCode } from '../protocols/http/http-response'

export class HttpPostClientSpy implements HttpPostClient {
    url?: string
    body?: object
    response: HttpResponse = {
      statusCode: HttpStausCode.noContent
    }

    async post (params: HttpPostParams): Promise<HttpResponse> {
      this.url = params.url
      this.body = params.body
      return Promise.resolve(this.response)

    
    }

}
