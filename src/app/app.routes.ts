import { Routes } from '@angular/router';
import { LoginComponent } from './page/login/login.component';
import { RegisterComponent } from './page/register/register.component';
import { LayoutComponent } from './page/layout/layout.component';
import { HomeComponent } from './page/home/home.component';
import { CollectionComponent } from './page/collection/collection.component';
import { DetailComponent } from './page/detail/detail.component';
import { BookingComponent } from './page/booking/booking.component';
import { NewsComponent } from './page/news/news.component';
import { NewslistComponent } from './page/newslist/newslist.component';
import { NotfoundComponent } from './page/notfound/notfound.component';
import { LayoutaccountComponent } from './page/layoutaccount/layoutaccount.component';
import { AccountComponent } from './page/account/account.component';
import { OrderhistroyComponent } from './page/orderhistroy/orderhistroy.component';
import { SercurityComponent } from './page/sercurity/sercurity.component';
import { OrdersuccessComponent } from './page/ordersuccess/ordersuccess.component';
import { ForgotpasswordComponent } from './page/forgotpassword/forgotpassword.component';
import { ChangepasswordComponent } from './page/changepassword/changepassword.component';
import { CartComponent } from './page/cart/cart.component';
import { TestComponent } from './page/test/test.component';
import { ExamComponent } from './page/exam/exam.component';
import { FeatureComponent } from './page/feature/feature.component';
import { ContactComponent } from './page/contact/contact.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'test',
    component: TestComponent,
  },
  {
    path: 'exam',
    component: ExamComponent,
  },

  {
    path: 'forgotpassword',
    component: ForgotpasswordComponent,
  },
  {
    path: 'changepassword/:token',
    component: ChangepasswordComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'collection',
        component: CollectionComponent,
      },
      {
        path: 'tour/:slug',
        component: DetailComponent,
      },
      {
        path: 'booking/:slug',
        component: BookingComponent,
      },
      {
        path: 'news',
        component: NewslistComponent,
      },
      {
        path: 'news/:slug',
        component: NewsComponent,
      },
      {
        path: 'cart',
        component: CartComponent,
      },
      {
        path: 'error',
        component: NotfoundComponent
        ,
      },
      {
        path: 'feature',
        component: FeatureComponent,
      },
      {
        path: 'contact',
        component: ContactComponent,
      },
      {
        path: 'ordersuccess',
        component: OrdersuccessComponent
        ,
      },
      {
        path:"account",
        component:LayoutaccountComponent,
        children:[
          {
              path:"",
              component:AccountComponent
          },
          {
            path:"orderhistory",
            component:OrderhistroyComponent
          },
          {
            path:"sercurity",
            component:SercurityComponent
          }
        ]
      },
    ],
  },
  
  { path: '**', redirectTo: '/error', pathMatch: 'full' }
];
