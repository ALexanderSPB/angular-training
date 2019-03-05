import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userInfo: string;

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.getObservable()
      .subscribe(value => {
        this.userInfo = value
      })
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
