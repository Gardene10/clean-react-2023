import { InvalidFieldError } from "@/validation/errors"
import { MinlengthValidation } from "./min-length-validation"
import faker from 'faker'

const makeSut = (field: string): MinlengthValidation => new MinlengthValidation(field,5)

describe('MinlengthValidation',() => {
    test('Shold return error if value is invalid',() =>{
        const field = faker.database.column()
        const sut = makeSut(field)
        const error = sut.validate({[field]: faker.random.alphaNumeric(4)})
        expect(error).toEqual(new InvalidFieldError())

    })

    test('Shold return falsy if value is valid',() =>{
        const field = faker.database.column()
        const sut = makeSut(field)
        const error = sut.validate({[field]:faker.random.alphaNumeric(5)})
        expect(error).toBeFalsy()

    })
    
    test('Shold return falsy if field does not exist in schema',() =>{
        const sut = makeSut(faker.database.column())
        const error = sut.validate({[faker.database.column()]:faker.random.alphaNumeric(5)})
        expect(error).toBeFalsy()

    })
    
})    