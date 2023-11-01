<template>
  <div>
    <Header />
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";

export default {
  components: { Header },
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

.main_container{
  
}
</style>

