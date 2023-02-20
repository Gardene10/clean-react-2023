import { Validation } from "@/presentation/protocols/validation"
import { FieldValidation } from "@/validation/protocols/field-validation"

class ValidationComposite implements Validation {
    constructor (private readonly validators: FieldValidation[]){}
    validate(fieldName: string, fieldValue: string): string {
        const validators =  this.validators.filter(v => v.field === fieldName)
        for (const validator of validators) {
            const error =  validator.validate(fieldValue)
            if (error){
                return error.message
            }

        }
    }
}

class FieldvalidationSpy implements FieldvalidationSpy {
    error: Error = null

    constructor(readonly field: string) {}
    validate (value: string): Error {
        return this.error
    }

}

describe('ValidationComposite',() => {
    test('Shold return error if any validation fails',() =>{
        const fieldvalidationSpy = new FieldvalidationSpy('any_field')
        const fieldvalidationSpy2 = new FieldvalidationSpy('any_field')
        fieldvalidationSpy2.error = new Error('any_error_message')

        const sut = new ValidationComposite([
            fieldvalidationSpy,
            fieldvalidationSpy2
        ])
        const error = sut.validate('any_field', 'any_value')  
        expect(error).toBe('any_error_message')
    })
})    