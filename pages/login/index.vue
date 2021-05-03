<template>
  <div class="w-screen py-16 flex items-center justify-center flex-col">
    <h1 class="text-xl font-semibold my-5">
      {{$t("login.title")}}
    </h1>
    <div
      style="height: 500px;"
      class="bg-gray-800 w-full flex flex-col sm:w-1/2 lg:w-1/3  rounded-lg border-2 border-gray-800 overflow-hidden"
    >
      <div class="w-full flex divide-x-2 divide-gray-700">
        <div
          class="flex-grow text-center text-lg bg-white py-5 cursor-pointer"
          @click="isLogin = false"
        >
          {{ $t("login.reg") }}
        </div>
        <div
          class="flex-grow text-center text-lg bg-white py-5 cursor-pointer"
          @click="isLogin = true"
          id="login-button"
        >
          {{ $t("login.log") }}
        </div>
      </div>
      <form
        class="w-full h-3/4 flex flex-col justify-center items-center flex-grow"
      >
        <h1 class="text-xl my-5 text-white">
          {{ isLogin ? $t("login.log") : $t("login.reg") }}
        </h1>

        <!--  -->
        <input
          type="text"
          class="w-3/4 p-3 my-3 text-right"
          :placeholder="
            $i18n.getLocaleCookie() == 'fa'
              ? 'نام خود را وارد کنید'
              : 'Enter your first name'
          "
          v-if="!isLogin"
          v-model="registerData.first_name"
        />
        <input
          type="text"
          class="w-3/4 p-3 my-3 text-right"
          :placeholder="
            $i18n.getLocaleCookie() == 'fa'
              ? 'نام خانوادگی خود را وارد کنید'
              : 'Enter your last name'
          "
          v-if="!isLogin"
          v-model="registerData.last_name"
        />
        <input
          type="text"
          class="w-3/4 p-3 my-3 text-right"
          :placeholder="
            $i18n.getLocaleCookie() == 'fa'
              ? 'ایمیل خود را وارد کنید'
              : 'Enter your email'
          "
          v-model="registerData.email"
          v-if="!isLogin"
        />
        <input
          type="text"
          class="w-3/4 p-3 my-3 text-right"
          :placeholder="
            $i18n.getLocaleCookie() == 'fa'
              ? 'ایمیل خود را وارد کنید'
              : 'Enter your email'
          "
          v-model="loginData.email"
          v-if="isLogin"
        />
        <input
          type="password"
          class="w-3/4 p-3 my-3 text-right"
          :placeholder="
            $i18n.getLocaleCookie() == 'fa'
              ? 'پسورد خود را وارد کنید'
              : 'Enter your password'
          "
          v-if="isLogin"
          v-model="loginData.password"
        />

        <!--  -->
        <button
          type="submit"
          class="w-3/4 p-3 my-3 bg-blue-500 text-xl"
          @click.prevent="userLogin()"
        >
          {{ isLogin ? $t("login.log") : $t("login.reg") }}
        </button>
      </form>
    </div>
    <div
      v-if="errorMessage"
      class="p-3 border-2 border-red-800 rounded-lg fixed bg-white"
      style="width: 300px;bottom:30px;right:30px;"
      v-html="errorMessage"
    ></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLogin: false,
      registerData: {
        first_name: "",
        last_name: "",
        email: ""
      },
      loginData: {
        email: "",
        password: ""
      },
      errorMessage: ""
    };
  },
  methods: {
    userLogin() {
      let data = this.isLogin ? this.loginData : this.registerData;
      const loginButton = document.querySelector("#login-button");

      if (this.isLogin) {
        this.$axios
          .$post(
            `client/login?language=${this.$i18n.getLocaleCookie()}&password=${
              data.password
            }&username=${data.email}`
          )
          .then(res => {
            if (res.errors) {
              this.errorMessage = "";
              res.errors.forEach(error => {
                this.errorMessage += error.message + ".<br /> ";
              });
            } else {
              this.errorMessage = "";
              this.$store.dispatch("authentication", true);
              this.$store.dispatch("setToken", res.body.info.access_token);
              window.localStorage.setItem(
                "access_token",
                res.body.info.access_token
              );
              this.$router.push("/dashboard");
            }
          })
          .catch(err => {
            this.errorMessage = err.message;
          });
      } else {
        this.$axios
          .$post(
            `client/register?language=${this.$i18n.getLocaleCookie()}&first_name=${
              data.first_name
            }&last_name=${data.last_name}&email=${data.email}`
          )
          .then(res => {
            if (res.errors) {
              this.errorMessage = "";
              res.errors.forEach(error => {
                if (error.message == "User already registered") {
                  this.errorMessage = error.message;
                  loginButton.click();
                } else {
                  this.errorMessage += error.message + ".<br /> ";
                }
              });
            } else {
              this.errorMessage = "";
              this.errorMessage =
                "پسورد شما به ایمیلتان ارسال شد. برای ادامه وارد شوید";
              loginButton.click();
            }
          })
          .catch(err => {
            this.errorMessage = err.message;
          });
      }
    }
  },
  mounted() {
    console.log(this.$i18n.getLocaleCookie());
    this.$i18n.setLocale(localStorage.getItem("locale"));
  }
};
</script>

<style lang="scss" scoped></style>
