<template>
  <div class="flex">
    <div class="header">Połączenie zakończone.</div>
    <div class="call-button" @click="$router.push('/')">
      <i class="fas fa-phone fa-2x"></i>
      <p>Spróbuj ponownie</p>
    </div>
  </div>
</template>
<script>
import ViewManager from "../services/ViewManager";
export default {
  mounted() {
    ViewManager.stopPolling();
  },
};
</script>
