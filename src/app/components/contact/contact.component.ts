import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter',[
        style({opacity: 0}),
        animate('800ms ease-in', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class ContactComponent {
  @Input() activeSection: string ='';
  contact = { name: '', email: '', message: '' };

  onSubmit() {
    alert(`Merci ${this.contact.name}, ton message a bien été envoyé ! 🚀`);
    this.contact = { name: '', email: '', message: '' }; 
  }
}
