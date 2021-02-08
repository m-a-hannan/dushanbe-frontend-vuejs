<!-- template section -->
<template>

  <!-- Main Div -->
  <div>
    <h1 style="color: red">HOME</h1>
    <h1 style="color: red">{{hello}}</h1>
  </div>
  <!-- Main Div End -->

</template>


<!-- script section -->
<script>

// exporting
export default {
  name: 'Home',

  data() {
    return {

      hello: "HELLO",

    } // return
  }, // data

}
</script>


<!-- css section -->
<style scoped>

</style>




