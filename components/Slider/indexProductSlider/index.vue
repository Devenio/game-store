<template>
  <div class="relative">
    <h1
      class="text-xl px-10 text-gray-800 my-3"
      :class="$i18n.getLocaleCookie() == 'fa' ? 'text-right' : 'text-left'"
    >
      {{ $t("category.ctg") }}
    </h1>
    <VueSlickCarousel
      v-bind="setting"
      ref="carousel"
      class="relative px-5 z-10"
      style="height: 250px"
    >
      <Product
        v-for="item in categoryItems.items"
        :key="item.id"
        :cover="item.cover"
        :name="item.name"
        :id="item.id"
      />
    </VueSlickCarousel>
    <div class="text-center m-5 flex items-center justify-between">
      <fa
        class="lg mx-5 text-gray-800 cursor-pointer"
        :icon="['fas', 'angle-left']"
        @click="showNext()"
      ></fa>
      <fa
        class="lg mx-5 text-gray-800 cursor-pointer"
        :icon="['fas', 'angle-right']"
        @click="showPrev()"
      ></fa>
    </div>
  </div>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
// optional style for arrows & dots
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
import Product from "./product";
import { mapGetters } from "vuex";

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
  computed: mapGetters(["categoryItems"])
};
</script>

<style scoped></style>
