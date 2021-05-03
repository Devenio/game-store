<template>
  <div
    class="flex w-full items-center my-3"
    :class="
      $i18n.getLocaleCookie() == 'fa'
        ? ['flex-row', 'justify-end']
        : ['flex-row-reverse', 'justify-end']
    "
  >
    <div
      class="border-2 border-green-300 bg-green-300 relative rounded-full"
      style="width:200px;height:15px;"
    >
      <div
        class="absolute right-0 h-full bg-green-700"
        :id="`progress-${id}`"
      ></div>
    </div>
    <h3 class="text-lg mx-5 text-gray-600">{{ property }}</h3>
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
    if (progress) {
      progress.style = `width: ${this.percent}%`;
    }
  }
};
</script>

<style lang="scss" scoped></style>
