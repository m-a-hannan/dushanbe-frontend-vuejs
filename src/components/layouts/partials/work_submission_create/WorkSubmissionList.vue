<!-- template section -->
<template>
  <!-- main row -->
  <div class="container-fluid my-3">
    <div class="main-card card">
      <div
        class="card-header d-flex align-items-center justify-content-between"
      >
        <div class="header d-flex align-items-center">
          <img
            src="https://ludwigpfeiffer.com/wp-content/themes/Ludwig-Pfeiffer_Theme/img/logo.png"
            alt="Dushanbe"
          />
          <h1 class="">Works List</h1>
        </div>
        <div class="page-title-heading">
          <router-link :to="{ name: 'WorkSubmissionCreate' }">
            <button type="button" class="btn btn-primary">
              <span class="fas fa-plus-square"></span> Add Work
            </button>
          </router-link>
        </div>
      </div>

      <!-- table -->
      <div class="table-responsive">
        <table class="table table-striped">
          <!-- thead -->
          <thead>
            <tr>
              <!-- <th scope="col">ID</th>
                  <th scope="col">Serial No</th> -->
              <th scope="col">Bill</th>
              <th scope="col">Type</th>
              <th scope="col">Material</th>
              <th scope="col">Unit</th>
              <th scope="col">Quantity</th>
              <th scope="col">Submission Date</th>
              <th scope="col">Work Progress</th>
              <th scope="col">Submitted By</th>
            </tr>
          </thead>
          <!-- thead end -->

          <!-- tbody -->
          <tbody>
            <tr v-for="work in all_work_submissions" :key="work.id">
              <!-- <td>{{ work.id }}</td>
                  <td>{{ work.material.serial_no }}</td> -->
              <td class="ellipsis" v-bind:title="work.bill.short_bill_name">
                {{ work.bill.short_bill_name.substr(0, 30) + "..." }}
              </td>
              <td>{{ work.type.short_type_name }}</td>
              <td
                class="ellipsis"
                v-bind:title="work.material.short_material_name"
              >
                {{ work.material.short_material_name.substr(0, 30) + "..." }}
              </td>
              <td>{{ work.material.unit }}</td>
              <td>{{ work.material.quantity }}</td>
              <td>{{ work.submission_date }}</td>
              <td>{{ work.work_progress }}</td>
              <td>{{ work.created_by.username }}</td>
            </tr>
          </tbody>
          <!-- tbody end -->
        </table>
      </div>
      <!-- table end -->
    </div>

    <nav class="mt-3">
      <ul class="pagination">
        <li class="page-item disabled">
          <a class="page-link" href="#" tabindex="-1" aria-disabled="true"
            >Previous</a
          >
        </li>
        <li class="page-item"><a class="page-link" href="#">1</a></li>
        <li class="page-item active" aria-current="page">
          <a class="page-link" href="#">2</a>
        </li>
        <li class="page-item"><a class="page-link" href="#">3</a></li>
        <li class="page-item">
          <a class="page-link" href="#">Next</a>
        </li>
      </ul>
    </nav>
  </div>
  <!-- main row end -->
</template>


<!-- script section -->
<script>
import axios from "axios";

export default {
  name: "WorkSubmissionList",

  data() {
    return {
      // GET API data
      all_work_submissions: null,

      // queryParam data
      created_by: null,
    };
  }, // data

  methods: {
    // Work Submission List (GET): https://jahidmsk.pythonanywhere.com/api/work-submissions/
    loadWorkSubmission: function () {
      const token = localStorage.getItem("token");

      const user_id = parseInt(localStorage.getItem("id"));

      console.log("----", user_id, typeof user_id);

      axios
        .get("https://jahidmsk.pythonanywhere.com/api/work-submissions/", {
          headers: { Authorization: `token ${token}` },
          params: { user_id },
        })
        .then(
          function (response) {
            this.all_work_submissions = response.data;
          }.bind(this)
        ); // then
    }, // loadWorkSubmission
  }, // methods

  created() {
    this.loadWorkSubmission();
  }, // created
}; // export default
</script>


<!-- css section -->
<style scoped>
.table {
  /* text-align: center; */
}

.td_action button {
  margin: 3px;
}

.table td,
.table th {
  vertical-align: middle;
  font-size: 15px;
}

.ellipsis {
  max-width: 300px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
</style>