<template>
  <div
    :id="`subCategory-${id}`"
    class="relative overflow-hidden m-3 rounded-lg transform cursor-pointer shadow-xl"
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
      const id = subCategory.dataset.id;
      console.log(id);

      this.$axios
        .$get(`index/GetProducts`, {
          params: {
            language: this.$i18n.getLocaleCookie(),
            sub_category_id: id
          }
        })
        .then(res => {
          this.$store.dispatch("setProducts", res);
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped></style>
