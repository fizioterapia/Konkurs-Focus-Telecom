<template>
  <div id="site">
    <nav>
      <div class="nav-header">
        <h1>Help Desk</h1>
      </div>

      <router-link to="/"><i class="fas fa-phone"></i>Połącz się</router-link>
      <router-link to="/calls"
        ><i class="fas fa-address-book"></i>Połączenia</router-link
      >
      <router-link to="/consultants"
        ><i class="fas fa-users"></i>Konsultanci</router-link
      >
      <router-link to="/faq"><i class="fas fa-book"></i>FAQ</router-link>
    </nav>
    <div class="content">
      <div class="inner">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.commit("readData");
  },
};
</script>

<style lang="scss">
@import "./assets/scss/main.scss";
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;500&display=swap");
</style>
