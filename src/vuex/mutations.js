export const changeUserStatus = (state,user)=>{
  if(user){
    state.currentUser=user;
    state.isLogin=true;
    if(typeof user === 'string'){
      state.userType='Admin';
      sessionStorage.setItem('userType','Admin');
      sessionStorage.setItem('admin','admin');
    }
    else if(user.cdkey!==undefined){
      state.userType='Merchant';
      sessionStorage.setItem('userType','Merchant');
      sessionStorage.setItem('merchantId',user.id);
      sessionStorage.setItem('cdkey',user.cdkey);
    }
    else {
      state.userType='Member';
      sessionStorage.setItem('userType','Member');
      sessionStorage.setItem('memberId',user.id);
      sessionStorage.setItem('level',user.level);
    }
  }
  else{
    if(user===null){
      sessionStorage.clear();

      state.currentUser=null;
      state.isLogin=false;
      state.userType=null;
    }
  }
};
export const changeUserToken = (state,userToken) => {
  if (userToken) {
    state.token = userToken;
  } else {
    state.token = null;
  }
};
