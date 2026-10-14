import { Component, input, InputSignal, OnInit } from '@angular/core';

@Component({
  selector: 'app-err-mess',
  templateUrl: './err-mess.component.html',
  styleUrls: ['./err-mess.component.css'],
})
export class ErrMessComponent implements OnInit {
  mess: InputSignal<string> = input.required();
  constructor() {}

  ngOnInit() {}
}
