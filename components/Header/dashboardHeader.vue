<template>
  <div class="v-full border-b-2 border-gray-500 relative" style="">
    <div
      class="container flex flex-row-reverse items-center justify-between px-3 h-full mx-auto"
    >
      <div class="text-right my-1">
        {{ userData.first_name + " " + userData.last_name }}
        :نام
        <br />
        {{ userData.email }}
        :ایمیل
        <br />
        {{ userData.phone_number }}
        :شماره تلفن
      </div>
      <fa
        :icon="['fas', 'bars']"
        size="2x"
        class="text-gray-800 cursor-pointer"
        @click="openMenu = !openMenu"
      ></fa>
    </div>

    <div
      class="w-screen h-screen bg-black opacity-50 absolute top-0 right-0 z-10"
      v-if="openMenu"
      @click="openMenu = !openMenu"
    ></div>

    <div
      class="w-1/2 md:w-1/4 h-screen absolute top-0 bg-gray-900 transition-all duration-500 z-50"
      :class="openMenu ? 'left-0' : 'hidden'"
    >
      <ul class="w-full divide-y-2 divide-gray-400 mt-10">
        <nuxt-link
          tag="li"
          to="/"
          class="py-3 text-center text-gray-100 text-lg hover:bg-gray-800 cursor-pointer"
          @click="openMenu = !openMenu"
        >
          خانه
        </nuxt-link>
        <li
          class="py-3 text-center text-gray-100 text-lg hover:bg-gray-800 cursor-pointer"
          v-for="(item, index) in panelItems"
          :key="index"
          @click="tabClicked(index)"
          :data-tab="index"
          :id="`tab-${index}`"
        >
          {{ item }}
        </li>
        <li
          class="py-3 text-center text-red-500 text-lg hover:bg-gray-800 cursor-pointer"
          @click="logout()"
        >
          خروج از حساب
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      panelItems: ["سبد خرید"],
      openMenu: false
    };
  },
  methods: {
    tabClicked(index) {
      const tab = document.querySelector(`#tab-${index}`);
      this.openMenu = !this.openMenu;
      this.$store.dispatch("setCurrentTab", tab.dataset.tab);
    },
    logout() {
      const token = window.localStorage.getItem("access_token");
      this.$axios
        .$get("client/logout?language=fa", {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => {
          if(res.ok) {
            this.$store.dispatch("authentication", false);
            window.localStorage.removeItem("access_token");
            this.$router.push("/")
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  computed: {
    ...mapGetters(["userData"])
  }
};
</script>

<style lang="scss" scoped></style>
