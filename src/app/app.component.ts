import { Component, HostListener } from '@angular/core';
import { HomeComponent } from './components/home/home.component';

@Component({
  selector: 'app-root',
  standalone:true,
  imports: [HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'portfolio | Cloe Gaspar Cordeiro';
  menuOpen = false;

  activeSection: string = '';
  showButton: boolean = false;

  setActiveSection(section: string) {
    this.activeSection = section;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showButton = window.pageYOffset > 100;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth'}); 
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
  
}
