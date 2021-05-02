<template>
  <div class="w-full">
    <app-header />
    <Offer />
    <Nuxt />
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/Header/index";
import Footer from "@/components/Footer/index";

export default {
  components: {
    appHeader: Header,
    Footer
  }
};
</script>

<style>
*{
  font-family: "persFont", "Helvetica"
}
</style>
