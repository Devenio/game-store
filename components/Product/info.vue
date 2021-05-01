<template>
  <div class="px-3 w-full">
    <div class="w-full p-3 bg-white rounded-lg">
      <h1 class="text-right text-xl">:توضیحات</h1>
      <progressbar />
      <p class="text-right text-xl">
        <span class="text-base">{{ data.name }}</span>
        :نام
      </p>
      <p class="text-right text-xl">
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
