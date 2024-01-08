import {QuestionService} from './../../../core/services/question.service';
import {Component,Input,OnInit} from '@angular/core';
import {NgbActiveModal,NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import {QuestionName,QuestionType} from '../../../core/models/question';
import {AbstractControl,FormArray,FormBuilder,FormGroup,ReactiveFormsModule,ValidatorFn,Validators} from '@angular/forms';

@Component({
  selector: 'app-question-modal',
  standalone: true,
  imports: [ReactiveFormsModule,NgbTooltipModule],
  templateUrl: './question-modal.component.html',
  styleUrl: './question-modal.component.scss'
})
export class QuestionModalComponent implements OnInit {
  @Input({required: true}) name!: QuestionName
  @Input({required: true}) type!: QuestionType
  singleInputStructureForm!: FormGroup

  constructor (public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private questionService: QuestionService) {
    this.singleInputStructureForm = this.fb.group({
      name: ['',[Validators.required]],
      type: ['',[Validators.required]],
      label: ['',[Validators.required]],
      value: [''],
      isRequired: [false,[]],
      choices: this.fb.array([],[Validators.required,this.validateCorrectChoice()])
    })
  }

  ngOnInit (): void {
    this.initFormStructre()
  }

  initFormStructre () {
    this.singleInputStructureForm.patchValue({
      name: this.name,
      type: this.type
    })
    if ((this.type === 'text') || (this.type === 'textarea')) {
      this.singleInputStructureForm.removeControl('choices')
    } else {
      this.questionChoices.push(this.createFormGroupQuestionChoice())
      this.singleInputStructureForm.removeControl('value')

    }
  }
  get questionChoices () {
    return this.singleInputStructureForm.get('choices') as FormArray;
  }
  createFormGroupQuestionChoice (choiceText = null,isCorrect = false): FormGroup {
    return this.fb.group({
      choiceText: [choiceText,Validators.required],
      isCorrect: [isCorrect]
    });
  }
  handleQuestionChoice (key: "create" | 'remove',index: number) {
    switch (key) {
      case 'create':
        this.questionChoices.push(this.createFormGroupQuestionChoice())
        break;
      case 'remove':
        this.questionChoices.removeAt(index);
        break;
      default:
        break;
    }
  }
  validateCorrectChoice (): ValidatorFn {
    return (formArray: AbstractControl) => {
      if (formArray instanceof FormArray) {
        let correctChoicesCount = formArray.controls.filter((control) => control.get('isCorrect')?.value === true).length;

        if (this.type === 'radio') {
          return correctChoicesCount == 1 ? null : {notValidCorrectChoice: true};
        } else if (this.type === 'checkbox') {
          return correctChoicesCount >= 1 ? null : {notValidCorrectChoice: true};
        }
      }
      return null;
    };
  }
  emitSaveQuestion () {
    if (this.singleInputStructureForm.valid) {
      this.questionService.createQuestion(this.singleInputStructureForm.value)
      this.activeModal.close();
    } else {
      this.singleInputStructureForm.markAllAsTouched()
    }
  }
  closeModal(){
    this.activeModal.close();
    this.questionService.createQuestion(null)

  }
}
