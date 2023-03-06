import React from 'react'
import {render,RenderResult,fireEvent,cleanup,waitFor} from '@testing-library/react'
import {Login} from '@/presentation/pages'
import { ValidationStub, AuthenticationSpy , SaveAccessTokenMock, Helper} from '@/presentation/test'
import { InvalidCredentialsError } from '@/domain/errors'
import { Router} from 'react-router-dom'
import { createMemoryHistory } from 'history' 
import Faker from 'faker'


import {  } from '@/presentation/test/mock-save-access-token'





type SutTypes = {
  sut: RenderResult
  authenticationSpy: AuthenticationSpy
  saveAccessTokenMock: SaveAccessTokenMock
 
}

type SutParams = {
  validationError: string
}
const history = createMemoryHistory({ initialEntries:['/login'] })

function makeSut(params?: SutParams): SutTypes {
  const validationStub = new ValidationStub()
  const authenticationSpy = new AuthenticationSpy()
  const saveAccessTokenMock = new SaveAccessTokenMock()
  validationStub.errorMessage = params?.validationError
  const sut = render(
    <Router history ={history}>
      <Login
       validation={validationStub} 
       authentication={authenticationSpy}
       saveAccessToken={saveAccessTokenMock}
        />
    
    </Router>
  )

  return {
    sut,
    authenticationSpy,
    saveAccessTokenMock
  }
}

const simulateValidSubmit = async (sut: RenderResult, email = Faker.internet.email(), password = Faker.internet.password()): Promise<void> => {
    populateEmailField(sut,email)
    populatePasswordField(sut,password)
    
    const form = sut.getByTestId('form')
    fireEvent.submit(form)
    await waitFor(()=> form)
}

const populateEmailField = (sut: RenderResult, email = Faker.internet.email()):  void => {
  const emailInput = sut.getByTestId('email')
  fireEvent.input(emailInput,{target: {value: email}})
}

const populatePasswordField = (sut: RenderResult, password = Faker.internet.password()):  void => {
  const passwordInput = sut.getByTestId('password')
  fireEvent.input(passwordInput,{target: {value: password}})
}

const testElementExist =(sut: RenderResult, fieldName: string ): void => {
  const el = sut.getAllByTestId(fieldName) 
  expect(el).toBeTruthy()
}

describe('Login Component',()=> {
  afterEach(cleanup)



    test('Should start with initial state',() => {
      const validationError = Faker.random.words()
      const {sut } = makeSut({validationError})
      Helper.testChildCount(sut,'error-wrap',0)
      Helper.testButtonIsDisable(sut,'submit',true)
      Helper.testStatusForField(sut,'email', validationError)
      Helper.testStatusForField(sut,'password', validationError)

      
    })

    
      test('Should show email error if Validation fails',() => {
        const validationError = Faker.random.words()
        const {sut } = makeSut({validationError})
        populateEmailField(sut)
        Helper.testStatusForField(sut,'email', validationError)
  
        })
        
        test('Should show password error if Validation fails',() => {
          const validationError = Faker.random.words()
          const {sut } = makeSut({validationError})
          populatePasswordField(sut)
          Helper.testStatusForField(sut,'password', validationError)
    
        })

        test('Should show valid password state if Validation succeeds',() => {
          const {sut } = makeSut()
          populatePasswordField(sut)
          Helper.testStatusForField(sut,'password')
      
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
           Helper.testButtonIsDisable(sut,'submit',false)
          
          
        })

        test('Should show spinner on submit',async () => {
           const {sut } = makeSut()
           await simulateValidSubmit(sut)
           testElementExist(sut,'spinner')
        
            
        })

        test('Should call Authentication with correct values',async () => {
           const {sut, authenticationSpy} = makeSut()
  
           const email = Faker.internet.email()
           const password = Faker.internet.password()
           await simulateValidSubmit(sut, email,password)
                    
           expect(authenticationSpy.params).toEqual({
           email,
           password

        })  
     })

     test('Should call Authentication only once',async() => {
      const {sut, authenticationSpy} = makeSut()

      await simulateValidSubmit(sut)
      await simulateValidSubmit(sut)
               
      expect(authenticationSpy.callsCount).toBe(1)
      

    })  

    test('Should not call Authentication if form is invalid',async () => {
      const validationError = Faker.random.words()
      const {sut,authenticationSpy } = makeSut({validationError})
      await simulateValidSubmit(sut)     
      expect(authenticationSpy.callsCount).toBe(0)
      

    })  

    test('Should present error if Authentication fails',async () => {
      const {sut,authenticationSpy } = makeSut()
      const error = new InvalidCredentialsError()
      jest.spyOn(authenticationSpy,'auth').mockReturnValueOnce(Promise.reject(error))
      await simulateValidSubmit(sut)
      const mainError = sut.findByTestId('main-error')    //mundei de getByTestId para findByTestId
      expect((await mainError).textContent).toBe(error.message)
      Helper.testChildCount(sut,'error-wrap',1)
      

    })

    test('Should call SaveAccessToken on success',async () => {
      const {sut,authenticationSpy, saveAccessTokenMock } = makeSut()
      await simulateValidSubmit(sut) 
      expect(saveAccessTokenMock.accessToken).toBe(authenticationSpy.account.accessToken)
      expect(history.length).toBe(1)
      expect(history.location.pathname).toBe('/')

    })

    test('Should present error if SaveAccess fails',async () => {
      const {sut,saveAccessTokenMock } = makeSut()
      const error = new InvalidCredentialsError()
      jest.spyOn(saveAccessTokenMock,'save').mockReturnValueOnce(Promise.reject(error))
      await simulateValidSubmit(sut)
      const mainError = sut.findByTestId('main-error')    //mundei de getByTestId para findByTestId
      expect((await mainError).textContent).toBe(error.message)
      Helper.testChildCount(sut,'error-wrap',1)
      

    })

    test('Should go to signup page',() => {
      const {sut} = makeSut()
      const register = sut.getByTestId('signup')
      fireEvent.click(register)
      
      expect(history.length).toBe(2)
      expect(history.location.pathname).toBe('/signup')
      
    })

    
  })


    // nao refatorei esse test pq o getBytestid nao estava ok
  //const testElementText =(sut: RenderResult,fieldName: string , text:string ): void => {
    //const el = sut.getByTestId(fieldName)    //mundei de getByTestId para findByTestId
    //expect(el.textContent).toBe(text)
              

    