
import { HttpPostClientSpy } from '../../test/mock-http-client'
import { RemoteAuthentication } from './remore-authentication'
import { mockAccountModel, mockAuthentication } from '../../../test/mock-account'
import { HttpStausCode } from '../../protocols/http/http-response'
import { InvalidCredentialsError } from '../../../errors/invalid-credentials-error'
import faker from 'faker'
import { UnexpectedError } from '../../../errors/unexpected-error'
import { Authentication, AuthenticationParams } from '@/domain/usecases/authentication'
import { AccountModel } from '@/domain/models/account-model'


type SutTypes = {
 sut: RemoteAuthentication
 httpPostClientSpy: HttpPostClientSpy<AuthenticationParams,AccountModel>
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
    const httpPostClientSpy = new HttpPostClientSpy<AuthenticationParams,AccountModel>()
    const sut = new RemoteAuthentication(url, httpPostClientSpy)
    return {
        sut,
        httpPostClientSpy
    }
}

describe('RemoteAuthentication', () => {
    test('should call Http with correct URL', async () => {
        const url = faker.internet.url()
        const { sut, httpPostClientSpy } = makeSut(url)
        await sut.auth(mockAuthentication())
        expect(httpPostClientSpy.url).toBe(url)
    })

    test('should call Http with correct body', async () => {
        const authenticationParams = mockAuthentication()
        const { sut, httpPostClientSpy } = makeSut()
        await sut.auth(authenticationParams)
        expect(httpPostClientSpy.body).toEqual(authenticationParams)
    })

    test('should thorw InvalidCredentialsError if HttpPostClient returns 401', async () => {
        
        const { sut, httpPostClientSpy } = makeSut()
        httpPostClientSpy.response = {
        statusCode: HttpStausCode.unathorazed
        }
        const promise = sut.auth(mockAuthentication())
        await expect(promise).rejects.toThrow(new InvalidCredentialsError())
    })

    test('should thorw UnexpectedError if HttpPostClient returns 401', async () => {
        
        const { sut, httpPostClientSpy } = makeSut()
        httpPostClientSpy.response = {
        statusCode: HttpStausCode.badRequest
        }
        const promise = sut.auth(mockAuthentication())
        await expect(promise).rejects.toThrow(new UnexpectedError())
    })

    test('Should thorw succes if HttpPostClient returns 500', async () => {
        
        const { sut, httpPostClientSpy } = makeSut()
        httpPostClientSpy.response = {
        statusCode: HttpStausCode.severerError
        }
        const promise = sut.auth(mockAuthentication())
        await expect(promise).rejects.toThrow(new UnexpectedError())
    })

    test('Should thorw succes if HttpPostClient returns 404', async () => {
        
        const { sut, httpPostClientSpy } = makeSut()
        httpPostClientSpy.response = {
        statusCode: HttpStausCode.noFound
        }
        const promise = sut.auth(mockAuthentication())
        await expect(promise).rejects.toThrow(new UnexpectedError())
    })


    test('Should return an AccountModel if HttpPostClient returns 200', async () => {
        
        const { sut, httpPostClientSpy } = makeSut()
        const httpResult = mockAccountModel()
        httpPostClientSpy.response = {
        statusCode: HttpStausCode.ok,
        body:httpResult
        }
        const account = await sut.auth(mockAuthentication())
        expect(account).toEqual(httpResult)
    })
})
