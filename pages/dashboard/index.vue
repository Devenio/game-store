<template>
  <div class="container mx-auto min-h-screen">
    <div>
      <div
        class="text-gray-800 text-lg p-3 border-2 border-gray-700 text-center"
      >
        سبد خرید
      </div>
      <div class="flex flex-wrap">
        <Product
          v-for="ord in order"
          :key="ord.id"
          :product="ord.product"
          :isPanel="true"
          :product_num="ord.product_number"
        />
      </div>
      <div
        class="text-gray-800 text-lg p-3 border-2 border-gray-700 text-right"
      >
        قیمت کل:
        {{ order | calcTotalPrice }}
        تومان
      </div>
      <button type="submit" class="w-full p-3 my-3 bg-blue-500 text-xl mx-auto">
        پرداخت
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  middleware: "Authentication",
  layout: "dashboard",
  computed: mapGetters(["order"]),
  filters: {
    calcTotalPrice: val => {
      let result = 0;
      val.forEach(item => {
        let discount = item.product.discount ? item.product.discount : 0;
        let price = item.product.price;
        let tPrice = price - (discount / 100) * price;
        result += tPrice * item.product_number;
      });
      return result.toLocaleString();
    }
  }
};
</script>

<style lang="scss" scoped></style>
