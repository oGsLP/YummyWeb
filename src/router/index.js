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
import MemberMain from "../components/Member/MemberMain";
import MemberShop from "../components/Member/MemberShop";
import MemberDeal from "../components/Member/MemberDeal";
import MemberStat from "../components/Member/MemberStat";
import MemberInfo from "../components/Member/MemberInfo";
import MerchantMenu from "../components/Merchant/MerchantMenu";
import MerchantInfo from "../components/Merchant/MerchantInfo";
import MerchantDeal from "../components/Merchant/MerchantDeal";
import MerchantStat from "../components/Merchant/MerchantStat";
import AdminSetting from "../components/Admin/AdminSetting";
import AdminStat from "../components/Admin/AdminStat";
import AdminApply from "../components/Admin/AdminApply";
import store from "../vuex/store";
import NoAccess from "../components/NoAccess";


Vue.use(Router);

const router = new Router({
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
      path: '/member/:mem_name',
      component: Member,
      children: [
        {
          path: 'main',
          name: 'memberMain',
          components: {
            main: MemberMain
          },
          meta:{
            isLogin: true,
            type: 'Member'
          },
        },
        {
          path: 'shop/:mer_id',
          name: 'memberShop',
          components: {
            main: MemberShop
          },
          meta:{
            isLogin: true,
            type: 'Member'
          },
        },
        {
          path: 'info',
          name: 'memberInfo',
          components: {
            main: MemberInfo
          },
          meta:{
            isLogin: true,
            type: 'Member'
          },
        },
        {
          path: 'deal',
          name: 'memberDeal',
          components: {
            main: MemberDeal
          },
          meta:{
            isLogin: true,
            type: 'Member'
          },
        },
        {
          path: 'stat',
          name: 'memberStat',
          components: {
            main: MemberStat
          },
          meta:{
            isLogin: true,
            type: 'Member'
          },
        }
      ]
    },
    {
      path: '/merchant/:cdkey',
      component: Merchant,
      children: [
        {
          path: 'menu',
          name: 'merchantMenu',
          components: {
            main: MerchantMenu
          },
          meta:{
            isLogin: true,
            type: 'Merchant'
          }
        },
        {
          path: 'info',
          name: 'merchantInfo',
          components: {
            main: MerchantInfo
          },
          meta:{
            isLogin: true,
            type: 'Merchant'
          }

        },
        {
          path: 'deal',
          name: 'merchantDeal',
          components: {
            main: MerchantDeal
          },
          meta:{
            isLogin: true,
            type: 'Merchant'
          }
        },
        {
          path: 'stat',
          name: 'merchantStat',
          components: {
            main: MerchantStat
          },
          meta:{
            isLogin: true,
            type: 'Merchant'
          }
        }
      ]
    },
    {
      path: '/admin',
      name: 'admin',
      redirect: {name: 'adminApply'},
      component: Admin,
      children:[
        {
          path: 'setting',
          name: 'adminSetting',
          components:{
            main: AdminSetting
          },
          meta:{
            isLogin: true,
            type: 'Admin'
          }
        },
        {
          path: 'stat',
          name: 'adminStat',
          components:{
            main: AdminStat
          },
          meta:{
            isLogin: true,
            type: 'Admin'
          }
        },
        {
          path: 'apply',
          name: 'adminApply',
          components:{
            main: AdminApply
          },
          meta:{
            isLogin: true,
            type: 'Admin'
          }
        }
      ]
    },
    {
      path: '/NoAccess',
      name: 'noAccess',
      component: NoAccess
    }
  ]
});

router.beforeEach((to,from,next)=>{
  if(to.meta.isLogin){
    let type = sessionStorage.getItem('userType');
    if(to.meta.type===type)
      next();
    else next({name: 'noAccess'});
  }
  else next();
});

export default router;
