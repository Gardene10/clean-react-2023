
import { FieldvalidationSpy } from "../test/mock-field-validation"
import { ValidationComposite } from "./validation-composite"
import faker from 'faker'

type sutTypes = {
    sut: ValidationComposite
    fieldvalidationsSpy: FieldvalidationSpy[]
}

const makeSut = (fieldName : string ): sutTypes => {
    const fieldvalidationsSpy = [ 
        new FieldvalidationSpy(fieldName),
        new FieldvalidationSpy(fieldName)

   ]
    
    const sut = new ValidationComposite(fieldvalidationsSpy)
    return {
        sut,
        fieldvalidationsSpy
    }

}


describe('ValidationComposite',() => {
    test('Shold return error if any validation fails',() =>{
        const fieldName = faker.database.collation()
        const {sut,fieldvalidationsSpy} = makeSut(fieldName)
        const errorMessage = faker.random.words()
        fieldvalidationsSpy[0].error = new Error(errorMessage)
        fieldvalidationsSpy[1].error = new Error(faker.random.words())

        const error = sut.validate(fieldName, faker.random.word())  
        expect(error).toBe(error)
    })

    test('Shold return error if any validation fails',() =>{
        const fieldName = faker.database.collation()
        const {sut} = makeSut(fieldName)
        const error = sut.validate('any_field',faker.random.word())  
        expect(error).toBeFalsy()
    })
})    