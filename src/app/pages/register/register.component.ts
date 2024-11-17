import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form: FormGroup;
  
  // Inject HttpClient in the constructor
  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.form = this.fb.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const formData = this.form.value;

      // Make a POST request to the API
      this.http.post('https://freeapi.miniprojectideas.com/api/User/CreateNewUser', formData)
        .subscribe(
          (response) => {
            console.log('User registered successfully:', response);
            alert('User registered successfully!');
          },
          (error) => {
            console.error('Error registering user:', error);
            alert('Registration failed. Please try again.');
          }
        );
    } else {
      alert('Please fill out the form correctly.');
    }
  }
}
