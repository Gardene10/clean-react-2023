
import { RequiredFieldValidation, EmailValidation, MinlengthValidation } from "@/validation/validators"
import { ValidationBuilder as sut } from "./validation-builder"
import faker from 'faker'
import { CompareFieldsValidation } from "../compare-field/compare-fields-validation"

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

    test('Shold return CompareFieldsValidation',() =>{
        const field = faker.database.column()
        const fieldToCompare = faker.database.column()
        const validations = sut.field(field).sameAs(fieldToCompare).build()
        expect(validations).toEqual([new CompareFieldsValidation(field,fieldToCompare)])

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