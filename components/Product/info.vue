<template>
  <div class="px-3 border-2 border-gray-200 rounded-lg mx-auto">
    <div class="w-full p-3 bg-white rounded-lg mx-auto" style="width: 360px;">
      <h1 class="text-right text-xl">:توضیحات</h1>
      <progressbar
        v-for="(prop, index) in data.property"
        :key="prop.id"
        :percent="prop.value"
        :property="prop.prop"
        :id="index"
      />
      <p class="text-right text-xl">
        <span class="text-base">{{ data.name }}</span>
        :نام
      </p>
      <p class="text-right text-xl mt-5">
        :توصیف
        <br />
        <span class="text-base">{{ data.decs }}</span>
      </p>
    </div>
  </div>
</template>

<script>
import progressbar from "./progressbar";

export default {
  components: {
    progressbar
  },
  props: {
    data: Object
  }
};
</script>

<style lang="scss" scoped></style>
