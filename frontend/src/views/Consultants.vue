<template>
  <div class="cont">
    <h1><i class="fas fa-users"></i> Konsultanci</h1>
    <div v-if="consultants.length > 0" class="row">
      <div class="item" v-for="consultant in consultants" :key="consultant.key">
        <Consultant :data="consultant"></Consultant>
      </div>
    </div>
    <div class="center" v-else>
      <span class="alert"> Brak konsultantów :V </span>
    </div>
  </div>
</template>

<script>
import Consultant from "../components/Consultant.vue";

export default {
  data() {
    return {
      consultants: [],
    };
  },
  async mounted() {
    let data = await fetch("http://localhost:3000/consultants", {
      method: "GET",
    });

    this.consultants = await data.json();
  },
  components: {
    Consultant,
  },
};
</script>
