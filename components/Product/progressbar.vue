<template>
  <div>
    <div
      class="flex w-full items-center my-3"
      :class="
        $i18n.getLocaleCookie() == 'fa'
          ? ['flex-row', 'justify-end']
          : ['flex-row-reverse', 'justify-end']
      "
      v-for="(prop, index) in productsInfo.property"
      :key="index"
      :percent="prop.value"
      :property="prop.prop"
    >
      <div
        class="border-2 border-green-300 bg-green-300 relative rounded-full"
        style="width:200px;height:15px;"
      >
        <div
          class="absolute right-0 h-full bg-green-700"
          :style="`width:${prop.value}%`"
          :id="`progress-${index}`"
        ></div>
      </div>
      <h3 class="text-base sm:text-lg mx-5 text-gray-600">{{ prop.prop }}</h3>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: mapGetters(["productsInfo"])
};
</script>

<style lang="scss" scoped></style>
