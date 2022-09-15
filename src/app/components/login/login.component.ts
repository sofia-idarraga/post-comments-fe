import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService,
    private router: Router,
    private state: StateService,
    private service: PostService
  ) { }

  ngOnInit(): void {
  }

  async logIn() {
    const response = await this.authService.logInWithFirebase();

    if (response) {
      console.log(response)
      this.state.state.next({
        logedIn: true,
        authenticatedPerson: response,
        token: ''
      })

      this.service.logIn({
        username: response.user.email,
        password: response.user.email
      }).subscribe({
        next: access => {
          // console.log(access.access_token)
          if (access) {
            this.state.state.next({
              logedIn: true,
              authenticatedPerson: response,
              token: access.access_token
            })
          }
        }
      })
      this.router.navigateByUrl('/posts')
    }
    console.log(response)
  }
}
