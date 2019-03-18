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
      path: '/member/:mem_name',
      component: Member,
      children: [
        {
          path: 'main',
          name: 'memberMain',
          components: {
            main: MemberMain
          }
        },
        {
          path: 'shop/:mer_id',
          name: 'memberShop',
          components: {
            main: MemberShop
          }
        },
        {
          path: 'info',
          name: 'memberInfo',
          components: {
            main: MemberInfo
          }
        },
        {
          path: 'deal',
          name: 'memberDeal',
          components: {
            main: MemberDeal
          }
        },
        {
          path: 'stat',
          name: 'memberStat',
          components: {
            main: MemberStat
          }
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
          }
        },
        {
          path: 'info',
          name: 'merchantInfo',
          components: {
            main: MerchantInfo
          },

        },
        {
          path: 'deal',
          name: 'merchantDeal',
          components: {
            main: MerchantDeal
          }
        },
        {
          path: 'stat',
          name: 'merchantStat',
          components: {
            main: MerchantStat
          }
        }
      ]
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
    }

  ]
})
