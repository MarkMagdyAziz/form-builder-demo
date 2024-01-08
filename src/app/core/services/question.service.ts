import {EventEmitter, Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private questionModal$ = new EventEmitter<any>();
  question = this.questionModal$.asObservable()

  constructor () {
  }
  createQuestion (question: any) {
    this.questionModal$.next(question)
  }
}
