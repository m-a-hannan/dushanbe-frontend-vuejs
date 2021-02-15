<template>

  <!-- Navbar -->
  <nav class="navbar navbar-expand-lg bg-white shadow-sm">
    <div class="container main-container my-0">
      <!-- <a class="navbar-brand text-dark" href="#" v-if="first_name && last_name"> -->
      <a class="navbar-brand text-dark" href="#">
      <!-- <i class="fas fa-user-circle"></i> {{ first_name + " " + last_name }} -->
        <i class="fas fa-user-circle"></i> {{username}}
      </a>
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <a
              href=""
              class="nav-link"
              id="work_details_button"
              @click="loadWorkSubmissionDetail(1)"
          >Details</a
          >
        </li>
        <li class="nav-item">
          <a
              href=""
              class="nav-link logout-btn"
              id="logout_button"
              @click="logout"
          >Logout</a
          >
        </li>
      </ul>
    </div>
  </nav>
  <!-- Navbar end -->

</template>


<script>

import axios from "axios"

export default {

  name: "Navbar",

  data() {
    return {
      username: localStorage.getItem("username"),
      first_name : localStorage.getItem("first_name"),
      last_name: localStorage.getItem("last_name"),
    } // return

  }, // data

  methods: {

    // Logout (GET): http://jahidmsk.pythonanywhere.com/api/logout/
    logout() {
      const token = localStorage.getItem("token");
      axios.get(
          "http://jahidmsk.pythonanywhere.com/api/work-submissions/logout/",
          {
            headers: {Authorization: `token ${token}`},
          }
      ).then((res) => {
        console.log(res.data);
      }).catch((error) => {
        console.error(error)
      })
      localStorage.removeItem("token")
      localStorage.clear()
      this.$router.push("/")
    }, // logout

  } // methods

} // export default
</script>


<style scoped></style>

