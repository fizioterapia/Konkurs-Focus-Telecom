<template>
  <div class="flex">
    <div class="header">Trwa połączenie...</div>
    <img
      class="consultant-image"
      :src="consultantObj.picture"
      :alt="consultantObj.name"
    />
    <div class="consultant">
      Obsługuje ciebie dziś, {{ consultantObj.name }}.
    </div>
    <div class="timer">{{ callTime }}</div>
  </div>
</template>

<script>
export default {
  props: {
    consultant: String,
  },
  data() {
    return {
      callTime: 0,
      interval: null,
      consultantObj: {},
    };
  },
  async mounted() {
    this.consultantObj = JSON.parse(this.consultant);

    this.interval = setInterval(() => {
      this.callTime++;
    }, 1000);
  },
  unmounted() {
    clearInterval(this.interval);

    this.$store.commit("saveConnection", {
      time: this.callTime,
      status: "ANSWERED",
      consultant: this.consultantObj,
    });
  },
};
</script>
