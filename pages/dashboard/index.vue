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
          <div class="flex flex-col">
            <button
              class="py-2 px-3 text-blue-600 border-2 border-blue-600 hover:text-white hover:bg-blue-600 text-xl"
              @click="walletIncrease()"
            >
              افزایش موجودی
            </button>
            <input
              type="number"
              class="mt-2 border-2 border-gray-800 p-2"
              placeholder="مقدار افزایش موجودی"
              v-model="amount"
              id="amount-box"
            />
          </div>
          <p>
            موجودی شما: {{ walletBalance.body.info.balance | toRealPrice }}
            {{ walletBalance.body.info.currency == "toman" ? "تومان" : "دلار" }}
          </p>
        </div>
      </div>
      <div
        class="w-full lg:w-3/4 mx-auto text-right mt-10 border-2 border-gray-700 rounded-sm p-3 text-xl text-gray-800 mb-10"
      >
        <div>:تاریخچه تراکنش ها</div>
        <table class="w-full">
          <tr class="text-center">
            <th class="p-1 bg-gray-300 border-2 border-gray-800">ردیف</th>
            <th class="p-1 bg-gray-300 border-2 border-gray-800">مبلغ</th>
            <th class="p-1 bg-gray-300 border-2 border-gray-800">زمان</th>
            <th class="p-1 bg-gray-300 border-2 border-gray-800">وضعیت</th>
          </tr>
          <tr
            v-for="item in walletHistory.body.items"
            :key="item.id"
            class="divide-x-2 divide-gray-800 text-center"
          >
            <td>{{ item.id }}</td>
            <td>{{ item.amount | toRealPrice }}</td>
            <td>{{ item.payed_time | getTime }}</td>
            <td>{{ item.status }}</td>
          </tr>
        </table>
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
  computed: mapGetters(["order", "currentTab"]),
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
    },
    getTime: val => {
      return new Date(val * 1000).toISOString().substr(11, 8);
    }
  },
  data() {
    return {
      panelItems: ["سبد خرید"],
      amount: 0
    };
  },
  async asyncData({ $axios, store }) {
    const token = window.localStorage.getItem("access_token");

    try {
      // Get user information
      const userData = await $axios.$get(`/client/me?language=fa`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      store.dispatch("setUserData", userData.body.info[0]);
      // Get wallet history
      const walletHistory = await $axios.$get(`wallet/history?language=fa`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const walletBalance = await $axios.$get(`wallet/balance?language=fa`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      return { userData, walletHistory, walletBalance };
    } catch (ex) {
      console.log(ex);
    }
  },
  methods: {
    walletIncrease() {
      const token = window.localStorage.getItem("access_token");
      const amountBox = document.querySelector("#amount-box");

      if (this.amount != 0) {
        amountBox.classList.replace("border-red-500", "border-gray-800");
        this.$axios
          .$get(`wallet/increase?language=fa&amount=${this.amount}`, {
            headers: { Authorization: `Bearer ${token}` }
          })
          .then(res => {
            if (res.ok) {
              window.open(res.body.info.pay_link, "_blank");
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        amountBox.classList.replace("border-gray-800", "border-red-500");
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
