import { InvalidFieldError } from "@/validation/errors"
import { EmailValidation } from "./email-validation"
import faker from 'faker'

const makeSut = (field: string): EmailValidation => new EmailValidation(field)

describe('EmailValidation',() => {
    test('Shold return error if email is invalid',() =>{
        const field = faker.database.column()
        const sut = makeSut(field)
        const error = sut.validate({[field]: faker.random.word()})
        expect(error).toEqual(new InvalidFieldError())
    })

    test('Shold return falsy if email is invalid',() =>{
        const field = faker.database.column()
        const sut = makeSut(field)
        const error = sut.validate({[field]:faker.internet.email()})
        expect(error).toBeFalsy()
    })

    test('Shold return falsy if email is empty',() =>{
        const field = faker.database.column()
        const sut = makeSut(field)
        const error = sut.validate({[field]:''})
        expect(error).toBeFalsy()
    })
})