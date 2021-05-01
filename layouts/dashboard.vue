<template>
  <div class="w-full bg-gray-200">
    <Offer v-if="offer" :data="offer" />
    <Header />
    <Nuxt />
  </div>
</template>

<script>
import Header from "@/components/Header/dashboardHeader";

export default {
  components: {
    Header
  },
  data() {
    return {
      offer: {}
    };
  },
  mounted() {
    this.$axios
      .$get("index/GetOffer?language=fa")
      .then(res => {
        this.offer = res.body[0];
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style></style>
