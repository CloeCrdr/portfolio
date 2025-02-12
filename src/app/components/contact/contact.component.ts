import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
import emailjs from '@emailjs/browser'

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('800ms ease-in', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class ContactComponent {
  @Input() activeSection: string = '';
  contact = { subject: '', name: '', email: '', message: '' };

  onSubmit() {
    const serviceID = "service_mc2kc3q";
    const templateID = "template_3oig3lj";
    const publicKey = "-n8KTebo4UB3lII6a"

    const templateParams = {
      subject: this.contact.subject, 
      name: this.contact.name,
      email: this.contact.email,
      message: this.contact.message
    };

    emailjs.send(serviceID, templateID, templateParams, publicKey)
      .then((response) => {
        console.log('Email envoyé avec succès !', response.status, response.text);
        alert('Merci ! Votre message a bien été envoyé 🚀');
      }, (err) => {
        console.error('Erreur lors de l\'envoi de l\'email :', err);
        alert('Oups ! Une erreur est survenue 😢');
      });
  }
}
