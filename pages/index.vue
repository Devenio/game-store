<template>
  <div class="w-full">
    <div class="container mx-auto">
      <product-slider class="my-10"></product-slider>
      <h1
        class="text-xl px-10 text-gray-800 my-3"
        :class="$i18n.getLocaleCookie() == 'fa' ? 'text-right' : 'text-left'"
      >
        {{ $t("category.subCtg") }}
      </h1>
      <div
        class="relative transition-all duration-500 rounded-lg mx-10 flex items-center justify-start overflow-x-auto"
        style="max-height:550px;"
        id="product-details-part"
      >
        <div
          class="w-full my-20 flex items-center justify-center"
          v-if="!subCategory.items"
        >
          {{ $t("category.subCtgMsg") }}
        </div>
        <sub-category
          v-for="item in subCategory.items"
          :key="item.id"
          :cover="item.cover"
          :name="item.name"
          :id="item.id"
        />
      </div>
      <h1 class="text-xl px-10 text-gray-800 my-3 mt-10" :class="$i18n.getLocaleCookie() == 'fa' ? 'text-right' : 'text-left'">
        {{ $t("category.products") }}
      </h1>
      <div class="flex flex-wrap mb-10">
        <div class="w-full lg:w-2/5"><product-info :data="productsInfo" /></div>
        <div class="mx-auto w-full lg:w-3/5">
          <Product
            v-for="product in products.items"
            :key="product.id"
            :product="product"
          />
          <div
            class="w-full my-20 flex items-center justify-center"
            v-if="!products.items"
          >
            {{ $t("category.productMsg") }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductSlider from "@/components/Slider/indexProductSlider/index";
import Product from "@/components/Product/index";
import ProductInfo from "@/components/Product/info";
import { mapState } from "vuex";

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
    ...mapState(["subCategory", "products", "productsInfo"])
  },
  mounted() {
    this.$i18n.setLocale(localStorage.getItem("locale"));
  }
};
</script>

<style></style>
