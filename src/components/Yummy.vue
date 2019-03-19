<template>
  <div id="yummy-home">
    <div>
      <b-navbar toggleable="lg" type="dark" variant="dark" fixed="top">
        <b-navbar-brand :to="{name: 'home'}">
          <img src="" alt=""/>
          Yummy!
        </b-navbar-brand>

        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

        <b-collapse is-nav id="nav_collapse">
          <b-navbar-nav>
            <b-nav-item :to="{name: 'memberLogin', params:{type: 'login'}}">Member</b-nav-item>
            <b-nav-item :to="{name: 'merchantLogin', params:{type: 'login'}}">Merchant</b-nav-item>
            <b-nav-item :to="{name: 'adminLogin'}">Admin</b-nav-item>
            <b-nav-item href="#" disabled>Disabled</b-nav-item>
          </b-navbar-nav>

          <b-navbar-nav id="yummy-nav-text">
            <b-nav-text right>Yummy take-out service</b-nav-text>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-form>
              <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search" />
              <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
            </b-nav-form>

            <b-nav-item-dropdown text="Login" right>
              <b-dropdown-item :to="{name: 'memberLogin', params:{type: 'login'}}">Member</b-dropdown-item>
              <b-dropdown-item :to="{name: 'merchantLogin', params:{type: 'login'}}">Merchant</b-dropdown-item>
              <b-dropdown-item :to="{name: 'adminLogin'}">Admin</b-dropdown-item>
            </b-nav-item-dropdown>

            <b-nav-item-dropdown right>
              <!-- Using button-content slot -->
              <template slot="button-content"><em>Register</em></template>
              <b-dropdown-item :to="{name: 'memberLogin', params:{type: 'register'}}">Member</b-dropdown-item>
              <b-dropdown-item :to="{name: 'merchantLogin', params:{type: 'register'}}">Merchant</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>

    <div id="yummy-info">
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
    export default {
      name: "Yummy",
      beforeRouteEnter:(to,from,next) => {
        next(vm => {
          vm.$store.dispatch("setUser",null);
        });
      },
    }
</script>

<style scoped>
  #yummy-home{
    padding-top: 60px;
  }
  #yummy-nav-text{
    margin-left: 20%;
  }
  #yummy-info{
    background-color: rgba(240,248,255,0.1);
    height: 540px;
    width: 56%;
    margin: 50px 22% 0 22%;
    border: 1px solid ghostwhite;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.2) 15px 15px 15px;
  }
</style>
