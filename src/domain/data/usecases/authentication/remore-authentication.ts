
import { InvalidCredentialsError } from '../../../errors/invalid-credentials-error'
import { AuthenticationParams } from '@/domain/usecases/authentication'
import { HttpPostClient } from '../../protocols/http/http-post-client'
import { HttpStausCode } from '../../protocols/http/http-response'
import { UnexpectedError } from '../../../errors/unexpected-error'
import { AccountModel } from '@/domain/models/account-model'


export class RemoteAuthentication {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<AuthenticationParams, AccountModel>
  ) {}

  async auth (params: AuthenticationParams): Promise<void> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params
    })
    switch (httpResponse.statusCode){
      case HttpStausCode.ok: break
      case HttpStausCode.unathorazed: throw new InvalidCredentialsError()
      default: throw new UnexpectedError()
    }
  }
}