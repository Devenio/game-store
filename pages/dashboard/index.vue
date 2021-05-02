<template>
  <div class="container mx-auto min-h-screen">
    <!-- Cart -->
    <div v-if="currentTab == 0">
      <div
        class="text-gray-800 text-lg p-3 border-b-2 border-gray-700 text-center mb-10 w-full lg:w-3/4 mx-auto"
      >
        سبد خرید
      </div>
      <div class="flex flex-wrap">
        <div class="w-full lg:w-3/4 mx-auto">
          <div
            class="w-full py-20 flex items-center justify-center"
            v-if="order.length == 0"
          >
            هیچ محصولی در سبد خرید شما وجود ندارد !!
          </div>
          <Product
            v-for="ord in order"
            :key="ord.id"
            :product="ord.product"
            :isPanel="true"
            :product_num="ord.product_number"
          />
        </div>
      </div>
      <div
        class="w-full lg:w-3/4 mx-auto flex flex-row-reverse mt-5 justify-between px-3"
      >
        <div
          class="text-gray-800 text-lg p-3 border-b-2 border-gray-700 text-right"
        >
          قیمت کل:
          {{ order | calcTotalPrice }}
          تومان
        </div>
        <button
          type="submit"
          class="w-1/3 p-3 text-blue-600 border-2 border-blue-600 hover:text-white hover:bg-blue-600 text-xl"
        >
          پرداخت
        </button>
      </div>
      <div
        class="w-full lg:w-3/4 mx-auto text-right mt-10 border-2 border-gray-700 rounded-sm p-3 text-xl text-gray-800"
      >
        <div class="w-full flex items-center justify-between">
          <button
            class="py-2 px-3 text-blue-600 border-2 border-blue-600 hover:text-white hover:bg-blue-600 text-xl"
          >
            افزایش موجودی
          </button>
          <p>موجودی شما: {{ userData.wallet | toRealPrice }} {{userData.currency === "toman" ? "تومان" : "Dollor"}}</p>
        </div>
      </div>
    </div>

    <!-- Wallet -->
    <div v-if="currentTab == 1"></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  middleware: "Authentication",
  layout: "dashboard",
  computed: mapGetters(["order", "currentTab", "userData"]),
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
    },
    toRealPrice: val => {
      return val ? val.toLocaleString() : val;
    }
  },
  data() {
    return {
      panelItems: ["سبد خرید", "افزایش موجودی"]
    };
  },
  asyncData({ $axios, store }) {
    const token = window.localStorage.getItem("access_token");
    $axios
      .$get(`/client/me?language=fa`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        console.log(res);
        const userData = res.body.info[0];
        store.dispatch("setUserData", userData);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style lang="scss" scoped></style>
