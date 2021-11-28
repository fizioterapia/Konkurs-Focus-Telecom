<template>
  <div class="flex">
    <div class="alert" v-if="alert.length > 0">
      {{ alert }}
    </div>
    <div class="header">Skontaktuj się z naszymi konsultantami.</div>
    <p>Oddzwonimy do ciebie w ciągu 26 sekund.</p>
    <div id="input">
      <div class="center">
        <label class="form-label" for="form-number">
          <i class="fas fa-phone fa-2x"></i>
        </label>
        <input
          v-model="number"
          class="form-number"
          id="form-number"
          placeholder="123456789"
        />
      </div>
    </div>
    <div class="call-button" @click="call()">
      <i class="fas fa-phone fa-2x"></i>
      <p>Zadzwoń teraz</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      alert: "",
      number: "",
      //number: "794179902",
    };
  },
  methods: {
    async call() {
      var re = /^[0-9]{9}/;

      const value = re.test(this.number);
      if (!value || this.number.length > 9) {
        this.alert = "Został podany nieprawidłowy numer telefonu!";
        return;
      }

      let responseStream = await fetch("http://localhost:3000/call", {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({ number: this.number }),
      });

      let response = await responseStream.json();
      this.$router.push({
        name: "ringing",
        params: {
          status: "ringing",
          callsId: response.id,
          consultant: JSON.stringify(response.consultant),
        },
      });
    },
  },
};
</script>
