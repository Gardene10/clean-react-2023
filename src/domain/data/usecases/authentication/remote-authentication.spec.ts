/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/indent */

import { HttpPostClient } from "../../protocols/http/http-post-client"
import { RemoteAuthentication } from "./remore-authentication"


describe('RemoteAuthentication', () => {
    test('should call Http with correct URL', async () => {
        class HttpPostClientSpy implements HttpPostClient {
         url?: string

         async post (url: string): Promise<void> {
          this.url = url
          return await Promise.resolve()
             
         // eslint-disable-next-line padded-blocks
         }

        }
        const url = 'any_url'
        const httpPostClientSpy = new HttpPostClientSpy()
        const sut = new RemoteAuthentication(url, httpPostClientSpy)
        await sut.auth()
        expect(httpPostClientSpy.url).toBe(url)
    })
})
