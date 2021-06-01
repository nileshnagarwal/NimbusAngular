import { Component, OnInit, Input } from '@angular/core';
import { Quote } from '../../../common/interfaces/quote';

@Component({
  selector: 'ngx-quote-card',
  templateUrl: './quote-card.component.html',
  styleUrls: ['./quote-card.component.css'],
})
export class QuoteCardComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

  @Input() quote: Quote;

}
