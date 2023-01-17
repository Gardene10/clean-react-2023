
import { HttpPostClientSpy } from '../../test'
import { RemoteAuthentication } from './remore-authentication'
import { mockAccountModel, mockAuthentication } from '../../../test'
import { HttpStausCode } from '../../protocols/http'
import { InvalidCredentialsError, UnexpectedError} from '../../../errors'
import { AuthenticationParams } from '@/domain/usecases'
import { AccountModel } from '@/domain/models'
import faker from 'faker'



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
    test('Should call Http with correct URL', async () => {
        const url = faker.internet.url()
        const { sut, httpPostClientSpy } = makeSut(url)
        await sut.auth(mockAuthentication())
        expect(httpPostClientSpy.url).toBe(url)
    })

    test('Should call Http with correct body', async () => {
        const authenticationParams = mockAuthentication()
        const { sut, httpPostClientSpy } = makeSut()
        await sut.auth(authenticationParams)
        expect(httpPostClientSpy.body).toEqual(authenticationParams)
    })

    test('should thorw InvalidCredentialsError if HttpPostClient returns 401', async () => {
        
        const { sut, httpPostClientSpy } = makeSut()
        httpPostClientSpy.response = {
        statusCode: HttpStausCode.unauthorized
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
