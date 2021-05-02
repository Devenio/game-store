<template>
  <div class="flex w-full items-center justify-end my-3">
    <div
      class="border-2 border-green-300 bg-green-300 relative rounded-full"
      style="width:200px;height:15px;"
    >
      <div class="absolute right-0 h-full bg-green-700" :id="`progress-${id}`"></div>
    </div>
    <h3 class="text-xl ml-5">{{property}}</h3>
  </div>
</template>

<script>
export default {
  props: {
    percent: Number,
    property: String,
    id: Number
  },
  mounted() {
    const progress = document.querySelector(`#progress-${this.id}`);
    progress.style = `width: ${this.percent}%`;
    console.log(progress.style);
  }
};
</script>

<style lang="scss" scoped></style>
