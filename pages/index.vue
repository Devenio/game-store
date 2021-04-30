<template>
  <div class="w-full">
    <div class="container mx-auto">
      <product-slider class="my-10"></product-slider>
      <div
        class="w-full relative transition-all duration-500 bg-gradient-to-br from-red-200 to-blue-200 my-10 p-5 flex items-center justify-center flex-wrap overflow-y-scroll"
        style="max-height:500px;"
        id="product-details-part"
      >
        <product-details v-for="i in 6" :key="i" />

        <div
          class="flex absolute items-center justify-center rounded-full border-2 border-gray-700 text-gray-700 hover:bg-gray-700 hover:text-gray-100"
          style="width:30px;height:30px;top:10px;left:10px;"
          @click="togglePdPart()"
        >
          <fa
            :icon="['fas', isClosed ? 'angle-down' : 'angle-up']"
            size="lg"
          ></fa>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductSlider from "@/components/Slider/indexProductSlider/index";

export default {
  components: {
    ProductSlider
  },
  data() {
    return {
      isClosed: false
    };
  },
  methods: {
    togglePdPart() {
      const pdPart = document.querySelector("#product-details-part");
      pdPart.classList.toggle("h-0");

      this.isClosed = !this.isClosed;
    }
  }
};
</script>

<style></style>
