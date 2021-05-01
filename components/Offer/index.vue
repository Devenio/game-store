<template>
  <div
    class="w-full my-5 bg-red-700 flex items-center justify-around"
    style="height: 110px;"
  >
    <div class="text-center py-3">
      <h1 class="text-3xl font-semibold text-gray-100">{{ data.name }}</h1>
      <h3 class="text-xl text-gray-100">{{ data.sub_name }}</h3>
      <a :href="data.more_link" class="text-white underline">more link</a>
    </div>

    <div class="w-1/2 sm:w-1/4 flex items-center justify-around">
      <div
        style="width:50px;height:50px;"
        class="flex items-center justify-center bg-gray-300 text-xl"
        id="days"
      ></div>
      <div
        style="width:50px;height:50px;"
        class="flex items-center justify-center bg-gray-300 text-xl"
        id="hours"
      ></div>
      <div
        style="width:50px;height:50px;"
        class="flex items-center justify-center bg-gray-300 text-xl"
        id="mins"
      ></div>
      <div
        style="width:50px;height:50px;"
        class="flex items-center justify-center bg-gray-300 text-xl"
        id="secs"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    // The data/time we want to countdown to
    setTimeout(() => {
      console.log(this.data.until_date * 1000);
      var countDownDate = +this.data.until_date * 1000;

      // Run myfunc every second
      var myfunc = setInterval(function() {
        var now = new Date().getTime();
        var timeleft = countDownDate - now;

        // Calculating the days, hours, minutes and seconds left
        var days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
        var hours = Math.floor(
          (timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

        // Result is output to the specific element
        document.getElementById("days").innerHTML = days + "d ";
        document.getElementById("hours").innerHTML = hours + "h ";
        document.getElementById("mins").innerHTML = minutes + "m ";
        document.getElementById("secs").innerHTML = seconds + "s ";

        // Display the message when countdown is over
        if (timeleft < 0) {
          clearInterval(myfunc);
          document.getElementById("days").innerHTML = "";
          document.getElementById("hours").innerHTML = "";
          document.getElementById("mins").innerHTML = "";
          document.getElementById("secs").innerHTML = "";
          document.getElementById("end").innerHTML = "TIME UP!!";
        }
      }, 1000);
    }, 1500);
  },
  props: {
    data: Object
  }
};
</script>

<style lang="scss" scoped></style>
