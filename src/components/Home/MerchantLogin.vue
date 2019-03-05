<template>
  <div id="merchant-login">
    <b-form-group
      id="cdkey-set"
      description="Haven't got one? Apply for it !"
      label="CDKey"
      label-for="input-email"
      :invalid-feedback="invalidFeedback"
      :valid-feedback="validFeedback"
      :state="state"
    >
      <b-form-input id="input-cdkey" :state="state" v-model="name" trim />
    </b-form-group>

    <b-form-group
      id="password-set"
      label="Password"
      label-for="input1"
      :invalid-feedback="invalidFeedback"
      :valid-feedback="validFeedback"
      :state="state"
    >
      <b-form-input id="input-password" :state="state" v-model="name" trim />
    </b-form-group>
    <b-form-group>
      <label class="sr-only" for="inlineFormInputName2">Name</label>
      <b-input class="mb-2 mr-sm-2 mb-sm-0" id="inlineFormInputName2" placeholder="Jane Doe"></b-input>

      <label class="sr-only" for="inlineFormInputGroupUsername2">Username</label>
      <b-input-group prepend="@" class="mb-2 mr-sm-2 mb-sm-0">
        <b-input id="inlineFormInputGroupUsername2" placeholder="Username"></b-input>
      </b-input-group>

      <b-form-checkbox class="mb-2 mr-sm-2 mb-sm-0">Remember me</b-form-checkbox>

      <b-button variant="primary">Save</b-button>
    </b-form-group>

  </div>
</template>

<script>
  export default {
    computed: {
      state() {
        return this.name.length >= 4
      },
      invalidFeedback() {
        if (this.name.length > 4) {
          return ''
        } else if (this.name.length > 0) {
          return 'Enter at least 4 characters'
        } else {
          return 'Please enter something'
        }
      },
      validFeedback() {
        return this.state === true ? 'Thank you' : ''
      }
    },
    data() {
      return {
        name: ''
      }
    }
  }
</script>

<style scoped>
  #merchant-login{

  }
</style>
