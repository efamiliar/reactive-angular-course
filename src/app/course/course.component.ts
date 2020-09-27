import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Course} from '../model/course';
import {
  debounceTime,
  distinctUntilChanged,
  startWith,
  tap,
  delay,
  map,
  concatMap,
  switchMap,
  withLatestFrom,
  concatAll, shareReplay, catchError, combineAll
} from 'rxjs/operators';
import {merge, fromEvent, Observable, concat, throwError, combineLatest} from 'rxjs';
import {Lesson} from '../model/lesson';
import { CoursesService } from 'app/services/courses.service';

interface data {
  course: Course,
  lessons: Lesson[]
}

@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  data$: Observable<data>;

  constructor(private route: ActivatedRoute,
    private courseService: CoursesService) {

  }

  ngOnInit() {
    const courseId = parseInt(this.route.snapshot.paramMap.get("courseId"));
    const course$ = this.courseService.loadCourseById(courseId)
    .pipe(
      startWith(null)
    );
    const lessons$ = this.courseService.loadAllCourseLessons(courseId)
    .pipe(
      startWith([])
    );

    this.data$ = combineLatest([course$, lessons$])
      .pipe(
          map(([course, lessons]) => {
            return {course, lessons}         
          })
      )


  }


}











