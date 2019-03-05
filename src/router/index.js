import Vue from 'vue'
import Router from 'vue-router'
import Welcome from "../components/Home/Welcome";
import MemberLogin from "../components/Home/MemberLogin";
import MerchantLogin from "../components/Home/MerchantLogin";
import AdminLogin from "../components/Home/AdminLogin";
import NotFound from "../components/NotFound";
import Member from "../components/Member/Member";
import Merchant from "../components/Merchant/Merchant";
import Admin from "../components/Admin/Admin";
import Yummy from "../components/Yummy";


Vue.use(Router);

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '*',
      component: NotFound
    },
    {
      path: '/',
      redirect: '/yummy',
    },
    {
      path: '/yummy',
      component: Yummy,
      children:[
        {
          path: '',
          name: 'home',
          component: Welcome
        },
        {
          path: 'memberLogin/:type',
          name: 'memberLogin',
          component: MemberLogin
        },
        {
          path: 'merchantLogin/:type',
          name: 'merchantLogin',
          component: MerchantLogin
        },
        {
          path: 'adminLogin',
          name: 'adminLogin',
          component: AdminLogin
        }
      ]
    },
    {
      path: '/member',
      name: 'member',
      component: Member,
      // children: [
      //   {
      //   }
      // ]
    },
    // {
    //   path: '/merchant',
    //   name: 'merchant',
    //   component: Merchant,
    //   children: [
    //     {
    //
    //     }
    //   ]
    // },
    // {
    //   path: '/admin',
    //   name: 'admin',
    //   component: Admin,
    //   children: [
    //     {
    //
    //     }
    //   ]
    // }

  ]
})
