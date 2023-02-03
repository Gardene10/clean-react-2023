import React from 'react'
import {render,RenderResult} from '@testing-library/react'
import Login from './login'

type SutTypes = {
  sut: RenderResult
}

const makeSut = (): SutTypes => {
  const sut = render(<Login/>)
  return{
    sut
  }
}

describe('Login Component',()=> {
    test('Should start with initial state',() => {
      const {sut } = makeSut()
    

      const subimitButton = sut.getByTestId ('submit') as HTMLButtonElement
      expect(subimitButton.disabled).toBe(true)

   

     

    })
})