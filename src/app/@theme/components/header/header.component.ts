import { Component, OnInit, Injector } from '@angular/core';
import { AbstractBaseComponent } from 'src/app/@core/base/base.component';
import { filter } from 'rxjs/operators';
import { NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends AbstractBaseComponent implements OnInit {

  isCollapsed = true;
  url: string;
  userName: string;
  isLogin: boolean;
  constructor(injector: Injector) {
    super(injector);
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      this.url = event.url;
    });
  }

  ngOnInit(): void {
    this.userName = this.authenticationService.getDisplayName();
    this.isLogin = this.authenticationService.isLogin();
  }

  onLogout() {
    this.authenticationService.logOut();
    this.navigate(['/login']).catch((error) => {
      console.log(error);
    });
  }
}
