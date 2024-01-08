export interface IQuestion {
  type: QuestionType;
  icon: string;
  name: QuestionName
}
export type QuestionType = 'textarea' | 'text' | 'radio' | 'checkbox'
export type QuestionName = 'Text Area' | 'Text Input' | 'Radio Button' | 'Check Box'

export interface IReadyQuestion {
  name:QuestionName
  type:QuestionType
  label:string
  value:string
  isRequired:boolean
  choices?:IQuestionChoice[]
}
export interface IQuestionChoice {
  choiceText: string;
  isCorrect: boolean
}

