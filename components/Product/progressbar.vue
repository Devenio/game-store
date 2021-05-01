<template>
  <div class="flex w-full items-center justify-end my-3">
    <div
      class="border-2 border-green-600 relative rounded-full"
      style="width:200px;height:15px;"
    >
      <div class="absolute right-0 h-full bg-green-600" id="progress"></div>
    </div>
    <h3 class="text-xl ml-5">property</h3>
  </div>
</template>

<script>
export default {
  props: {
    percent: Number,
    property: String
  },
  mounted() {
    const progress = document.querySelector("#progress");
    progress.style = `width: 30%`;
  }
};
</script>

<style lang="scss" scoped></style>
