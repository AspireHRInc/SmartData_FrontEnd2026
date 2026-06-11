import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewChecked, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
import { AiService, ChatMessage } from '../../services/ai.service';

@Component({
  selector: 'ss-ai-chat',
  templateUrl: './ai-chat.component.html',
  styleUrls: ['./ai-chat.component.less']
})
export class AiChatComponent implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChild('messagesContainer') messagesContainer!: ElementRef;
  @ViewChild('messageInput') messageInput!: ElementRef;
  @ViewChild('aiPanel') aiPanel!: ElementRef;

  messages: ChatMessage[] = [];
  inputValue = '';
  isOpen = false;
  private subscription!: Subscription;

  isDragging = false;
  isResizing = false;
  panelX = 0;
  panelY = 0;
  panelWidth = 352;
  panelHeight = 512;
  private dragOffsetX = 0;
  private dragOffsetY = 0;
  private resizeStartX = 0;
  private resizeStartY = 0;
  private resizeStartWidth = 0;
  private resizeStartHeight = 0;
  private initialized = false;

  constructor(private aiService: AiService) {}

  ngOnInit(): void {
    this.subscription = this.aiService.messages$.subscribe((messages: ChatMessage[]) => {
      this.messages = messages;
    });
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
    if (this.isOpen && !this.initialized && this.aiPanel) {
      this.panelX = window.innerWidth - this.panelWidth - 24;
      this.panelY = window.innerHeight - this.panelHeight - 80;
      this.initialized = true;
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  toggle(): void {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.initialized = false;
      setTimeout(() => {
        if (this.messageInput) {
          this.messageInput.nativeElement.focus();
        }
      }, 300);
    }
  }

  sendMessage(): void {
    const trimmed = this.inputValue.trim();
    if (!trimmed) return;

    this.inputValue = '';
    this.aiService.sendMessage(trimmed).subscribe();
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  clearChat(): void {
    this.aiService.clearMessages();
  }

  onDragStart(event: MouseEvent): void {
    if ((event.target as HTMLElement).closest('.close-btn') ||
        (event.target as HTMLElement).closest('.clear-btn')) {
      return;
    }
    this.isDragging = true;
    this.dragOffsetX = event.clientX - this.panelX;
    this.dragOffsetY = event.clientY - this.panelY;
    event.preventDefault();
  }

  onResizeStart(event: MouseEvent): void {
    this.isResizing = true;
    this.resizeStartX = event.clientX;
    this.resizeStartY = event.clientY;
    this.resizeStartWidth = this.panelWidth;
    this.resizeStartHeight = this.panelHeight;
    event.preventDefault();
    event.stopPropagation();
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (this.isDragging) {
      this.panelX = event.clientX - this.dragOffsetX;
      this.panelY = event.clientY - this.dragOffsetY;

      this.panelX = Math.max(0, Math.min(this.panelX, window.innerWidth - this.panelWidth));
      this.panelY = Math.max(0, Math.min(this.panelY, window.innerHeight - this.panelHeight));
    }

    if (this.isResizing) {
      const deltaX = this.resizeStartX - event.clientX;
      const deltaY = this.resizeStartY - event.clientY;

      this.panelWidth = Math.max(280, Math.min(800, this.resizeStartWidth + deltaX));
      this.panelHeight = Math.max(300, Math.min(800, this.resizeStartHeight + deltaY));

      this.panelX = this.resizeStartX - deltaX - this.panelWidth + this.resizeStartWidth;
    }
  }

  @HostListener('document:mouseup')
  onMouseUp(): void {
    this.isDragging = false;
    this.isResizing = false;
  }

  private scrollToBottom(): void {
    if (this.messagesContainer) {
      const el = this.messagesContainer.nativeElement;
      el.scrollTop = el.scrollHeight;
    }
  }
}
