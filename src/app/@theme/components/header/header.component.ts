import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';

// import { UserData } from '../../../@core/data/users';
import { LayoutService } from '../../../@core/utils';
import { map, takeUntil } from 'rxjs/operators';
import { Subject, of } from 'rxjs';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { AuthService } from '../../../common/services/auth/auth-service/auth.service';
import { MessagingService } from '../../../common/services/messaging.service';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any = {};

  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
  ];

  currentTheme = 'default';

  userMenu = [
    // { title: 'Profile' },
    { title: 'Log out' },
  ];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              // private userService: UserData,
              private layoutService: LayoutService,
              private breakpointService: NbMediaBreakpointsService,
              private nbAuthService: NbAuthService,
              private authService: AuthService,
              private messagingService: MessagingService) {

    this.nbAuthService.onTokenChange()
    .subscribe((token: NbAuthJWTToken) => {
      if (token.isValid()) {
        // here we receive a payload from the token and assigne it to our `user` variable
        this.user = token.getPayload();
      }
    });
  }

  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;

    // This is a dummy service to get dummy users.
    // this.userService.getUsers()
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe((users: any) => this.user = users.nick);

    // To display the user's name at the top.
    // Here we get the payload from existing token and
    // extract user information from the token.
    this.nbAuthService.getToken()
      .subscribe((token: NbAuthJWTToken) => {
        this.user = token.getPayload();
      });

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);
  }

  // Below we implement Notification Subscription
  message; // for storing current message received

  subscribeNotifications() {
    let userId: number;
    this.authService.getUser()
    .subscribe(user => {
      userId = user.user_id;
      this.messagingService.requestPermission(userId);
    });
    // Perhaps the below statements should be inside subscribe
    // of getUser() below requestPermission.
    // Need to implement and try.
    this.messagingService.receiveMessage();
    this.message = this.messagingService.currentMessage;
  }

  // For checking if already subscribed and controlling visibility of
  // push notification icon in header
  isSubscribed() {
    if (Notification.permission !== 'granted') {
      return of(false);
    } else {
      return of(true);
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }
}
