
import { InvalidCredentialsError,UnexpectedError } from '../../../errors'
import { Authentication, AuthenticationParams } from '@/domain/usecases'
import { HttpPostClient,HttpStausCode } from '../../protocols/http'
import {  } from '../../../errors/unexpected-error'
import { AccountModel } from '@/domain/models'


export class RemoteAuthentication implements Authentication {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<AuthenticationParams, AccountModel>
  ) {}

  async auth (params: AuthenticationParams): Promise<AccountModel> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params
    })
    switch (httpResponse.statusCode){
      case HttpStausCode.ok: return httpResponse.body
      
      case HttpStausCode.unauthorized: throw new InvalidCredentialsError()
      default: throw new UnexpectedError()
    }
  }
}