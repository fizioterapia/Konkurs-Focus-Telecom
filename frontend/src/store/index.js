import { createStore } from "vuex";

export default createStore({
  state: {
    connections: [],
  },
  mutations: {
    readData(state) {
      if (localStorage.getItem("connections")) {
        state.connections = JSON.parse(localStorage.getItem("connections"));
      }
    },
    saveConnection(connections, data) {
      this.state.connections.push({
        id: this.state.connections.length + 1,
        time: data.time,
        status: data.status,
        consultant: data.consultant,
        called: new Date().getTime(),
      });

      localStorage.setItem(
        "connections",
        JSON.stringify(this.state.connections)
      );
    },
  },
  getters: {
    getConnections: (state) => {
      return state.connections;
    },
  },
  actions: {},
  modules: {},
});
