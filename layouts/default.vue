<template>
  <div class="w-full" id="app">
    <app-header />
    <Nuxt />
    <app-footer />
  </div>
</template>

<script>
import Header from "@/components/Header/index";
import Footer from "@/components/Footer/index";

export default {
  components: {
    appHeader: Header,
    appFooter: Footer,
  },
  head() {
    return this.$nuxtI18nHead();
  },
  mounted() {
    this.$i18n.setLocale(this.$i18n.getLocaleCookie());
  }
};
</script>

<style>
* {
  font-family: "persFont", "Helvetica";
}
</style>
