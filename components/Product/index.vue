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
        {{ product.discount }}% تخفیف
      </div>
      <div class="">
        <img :src="product.cover" :alt="product.name" class="h-full" />
      </div>
      <div class="w-1/4 text-center">
        <p>
          {{ product.name }}
          :نام محصول
        </p>

        <div :class="product.discount ? ['line-through', 'text-gray-600'] : ''">
          قیمت:
          {{ product.price | makePriceNum }}
          تومان
        </div>

        <div v-if="product.discount">
          قیمت:
          {{
            (product.price - (product.discount / 100) * product.price)
              | makePriceNum
          }}
          تومان
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
          v-if="! isPanel"
        >
          {{ product.in_stock ? "افزودن به سبد خرید" : "موجود نیست" }}
        </button>
        <div
          :class="product.in_stock ? 'text-green-600' : 'text-red-600'"
          class="text-right"
          v-if="!isPanel"
        >
          موجود
          {{ product.in_stock ? "میباشد" : "نمی باشد" }}
        </div>
        <p v-if="isPanel">
          {{ product_num }}
          :تعداد
        </p>
      </div>
      <!-- <div class="w-full flex">
        <img
          :src="product.cover"
          :alt="product.name"
          class="h-full flex-grow"
        />
        <div class="flex-grow text-right py-2 px-3 text-lg">
          <div
            class="p-1 m-2 bg-gradient-to-br from-red-500 via-red-700 to-red-500 text-center text-white"
            v-if="product.discount"
          >
            {{ product.discount }}% تخفیف
          </div>

          <p>
            {{ product.name }}
            :نام محصول
          </p>

          <div
            :class="product.discount ? ['line-through', 'text-gray-600'] : ''"
          >
            قیمت:
            {{ product.price | makePriceNum }}
            تومان
          </div>

          <div v-if="product.discount">
            قیمت:
            {{
              (product.price - (product.discount / 100) * product.price)
                | makePriceNum
            }}
            تومان
          </div>

          <div
            :class="product.in_stock ? 'text-green-600' : 'text-red-600'"
            v-if="!isPanel"
          >
            موجود
            {{ product.in_stock ? "میباشد" : "نمی باشد" }}
          </div>

          <p v-if="isPanel">
            {{ product_num }}
            :تعداد
          </p>
        </div>
      </div>
      <div
        class="flex flex-wrap-reverse items-center text-lg w-full justify-around border-t-2 border-gray-700 py-3"
        v-if="!isPanel"
      >
        <button
          class="p-2 bg-blue-500 cursor-pointer shadow-lg"
          :class="product.in_stock ? '' : 'opacity-50'"
          @click="addCart()"
        >
          {{ product.in_stock ? "افزودن به سبد خرید" : "موجود نیست" }}
        </button>

        <div class="flex items-center">
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

        <p class="text-right">:تعدادی که میخواهید رو انتخاب کنید</p>
      </div> -->
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
      counter: 0
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
      if (this.counter === 0) {
        this.toggleCounterBoxStatus(true);
      } else {
        this.toggleCounterBoxStatus(false);
        let order = {
          product: this.product,
          product_number: this.counter
        };
        this.$store.dispatch("addOrder", order);
        this.counter = 0;
      }
    },
    toggleCounterBoxStatus(status) {
      const counterBox = document.querySelector(
        `#counter-box-${this.product.id}`
      );
      status
        ? counterBox.classList.replace("bg-gray-200", "bg-red-400")
        : counterBox.classList.replace("bg-red-400", "bg-gray-200");
    }
  }
};
</script>

<style lang="scss" scoped></style>
