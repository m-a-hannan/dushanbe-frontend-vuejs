<!-- template section -->
<template>
  <div class="main-container">
    <!-- Main Div -->
    <div class="container">
      <!--  Form Start  -->
      <!-- <div class="card-header"></div> -->
      <form
        name="bill_form"
        class="form rounded bg-white"
        @submit.prevent="submitBillSubmissionForm"
      >
        <div class="card-header bg-white">
          <div class="header d-flex align-items-center">
            <router-link :to="{ path: '/' }">
              <img
                src="https://ludwigpfeiffer.com/wp-content/themes/Ludwig-Pfeiffer_Theme/img/logo.png"
                alt="Dushanbe"
              />
            </router-link>
            <h1 class="">Bill Submissions | Dushanbe</h1>
          </div>
        </div>
        <div class="card-body">
          <!-- Bill-->
          <div class="form-group">
            <label>Bill</label>
            <select
              v-model="bill"
              class="custom-select"
              :class="{ 'is-invalid': bill_error_data && bill_error_data.bill }"
            >
              <option selected disabled>select bill</option>
              <option v-for="bill in all_bills" :key="bill.id" :value="bill.id">
                {{ bill.bill_name }}
              </option>
            </select>

            <!-- bill error handling-->
            <div
              :class="{
                'invalid-feedback': bill_error_data && bill_error_data.bill,
              }"
              v-if="bill_error_data && bill_error_data.bill"
            >
              {{ bill_error_data.bill[0] }}
            </div>
          </div>

          <!-- Type -->
          <div class="form-group">
            <label>Type</label>
            <select
              v-model="type"
              class="custom-select"
              :class="{ 'is-invalid': bill_error_data && bill_error_data.type }"
            >
              <option selected disabled>select type</option>
              <option v-for="type in all_types" :key="type.id" :value="type.id">
                {{ type.type_name }}
              </option>
            </select>

            <!-- type error handling-->
            <div
              :class="{
                'invalid-feedback': bill_error_data && bill_error_data.type,
              }"
              v-if="bill_error_data && bill_error_data.type"
            >
              {{ bill_error_data.type[0] }}
            </div>
          </div>

          <!-- Materials -->
          <div class="form-group">
            <label>Material</label>
            <select
              class="custom-select"
              v-model="material"
              :class="{
                'is-invalid': bill_error_data && bill_error_data.material,
              }"
            >
              <option selected disabled>select material</option>
              <option
                v-for="material in all_materials"
                :key="material.id"
                :value="material.id"
              >
                {{ material.short_material_name }}
              </option>

              <!-- material error handling-->
              <div
                :class="{
                  'invalid-feedback':
                    bill_error_data && bill_error_data.material,
                }"
                v-if="bill_error_data && bill_error_data.material"
              >
                {{ bill_error_data.material[0] }}
              </div>
            </select>

            <!-- Populated fields -->
            <div class="form-row mt-3">
              <!-- Serial Number -->
              <div class="col-md-4">
                <div class="form-group mb-lg-0">
                  <input
                    disabled
                    id="serial_number"
                    class="form-control"
                    placeholder="Serial Number"
                  />
                </div>
              </div>

              <!-- Unit -->
              <div class="col-md-4">
                <div class="form-group mb-lg-0">
                  <input
                    disabled
                    id="unit"
                    class="form-control"
                    placeholder="Unit"
                  />
                </div>
              </div>

              <!-- Quantity -->
              <div class="col-md-4">
                <div class="form-group mb-0">
                  <input
                    disabled
                    id="quantity"
                    class="form-control"
                    placeholder="Quantity"
                  />
                </div>
              </div>
            </div>
            <!-- Populated fields end -->
          </div>

          <!-- Submission Date & Work Progress -->
          <div class="form-group">
            <!-- main row -->
            <div class="form-row">
              <!-- Submission Date -->
              <div class="col-md-6">
                <div class="position-relative form-group mb-lg-0">
                  <label>Date</label>
                  <input
                    type="date"
                    id="submission_date"
                    class="form-control"
                    v-model="submission_date"
                    :class="{
                      'is-invalid':
                        bill_error_data && bill_error_data.submission_date,
                    }"
                  />

                  <!--Error Handling-->
                  <div
                    :class="{
                      'invalid-feedback':
                        bill_error_data && bill_error_data.submission_date,
                    }"
                    v-if="bill_error_data && bill_error_data.submission_date"
                  >
                    {{ bill_error_data.submission_date[0] }}
                  </div>
                </div>
              </div>

              <!-- Work Progress -->
              <div class="col-md-6">
                <div class="position-relative form-group mb-0">
                  <label>Work Progress</label>
                  <input
                    type="number"
                    id="work_progress"
                    class="form-control"
                    v-model="work_progress"
                    placeholder="0"
                    min="0"
                    :class="{
                      'is-invalid':
                        bill_error_data && bill_error_data.work_progress,
                    }"
                  />

                  <!--Error Handling-->
                  <div
                    :class="{
                      'invalid-feedback':
                        bill_error_data && bill_error_data.work_progress,
                    }"
                    v-if="bill_error_data && bill_error_data.work_progress"
                  >
                    {{ bill_error_data.work_progress[0] }}
                  </div>
                </div>
              </div>
            </div>
            <!-- Date & Work Progress end -->
          </div>
          <!-- main row end -->

          <div class="btn-container">
            <!-- Submit Button -->
            <button
              @submit.prevent="submitBillSubmissionForm"
              id="submit_button"
              class="btn btn-primary"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
      <!--  Form End  -->
    </div>
    <!-- Main Div End -->
  </div>
</template>


<!-- script section -->
<script>
// importing
import axios from "axios";
import Swal from "sweetalert2";
// import $ from 'jquery'

// exporting
export default {
  name: "DushanbeHome",

  data() {
    return {
      // GET API data
      all_bills: null,
      all_types: null,
      all_materials: null,

      // POST API data
      bill: null,
      type: null,
      material: null,
      submission_date: null,
      work_progress: null,

      // Field Validations
      bill_error_data: {
        bill: null,
        type: null,
        material: null,
        submission_date: null,
        work_progress: null,
      },
    }; // return
  }, // data

  // methods
  methods: {
    // Bill List (GET): http://jahidmsk.pythonanywhere.com/api/bills/
    loadBill: function () {
      // const token = localStorage.getItem("token");
      axios
        .get("http://jahidmsk.pythonanywhere.com/api/bills/", {
          // headers: {
          //   Authorization: token ${token},
          // },
        })
        .then(
          function (response) {
            this.all_bills = response.data;
          }.bind(this)
        ); // then
    }, // loadBill

    // Type List (GET): http://jahidmsk.pythonanywhere.com/api/types/
    loadType: function () {
      // const token = localStorage.getItem("token");
      axios
        .get("http://jahidmsk.pythonanywhere.com/api/types/", {
          // headers: {
          //   Authorization: token ${token},
          // },
        })
        .then(
          function (response) {
            this.all_types = response.data;
          }.bind(this)
        ); // then
    }, // loadType

    // Material List (GET): http://jahidmsk.pythonanywhere.com/api/materials/
    loadMaterial: function () {
      // const token = localStorage.getItem("token");
      axios
        .get("http://jahidmsk.pythonanywhere.com/api/materials/", {
          // headers: {
          //   Authorization: token ${token},
          // },
        })
        .then(
          function (response) {
            this.all_materials = response.data;
          }.bind(this)
        ); // then
    }, // loadMaterial

    // Display today's date into 'submission_date' field
    todayDate: function () {
      this.submission_date = new Date().toISOString().substr(0, 10);
      // $("#submission_date").value = submission_date
    }, // todayDate()

    // Bill Submission (POST): http://jahidmsk.pythonanywhere.com/api/bill-submissions/
    async submitBillSubmissionForm() {
      // const token = localStorage.getItem("token");

      const response = await axios
        .post("http://jahidmsk.pythonanywhere.com/api/bill-submissions/", {
          // headers: {
          //     Authorization: `token ${token}`,
          // },

          bill: this.bill,
          type: this.type,
          material: this.material,
          submission_date: this.submission_date,
          work_progress: this.work_progress,
        })
        .then((response) => {
          if (response.status === 201) {
            Swal.fire({
              icon: "success",
              // title: "Yes...",
              text: "Bill Submitted Successfully!",
            });
            // this.$router.push("#");
            // this.$router.go()
          }
        })
        .catch((error) => {
          this.bill_error_data = error.response.data;
          console.log("--++", error.response);
        });
      console.log(response);
    }, // submitBillSubmissionForm
  }, // methods

  // created cycle
  created() {
    this.loadBill();
    this.loadType();
    this.loadMaterial();
    this.todayDate();
  },
};
</script>


<!-- css section -->
<style>
body {
  width: 100%;
  height: 100%;
  background-color: #fafafa;
}

.main-container {
  margin: 30px auto;
  width: 60%;
}

.form {
  background: #ffffff;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
}

label {
  text-transform: uppercase;
  font-weight: 500;
}

.header img {
  width: 50px;
  height: auto;
  margin-right: 15px;
}

.header h1 {
  color: #0061a7;
  font-size: 30px;
  text-transform: uppercase;
  font-weight: 700;
}

.btn-container {
  text-align: right;
}

.custom-select {
  text-transform: capitalize;
}

#submit_button {
  background-color: #0061a7;
  min-width: 150px;
}

@media (max-width: 425px) {
  .main-container {
    width: 100%;
  }
  .header h1 {
    font-size: 26px;
  }
  .btn {
    width: 100%;
  }
}

@media (max-width: 320px) {
  .header h1 {
    font-size: 20px;
  }
  .card-body {
    padding: 15px;
  }
}
</style>




