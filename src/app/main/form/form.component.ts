import {Component,ViewChild,inject} from '@angular/core';
import {FieldsComponent} from '../fields/fields.component';
import {FormArray,FormBuilder,FormGroup} from '@angular/forms';
import {NgbActiveModal,NgbModal,NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {QuestionModalComponent} from '../../shared/components/question-modal/question-modal.component';
import {Subscription} from 'rxjs';
import {QuestionService} from '../../core/services/question.service';
import {IQuestion,QuestionName,QuestionType} from '../../core/models/question';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FieldsComponent],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  formTypes: IQuestion[]
  formElementsStructure!: FormArray
  questionModalComponentRef!: NgbModalRef
  subscriptions: Subscription[] = []

  constructor (private fb: FormBuilder,
    private questionService: QuestionService,
    private modalService: NgbModal) {
    this.formTypes = [
      {type: 'textarea',icon: "fa-regular fa-file-lines",name: 'Text Area'},
      {type: 'text',icon: "fa-solid fa-paragraph",name: 'Text Input'},
      {type: 'checkbox',icon: "fa-solid fa-square-check",name: 'CheckBox'},
      {type: 'radio',icon: "fa-regular fa-circle-dot",name: 'Radio Button'}
    ]
    this.formElementsStructure = this.fb.array([])
  }

  open (question: {name: QuestionName,type: QuestionType}) {
    this.questionModalComponentRef = this.modalService.open(QuestionModalComponent);
    this.questionModalComponentRef.componentInstance.name = question.name;
    this.questionModalComponentRef.componentInstance.type = question.type;
    const sub = this.questionService.question.subscribe((data) => {
      console.log(data)
      sub.unsubscribe()
    })
  }
}
