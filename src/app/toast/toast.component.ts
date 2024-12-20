import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {
  @Input() message: string = '';
  @Input() type: 'success' | 'error' | 'info' | 'warning' = 'success';
  @Input() duration: number = 3000; // Default duration is 3 seconds

  show: boolean = false;

  ngOnInit() {
    this.show = true;
    setTimeout(() => {
      this.show = false;
    }, this.duration);
  }
}
