import { InvalidFieldError } from "@/validation/errors"
import { MinlengthValidation } from "./min-length-validation"
import faker from 'faker'

const makeSut = (): MinlengthValidation => new MinlengthValidation(faker.database.column(),5)

describe('MinlengthValidation',() => {
    test('Shold return error if value is invalid',() =>{
        const sut = makeSut()
        const error = sut.validate(faker.random.alphaNumeric(4))
        expect(error).toEqual(new InvalidFieldError())

    })

    test('Shold return falsy if value is valid',() =>{
        const sut = makeSut()
        const error = sut.validate(faker.random.alphaNumeric(5))
        expect(error).toBeFalsy()

    })
    
    
})    