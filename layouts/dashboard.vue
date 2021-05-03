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
  },
  head() {
    return this.$nuxtI18nHead();
  },
  mounted() {
    console.log(this.$i18n.getLocaleCookie());
    this.$i18n.setLocale(this.$i18n.getLocaleCookie());
  }
};
</script>

<style></style>
