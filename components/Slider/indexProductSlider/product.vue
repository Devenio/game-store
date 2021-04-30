<template>
  <div
    :id="`item-${id}`"
    class="relative overflow-hidden px-5 product-wrapper"
    :data-id="id"
    @click="getSubCategory()"
  >
    <div class="w-full h-full shadow-lg rounded-xl relative">
      <img :src="cover" alt="picture" class="object-center object-cover" />
      <div
        class="absolute bottom-0 w-full py-3 z-20 bg-black opacity-50 text-white text-center"
      >
        <h1 class="text-2xl">{{ name }}</h1>
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
        .$get(`index/GetSubCategory?language=fa&category_id=${productId}`)
        .then(res => {
          this.$store.dispatch("setSubCategoryItems", res.body)
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
</style>
