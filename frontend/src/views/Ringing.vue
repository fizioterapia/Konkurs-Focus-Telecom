<template>
  <div class="flex">
    <div class="header">Zaraz nastąpi połączenie z konsultantem.</div>
  </div>
</template>

<script>
import ViewManager from "../services/ViewManager";

export default {
  props: {
    callsId: String,
    consultant: String,
  },
  mounted() {
    ViewManager.checkStatus(this.callsId, this.consultant);
  },
};
</script>
