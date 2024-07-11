import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  OrderModel,
  OrderVNPAYModel,
  TourModel,
} from '../../core/models/API.Model';
import { TourService } from '../../core/services/tour.service';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { FormatdatePipe } from '../../shared/pipes/formatdate.pipe';
import { FormatpricePipe } from '../../shared/pipes/formatprice.pipe';
import { FormsModule } from '@angular/forms';
import { StoreService } from '../../core/services/store.service';
import { Constant } from '../../core/constant/Constant';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormatdatePipe,
    FormatpricePipe,
    FormsModule,
  ],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css',
})
export class BookingComponent {
  tourdetail: TourModel = new TourModel();
  orderVnpay: OrderVNPAYModel = new OrderVNPAYModel();
  private slugSubscription: Subscription | null = null;
  dateEnd: Date = new Date();
  loading: boolean = false;

  payment_type: string = 'COD';
  bank_name: string = 'NCB';

  orderObj: OrderModel = new OrderModel();
  isLogin: boolean = !!localStorage.getItem(Constant.TOKEN_KEY);

  isCheckPayment: boolean = false;

  // error message
  errorEmail: string = '';
  errorFull_name: string = '';
  errorPhone_number: string = '';
  errorAddress: string = '';
  errorQuantity: string = '';
  errorQuantityChild: string = '';
  errorQuantityBaby: string = '';

  errorMess: string = '';
  successMess: string = '';

  constructor(
    private TourService: TourService,
    private title: Title,
    private router: ActivatedRoute,
    private route: Router,
    private StoreService: StoreService,
    private location: Location
  ) {
    this.title.setTitle('Quin - Booking');
  }
  ngOnInit(): void {

    


    this.StoreService.login$.subscribe((isLogin) => {
      if (isLogin) {
        this.isLogin = true;
      }
    });
    this.StoreService.user$.subscribe((user) => {
      if (user) {
        this.orderObj.full_name = user.full_name;
        this.orderObj.email = user.email;
        this.orderObj.phone_number = user.phone_number;
        this.orderObj.address = user.full_name;
      }
    });

    if (!this.isLogin) {
      const currentPath = this.router.snapshot.url.join('/');
      this.route.navigate(['/login'], {
        queryParams: { redirect: currentPath },
      });
    }
    const quantity = localStorage.getItem('quantity');
    if (quantity) {
      this.orderObj.quantity = parseInt(quantity);
      localStorage.removeItem('quantity');
    }
    const quantity_child = localStorage.getItem('quantity_child');
    if (quantity_child) {
      this.orderObj.quantity_child = parseInt(quantity_child);
      localStorage.removeItem('quantity_child');
    }
    const quantity_baby = localStorage.getItem('quantity_baby');
    if (quantity_baby) {
      this.orderObj.quantity_baby = parseInt(quantity_baby);
      localStorage.removeItem('quantity_baby');
    }
    const note = localStorage.getItem('note');
    if (note) {
      this.orderObj.note = note;
      localStorage.removeItem('note');
    }

    this.slugSubscription = this.router.paramMap.subscribe((params) => {
     

      // get detail
      const slug = params.get('slug');
      if (slug) {
        this.TourService.getDetailTour(slug).subscribe((res) => {
          if (res.status) {
            this.tourdetail = res.data;

            this.dateEnd =
              this.tourdetail.process_tour[
                this.tourdetail.process_tour.length - 1
              ].date;

            this.orderObj.tour_id = this.tourdetail.id;
            this.checkResultPayment()
          } else {
            console.error('Error get tour detail:', res.message);
            this.route.navigate(['/error']);
          }
        });
      }
    });
  }

  checkResultPayment(){
    // check payment
    this.router.queryParams.subscribe(params => {
      const checkPayment = params['vnp_SecureHash'];
      if(checkPayment){
        this.isCheckPayment = true;
        const fullPath = this.location.path();
        this.TourService.orderVnpayResult(fullPath.split('?')[1],this.orderObj).subscribe(res=>{
          console.log(res);
          this.isCheckPayment= false
          if(res.status){
            this.route.navigate(['/ordersuccess'],{queryParams:{order_id:res.data.id}})
          }else{
            this.errorMess = res.message
          }
        })
      }
  })
  }
  ngOnDestroy(): void {
    if (this.slugSubscription) {
      this.slugSubscription.unsubscribe();
    }
  }
  onChangeQuantity(type: string, key: string) {
    switch (key) {
      case 'quantity':
        if (type == 'plus') {
          if (!this.checkQuantity()) {
            this.errorQuantity = 'Số lượng vé còn lại không đủ!';
          } else {
            this.orderObj.quantity++;
          }
        } else {
          if (this.orderObj.quantity > 1) {
            this.orderObj.quantity--;
          } else {
            this.errorQuantity = 'Số lượng phải lớn hơn 0';
          }
        }
        break;
      case 'quantity_child':
        if (type == 'plus') {
          if (!this.checkQuantity()) {
            this.errorQuantityChild = 'Số lượng vé còn lại không đủ!';
          } else {
            this.orderObj.quantity_child++;
          }
        } else {
          if (this.orderObj.quantity_child > 0) {
            this.orderObj.quantity_child--;
          } else {
            this.errorQuantityChild = 'Số lượng không hợp lệ';
          }
        }
        break;

      case 'quantity_baby':
        if (type == 'plus') {
          if (!this.checkQuantity()) {
            this.errorQuantityBaby = 'Số lượng vé còn lại không đủ!';
          } else {
            this.orderObj.quantity_baby++;
          }
        } else {
          if (this.orderObj.quantity_baby > 0) {
            this.orderObj.quantity_baby--;
          } else {
            this.errorQuantityBaby = 'Số lượng không hợp lệ';
          }
        }
        break;
      default:
        break;
    }
  }
  checkQuantity(): boolean {
    const total =
      this.orderObj.quantity +
      this.orderObj.quantity_baby +
      this.errorQuantityBaby;
    if (+total >= this.tourdetail.quantity) {
      return false;
    } else {
      this.errorQuantity = '';
      this.errorQuantityChild = '';
      this.errorQuantityBaby = '';
      return true;
    }
  }
  validateEmail(email: string) {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  }
  onSubmit(): void {
    this.errorEmail = '';
    this.errorFull_name = '';
    this.errorPhone_number = '';
    this.errorAddress = '';
    this.errorQuantity = '';
    this.errorQuantityChild = '';
    this.errorQuantityBaby = '';

    this.errorMess = '';
    this.successMess = '';

    let isValidate: boolean = true;
    if (this.orderObj.full_name == '') {
      this.errorFull_name = 'Vui lòng nhập họ tên người nhận!';
      isValidate = false;
    }
    if (this.orderObj.email == '') {
      this.errorEmail = 'Vui lòng nhập email!';
      isValidate = false;
    } else if (!this.validateEmail(this.orderObj.email)) {
      this.errorEmail = 'Email không đúng định dạng!';
      isValidate = false;
    }
    if (
      this.orderObj.phone_number == '' ||
      this.orderObj.phone_number == null
    ) {
      this.errorPhone_number = 'Vui lòng nhập số điện thoại!';
      isValidate = false;
    }
    if (this.orderObj.address == '') {
      this.errorAddress = 'Vui lòng nhập địa chỉ nhận hàng!';
      isValidate = false;
    }
    if (!isValidate) {
      this.errorMess = 'Vui lòng nhập đầy đủ thông tin';
      return;
    }

    this.loading = true;

    if (this.payment_type == 'COD') {
      this.TourService.order(this.orderObj).subscribe((res) => {
        this.loading = false;
        if (res.status) {
          this.successMess =
            'Đặt tour thành công! Vui lòng check email của bạn để xác nhận đơn hàng.';
          this.orderObj = new OrderModel();
        }
      });
    } else {
      // payment with vnpay
      const total =
        +this.tourdetail.price * this.orderObj.quantity +
        +this.tourdetail.price_child * this.orderObj.quantity_child +
        +this.tourdetail.price_baby * this.orderObj.quantity_baby +
        +this.tourdetail.additional_fee;

      this.orderVnpay.amount = total;
      this.orderVnpay.bank_name = this.bank_name;
      const currentPath = this.router.snapshot.url.join('/');
      this.orderVnpay.returnUrl = currentPath;

      this.TourService.orderVnpay(this.orderVnpay).subscribe((res) => {
        if (res.status) {
          localStorage.setItem('quantity', this.orderObj.quantity + '');
          localStorage.setItem(
            'quantity_child',
            this.orderObj.quantity_child + ''
          );
          localStorage.setItem(
            'quantity_baby',
            this.orderObj.quantity_baby + ''
          );
          localStorage.setItem('note', this.orderObj.note + '');
          window.location.href = res.data.vnp_Url;
        }
      });
    }
  }
}
