<template>
  <div>
    <Header />
    <header-mobile />
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import HeaderMobile from "@/components/HeaderMobile.vue"

export default {
  components: { Header, HeaderMobile },
};
</script>

<style Lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@500&family=Roboto:wght@400;500;700;900&display=swap');
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  list-style: none;
  text-decoration: none;
}

button {
  cursor: pointer;
  border: none;
}

.header_container{
  max-width: 1420px;
  margin: 0 auto;
  padding: 19px 10px;
}

body.overflow-hidden {
    overflow: hidden;
}

@media only screen and (min-width: 992px){
    body.overflow-hidden {
        margin-right: 21px;
    }
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
</style>

