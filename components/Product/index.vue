<template>
  <div class="px-3">
    <!-- <div
      class="w-full flex items-center border-2 my-3 flex-row-reverse border-gray-800"
      style="height: 60px;"
    >
      <img
        :src="product.cover"
        :alt="product.name"
        width="60px"
        class="h-full"
      />
      <div class="flex-grow border-2 p-2 border-red-500 h-full flex flex-col">
        <p class="m-0 text-right">{{ product.name }} : نام محصول</p>
      </div>
      <div class="flex-grow border-2 border-green-500 h-full flex flex-col">

      </div>
    </div> -->
    <div
      class="w-full flex flex-col items-center bg-gray-100 my-2 rounded-lg border-2 border-gray-300"
      :data-id="product.id"
    >
      <div class="w-full flex">
        <img
          :src="product.cover"
          :alt="product.name"
          class="h-full flex-grow"
        />
        <div class="flex-grow text-right py-2 px-3 text-lg">
          <div
            class="p-1 m-2 bg-red-600 text-center text-white"
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

          <div :class="product.in_stock ? 'text-green-600' : 'text-red-600'">
            موجود
            {{ product.in_stock ? "میباشد" : "نمی باشد" }}
          </div>
        </div>
      </div>
      <div
        class="flex flex-wrap-reverse items-center text-lg w-full justify-around border-t-2 border-gray-700 py-3"
      >
        <button class="p-2 bg-blue-500 cursor-pointer shadow-lg" :class="product.in_stock ? '' : 'opacity-50'">
          {{ product.in_stock ? "افزودن به سبد خرید" : "موجود نیست"}}
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
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "Vuex";

export default {
  props: {
    product: Object
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
      const counterBox = document.querySelector(
        `#counter-box-${this.product.id}`
      );
      if (this.counter >= this.product.max_count) {
        counterBox.classList.replace("bg-gray-200", "bg-red-400");
        return;
      }
      counterBox.classList.replace("bg-red-400", "bg-gray-200");
      this.counter++;
    },
    decrement() {
      const counterBox = document.querySelector(
        `#counter-box-${this.product.id}`
      );
      if (this.counter <= 0) {
        counterBox.classList.replace("bg-gray-200", "bg-red-400");
        return;
      }
      counterBox.classList.replace("bg-red-400", "bg-gray-200");
      this.counter--;
    }
  }
};
</script>

<style lang="scss" scoped></style>
