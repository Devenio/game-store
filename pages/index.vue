<template>
  <div class="w-full">
    <Particles
      id="tsparticles"
      :options="{
        background: {
          color: {
            value: '#ffffff'
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
            value: '#222222'
          },
          links: {
            color: '#222222',
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

    <div class="container mx-auto">
      <product-slider class="my-10"></product-slider>
      <Offer />
      <h1
        class="text-xl px-10 text-gray-800 my-3"
        :class="$i18n.getLocaleCookie() == 'fa' ? 'text-right' : 'text-left'"
      >
        {{ $t("category.subCtg") }}
      </h1>
      <div
        class="relative transition-all duration-500 rounded-lg sm:mx-10 flex items-center justify-start overflow-x-auto"
        style="max-height:550px;"
        id="sub-category"
      >
        <div
          class="w-full my-20 flex items-center justify-center"
          v-if="!subCategory.items"
        >
          {{ $t("category.subCtgMsg") }}
        </div>
        <sub-category
          v-for="item in subCategory.items"
          :key="item.id"
          :cover="item.cover"
          :name="item.name"
          :id="item.id"
        />
      </div>
      <h1
        class="text-xl px-10 text-gray-800 my-3 mt-10"
        :class="$i18n.getLocaleCookie() == 'fa' ? 'text-right' : 'text-left'"
      >
        {{ $t("category.products") }}
      </h1>
      <div class="flex flex-wrap mb-10">
        <div class="w-full lg:w-2/5"><product-info :data="productsInfo" /></div>
        <div class="mx-auto w-full lg:w-3/5">
          <Product
            v-for="product in products.items"
            :key="product.id"
            :product="product"
          />
          <div
            class="w-full my-20 flex items-center justify-center"
            v-if="!products.items"
          >
            {{ $t("category.productMsg") }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductSlider from "@/components/Slider/indexProductSlider/index";
import Product from "@/components/Product/index";
import ProductInfo from "@/components/Product/info";
import { mapState } from "vuex";

export default {
  components: {
    ProductSlider,
    Product,
    ProductInfo
  },
  data() {
    return {
      isClosed: false
    };
  },
  methods: {
    togglePdPart() {
      const pdPart = document.querySelector("#sub-category");
      pdPart.classList.toggle("h-10");

      this.isClosed = !this.isClosed;
    }
  },
  async asyncData({ $axios, store }) {
    try {
      const categoryItems = await $axios.$get(
        `index/GetCategory?language=${store.getters.locale}`
      );
      store.dispatch("setCategoryItems", categoryItems.body);
    } catch (ex) {
      console.log(ex);
    }
  },
  computed: {
    ...mapState(["subCategory", "products", "productsInfo"])
  },
  mounted() {
    this.$i18n.setLocale(localStorage.getItem("locale"));
  }
};
</script>

<style scoped>
/* width */
::-webkit-scrollbar {
  width: 10px;
  height: 7px;
  cursor: pointer;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
#tsparticles {
  position: absolute;
  width: 100%;
  height: 100vh;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
  opacity: 0.48;
  z-index: -10;
}
</style>
