import { SetStorage } from "@/domain/data/protocols/cache/set-storage";
import { LocalStorageAdapter } from "@/infra/cache/local-storage-adapter";
import { AxiosHttpClient } from "@/infra/http/axios-htpp-client/axios-http-client";

export const makeLocalStorageAdapter =(): SetStorage => {
    return new LocalStorageAdapter()
}