/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/indent */


import { HttpPostClientSpy } from '../../test/mock-http-client'
import { RemoteAuthentication } from './remore-authentication'


describe('RemoteAuthentication', () => {
    test('should call Http with correct URL', async () => {
        const url = 'any_url'
        const httpPostClientSpy = new HttpPostClientSpy()
        const sut = new RemoteAuthentication(url, httpPostClientSpy)
        await sut.auth()
        expect(httpPostClientSpy.url).toBe(url)
    })
})
