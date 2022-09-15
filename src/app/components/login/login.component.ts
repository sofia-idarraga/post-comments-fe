import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService,
    private router: Router
    //private: StateService
  ) { }

  ngOnInit(): void {
  }

  async logIn() {
    const response = await this.authService.logInWithFirebase();
    if (response) {
      console.log(response)
      this.router.navigateByUrl('/posts')
    }
  }

}
