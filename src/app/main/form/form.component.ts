import {Component,signal} from '@angular/core';
import {FieldsComponent} from '../fields/fields.component';
import {FormsModule} from '@angular/forms';
import {NgbModal,NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {QuestionModalComponent} from '../../shared/components/question-modal/question-modal.component';
import {Subscription} from 'rxjs';
import {QuestionService} from '../../core/services/question.service';
import {IQuestion,IReadyQuestion,QuestionName,QuestionType} from '../../core/models/question';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FieldsComponent,JsonPipe,FormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  formTypes: IQuestion[]
  subscriptions: Subscription[] = []

  formElementsStructure: IReadyQuestion[] = []
  formElementsStructureSignal = signal(this.formElementsStructure)

  questionModalComponentRef!: NgbModalRef

  constructor (
    private questionService: QuestionService,
    private modalService: NgbModal) {
    this.formTypes = [
      {type: 'textarea',icon: "fa-regular fa-file-lines",name: 'Text Area'},
      {type: 'text',icon: "fa-solid fa-paragraph",name: 'Text Input'},
      {type: 'checkbox',icon: "fa-solid fa-square-check",name: 'Check Box'},
      {type: 'radio',icon: "fa-regular fa-circle-dot",name: 'Radio Button'}
    ]
  }

  open (question: {name: QuestionName,type: QuestionType}) {
    this.questionModalComponentRef = this.modalService.open(QuestionModalComponent,{size: 'lg',scrollable: true,backdrop:'static'});
    this.questionModalComponentRef.componentInstance.name = question.name;
    this.questionModalComponentRef.componentInstance.type = question.type;
    const sub = this.questionService.question.subscribe((q) => {
      q && this.formElementsStructureSignal.set([...this.formElementsStructureSignal(),q]);
      sub.unsubscribe()
    })
  }
}
