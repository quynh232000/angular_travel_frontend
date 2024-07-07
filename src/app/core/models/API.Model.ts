export interface APIResponse {
  status: boolean;
  message: string;
  data: any;
  meta: any;
  links: string;
}
export class TokenResponse{
  access_token: string;
  expires_in: number;
  token_type: string;
  constructor(){
    this.access_token='';
    this.expires_in=0;
    this.token_type='';
  }

}
export class MetaResponse{
  current_page:number;
  last_page:number;
  next_page_url:string;
  per_page:number;
  prev_page_url:string;
  total:number
  constructor(){
    this.current_page=1;
    this.last_page=1;
    this.next_page_url='';
    this.per_page=10;
    this.prev_page_url='';
    this.total=0;
  }
}
export class TourModel {
  id: number;
  title: string;
  thumnail: string;
  images: string[];
  uuid: string;
  slug: string;
  type: string;
  category: string;
  price: number;
  price_child: number;
  price_baby: number;
  percent_sale: number;
  additional_fee: number;
  province_start_id: number;
  province_end_id: number;
  number_of_day: number;
  tour_pakage: string;
  quantity: number;
  date_start: Date;
  time_start: string;
  country_id: number;
  status: string;
  tourguide_id: number;
  transportation: string;
  created_at: Date;
  updated_at: Date;
  is_show: boolean;
  like_count: number;
  is_like: boolean;
  country: CountryModel;
  province_start: ProvinceModel;
  province_end: ProvinceModel;
  process_tour: ProcessTourModel[];
  tourguide: UserModel;
  constructor() {
    this.id = 0;
    this.title = '';
    this.thumnail = '';
    this.images = [];
    this.uuid = '';
    this.slug = '';
    this.type = '';
    this.category = '';
    this.price = 0;
    this.price_child = 0;
    this.price_baby = 0;
    this.percent_sale = 0;
    this.additional_fee = 0;
    this.province_start_id = 0;
    this.province_end_id = 0;
    this.number_of_day = 0;
    this.tour_pakage = '';
    this.quantity = 0;
    this.date_start = new Date();
    this.time_start = '';
    this.country_id = 0;
    this.status = '';
    this.tourguide_id = 0;
    this.transportation = '';
    this.created_at = new Date();
    this.updated_at = new Date();
    this.is_show = false;
    this.like_count = 0;
    this.is_like = false;
    this.country = new CountryModel();
    this.province_start = new ProvinceModel();
    this.province_end = new ProvinceModel();
    this.process_tour = [];
    this.tourguide = new UserModel();
  }
}

export class CountryModel {
  id: number;
  iso: string;
  name: string;
  nicename: string;
  iso3: string;
  numcode: string;
  phonecode: string;
  created_at: Date;
  updated_at: Date;
  constructor() {
    this.id = 0;
    this.iso = '';
    this.name = '';
    this.nicename = '';
    this.iso3 = '';
    this.numcode = '';
    this.phonecode = '';
    this.created_at = new Date();
    this.updated_at = new Date();
  }
}

export class ProvinceModel {
  id: number;
  name: string;
  thumnail: string;
  type: string;
  area: string;
  created_at: Date;
  updated_at: Date;
  constructor() {
    this.id = 0;
    this.name = '';
    this.thumnail = '';
    this.type = '';
    this.area = '';
    this.created_at = new Date();
    this.updated_at = new Date();
  }
}

export class ProcessTourModel {
  id: number;
  product_id: number;
  date: Date;
  title: string;
  content: string;
  created_at: Date;
  updated_at: Date;
  constructor() {
    this.id = 0;
    this.product_id = 0;
    this.date = new Date();
    this.title = '';
    this.content = '';
    this.created_at = new Date();
    this.updated_at = new Date();
  }
}

export class UserModel {
  id: number;
  uuid: string;
  full_name: string;
  email: string;
  avatar: string;
  phone_number: string;
  address: string;
  role: string;
  email_verified_at: any;
  created_at: Date;
  updated_at: Date;
  constructor() {
    this.id = 0;
    this.uuid = '';
    this.full_name = '';
    this.email = '';
    this.avatar = '';
    this.phone_number = '';
    this.address = '';
    this.role = '';
    this.email_verified_at = null;
    this.created_at = new Date();
    this.updated_at = new Date();
  }
}

export class NewsModel {
  id: number;
  user_id: number;
  title: string;
  slug: string;
  content: string;
  thumbnail: string;
  likes: string;
  is_show: boolean;
  user: UserModel;
  category: string;
  created_at: Date;
  updated_at: Date;
  constructor() {
    this.id = 0;
    this.user_id = 0;
    this.title = '';
    this.slug = '';
    this.content = '';
    this.thumbnail = '';
    this.likes = '';
    this.is_show = false;
    this.category = '';
    this.created_at = new Date();
    this.updated_at = new Date();
    this.user = new UserModel();
  }
}

export class LoginModel{
  email:string;
  password:string;
  constructor(){
    this.email='';
    this.password='';
  }
}
export class RegisterModel{
  full_name:string;
  email:string;
  password:string;
  password_confirmation:string;
  constructor(){
    this.email='';
    this.password='';
    this.password_confirmation='';
    this.full_name='';
  }
}
export class OrderModel{
  full_name:string;
  email:string;
  address:string;
  phone_number:string;
  quantity:number;
  quantity_child:number;
  quantity_baby:number;
  tour_id:number;
  note:string;
  constructor(){
    this.full_name='';
    this.email='';
    this.address='';
    this.phone_number='';
    this.quantity=1;
    this.quantity_child=0;
    this.quantity_baby=0;
    this.tour_id=0;
    this.note='';
  }
}