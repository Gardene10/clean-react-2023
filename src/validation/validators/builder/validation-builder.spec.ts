
import { RequiredFieldValidation, EmailValidation, MinlengthValidation } from "@/validation/validators"
import { ValidationBuilder as sut } from "./validation-builder"


describe('ValidationBuilder',() => {
    test('Shold return RequiredFieldValidation',() =>{
        const validations = sut.field('any_field').required().build()
        expect(validations).toEqual([new RequiredFieldValidation('any_field')])

    })

    test('Shold return EmailValidation',() =>{
        const validations = sut.field('any_field').email().build()
        expect(validations).toEqual([new EmailValidation('any_field')])

    })

    test('Shold return EmailValidation',() =>{
        const validations = sut.field('any_field').min(5).build()
        expect(validations).toEqual([new MinlengthValidation('any_field', 5)])

    })
})