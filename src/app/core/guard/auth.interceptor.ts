import {
  HttpInterceptorFn,
} from '@angular/common/http';
import { Constant } from '../constant/Constant';


export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem(Constant.TOKEN_KEY)
  if (!token) {
    return next(req);
  }
  const authReq = req.clone({
    setHeaders: {
      // 'Content-Type': 'application/json; charset=utf-8',
      // Accept: 'application/json',
      Authorization: `Bearer ${JSON.parse(token)}`,
    },
  });
  return next(authReq);
};
