import { AxiosHttpClient } from "@/infra/http/axios-htpp-client/axios-http-client"

export const makeAxiosHttpClient = ():AxiosHttpClient => {
    return new AxiosHttpClient()

}