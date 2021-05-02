<template>
  <div class="w-full">
    <div class="container mx-auto">
      <product-slider class="my-10"></product-slider>
      <h1 class="text-right text-xl px-10 text-gray-800 my-3">
        :زیر دسته بندی ها
      </h1>
      <div
        class="relative transition-all duration-500 rounded-lg mx-10 flex items-center justify-start overflow-x-auto"
        style="max-height:550px;"
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
      <h1 class="text-right text-xl px-10 text-gray-800 my-3 mt-10">
        :محصولات
      </h1>
      <div class="flex flex-wrap">
        <product-info :data="productsInfo" />
        <div class="mx-auto w-full lg:w-3/5">
          <Product
            v-for="product in products.items"
            :key="product.id"
            :product="product"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductSlider from "@/components/Slider/indexProductSlider/index";
import Product from "@/components/Product/index";
import ProductInfo from "@/components/Product/info";
import { mapState } from "Vuex";

export default {
  components: {
    ProductSlider,
    Product,
    ProductInfo
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
  computed: {
    ...mapState(["subCategory", "products", "productsInfo"]),
  },

};
</script>

<style></style>
