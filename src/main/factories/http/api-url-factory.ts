
export const makeApiUrl = (path: string): string => {
    return `${process.env.API_URL}${path}`  //definição de variaveis de ambiente //esta no webpack


}