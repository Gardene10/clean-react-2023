import { HttpPostClientSpy } from '../../test'
import { RemoteAddAccount } from './remote-add-account'
import {AddAccountParams} from '@/domain/usecases'
import { AccountModel } from '@/domain/models'
import faker from 'faker'
import { mockAccountModel, mockAddAccountParams } from '@/domain/test'
import { HttpStausCode } from '../../protocols/http'
import { EmailInUseError } from '@/domain/errors/email-in-use-error'
import { UnexpectedError } from '@/domain/errors'


type SutTypes = {
    sut: RemoteAddAccount
    httpPostClientSpy: HttpPostClientSpy<AddAccountParams,AccountModel>
   }
   
   const makeSut = (url: string = faker.internet.url()): SutTypes => {
       const httpPostClientSpy = new HttpPostClientSpy<AddAccountParams,AccountModel>()
       const sut = new RemoteAddAccount(url,httpPostClientSpy)
       return {
           sut,
           httpPostClientSpy
       }
   }
   

   describe('RemoteAddAccount', () => {
    test('Should call Http with correct URL', async () => {
        const url = faker.internet.url()
        const { sut, httpPostClientSpy } = makeSut(url)
        await sut.add(mockAddAccountParams())
        expect(httpPostClientSpy.url).toBe(url)
    })

    test('Should call HttpPostClient with correct body', async () => {
        const addAccountParams = mockAddAccountParams()
        const { sut, httpPostClientSpy } = makeSut()
        await sut.add(addAccountParams)
        expect(httpPostClientSpy.body).toEqual(addAccountParams)
    })

    test('Should thorw EmailInUseError if HttpPostClient returns 403', async () => {
        
        const { sut, httpPostClientSpy } = makeSut()
        httpPostClientSpy.response = {
        statusCode: HttpStausCode.forbidden
        }
        const promise = sut.add(mockAddAccountParams())
        await expect(promise).rejects.toThrow(new EmailInUseError())
    })

    test('should thorw UnexpectedError if HttpPostClient returns 401', async () => {
        
        const { sut, httpPostClientSpy } = makeSut()
        httpPostClientSpy.response = {
        statusCode: HttpStausCode.badRequest
        }
        const promise = sut.add(mockAddAccountParams())
        await expect(promise).rejects.toThrow(new UnexpectedError())
    })

    test('Should thorw succes if HttpPostClient returns 500', async () => {
        
        const { sut, httpPostClientSpy } = makeSut()
        httpPostClientSpy.response = {
        statusCode: HttpStausCode.severerError
        }
        const promise = sut.add(mockAddAccountParams())
        await expect(promise).rejects.toThrow(new UnexpectedError())
    })

    test('Should thorw succes if HttpPostClient returns 404', async () => {
        
        const { sut, httpPostClientSpy } = makeSut()
        httpPostClientSpy.response = {
        statusCode: HttpStausCode.noFound
        }
        const promise = sut.add(mockAddAccountParams())
        await expect(promise).rejects.toThrow(new UnexpectedError())
    })

    test('Should return an AccountModel if HttpPostClient returns 200', async () => {
        
        const { sut, httpPostClientSpy } = makeSut()
        const httpResult = mockAccountModel()
        httpPostClientSpy.response = {
        statusCode: HttpStausCode.ok,
        body:httpResult
        }
        const account = await sut.add(mockAddAccountParams())
        expect(account).toEqual(httpResult)
    })

})