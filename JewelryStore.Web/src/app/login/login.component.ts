import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/service/app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  error = '';

  constructor(private formBuilder: FormBuilder,
    private router: Router, private appService: AppService) { }

  ngOnInit(): void {
    this.appService.loginEmitter.emit(false);
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.appService.login({ userName: this.f.email.value, password: this.f.password.value })
      .then((res: any) => {
        if (res.isValid) {
          sessionStorage.setItem('loginId', res.user.id);
          sessionStorage.setItem('role', res.user.role);
          this.router.navigate(['calculate']);
        } else {
          this.error = 'Invalid email or password!';
        }
      }).catch(eRes => {
        this.error = 'Invalid email or password!';
      });
  }

}
