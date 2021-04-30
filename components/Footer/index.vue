<template>
  <div class="w-full bg-gray-800">
    <div class="container mx-auto mt-7 py-3">
      <div class="w-full">
        <ul
          class="rtl w-full h-full list-none flex items-center text-right justify-center py-5"
        >
          <nuxt-link
            tag="li"
            class="mx-5 text-white cursor-pointer"
            :to="{ path: '/' }"
          >
            <u>قوانین و مقررات</u>
          </nuxt-link>
          <div
            class="rounded-circle bg-white"
            style="width: 4px;height: 4px;"
          ></div>
          <nuxt-link
            tag="li"
            class="mx-5 text-white cursor-pointer"
            :to="{ path: '/' }"
          >
            <u>ارتباط با ما</u>
          </nuxt-link>
          <div
            class="rounded-circle bg-white block"
            style="width: 4px;height: 4px;"
          ></div>
          <nuxt-link
            tag="li"
            class="mx-5 text-white cursor-pointer block"
            :to="{ path: '/' }"
          >
            <u>دسته بندی ها</u>
          </nuxt-link>
        </ul>
      </div>

      <div class="w-11/12 bg-gray-100 mx-auto" style="height: 1px;"></div>

      <div
        class="text-right w-full p-4 flex flex-col items-center justify-around md:flex-row-reverse"
      >
        <div class="mt-5 md:mt-0 md:w-1/2">
          <h3 class="text-white text-center text-base sm:text-lg md:text-right">
            مقایسه، انتخاب و خرید هوشمند اینترنتی با گیم لند
          </h3>
        </div>

        <div class="flex flex-col items-center mt-5 ">
          <h3 class="text-white text-lg">گیم لند در شبکه های اجتماعی</h3>
          <ul
            class="list-none mt-3 w-full flex items-center justify-center p-0"
          >
            <li>
              <a
                href=""
                class="text-gray-400 mx-2"
              >
                <fa :icon="['fab', 'facebook']" size="2x"></fa>
              </a>
            </li>
            <li>
              <a
                href=""
                class="text-gray-400 mx-2"
              >
                <fa :icon="['fab', 'instagram']" size="2x"></fa>
              </a>
            </li>
            <li>
              <a
                href=""
                class="text-gray-400 mx-2"
              >
                <fa :icon="['fab', 'linkedin-in']" size="2x"></fa>
              </a>
            </li>
            <li>
              <a
                href=""
                class="text-gray-400 mx-2"
              >
                <fa :icon="['fab', 'twitter']" size="2x"></fa>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="text-gray-300 mt-3 text-sm">
        <div class="text-center">
          <p class="">
            تمامی حقوق مادی و معنوی این سایت برای گیم لند محفوظ است
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
