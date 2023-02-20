export class FieldvalidationSpy implements FieldvalidationSpy {
    error: Error = null

    constructor(readonly field: string) {}
    validate (value: string): Error {
        return this.error
    }

}