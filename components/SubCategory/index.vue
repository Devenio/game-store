<template>
  <div
    :id="`subCategory-${id}`"
    class="relative overflow-hidden m-3 rounded-lg transform"
    :class="id % 2 === 0 ? ['translate-y-2'] : ['-translate-y-2']"
    :data-id="id"
    style="min-width: 160px;"
    @click="getProduct()"
  >
    <div class="w-full text-center">
      <img
        :src="cover"
        :alt="name"
        class="object-center object-cover mx-auto"
        style="width:100% !important"
      />
    </div>
    <div class="h-full w-full bg-gray-800 p-3 text-white text-center">
      {{ name }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    id: Number,
    cover: String
  },
  methods: {
    getProduct() {
      const subCategory = document.querySelector(`#subCategory-${this.id}`);
      const id = subCategory.id;

      this.$axios
        .$get(`index/GetProducts?language=fa&sub_category_id=${id}`)
        .then(res => {
          this.$store.dispatch("setProducts", res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped></style>
