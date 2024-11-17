import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, HttpClientModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginObj: Login;  // Object to hold form data
  form: FormGroup;

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.loginObj = new Login();
    this.form = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.loginObj.EmailId = this.form.value.email;
      this.loginObj.Password = this.form.value.password;

      console.log('Submitting login:', this.loginObj);

      // Make API call
      this.http.post('https://freeapi.miniprojectideas.com/api/User/Login', this.loginObj).subscribe(
        (res: any) => {
          if (res.result) {
            alert('Login Success');
          } else {
            alert(res.message || 'Something went wrong');
          }
        },
        (error: any) => {
          console.error('Error occurred:', error);
          alert('An error occurred. Please try again.');
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
}

export class Login {
  EmailId: string;
  Password: string;

  constructor() {
    this.EmailId = '';
    this.Password = '';
  }
}
