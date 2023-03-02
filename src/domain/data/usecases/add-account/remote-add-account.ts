
import { AccountModel } from "@/domain/models";
import { AddAccount, AddAccountParams } from "@/domain/usecases";
import { HttpPostClient } from "../../protocols/http";

export class RemoteAddAccount implements AddAccount{
    constructor (
        private readonly url: string,
        private readonly httpPostClient: HttpPostClient<AddAccountParams, AccountModel>
      ) {}

 async add (params:AddAccountParams): Promise<AccountModel> {
    await this.httpPostClient.post({
        url: this.url,
        body: params
    })
    return null
   
  }
}