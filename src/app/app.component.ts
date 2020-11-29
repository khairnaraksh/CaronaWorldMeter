import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'CaronaWorldMeter';
  constructor(public router: Router) { }
  Goto = (type) => {
    if (type === 'DashBoard') {
      this.router.navigate(['/Dashboard']);
    } else {
      this.router.navigate(['/Reports']);
    }
  }
}
