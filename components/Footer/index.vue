<template>
  <div class="w-full bg-gray-800">
    <div class="container mx-auto mt-7 py-3">
      <div class="w-full">
        <ul
          class="rtl w-full h-full list-none flex items-center justify-center py-5" 
        >
          <a
            tag="li"
            class="mx-5 text-white cursor-pointer"
            :to="{ path: '/' }"
          >
            <u>{{ $t("footer.items[0]") }}</u>
          </a>
          <div
            class="rounded-circle bg-white"
            style="width: 4px;height: 4px;"
          ></div>
          <a
            tag="li"
            class="mx-5 text-white cursor-pointer"
            :to="{ path: '/' }"
          >
            <u>{{ $t("footer.items[1]") }}</u>
          </a>
          <div
            class="rounded-circle bg-white block"
            style="width: 4px;height: 4px;"
          ></div>
          <a
            tag="li"
            class="mx-5 text-white cursor-pointer block"
            :to="{ path: '/' }"
          >
            <u>{{ $t("footer.items[2]") }}</u>
          </a>
        </ul>
      </div>

      <div class="w-11/12 bg-gray-100 mx-auto" style="height: 1px;"></div>

      <div
        class="text-right w-full p-4 flex flex-col items-center justify-around" :class="$i18n.getLocaleCookie() == 'fa' ? 'md:flex-row-reverse' : 'md:flex-row'"
      >
        <div class="mt-5 md:mt-0 md:w-1/2">
          <h3 class="text-white text-center text-base sm:text-lg" :class="$i18n.getLocaleCookie() == 'fa' ? 'md:text-right' : 'md:text-left'">
            {{ $t("footer.title") }}
          </h3>
          <p class="text-center text-gray-500" :class="$i18n.getLocaleCookie() == 'fa' ? 'sm:text-right' : 'sm:text-left'">
            {{ $t("footer.desc") }}
          </p>
        </div>

        <div class="flex flex-col items-center mt-5 ">
          <h3 class="text-white text-lg">{{ $t("footer.socialMedia") }}</h3>
          <ul
            class="list-none mt-3 w-full flex items-center justify-center p-0"
          >
            <li>
              <a href="" class="text-gray-400 mx-2">
                <fa :icon="['fab', 'facebook']" size="2x"></fa>
              </a>
            </li>
            <li>
              <a href="" class="text-gray-400 mx-2">
                <fa :icon="['fab', 'instagram']" size="2x"></fa>
              </a>
            </li>
            <li>
              <a href="" class="text-gray-400 mx-2">
                <fa :icon="['fab', 'linkedin-in']" size="2x"></fa>
              </a>
            </li>
            <li>
              <a href="" class="text-gray-400 mx-2">
                <fa :icon="['fab', 'twitter']" size="2x"></fa>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="text-gray-300 mt-3 text-sm">
        <div class="text-center">
          <p class="">
            &copy; {{ $t("footer.cr") }}
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
