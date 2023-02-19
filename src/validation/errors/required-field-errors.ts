export class RequiredFieldError extends Error{
    constructor () {
        super('campo obrigatorio')
        this.name = 'RequiredFielError'
    }
}