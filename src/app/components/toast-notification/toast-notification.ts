import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast-notification.html',
  styleUrls: ['./toast-notification.scss']
})
export class ToastNotificationComponent {
  @Input() isVisible: boolean = false;
  @Input() message: string = '';
  @Input() type: 'info' | 'success' | 'warning' | 'error' = 'info';
  @Output() closeToast = new EventEmitter<void>();

  get icon(): string {
    switch (this.type) {
      case 'success': return '✅';
      case 'warning': return '⚠️';
      case 'error': return '❌';
      default: return 'ℹ️';
    }
  }

  close(): void {
    this.closeToast.emit();
  }
}