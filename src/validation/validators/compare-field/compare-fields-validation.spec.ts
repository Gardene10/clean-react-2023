import {CompareFieldsValidation} from './compare-fields-validation'
import { InvalidFieldError } from "@/validation/errors"
import faker from 'faker'

const makeSut = (field: string,feildToCompare: string): CompareFieldsValidation => new CompareFieldsValidation(field,feildToCompare)



describe('CompareFieldsValidation',()=> {
    test('Should return error if compare is invalid',()=>{
        const field = faker.database.column()
        const fieldToCompare = faker.database.column()
        const sut =  makeSut(field,fieldToCompare)
        const error =sut.validate({
           [field]: faker.random.word(),
           [fieldToCompare]: faker.random.word()

        })
        expect(error).toEqual(new InvalidFieldError())

    })

    test('Should return falsy if compare is valid',()=>{
        const field = faker.database.column()
        const fieldToCompare = faker.database.column()
        const value = faker.random.word()
        const sut =  makeSut(field,fieldToCompare)
        const error = sut.validate({
            [field]: value,
            [fieldToCompare]:value
        })
 
        expect(error).toBeFalsy()

    })


})
