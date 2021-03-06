export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "cu2",
    htmlAttrs: {
      lang: "en"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~/assets/style.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ["@/plugins/particles.js", "@/plugins/vue-js-modal.client.js"],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    "@nuxtjs/tailwindcss",
    "@nuxtjs/fontawesome"
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    "nuxt-i18n"
  ],

  i18n: {
    locales: [
      { code: "en", iso: "en-US", file: "en.js" }, //ltr
      { code: "fa", iso: "fa-IR", file: "fa.js" } //rtl
    ],
    defaultLocale: "fa",
    lazy: true,
    langDir: "lang/"
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  fontawesome: {
    icons: {
      brands: true,
      solid: true
    },
    component: "fa"
  },

  axios: {
    baseURL: "https://api.gameland.rubikto.com/api/v1"
  },

  target: "static"
};
