
import React from "react"
import Faker from 'faker'
import SignUp from "./signup"
import { RenderResult , render, cleanup, fireEvent} from "@testing-library/react"
import {Helper, ValidationStub} from '@/presentation/test'




type SutTypes = {
    sut: RenderResult
  }

 type SutParams = {
  validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  
    const sut = render(
     <SignUp
      validation={validationStub}
     />
    )
  
    return {
      sut
    }
  }



  const populateField = (sut: RenderResult,fieldName: string, value = Faker.random.word()):  void => {
    const input = sut.getByTestId(fieldName)
    fireEvent.input(input,{target: {value}})
  }  


describe('SignUp Component',()=> {
  afterEach(cleanup)

      test('Should start with initial state',() => {
        
        const validationError = Faker.random.words()
        const {sut } = makeSut({validationError})
        Helper.testChildCount(sut,'error-wrap',0)
        Helper.testButtonIsDisable(sut,'submit',true)
        Helper.testStatusForField(sut,'name', validationError)
        Helper.testStatusForField(sut,'email', 'Campo Obrigatorio')
        Helper.testStatusForField(sut,'password', 'Campo Obrigatorio')
        Helper.testStatusForField(sut,'passwordConfirmation', 'Campo Obrigatorio')

      })

      test('Should show name error if Validation fails',() => {
        const validationError = Faker.random.words()
        const {sut } = makeSut({validationError})
        populateField(sut,'name')
        Helper.testStatusForField(sut,'name', validationError)
  
        })
    })