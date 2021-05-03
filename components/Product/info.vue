<template>
  <div class="px-3 rounded-lg mx-auto">
    <div class="w-full p-3 bg-white rounded-lg mx-auto border-2 border-gray-200">
      <h1
        class="text-xl"
        :class="$i18n.getLocaleCookie() == 'fa' ? 'text-right' : 'text-left'"
      >
        {{ $t("productInfo.desc") }}
      </h1>
      <progressbar />
      <p
        class="text-xl"
        :class="$i18n.getLocaleCookie() == 'fa' ? 'text-right' : 'text-left'"
      >
        {{ $t("productInfo.name") }}
        <span class="text-base">{{ data.name }}</span>
      </p>
      <p
        class="text-xl mt-5"
        :class="$i18n.getLocaleCookie() == 'fa' ? 'text-right' : 'text-left'"
      >
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
