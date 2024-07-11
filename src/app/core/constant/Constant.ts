export const Constant ={
    // API_URL :"https://travelapi.mr-quynh.com/api/",
    API_URL :"http://127.0.0.1:8000/api/",
    // API_URL :"http://192.168.1.172:8000/api/",
    TOKEN_KEY :"TOKEN",
    API_END_POINT:{
        USER_LOGIN:"auth/login",
        USER_REGISTER:"auth/register",
        USER_WITHGOOGLE:"auth/withgoogle",
        USER_UPDATE:"auth/update_profile",
        USER_CHANGE_PASSWORD:"auth/change_password",
        USER_PROFILE:"me",

        LOCATION_PROVINCE:'get_province',
        LOCATION_COUNTRY:'get_country',

        NEWS_LIST:'news/list_news',
        NEWS_DETAIL:'news/',

        TOUR_CREATE:'tour/create',
        TOUR_LIST:'tour/list_tour',
        TOUR_DETAIL:'tour/',
        TOUR_LIKE:'tour/like/',
        TOUR_FILTER:'tour/filterproducts',
        
        ORDER_CREATE:'order/checkout',
        ORDER_DETAIL:'order/',
        ORDER_HISTORY:'order/history',
        ORDER_VNPAY:'order/checkout-vnpay',
        ORDER_VNPAY_RESULT:'order/checkout-vnpay-result',
      


    },
    VALIDATION_MESSAGE:{
        REQUIRED:'This is a required field'
    }
}