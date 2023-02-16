import React from 'react'
import { Router} from 'react-router-dom'
import { createMemoryHistory } from 'history' 
import Faker from 'faker'
import 'jest-localstorage-mock'
import {render,RenderResult,fireEvent,cleanup,waitFor} from '@testing-library/react'
import Login from './login'
import { ValidationStub, AuthenticationSpy } from '@/presentation/test'
import { InvalidCredentialsError } from '@/domain/errors'


type SutTypes = {
  sut: RenderResult
  authenticationSpy: AuthenticationSpy
 
}

type SutParams = {
  validationError: string
}
const history = createMemoryHistory()


function makeSut(params?: SutParams): SutTypes {
  const validationStub = new ValidationStub()
  const authenticationSpy = new AuthenticationSpy()
  validationStub.errorMessage = params?.validationError
  const sut = render(
    <Router history ={history}>
      <Login validation={validationStub} authentication={authenticationSpy} />
    
    </Router>
  )

  return {
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
  beforeEach(()=>{
    localStorage.clear()
  })


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

     test('Should call Authentication only once',() => {
      const {sut, authenticationSpy} = makeSut()

      simulateValidSubmit(sut)
      simulateValidSubmit(sut)
               
      expect(authenticationSpy.callsCount).toBe(1)
      

    })  

    test('Should not call Authentication if form is invalid',() => {
      const validationError = Faker.random.words()
      const {sut,authenticationSpy } = makeSut({validationError})

      populateEmailField(sut)
      fireEvent.submit(sut.getByTestId('form'))
               
      expect(authenticationSpy.callsCount).toBe(0)
      

    })  

    test('Should present error if Authentication fails',async () => {
      const {sut,authenticationSpy } = makeSut()
      const error = new InvalidCredentialsError()
      jest.spyOn(authenticationSpy,'auth').mockReturnValueOnce(Promise.reject(error))
      simulateValidSubmit(sut) 
      const errorWrap = sut.getByTestId('error-wrap')
      await waitFor(()=> errorWrap)
      const mainError = sut.findByTestId('main-error')    //mundei de getByTestId para findByTestId
      expect((await mainError).textContent).toBe(error.message)
      expect(errorWrap.childElementCount).toBe(1)
      

    })

    test('Should add accessToken to localstorage on success',async () => {
      const {sut,authenticationSpy } = makeSut()
      simulateValidSubmit(sut) 
      await waitFor(()=> sut.findByTestId('form'))  ////mundei de getByTestId para findByTestId
      expect(localStorage.setItem).toHaveBeenCalledWith('accessToken', authenticationSpy.account.accessToken)
      

    })

    test('Should go to signup page',() => {
      const {sut} = makeSut()
      const register = sut.getByTestId('signup')
      fireEvent.click(register)
      
      expect(history.length).toBe(2)
      expect(history.location.pathname).toBe('/signup')
      

    })
  })

              

    