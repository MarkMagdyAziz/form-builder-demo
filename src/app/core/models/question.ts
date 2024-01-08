export interface IQuestion {
  type: QuestionType;
  icon: string;
  name: QuestionName
}
export type QuestionType = 'textarea' | 'text' | 'radio' | 'checkbox'
export type QuestionName = 'Text Area' | 'Text Input' | 'Radio Button' | 'CheckBox'

