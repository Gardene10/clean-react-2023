import React from 'react'
import Faker from 'faker'
import {render,RenderResult,fireEvent,cleanup} from '@testing-library/react'
import Login from './login'
import { ValidationStub, AuthenticationSpy } from '@/presentation/test'




type SutTypes = {
  sut: RenderResult
  authenticationSpy: AuthenticationSpy
 
}

type SutParams = {
  validationError: string
}

const makeSut = (params?:SutParams): SutTypes => {    // (params?:SutParams) está opcional so quem precisar desse parametro será chamdo
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  
  const authenticationSpy = new AuthenticationSpy()
  
  const sut = render(<Login validation={validationStub} authentication={authenticationSpy} />)
  return{
    sut,
    authenticationSpy
  }
}

const simulateValidSubmit = (sut: RenderResult, email = Faker.internet.email(), password = Faker.internet.password()): void => {
    populateEmailField(sut,email)
    populatePasswordField(sut,password)
    
    const submitButton = sut.getByTestId('submit')
    fireEvent.click(submitButton)
}

const populateEmailField = (sut: RenderResult, email = Faker.internet.email()):  void => {
  const emailInput = sut.getByTestId('email')
  fireEvent.input(emailInput,{target: {value: email}})
}

const populatePasswordField = (sut: RenderResult, password = Faker.internet.password()):  void => {
  const passwordInput = sut.getByTestId('password')
  fireEvent.input(passwordInput,{target: {value: password}})
}

const simulateStatusForField =(sut: RenderResult, fieldName:string , validationError?: string ): void => {
  const emailStatus =sut.getByTestId(`${fieldName}-status`)
  expect (emailStatus.title).toBe(validationError || 'tudo ok')
  expect (emailStatus.textContent).toBe(validationError ? '🔴': '🟢')
}

describe('Login Component',()=> {
  afterEach(cleanup)

    test('Should start with initial state',() => {
      const validationError = Faker.random.words()
      const {sut } = makeSut({validationError})
    
      
      const errorWrap = sut.getByTestId('error-wrap')
      expect(errorWrap.childElementCount).toBe(0)

      const submitButton = sut.getByTestId ('submit') as HTMLButtonElement
      expect(submitButton.disabled).toBe(true)

      simulateStatusForField(sut,'email', validationError)
      simulateStatusForField(sut,'password', validationError)

      
    })

    
      test('Should show email error if Validation fails',() => {
        const validationError = Faker.random.words()
        const {sut } = makeSut({validationError})
        populateEmailField(sut)
        simulateStatusForField(sut,'email', validationError)
  
        })
        
        test('Should show password error if Validation fails',() => {
          const validationError = Faker.random.words()
          const {sut } = makeSut({validationError})
          populatePasswordField(sut)
          simulateStatusForField(sut,'password', validationError)
    
          })

          test('Should show valid password state if Validation succeeds',() => {
            const {sut } = makeSut()
            populatePasswordField(sut)
            simulateStatusForField(sut,'password')
      
            })

            test('Should show valid email state if Validation succeeds',() => {
              const {sut } = makeSut()
              populateEmailField(sut)
              const emailStatus =sut.getByTestId('email-status')
              expect (emailStatus.title).toBe('tudo ok')
              expect (emailStatus.textContent).toBe('🟢')
        
              })

              test('Should enable submit button if form is valid',() => {
                const {sut } = makeSut()
                populateEmailField(sut)
                populatePasswordField(sut)
                const submitButton = sut.getByTestId ('submit') as HTMLButtonElement
                expect(submitButton.disabled).toBe(false)
          
                })

                test('Should show spinner on submit',() => {
                  const {sut } = makeSut()
                  simulateValidSubmit(sut,)
                  const spinner = sut.getAllByTestId('spinner') //usei o getAllByTestId insted getByTestId
                  expect(spinner).toBeTruthy()
            
                  })

                  test('Should call Authentication with correct values',() => {
                    const {sut, authenticationSpy} = makeSut()
  
                    const email = Faker.internet.email()
                    const password = Faker.internet.password()
                    simulateValidSubmit(sut, email,password)
                    
                    expect(authenticationSpy.params).toEqual({
                      email,
                      password

                    })
              
                    })

                  

                  
    })
    