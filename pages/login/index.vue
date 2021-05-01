<template>
  <div class="w-screen py-16 flex items-center justify-center flex-col">
    <h1 class="text-xl font-semibold my-5">
      ابتدا باید در سایت ثبت نام کنید یا وارد شوید
    </h1>
    <div
      style="height: 500px;"
      class="bg-gray-500 w-full flex flex-col sm:w-1/2"
    >
      <div class="w-full flex divide-x-2 divide-gray-700">
        <div
          class="flex-grow text-center text-lg bg-white py-5"
          @click="isLogin = false"
        >
          ثبت نام
        </div>
        <div
          class="flex-grow text-center text-lg bg-white py-5"
          @click="isLogin = true"
        >
          ورود
        </div>
      </div>
      <form
        class="w-full h-3/4 flex flex-col justify-center items-center flex-grow"
      >
        <h1 class="text-xl font-semibold my-5">
          {{ isLogin ? "ورود" : "ثبت نام" }}
        </h1>
        <input
          type="text"
          class="w-3/4 p-3 my-3 text-right"
          placeholder="نام خود را وارد کنید"
          v-if="!isLogin"
          v-model="registerData.first_name"
        />
        <input
          type="text"
          class="w-3/4 p-3 my-3 text-right"
          placeholder="نام خانوادگی خود را وارد کنید"
          v-if="!isLogin"
          v-model="registerData.last_name"
        />
        <input
          type="text"
          class="w-3/4 p-3 my-3 text-right"
          placeholder="ایمیل خود را وارد کنید"
          v-model="registerData.email"
          v-if="!isLogin"
        />
        <input
          type="text"
          class="w-3/4 p-3 my-3 text-right"
          placeholder="ایمیل خود را وارد کنید"
          v-model="loginData.email"
          v-if="isLogin"
        />
        <input
          type="password"
          class="w-3/4 p-3 my-3 text-right"
          placeholder="پسورد خود را وارد کنید"
          v-if="isLogin"
        />
        <button
          type="submit"
          class="w-3/4 p-3 my-3 bg-blue-500 text-xl"
          @click.prevent="userLogin()"
        >
          {{ isLogin ? "ورود" : "ثبت نام" }}
        </button>
      </form>
    </div>

    <nuxt-link to="/dashboard" id="dashboard"></nuxt-link>
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
      }
    };
  },
  methods: {
    userLogin() {
      let data = this.isLogin ? this.loginData : this.registerData;
      const dashboard = document.querySelector("#dashboard");

      if (this.isLogin) {
        this.$axios
          .$post(
            `client/register?language=fa&password=${data.password}&email=${data.email}`
          )
          .then(res => {
            this.$store.dispatch("authentication", true);
            this.$store.dispatch("setUserData", data);

            dashboard.click();
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.$axios
          .$post(
            `client/register?language=fa&first_name=${data.first_name}&last_name=${data.last}&email=${data.email}`
          )
          .then(res => {
            this.$store.dispatch("authentication", true);
            this.$store.dispatch("setUserData", data);

            dashboard.click();
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
