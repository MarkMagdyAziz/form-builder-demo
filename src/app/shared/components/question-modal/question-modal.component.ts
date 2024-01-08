import {QuestionService} from './../../../core/services/question.service';
import {Component,EventEmitter,Input,Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {QuestionName,QuestionType} from '../../../core/models/question';
import {FormArray, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-question-modal',
  standalone: true,
  imports: [],
  templateUrl: './question-modal.component.html',
  styleUrl: './question-modal.component.scss'
})
export class QuestionModalComponent {
  @Input({required: true}) name!: QuestionName
  @Input({required: true}) type!: QuestionType
  singleQuestionStructure!:FormArray
  constructor (public activeModal: NgbActiveModal,
    private fb:FormBuilder,
    private questionService: QuestionService) {
      this.singleQuestionStructure = this.fb.array([])
     }

  emitSaveQuestion () {
    this.questionService.createQuestion({name: this.name})
    this.activeModal.close();
  }

}
