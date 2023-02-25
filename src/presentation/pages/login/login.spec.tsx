import React from 'react'
import { Router} from 'react-router-dom'
import { createMemoryHistory } from 'history' 
import Faker from 'faker'
import {render,RenderResult,fireEvent,cleanup,waitFor} from '@testing-library/react'
import Login from './login'   //import {Login} from '@/presentation/pages'
import {  } from '@/presentation/test/mock-save-access-token'
import { ValidationStub, AuthenticationSpy , SaveAccessTokenMock} from '@/presentation/test'
import { InvalidCredentialsError } from '@/domain/errors'



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

const testStatusForField =(sut: RenderResult, fieldName:string , validationError?: string ): void => {
  const emailStatus =sut.getByTestId(`${fieldName}-status`)
  expect (emailStatus.title).toBe(validationError || 'tudo ok')
  expect (emailStatus.textContent).toBe(validationError ? '🔴': '🟢')
}

const testErrorWrapChildCount =(sut: RenderResult, count: number ): void => {
  const errorWrap = sut.getByTestId('error-wrap')
  expect(errorWrap.childElementCount).toBe(count)
}

const testElementExist =(sut: RenderResult, fieldName: string ): void => {
  const el = sut.getAllByTestId(fieldName) 
  expect(el).toBeTruthy()
}

const testButtonIsDisable =(sut: RenderResult, fieldName: string, isDisable: boolean ): void => {
  const button = sut.getByTestId(fieldName) as HTMLButtonElement
  expect(button.disabled).toBe(isDisable)
}


describe('Login Component',()=> {
  afterEach(cleanup)



    test('Should start with initial state',() => {
      const validationError = Faker.random.words()
      const {sut } = makeSut({validationError})
      testErrorWrapChildCount(sut,0)
      testButtonIsDisable(sut,'submit',true)
      testStatusForField(sut,'email', validationError)
      testStatusForField(sut,'password', validationError)

      
    })

    
      test('Should show email error if Validation fails',() => {
        const validationError = Faker.random.words()
        const {sut } = makeSut({validationError})
        populateEmailField(sut)
        testStatusForField(sut,'email', validationError)
  
        })
        
        test('Should show password error if Validation fails',() => {
          const validationError = Faker.random.words()
          const {sut } = makeSut({validationError})
          populatePasswordField(sut)
          testStatusForField(sut,'password', validationError)
    
        })

        test('Should show valid password state if Validation succeeds',() => {
          const {sut } = makeSut()
          populatePasswordField(sut)
          testStatusForField(sut,'password')
      
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
           testButtonIsDisable(sut,'submit',false)
          
          
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
      testErrorWrapChildCount(sut,1)
      

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
      testErrorWrapChildCount(sut,1)
      

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
              

    