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
        path: 'error',
        component: NotfoundComponent
        ,
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
