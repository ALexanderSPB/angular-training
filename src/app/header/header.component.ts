import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userInfo: string;
  languages = [{
    name: 'English',
    id: 'en'
  }, {
    name: 'Russian',
    id: 'ru'
  }];
  language = new FormControl();

  constructor(public authService: AuthService, private router: Router, private translate: TranslateService) {
    translate.setDefaultLang('en');
  }

  ngOnInit() {
    this.language.setValue(this.languages[0].id);
    this.authService.getObservable()
      .subscribe(value => {
        this.userInfo = value
      });
    this.language.valueChanges.subscribe(lang => {
      this.translate.use(lang);
    })
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
