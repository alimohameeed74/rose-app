import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../../footer/footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.css'],
  imports: [HeaderComponent, RouterOutlet, FooterComponent],
})
export class HomeLayoutComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
