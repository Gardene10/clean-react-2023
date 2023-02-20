import { InvalidFieldError } from "@/validation/errors"
import { FieldValidation } from "@/validation/protocols/field-validation"
import { MinlengthValidation } from "./min-length-validation"



describe('MinlengthValidation',() => {
    test('Shold return error if value is invalid',() =>{
        const sut = new MinlengthValidation('field',5)
        const error = sut.validate('123')
        expect(error).toEqual(new InvalidFieldError())

    })

    test('Shold return falsy if value is valid',() =>{
        const sut = new MinlengthValidation('field',5)
        const error = sut.validate('12345')
        expect(error).toBeFalsy()

    })
    
    
})    