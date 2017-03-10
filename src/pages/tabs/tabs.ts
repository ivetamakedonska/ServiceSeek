import { Component } from '@angular/core';

//Components
import { HomePage } from '../home/home';
import { AboutPage } from '../settings/settings';
import { ContactPage } from '../allRequests/allRequests';
import { AllMessages } from '../allMessages/allMessages';

//Services
import {UserService} from "../../services/userService";
import {RequestsService} from '../../services/requestsService';
import {MessagesService} from '../../services/messagesService';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = AboutPage;
  tab3Root: any = ContactPage;
  tab4Root: any = ContactPage;
  tab5Root: any = AllMessages;

  constructor(private _user : UserService,
              private _requests: RequestsService,
              private _chat: MessagesService
  ) {
  }


}
