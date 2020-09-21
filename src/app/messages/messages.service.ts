import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable()
export class MessagesService {

  private messagesSubject = new BehaviorSubject<string[]>([]);

  errors$: Observable<string[]> = this.messagesSubject.asObservable()
    .pipe(filter(
        messages => messages && messages.length > 0
    ));

  showMessages(...errors: string[]){
    this.messagesSubject.next(errors);
  }

}
