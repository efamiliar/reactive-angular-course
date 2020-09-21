import { TagPlaceholder } from '@angular/compiler/src/i18n/i18n_ast';
import {Injectable} from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { concatMap, finalize, tap } from 'rxjs/operators';

@Injectable()
export class LoadingService {

    private loadingSubject = new BehaviorSubject<boolean>(false);

    loading$: Observable<boolean> = this.loadingSubject.asObservable();
    

    showLoaderUntilComplete<T>(observable$:Observable<T>):Observable<T>{
        return of(null).pipe(
            tap(()=>this.loadingOn()),
            concatMap(()=> observable$),
            finalize(()=>this.loadingOff())
        );

    }

    loadingOn(){
        this.loadingSubject.next(true);
    }
    loadingOff(){
        this.loadingSubject.next(false);
    }

}