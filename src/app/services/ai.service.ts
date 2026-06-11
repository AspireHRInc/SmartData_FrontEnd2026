import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  loading?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AiService {
  private messagesSubject = new BehaviorSubject<ChatMessage[]>([]);
  public messages$ = this.messagesSubject.asObservable();

  private apiEndpoint = 'https://apiendpoint.xgwuaf9642.execute-api.us-east-2.amazonaws.com/prod/ai/chat';

  constructor(private http: HttpClient) {}

  getMessages(): ChatMessage[] {
    return this.messagesSubject.value;
  }

  clearMessages(): void {
    this.messagesSubject.next([]);
  }

  sendMessage(userMessage: string): Observable<ChatMessage> {
    const userMsg: ChatMessage = {
      role: 'user',
      content: userMessage,
      timestamp: new Date()
    };

    const currentMessages = [...this.messagesSubject.value, userMsg];
    this.messagesSubject.next(currentMessages);

    const loadingMsg: ChatMessage = {
      role: 'assistant',
      content: '',
      timestamp: new Date(),
      loading: true
    };
    this.messagesSubject.next([...currentMessages, loadingMsg]);

    // TODO: Uncomment when Bedrock endpoint is ready
    // return this.callBedrock(userMessage, currentMessages);

    return this.getStubResponse(userMessage, currentMessages);
  }

  private callBedrock(userMessage: string, history: ChatMessage[]): Observable<ChatMessage> {
    const payload = {
      message: userMessage,
      history: history.filter(m => !m.loading).map(m => ({
        role: m.role,
        content: m.content
      }))
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(this.apiEndpoint, payload, { headers }).pipe(
      map(response => {
        const assistantMsg: ChatMessage = {
          role: 'assistant',
          content: response.message || response.body || 'No response received.',
          timestamp: new Date()
        };

        const messages = this.messagesSubject.value.filter(m => !m.loading);
        this.messagesSubject.next([...messages, assistantMsg]);
        return assistantMsg;
      }),
      catchError(error => {
        const errorMsg: ChatMessage = {
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please try again.',
          timestamp: new Date()
        };

        const messages = this.messagesSubject.value.filter(m => !m.loading);
        this.messagesSubject.next([...messages, errorMsg]);
        return of(errorMsg);
      })
    );
  }

  private getStubResponse(userMessage: string, history: ChatMessage[]): Observable<ChatMessage> {
    return new Observable(observer => {
      setTimeout(() => {
        const assistantMsg: ChatMessage = {
          role: 'assistant',
          content: `This is a placeholder response. Connect your Bedrock endpoint to get real AI responses.\n\nYou said: "${userMessage}"`,
          timestamp: new Date()
        };

        const messages = this.messagesSubject.value.filter(m => !m.loading);
        this.messagesSubject.next([...messages, assistantMsg]);
        observer.next(assistantMsg);
        observer.complete();
      }, 1500);
    });
  }
}