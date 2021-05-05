<template>
  <div class="w-full h-full flex items-center justify-center text-xl font-bold p-5 text-center" v-html="text">
  </div>
</template>

<script>
export default {
  props: {
    text: String
  }
};
</script>

<style lang="scss" scoped></style>
