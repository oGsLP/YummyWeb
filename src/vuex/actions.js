export const setUser=({commit},user)=>{
  commit('changeUserStatus',user);
};
export const setToken = ({commit},userToken) => {
  commit("changeUserToken",userToken)
};
