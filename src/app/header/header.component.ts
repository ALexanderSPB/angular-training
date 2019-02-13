import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  login(token, loginInfo) {
    this.authService.login(token, loginInfo);
    this.router.navigate(['courses']);
  };

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
