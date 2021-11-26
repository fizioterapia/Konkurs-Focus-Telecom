<template>
  <div class="component">
    <img :src="data.consultant.picture" :alt="data.consultant.name" />
    <h1>{{ data.consultant.name }}</h1>
    <p>{{ this.getDuration() }}</p>
    <p>{{ this.getTime() }}</p>
  </div>
</template>

<script>
export default {
  name: "Connection",
  props: {
    data: Object,
  },
  methods: {
    getDuration() {
      let seconds = this.data.time;

      var d = Math.floor(seconds / (3600 * 24));
      var h = Math.floor((seconds % (3600 * 24)) / 3600);
      var m = Math.floor((seconds % 3600) / 60);
      var s = Math.floor(seconds % 60);

      var dDisplay = d > 0 ? d + "d" : "";
      var hDisplay = h > 0 ? h + "h" : "";
      var mDisplay = m > 0 ? m + "m" : "";
      var sDisplay = s > 0 ? s + "s" : "";

      return `${dDisplay} ${hDisplay} ${mDisplay} ${sDisplay} ${
        dDisplay + hDisplay + mDisplay + sDisplay <= 0 ? "0s" : ""
      }`;
    },
    getTime() {
      let timestamp = new Date(this.data.called);

      return `${timestamp.getDate()}/${timestamp.getMonth() + 1}/${
        timestamp.getFullYear() > 10
          ? timestamp.getFullYear()
          : "0" + timestamp.getFullYear()
      } ${
        timestamp.getHours() > 10
          ? timestamp.getHours()
          : "0" + timestamp.getHours()
      }:${
        timestamp.getMinutes() > 10
          ? timestamp.getMinutes()
          : "0" + timestamp.getMinutes()
      }:${
        timestamp.getSeconds() > 10
          ? timestamp.getSeconds()
          : "0" + timestamp.getSeconds()
      }`;
    },
  },
};
</script>
