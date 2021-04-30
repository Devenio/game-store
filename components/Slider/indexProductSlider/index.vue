<template>
  <div class="relative">
    <VueSlickCarousel
      v-bind="setting"
      ref="carousel"
      class="relative px-5 z-10"
      style="height: 250px"
    >
      <Product v-for="i in 10" :key="i" />
    </VueSlickCarousel>
  </div>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
// optional style for arrows & dots
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
import Product from "./product";

export default {
  data() {
    return {
      setting: {
        dots: true,
        arrows: true,
        slidesPerRow: 4,
        // autoplay: true,
        responsive: [
          {
            breakpoint: 1280,
            settings: {
              dots: false,
              arrows: false,
              slidesPerRow: 2
              // autoplay: true
            }
          },
          {
            breakpoint: 768,
            settings: {
              dots: false,
              arrows: false,
              slidesPerRow: 1
              // autoplay: true
            }
          }
        ]
      }
    };
  },
  components: { VueSlickCarousel, Product },
  methods: {
    showNext() {
      this.$refs.carousel.next();
    },
    showPrev() {
      this.$refs.carousel.prev();
    }
  },
  fetch() {
    
  }
};
</script>

<style scoped></style>
