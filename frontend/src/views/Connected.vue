<template>
  <div class="flex">
    <div class="header">Trwa połączenie...</div>
    <img
      class="consultant-image"
      :src="consultant.picture"
      :alt="consultant.name"
    />
    <div class="consultant">Obsługuje ciebie dziś, {{ consultant.name }}.</div>
    <div class="timer">{{ callTime }}</div>
  </div>
</template>

<script>
export default {
  async mounted() {
    let data = await fetch("http://localhost:3000/consultants", {
      method: "GET",
    });
    data = await data.json();
    this.consultant = data[Math.floor(Math.random() * data.length)];

    this.interval = setInterval(() => {
      this.callTime++;
    }, 1000);
  },
  data() {
    return {
      callTime: 0,
      interval: null,
      consultant: {},
    };
  },
  unmounted() {
    clearInterval(this.interval);

    this.$store.commit("saveConnection", {
      time: this.callTime,
      status: "ANSWERED",
      consultant: this.consultant,
    });
  },
};
</script>
