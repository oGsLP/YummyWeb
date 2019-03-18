<template>
  <button :class="operation">
  </button>
</template>

<script>
    export default {
      name: "SymbolButton",
      props: ['operation'],
    }
</script>

<style scoped>
  .add {
    background: transparent;
    color: green;
    border: 0;
    line-height: 30px;
    text-align: center;
    height: 30px;
    width: 30px;
    font-size: 28px;
    padding: 1px;
  }

  .add::before {
    content: "\271A";
  }
  .refresh {
    background: transparent;
    color: green;
    border: 0;
    line-height: 30px;
    text-align: center;
    height: 30px;
    width: 30px;
    font-size: 28px;
    padding: 1px;
  }

  .refresh::before {
    content: "\267B";
  }

  .close {
    background: transparent;
    color: red;
    border: 0;
    line-height: 20px;
    text-align: center;
    height: 20px;
    width: 20px;
    font-size: 18px;
    padding: 1px;
  }

  .close::before {
    content: "\2716";
  }

  .delete {
    background: transparent;
    color: red;
    border: 0;
    line-height: 30px;
    text-align: center;
    height: 30px;
    width: 30px;
    font-size: 28px;
    padding: 1px;
  }

  .delete::before {
    content: "\21BB";
  }

  .right {
    background: transparent;
    color: green;
    border: 0;
    line-height: 30px;
    text-align: center;
    height: 30px;
    width: 30px;
    font-size: 28px;
    padding: 1px;
  }

  .right::before {
    content: "\2714";
  }

</style>
