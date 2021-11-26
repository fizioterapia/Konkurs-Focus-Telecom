<template>
  <div class="cont">
    <h1 class="block"><i class="fas fa-address-book"></i> FAQ</h1>
    <ul>
      <li v-for="item in faq" :key="item.id">
        <h2>{{ item.question }}</h2>
        <p>{{ item.answer }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      faq: [],
    };
  },
  async mounted() {
    let data = await fetch("http://localhost:3000/faq", {
      method: "GET",
    });

    this.faq = await data.json();
  },
};
</script>
