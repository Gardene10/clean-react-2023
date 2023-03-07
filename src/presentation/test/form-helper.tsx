import { fireEvent, RenderResult } from "@testing-library/react"
import Faker from 'faker'

export const testChildCount =(sut: RenderResult, fieldName: string, count: number ): void => {
    const el = sut.getByTestId(fieldName)
    expect(el.childElementCount).toBe(count)
  }  

  export const testButtonIsDisable =(sut: RenderResult, fieldName: string, isDisable: boolean ): void => {
    const button = sut.getByTestId(fieldName) as HTMLButtonElement
    expect(button.disabled).toBe(isDisable)
  }

  export const testStatusForField =(sut: RenderResult, fieldName:string , validationError?: string ): void => {
    const fieldStatus =sut.getByTestId(`${fieldName}-status`)
    expect (fieldStatus.title).toBe(validationError || 'tudo ok')
    expect (fieldStatus.textContent).toBe(validationError ? '🔴': '🟢')
  }

  export const populateField = (sut: RenderResult,fieldName: string, value = Faker.random.word()):  void => {
    const input = sut.getByTestId(fieldName)
    fireEvent.input(input,{target: {value}})
  } 

  export const testElementExist =(sut: RenderResult, fieldName: string ): void => {
    const el = sut.getByTestId(fieldName)
    expect(el).toBeTruthy()
  }