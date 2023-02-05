import React from 'react'
import {render,RenderResult,fireEvent,cleanup} from '@testing-library/react'
import Login from './login'
import { Validation } from '@/presentation/protocols/validation'

type SutTypes = {
  sut: RenderResult
  validationSpy: validationSpy
}

class validationSpy implements Validation {
  errorMessage: string
  input: object

  validate (input: object): string{
    this.input = input
    return this.errorMessage
  }

}

const makeSut = (): SutTypes => {
  const validationSpy = new validationSpy()
  const sut = render(<Login validation={validationSpy}/>)
  return{
    sut,
    validationSpy
  }
}

describe('Login Component',()=> {
  afterEach(cleanup)

    test('Should start with initial state',() => {
      const {sut } = makeSut()
  
      const subimitButton = sut.getByTestId ('submit') as HTMLButtonElement
      expect(subimitButton.disabled).toBe(true)
    })

    test('Should call Validation with correct value',() => {
      const {sut, validationSpy } = makeSut()
      const emailInput = sut.getByTestId('email')
      fireEvent.input(emailInput,{target: {value: 'any_email'}})
      expect(validationSpy.input).toEqual({
        email: 'any_email'
      })

  
  
    })

    
})