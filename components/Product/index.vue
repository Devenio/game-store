<template>
  <div class="px-3 w-full overflow-x-auto ">
    <div
      class="w-full flex items-center my-2 rounded-lg shadow-lg border-2 p-3 relative border-gray-800"
      :data-id="product.id"
      style="height: 100px; min-width: 565px;"
    >
      <div
        class="p-1 bg-gradient-to-br from-red-500 via-red-700 to-red-500 text-center text-white absolute top-0 left-0"
        v-if="product.discount"
      >
        {{ product.discount }}% {{ $t("product.disc") }}
      </div>
      <div class="">
        <img :src="product.cover" :alt="product.name" class="h-full" />
      </div>
      <div class="w-1/4 text-center">
        <p>
          {{ product.name }}
          <strong> {{ $t("product.name") }} </strong>
        </p>

        <div :class="product.discount ? ['line-through', 'text-gray-600'] : ''">
          <strong> {{ $t("product.price") }}: </strong>
          {{ product.price | makePriceNum }}
          {{ $t("product.currency") }}
        </div>

        <div v-if="product.discount">
          <strong> {{ $t("product.price") }}: </strong>
          {{
            (product.price - (product.discount / 100) * product.price)
              | makePriceNum
          }}
          {{ $t("product.currency") }}
        </div>
      </div>
      <div class="flex items-center w-1/4" v-if="!isPanel">
        <div
          class="cursor-pointer bg-gray-400 flex items-center justify-center mx-1 text-gray-700"
          style="width:40px;height:40px;"
          @click="decrement()"
        >
          <fa :icon="['fas', 'minus']"></fa>
        </div>

        <div
          style="width:40px;height:40px;"
          class="bg-gray-200 flex items-center justify-center"
          :id="`counter-box-${product.id}`"
        >
          {{ counter }}
        </div>

        <div
          class="cursor-pointer bg-gray-400 flex items-center justify-center mx-1 text-gray-700"
          style="width:40px;height:40px;"
          @click="increment()"
        >
          <fa :icon="['fas', 'plus']"></fa>
        </div>
      </div>
      <div class="flex flex-col items-center flex-grow">
        <button
          class="bg-blue-500 px-2 sm:px-5 py-2 tracking-wider text-white rounded-full hover:bg-blue-600"
          :class="product.in_stock ? '' : 'opacity-50'"
          @click="addCart()"
          v-if="!isPanel"
        >
          {{ product.in_stock ? $t("product.buy") : $t("product.notInStock") }}
        </button>
        <div
          :class="product.in_stock ? 'text-green-600' : 'text-red-600'"
          class="text-right"
          v-if="!isPanel"
        >
          {{
            product.in_stock ? $t("product.inStock") : $t("product.notInStock")
          }}
        </div>
        <p v-if="isPanel">
          {{ product_num }}
          :{{ $t("product.number") }}
        </p>
      </div>
      <input
        type="text"
        class="border-2 border-gray-800 p-2"
        :placeholder="$i18n.getLocaleCookie() == 'fa' ? 'ایدی بازی' : 'Game Id'"
        v-model="user_input"
        id="user_input"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    product: Object,
    isPanel: {
      type: Boolean,
      default: false
    },
    product_num: Number
  },
  filters: {
    makePriceNum: val => {
      return val.toLocaleString();
    }
  },
  computed: mapGetters(["productCounter"]),
  data() {
    return {
      counter: 0,
      user_input: ""
    };
  },
  methods: {
    increment() {
      if (this.counter >= this.product.max_count) {
        this.toggleCounterBoxStatus(true);
        return;
      }
      this.toggleCounterBoxStatus(false);
      this.counter++;
    },
    decrement() {
      if (this.counter <= 0) {
        this.toggleCounterBoxStatus(true);
        return;
      }
      this.toggleCounterBoxStatus(false);
      this.counter--;
    },
    addCart() {
      if (this.counter === 0 || this.user_input == "") {
        this.toggleCounterBoxStatus(true);
      } else {
        this.toggleCounterBoxStatus(false);
        // let order = {
        //   product: this.product,
        //   product_number: this.counter
        // };
        // this.$store.dispatch("addOrder", order);

        this.$axios
          .$post(`cart/add`, {
            params: {
              language: this.$store.getters.locale,
              product_id: this.product.id,
              count: this.counter,
              user_input: this.user_input
            },
            headers: { Authorization: `Bearer ${this.$store.getters.token}` }
          })
          .then(res => {
            console.log(res);
            this.counter = 0;
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    toggleCounterBoxStatus(status) {
      const userInput = document.querySelector("#user_input");
      const counterBox = document.querySelector(
        `#counter-box-${this.product.id}`
      );
      if (status) {
        counterBox.classList.replace("bg-gray-200", "bg-red-400");
        userInput.classList.replace("border-gray-800 ", "border-red-600 ");
      } else {
        counterBox.classList.replace("bg-red-400", "bg-gray-200");
        userInput.classList.replace("border-red-600 ", "border-gray-800 ");
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
