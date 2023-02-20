
import { RequiredFieldValidation, EmailValidation, MinlengthValidation } from "@/validation/validators"
import { ValidationBuilder as sut } from "./validation-builder"
import faker from 'faker'

describe('ValidationBuilder',() => {
    test('Shold return RequiredFieldValidation',() =>{
        const field = faker.database.column()
        const validations = sut.field(field).required().build()
        expect(validations).toEqual([new RequiredFieldValidation(field)])

    })

    test('Shold return EmailValidation',() =>{
        const field = faker.database.column()
        const validations = sut.field(field).email().build()
        expect(validations).toEqual([new EmailValidation(field)])

    })

    test('Shold return MinLenghtValidation',() =>{
        const field = faker.database.column()
        const length = faker.random.number()
        const validations = sut.field(field).min(length).build()
        expect(validations).toEqual([new MinlengthValidation(field, length)])

    })

    test('Shold return a list of lValidations',() =>{
        const field = faker.database.column()
        const length = faker.random.number()
        const validations = sut.field(field).required().min(length).email().build()
        expect(validations).toEqual([
            new RequiredFieldValidation(field),
            new MinlengthValidation(field, length),
            new EmailValidation(field)
        ])
            

    })
})