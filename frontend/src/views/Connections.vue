<template>
  <div class="cont">
    <h1><i class="fas fa-phone"></i> Połączenia</h1>
    <div class="row" v-if="connections.length > 0">
      <div class="item" v-for="connection in connections" :key="connection.id">
        <Connection :data="connection"></Connection>
      </div>
    </div>
    <div class="center" v-else>
      <span class="alert">Brak połączeń</span>
    </div>
  </div>
</template>

<script>
import Connection from "../components/Connection.vue";

export default {
  data() {
    return {
      connections: [],
    };
  },
  async mounted() {
    this.connections = this.$store.getters.getConnections;
  },
  components: {
    Connection,
  },
};
</script>
