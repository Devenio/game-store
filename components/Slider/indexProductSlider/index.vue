<template>
  <div class="relative">
    <VueSlickCarousel
      v-bind="setting"
      ref="carousel"
      class="relative px-5 z-10"
      style="height: 250px"
      v-if="!$fetchState.pending"
    >
      <Product
        v-for="item in categoryItems.items"
        :key="item.id"
        :cover="item.cover"
        :name="item.name"
        :id="item.id"
      />
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
              slidesPerRow: 3
              // autoplay: true
            }
          },
          {
            breakpoint: 768,
            settings: {
              dots: false,
              arrows: false,
              slidesPerRow: 2
              // autoplay: true
            }
          },
          {
            breakpoint: 500,
            settings: {
              dots: false,
              arrows: false,
              slidesPerRow: 1
              // autoplay: true
            }
          }
        ]
      },
      categoryItems: {}
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
    this.categoryItems = this.$store.state.categoryItems;
  },
  mounted() {
    console.log("slider: ", this.categoryItems.items);
  }
};
</script>

<style scoped></style>
