import { Component } from '@angular/core';
import {FieldsComponent} from '../fields/fields.component';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FieldsComponent],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {

}
