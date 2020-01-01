<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>
  @import '/assets/css/bootstrap.min.css';
  @import "/assets/css/bootstrap-select.css";
  @import "/assets/css/style.css";
  @import "/assets/css/flexslider.css";
  @import "/assets/css/font-awesome.min.css";
  @import "/assets/css/menu_sideslide.css";
  @import "/assets/css/jquery-ui1.css";
  @import "/assets/css/jquery.uls.grid.css";
  @import "/assets/css/jquery.uls.lcd.css";
  @import "/assets/css/easy-responsive-tabs.css";
  @import "/assets/css/jquery.uls.css";

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /*color: #2c3e50;*/
  }

  input::placeholder {
    color: #CCCCCC !important;
  }

  a {
    cursor: pointer;
  }

  a:hover {
    color: red;
  }
  .breadcrumb {
    height: 50px;
    font-size: 18px;
    background-color: #0099e5;
    color: #f3f3f3 !important;
    padding: 15px 10px;
    border-radius:0;
  }

  .breadcrumb span {
    color: #f3f3f3 !important;
  }


</style>
