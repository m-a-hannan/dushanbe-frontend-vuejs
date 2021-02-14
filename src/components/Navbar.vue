<template>
  <nav class="navbar navbar-expand-lg bg-white shadow-sm">
    <div class="container main-container my-0">
      <a class="navbar-brand text-dark" href="#"> {{ username.username }} </a>
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <a href="" class="nav-link">Test 1</a>
        </li>
        <li class="nav-item">
          <a href="" class="nav-link">Test 2</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  props: ["username"],
};
</script>

<style>
</style>