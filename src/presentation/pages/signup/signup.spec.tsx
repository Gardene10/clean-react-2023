import SignUp from "./signup"
import React from "react"
import { RenderResult , render} from "@testing-library/react"
import {Helper} from '@/presentation/test'




type SutTypes = {
    sut: RenderResult
   
  }

const makeSut = (): SutTypes => {
  
    const sut = render(
     <SignUp/>
    )
  
    return {
      sut
    }
  }



describe('SignUp Component',()=> {
      test('Should start with initial state',() => {
        const validationError = 'Campo Obrigatorio'
        const {sut } = makeSut()
        Helper.testChildCount(sut,'error-wrap',0)
        Helper.testButtonIsDisable(sut,'submit',true)
        Helper.testStatusForField(sut,'name', validationError)
        Helper.testStatusForField(sut,'email', validationError)
        Helper.testStatusForField(sut,'password', validationError)
        Helper.testStatusForField(sut,'passwordConfirmation', validationError)
  
        
      })
    })