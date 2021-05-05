<template>
  <div class="w-full">
    <Particles
      id="tsparticles"
      :options="{
        background: {
          color: {
            value: '#edf2f7'
          }
        },
        fpsLimit: 60,
        interactivity: {
          detectsOn: 'canvas',
          events: {
            onClick: {
              enable: true,
              mode: 'push'
            },
            onHover: {
              enable: false
            },
            resize: true
          },
          modes: {
            bubble: {
              distance: 400,
              duration: 40,
              opacity: 0.8,
              size: 40
            },
            push: {
              quantity: 4
            },
            repulse: {
              distance: 200,
              duration: 5
            }
          }
        },
        particles: {
          color: {
            value: '#444444'
          },
          links: {
            color: '#444444',
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1
          },
          collisions: {
            enable: true
          },
          move: {
            direction: 'none',
            enable: true,
            outMode: 'bounce',
            random: false,
            speed: 1,
            straight: false
          },
          number: {
            density: {
              enable: true,
              value_area: 800
            },
            value: 80
          },
          opacity: {
            value: 0.5
          },
          shape: {
            type: 'triangle'
          },
          size: {
            random: true,
            value: 5
          }
        },
        detectRetina: true
      }"
    />
    <div class="container mx-auto min-h-screen">
      <!-- Cart -->
      <div v-if="currentTab == 0 && !$fetchState.pending" class="relative z-10">
        <div
          class="text-gray-800 text-lg p-3 border-b-2 border-gray-700 text-center mb-10 w-full lg:w-3/4 mx-auto"
        >
          {{ $t("panel.cartTitle") }}
        </div>
        <div class="flex flex-wrap overflow-x-auto">
          <div class="w-full lg:w-3/4 mx-auto" style="min-width: 500px;">
            <table class="w-full" v-if="!$fetch.pending">
              <div
                class="w-full py-20 flex items-center justify-center"
                v-if="!cart_list"
              >
                {{ $t("panel.cartMsg") }}
              </div>
              <tr class="text-center" v-else>
                <th class="p-1 bg-gray-300 border-2 border-gray-800">
                  {{ $t("panel.table.cover") }}
                </th>
                <th class="p-1 bg-gray-300 border-2 border-gray-800">
                  {{ $t("panel.table.id") }}
                </th>
                <th class="p-1 bg-gray-300 border-2 border-gray-800">
                  {{ $t("panel.table.price") }}
                </th>
                <th class="p-1 bg-gray-300 border-2 border-gray-800">
                  {{ $t("panel.table.name") }}
                </th>
                <th class="p-1 bg-gray-300 border-2 border-gray-800">
                  {{ $t("panel.table.count") }}
                </th>
                <th class="p-1 bg-gray-300 border-2 border-gray-800">
                  {{ $t("panel.table.user_input") }}
                </th>
                <th class="p-1 bg-gray-300 border-2 border-gray-800">
                  {{ $t("panel.table.remove") }}
                </th>
              </tr>
              <tr
                v-for="(item, index) in cart_list"
                :key="index"
                class="divide-x-2 divide-gray-800 text-center text-lg"
                :id="`pr-${item.id}`"
              >
                <td style="width:70px">
                  <img :src="item.image" :alt="item.id" style="width: 70px;" />
                </td>
                <td>{{ item.product_id }}</td>
                <td>{{ item.price | toRealPrice }}</td>
                <td>{{ item.product_name }}</td>
                <td>{{ item.count }}</td>
                <td>{{ item.user_input }}</td>
                <td class="text-red-700 cursor-pointer">
                  <fa
                    :icon="['fas', 'trash-alt']"
                    @click="
                      deleteItem({
                        cart_id: item.id,
                        product_id: item.product_id
                      })
                    "
                  ></fa>
                </td>
              </tr>

              <v-dialog />
            </table>
          </div>
        </div>
        <div
          class="w-full lg:w-3/4 mx-auto flex flex-row-reverse mt-5 justify-between px-3"
        >
          <div
            class="text-gray-800 text-lg p-3 border-b-2 border-gray-700 text-right"
          >
            {{ $t("panel.tPrice") }}: {{ total_price | toRealPrice
            }}{{ $t("product.currency") }}
          </div>
          <button
            type="submit"
            class="w-1/3 p-3 text-blue-600 border-2 border-blue-600 hover:text-white hover:bg-blue-600 text-xl"
          >
            {{ $t("panel.pay") }}
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
                {{ $t("panel.incInv") }}
              </button>
              <input
                type="number"
                class="mt-2 border-2 border-gray-800 p-2"
                :placeholder="
                  $i18n.getLocaleCookie() == 'fa'
                    ? 'مقدار افزایش موجودی'
                    : 'Amount of inventory increase'
                "
                v-model="amount"
                id="amount-box"
              />
            </div>
            <p>
              {{ $t("panel.inv") }}:
              {{ walletBalance.body.info.balance | toRealPrice }}
              {{ walletBalance.body.info.currency == "toman" ? "تومان" : "$" }}
            </p>
          </div>
        </div>
        <div
          class="w-full lg:w-3/4 mx-auto text-right mt-10 border-2 border-gray-700 rounded-sm p-3 text-xl text-gray-800 mb-10"
        >
          <div
            class="mb-3"
            :class="
              $i18n.getLocaleCookie() == 'fa' ? 'text-right' : 'text-left'
            "
          >
            {{ $t("panel.th") }}
          </div>
          <table class="w-full">
            <tr class="text-center">
              <th class="p-1 bg-gray-300 border-2 border-gray-800">
                {{ $t("panel.table.row") }}
              </th>
              <th class="p-1 bg-gray-300 border-2 border-gray-800">
                {{ $t("panel.table.price") }}
              </th>
              <th class="p-1 bg-gray-300 border-2 border-gray-800">
                {{ $t("panel.table.time") }}
              </th>
              <th class="p-1 bg-gray-300 border-2 border-gray-800">
                {{ $t("panel.table.status") }}
              </th>
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

      <!-- Tickets -->
      <div v-if="currentTab == 1 && !$fetchState.pending" class="relative z-10">
        <div
          class="text-gray-800 text-lg p-3 border-b-2 border-gray-700 text-center mb-10 w-full lg:w-3/4 mx-auto"
        >
          {{ $t("panel.ticket") }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
  middleware: "Authentication",
  layout: "dashboard",
  computed: {
    ...mapGetters(["order", "currentTab"]),
    ...mapState(["total_price"])
  },
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
      amount: 0,
      userData: {},
      walletHistory: {},
      walletBalance: {},
      cart_list: {}
    };
  },
  async fetch() {
    const token = localStorage.getItem("access_token");
    this.$i18n.setLocale(localStorage.getItem("locale"));
    const cart_token = localStorage.getItem("cart_token");

    try {
      // Get user information
      const userData = await this.$axios.$get(
        `/client/me?language=${this.$i18n.getLocaleCookie()}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      this.$store.dispatch("setUserData", userData.body.info[0]);
      // Get cart_list
      this.$axios
        .$get(
          `/cart/list?language=${this.$i18n.getLocaleCookie()}&agent_id=${
            this.$store.getters.agent_id
          }&cart_token=${cart_token}`,
          {
            headers: {
              Authorization: `Bearer ${this.$store.getters.token}`
            }
          }
        )
        .then(res => {
          console.log(res.body.items);
          this.cart_list = res.body.items;
          this.calcTotalPrice(this.cart_list);
        })
        .catch(err => console.log(err));
      // Get wallet history
      const walletHistory = await this.$axios.$get(
        `wallet/history?language=${this.$i18n.getLocaleCookie()}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      const walletBalance = await this.$axios.$get(
        `wallet/balance?language=${this.$i18n.getLocaleCookie()}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      this.userData = userData;
      this.walletHistory = walletHistory;
      this.walletBalance = walletBalance;
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
          .$get(
            `wallet/increase?language=${this.$i18n.getLocaleCookie()}&amount=${
              this.amount
            }`,
            {
              headers: { Authorization: `Bearer ${token}` }
            }
          )
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
    },
    calcTotalPrice(data) {
      let result = 0;
      if (data) {
        data.forEach(item => {
          result += item.price * item.count;
        });
      }
      console.log(result);
      this.$store.commit("SET_TOTAL_PRICE", result);
    },
    deleteItem(data) {
      this.$modal.show("dialog", {
        title: "Delete an item from cart",
        text: `Are you sure you want to remove "product ${data.product_id}" from your cart?`,
        buttons: [
          {
            title: "Cancel",
            handler: () => {
              this.$modal.hide("dialog");
            }
          },
          {
            title: "Yes, remove it",
            handler: () => {
              this.completeDeleteItem(data);
              this.$modal.hide("dialog");
            }
          }
        ]
      });
    },
    async completeDeleteItem(data) {
      const token = localStorage.getItem("access_token");
      const cart_token = localStorage.getItem("cart_token");
      const config = {
        method: "post",
        url: "cart/remove",
        params: {
          language: localStorage.getItem("locale"),
          cart_id: data.cart_id,
          product_id: data.product_id,
          cart_token: cart_token
        },
        headers: { Authorization: `Bearer ${token}` }
      };

      try {
        const res = await this.$axios(config);
        console.log(res);
        // this.getCartList();
        this.$modal.show("dialog", {
          title: "Item removed successfully!",
          text: `Please wait to refresh your cart list. refresh in 3 seconds later.`,
          buttons: [
            {
              title: "Close",
              handler: () => {
                this.$modal.hide("dialog");
              }
            }
          ]
        });
        setTimeout(() => {
          this.$nuxt.refresh();
        }, 3000);
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style scoped>
#tsparticles {
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
  opacity: 0.48;
  z-index: 0;
  margin: 0 auto;
}
</style>
