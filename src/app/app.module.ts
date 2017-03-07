import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


//Components
import { MyApp } from './app.component';
import { AboutPage } from '../pages/settings/settings';
import { ContactPage } from '../pages/allRequests/allRequests';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { Comments } from '../pages/comments/comments';
import { Filter } from '../pages/filter/filter';
import { Items } from '../pages/items/items';
import { Likes } from '../pages/likes/likes';
import { List } from '../pages/list/list';
import { MakeAppointment } from '../pages/makeAppointment/makeAppointment';
import { MessageDetails } from '../pages/request-details/request-details';
import { Search } from '../pages/search/search';
import { SubCategory }  from '../pages/subCategory/subCategory';
import {AuthenticationPage} from '../pages/authentication/authentication';
import {Login} from '../pages/logIn/login';
import {SingUp} from '../pages/signUp/signup';
import {ChangePass} from '../pages/changePass/changePass';
import {AcceptedRequests} from '../pages/answeredRequests/accptedRequests';
import {DeclinedRequests} from '../pages/answeredRequests/declinedRequest';
import {RegisterFirm} from '../pages/registerFirm/registerFirm';
import {EditFirm} from '../pages/editFirm/editFirm';
import {AllMessages} from '../pages/allMessages/allMessages';
import {FullChat} from '../pages/fullChat/fullChat';

//Pipes
import {AcceptedPipes, BussinessItems, DeclinedPipes, WaitingPipes} from '../pipes/acceptedPipe';


//Services
import { CategoryService } from '../services/categoryService'
import { SubCategoryService } from '../services/subCategoryService'
import { RequestsService } from '../services/requestsService'
import { SettingsService } from '../services/settingsService';
import { AuthService } from '../services/authService'
import {UserService} from '../services/userService';
import {ListService} from '../services/listService';
import {LikesService} from '../services/likesService';
import {CommentService} from '../services/commentService';
import {MessagesService} from '../services/messagesService';

import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

export const firebaseConfig = {
  apiKey: "AIzaSyBhFm10gza26t4NzoAvyxZ32rtqAhefUSM",
  authDomain: "first-try-a4459.firebaseapp.com",
  databaseURL: "https://first-try-a4459.firebaseio.com",
  storageBucket: "first-try-a4459.appspot.com",
  messagingSenderId: "174295895541"
};

const myFirebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
};


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    Comments,
    TabsPage,
    Items,
    Filter,
    Likes,
    List,
    MakeAppointment,
    MessageDetails,
    Search,
    SubCategory,
    AuthenticationPage,
    Login,
    SingUp,
    ChangePass,
    AcceptedRequests,
    DeclinedRequests,
    AcceptedPipes,
    DeclinedPipes,
    WaitingPipes,
    BussinessItems,
    RegisterFirm,
    EditFirm,
    AllMessages,
    FullChat
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig)

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    Comments,
    TabsPage,
    Filter,
    Items,
    Likes,
    List,
    MakeAppointment,
    MessageDetails,
    Search,
    SubCategory,
    AuthenticationPage,
    Login,
    SingUp,
    ChangePass,
    AcceptedRequests,
    DeclinedRequests,
    RegisterFirm,
    EditFirm,
    AllMessages,
    FullChat
  ],
  providers: [
    CategoryService,
    RequestsService,
    SettingsService,
    AuthService,
    UserService,
    SubCategoryService,
    ListService,
    LikesService,
    CommentService,
    MessagesService
  ]
})
export class AppModule {}
