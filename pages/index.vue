<template>
  <div class="w-full">
    <div class="container mx-auto">
      <product-slider class="my-10"></product-slider>
      <div
        class=" relative transition-all duration-500 rounded-lg my-10 flex items-center justify-start overflow-x-auto"
        style="max-height:500px;"
        id="product-details-part"
      >
        <sub-category
          v-for="item in subCategory.items"
          :key="item.id"
          :cover="item.cover"
          :name="item.name"
          :id="item.id"
        />
      </div>

      <Product
        v-for="product in products.items"
        :key="product"
        :product="product"
      />
    </div>
  </div>
</template>

<script>
import ProductSlider from "@/components/Slider/indexProductSlider/index";
import Product from "@/components/Product/index";
import { mapState } from "Vuex";

export default {
  components: {
    ProductSlider,
    Product
  },
  data() {
    return {
      isClosed: false
    };
  },
  methods: {
    togglePdPart() {
      const pdPart = document.querySelector("#product-details-part");
      pdPart.classList.toggle("h-10");

      this.isClosed = !this.isClosed;
    }
  },
  async asyncData({ $axios, store }) {
    try {
      const categoryItems = await $axios.$get("index/GetCategory?language=fa");
      store.dispatch("setCategoryItems", categoryItems.body);
    } catch (ex) {
      console.log(ex);
    }
  },
  computed: mapState(["subCategory", "products"])
};
</script>

<style></style>
