<template>
  <div>
    <div
      class="w-100 flex items-center justify-between px-5 border-b-2 container mx-auto"
      style="height: 78px;"
    >
      <ul class="hidden  items-center sm:flex">
        <nuxt-link
          v-for="item in navbarItems"
          :key="item.id"
          tag="li"
          :to="localePath({ path: item.path }, $i18n.getLocaleCookie())"
          class="mx-3 cursor-pointer font-medium"
        >
          {{ $t(`${item.title}`) }}
        </nuxt-link>

        <select
          name="lang"
          id="lang"
          class="mx-3 cursor-pointer font-medium border-b-2 border-gray-800"
          @change="setLocale($event)"
        >
          <option value="">{{ $t("lang") }}</option>
          <option value="fa">فارسی</option>
          <option value="en">English</option>
        </select>
      </ul>

      <nuxt-link :to="{ path: '/' }">
        <!-- <img
          alt="superz logo"
          class="sm:block"
          style="width: 240px;"
          :class="openSearchBar ? 'hidden' : ''"
          src="/logotest.svg"
        /> -->
        Your Logo
      </nuxt-link>

      <div class="flex items-center sm:hidden">
        <select
          name="lang"
          id="lang"
          class="mx-3 cursor-pointer font-medium border-b-2 border-gray-800"
          @change="setLocale($event)"
        >
          <option value="">{{ $t("lang") }}</option>
          <option value="fa" id="fa">فارسی</option>
          <option value="en" id="en">English</option>
        </select>
        <div class="sm:hidden cursor-pointer" @click="toggleMenu()">
          <fa :icon="['fas', 'bars']" size="2x" class="text-gray-700"></fa>
        </div>
      </div>
    </div>

    <!-- small size menu -->
    <div
      class="absolute w-0 h-screen bg-white z-50 top-0 right-0 overflow-hidden transition-all duration-500 sm:hidden"
      id="small-size-menu"
      @click="toggleMenu()"
    >
      <div class="w-screen h-full">
        <div class="flex items-center justify-center py-10">
          <!-- <img alt="superz logo" style="width:240px" src="/logotest.svg" /> -->
          Your Logo
        </div>
        <div class="w-full px-5">
          <ul class="flex flex-col items-end">
            <nuxt-link
              v-for="item in navbarItems"
              :key="item.id"
              tag="li"
              :to="localePath({ path: item.path }, $i18n.getLocaleCookie())"
              class="my-3 cursor-pointer font-medium flex items-center"
            >
              {{ $t(`${item.title}`) }}
              <fa
                :icon="[item.icon.type, item.icon.name]"
                size="lg"
                class="ml-5"
              ></fa>
            </nuxt-link>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  ssr: false,
  name: "navbar",
  data() {
    return {
      navbarItems: [
        {
          title: "navItems.acc",
          path: "/dashboard",
          icon: {
            type: "fas",
            name: "user-circle"
          }
        },
        {
          title: "navItems.home",
          path: "/",
          icon: {
            type: "fas",
            name: "home"
          }
        }
      ],
      isMenuClosed: true,
      openSearchBar: false
    };
  },
  methods: {
    toggleMenu() {
      const menu = document.querySelector("#small-size-menu");

      this.isMenuClosed
        ? menu.classList.replace("w-0", "w-full")
        : menu.classList.replace("w-full", "w-0");

      this.isMenuClosed = !this.isMenuClosed;
    },
    setLocale(event) {
      if (event.target.value) {
        localStorage.setItem("locale", event.target.value);
        this.$store.dispatch("setLocale", event.target.value);
        this.$i18n.setLocaleCookie(event.target.value);
        this.$i18n.setLocale(event.target.value);
      }
    },
    setMountLang(lang) {
      this.$i18n.setLocale(lang);
    }
  },
  mounted() {
    console.log(this.$i18n.getLocaleCookie());
    this.setMountLang(this.$i18n.getLocaleCookie());
  }
};
</script>

<style scoped></style>
