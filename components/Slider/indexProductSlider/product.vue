<template>
  <div
    :id="`item-${id}`"
    class="relative overflow-hidden px-5 product-wrapper cursor-pointer"
    :data-id="id"
    @click="getSubCategory()"
  >
    <div class="w-full h-full shadow-xl rounded-xl relative border-2 border-gray-800 overflow-hidden">
      <img
        :src="cover"
        :alt="name"
        class="object-center object-cover w-full"
      />
      <div
        class="absolute bottom-0 w-full py-2 z-20 bg-black opacity-50 text-white text-left px-3 title"
      >
        <h1 class="text-xl">{{ name }}</h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cover: String,
    name: String,
    id: Number
  },
  methods: {
    getSubCategory() {
      const product = document.querySelector(`#item-${this.id}`);
      const productId = product.dataset.id;

      this.$axios
        .$get(`index/GetSubCategory?language=${this.$i18n.getLocaleCookie()}&category_id=${productId}`)
        .then(res => {
          this.$store.dispatch("setSubCategoryItems", res.body);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
.product-wrapper {
  height: 250px;
}
.title {
  clip-path: polygon(0 0, 50% 0, 70% 100%, 0% 100%);
}
</style>
