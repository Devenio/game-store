<template>
  <div class="w-full bg-gray-200">
    <Offer />
    <Header />
    <Nuxt />
  </div>
</template>

<script>
import Header from "@/components/Header/dashboardHeader";

export default {
  components: {
    Header
  }
};
</script>

<style></style>
