<template>
  <div class="component">
    <img :src="data.picture" :alt="data.name" />
    <h1>{{ data.name }}</h1>
    <div class="gender" v-if="data.gender == 'female'">
      <i class="fas fa-venus fa-2x"></i>
    </div>
    <div class="gender" v-else><i class="fas fa-mars fa-2x"></i></div>
  </div>
</template>

<script>
export default {
  name: "Consultant",
  props: {
    data: Object,
  },
};
</script>
