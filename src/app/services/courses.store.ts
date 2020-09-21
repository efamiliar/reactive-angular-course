import { MessagesService } from './../messages/messages.service';
import { LoadingService } from './../loading/loading.service';
import { HttpClient } from '@angular/common/http';
import { map, filter, catchError, tap } from 'rxjs/operators';
import { Course, sortCoursesBySeqNo } from './../model/course';
import { Observable, Subject, BehaviorSubject, throwError } from 'rxjs';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class CourseStore {

  private subject = new BehaviorSubject<Course[]>([]);

  course$: Observable<Course[]> = this.subject.asObservable();

  constructor(private http: HttpClient,
    private locadingService: LoadingService,
    private messagesService: MessagesService){

      this.loadAllCourses();

  }
  private loadAllCourses() {
    const locadCourses$ = this.http.get<Course[]>('/api/courses')
    .pipe(
      map(response => response['payload']),
      catchError(err => {
        const message = "Could not load courses";
        this.messagesService.showMessages(message);
        console.log(message, err);
        return throwError(err);
      }),
      tap(courses => this.subject.next(courses))
    )
    this.locadingService.showLoaderUntilComplete(locadCourses$).subscribe()
  }

 filterByCategory(category: string): Observable<Course[]>{
    return this.course$
    .pipe(
      map(courses =>
          courses.filter(course => course.category == category)
      .sort(sortCoursesBySeqNo)
      )
    );
 }

}
