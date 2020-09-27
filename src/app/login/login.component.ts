import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthStoreService} from '../services/auth-store.service'


import {Router} from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authenticationStore: AuthStoreService) {

    this.form = fb.group({
      email: ['test@angular-university.io', [Validators.required]],
      password: ['test', [Validators.required]]
    });

  }

  ngOnInit() {

  }

  login() {

    const val = this.form.value;
    this.authenticationStore.login(val.email, val.password)
      .subscribe(
        () => {
            this.router.navigateByUrl('/courses')
        },
        err => {
          alert('Login failed')
        }
      )


  }

}
