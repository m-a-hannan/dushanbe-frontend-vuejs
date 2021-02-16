<!-- template section -->
<template>
  <!-- main container -->
  <div class="main-container">
    <!-- main div -->
    <div class="container">
      <!-- form start -->
      <form name="bill_form" class="form rounded bg-white" @submit.prevent="submitBillSubmissionForm">
        <!-- logo & heading -->
        <div class="card-header bg-white">
          <div class="header d-flex align-items-center">
            <router-link :to="{ path: '/work-submission-create' }">
              <img
                  src="https://ludwigpfeiffer.com/wp-content/themes/Ludwig-Pfeiffer_Theme/img/logo.png"
                  alt="Dushanbe"
              />
            </router-link>
            <h1 class="">Work Submission | Dushanbe</h1>
          </div>
        </div>

        <!-- card body -->
        <div class="card-body">

          <!-- Bill-->
          <div class="form-group">
            <label>Bill</label>

            <select
                v-model="bill"
                @change="loadType()"
                class="custom-select"
                :class="{
                'is-invalid':
                  field_validation_data && field_validation_data.bill,
              }"
            >
              <option selected disabled>select bill</option>
              <option v-for="bill in all_bills" :key="bill.id" :value="bill.id">
                {{ bill.short_bill_name }}
              </option>
            </select>

            <!-- bill error handling-->
            <div
                :class="{
                'invalid-feedback':
                  field_validation_data && field_validation_data.bill,
              }"
                v-if="field_validation_data && field_validation_data.bill"
            >
              {{ field_validation_data.bill[0] }}
            </div>
          </div>
          <!-- Bill end -->

          <!-- Type -->
          <div class="form-group">
            <label>Type</label>
            <select
                v-model="type"
                class="custom-select"
                @change="loadMaterial()"
                :class="{
                'is-invalid':
                  field_validation_data && field_validation_data.type,
              }"
            >
              <option selected disabled>select type</option>
              <option v-for="type in all_types" :key="type.id" :value="type.id">
                {{ type.short_type_name }}
              </option>
            </select>

            <!-- type error handling-->
            <div
                :class="{
                'invalid-feedback':
                  field_validation_data && field_validation_data.type,
              }"
                v-if="field_validation_data && field_validation_data.type"
            >
              {{ field_validation_data.type[0] }}
            </div>
          </div>
          <!-- Type end -->

          <!-- Materials -->
          <div class="form-group">
            <label>Material</label>
            <select
                class="custom-select"
                v-model="material"
                @change="loadMaterialData()"
                :class="{
                'is-invalid':
                  field_validation_data && field_validation_data.material,
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

              <!-- material error handling -->
              <div
                  :class="{
                  'invalid-feedback':
                    field_validation_data && field_validation_data.material,
                }"
                  v-if="field_validation_data && field_validation_data.material"
              >
                {{ field_validation_data.material[0] }}
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
                      v-model="serial_no"
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
                      v-model="unit"
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
                      v-model="quantity"
                      class="form-control"
                      placeholder="Quantity"
                  />
                </div>
              </div>
            </div>
            <!-- Populated fields end -->
          </div>
          <!-- Materials end -->

          <!-- Date & WorkProgress -->
          <div class="form-group">
            <!-- main row -->
            <div class="form-row">
              <!-- Date -->
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
                        field_validation_data &&
                        field_validation_data.submission_date,
                    }"
                  />

                  <!--Error Handling-->
                  <div
                      :class="{
                      'invalid-feedback':
                        field_validation_data &&
                        field_validation_data.submission_date,
                    }"
                      v-if="
                      field_validation_data &&
                      field_validation_data.submission_date
                    "
                  >
                    {{ field_validation_data.submission_date[0] }}
                  </div>
                </div>
              </div>

              <!-- WorkProgress -->
              <div class="col-md-6">
                <div class="position-relative form-group mb-0">
                  <label>Work Progress</label> <br>
                      <!-- <input type="range" class="form-range w-100 mt-2" v-model="work_progress"> -->
                      <!-- <p style="position: absolute; right: 0">{{work_progress}}</p> -->

                  <input type="number" id="work_progress" class="form-control" v-model="work_progress" placeholder="0" min="0" step=".01" >

                  <!--<input
                      type="number"
                      id="work_progress"
                      class="form-control"
                      v-model="work_progress"
                      placeholder="0"
                      min="0"
                  />-->

                </div>
              </div>
            </div>
            <!-- main row -->
          </div>
          <!-- Date & WorkProgress end -->

          <!-- Submit Button -->
          <div class="btn-container">
            <button
                @submit.prevent="submitBillSubmissionForm"
                id="submit_button"
                class="btn btn-primary mt-1"
            >
              SUBMIT
            </button>
          </div>
          <!-- Submit Button end-->
        </div>
        <!-- card body end -->
      </form>
      <!-- form end -->
    </div>
    <!-- Main Div End -->
  </div>
  <!-- main container end -->
</template>


<!-- script section -->
<script>
import axios from "axios"
import Swal from "sweetalert2"
// import $ from 'jquery'


// exporting
export default {
  name: "Form",

  data() {
    return {
      // GET API data
      all_bills: null,
      all_types: null,
      all_materials: null,

      // populated data
      serial_no: null,
      unit: null,
      quantity: null,

      // POST API data
      bill: null,
      type: null,
      material: null,
      submission_date: null,
      work_progress: null,

      // field validation data
      field_validation_data: {
        bill: null,
        type: null,
        material: null,
        submission_date: null,
        work_progress: null,
      },

      // localStorage data
      username: localStorage.getItem("username"),
    }; // return
  }, // data

  methods: {

    // Bill List (GET): https://jahidmsk.pythonanywhere.com/api/bills/
    loadBill: function () {
      const token = localStorage.getItem("token");
      axios
        .get("https://jahidmsk.pythonanywhere.com/api/bills/", {
          headers: { Authorization: `token ${token}` },
        })
        .then(
          function (response) {
            this.all_bills = response.data;
          }.bind(this)
        ); // then
    }, // loadBill

    // Type List (GET): http://jahidmsk.pythonanywhere.com/api/types/
    loadType: function () {
      const token = localStorage.getItem("token");
      axios
        .get("https://jahidmsk.pythonanywhere.com/api/types/", {
          headers: { Authorization: `token ${token}` },
          params: { bill: this.bill },
        })
        .then(
          function (response) {
            this.all_types = response.data;
          }.bind(this)
        ); // then
    }, // loadType

    // Material List (GET): http://jahidmsk.pythonanywhere.com/api/materials/
    loadMaterial: function () {
      const token = localStorage.getItem("token");
      axios
        .get("https://jahidmsk.pythonanywhere.com/api/materials/", {
          headers: { Authorization: `token ${token}` },
          params: { type: this.type },
          // params: { id: this.material.id, type: this.type },
        })
        .then(
          function (response) {
            this.all_materials = response.data;
          }.bind(this)
        ); // then
    }, // loadMaterial

    // Material Data (GET): http://jahidmsk.pythonanywhere.com/api/materials/
    loadMaterialData: function () {
      const token = localStorage.getItem("token");
      axios
        .get("https://jahidmsk.pythonanywhere.com/api/materials/", {
          headers: { Authorization: `token ${token}` },
          params: {
            type: this.type,
          },
        })
        .then(
          function (response) {
            response.data.map((element) => {
              this.serial_no = element.serial_no
              this.unit = element.unit
              this.quantity = element.quantity
            })
          }.bind(this)
        ); // then
    }, // loadMaterialData

    // Display today's date into 'submission_date' field
    todayDate: function () {
      // const current = new Date()
      // this.submission_date = current.getFullYear() + '-' + (current.getMonth()+1) + '-' + current.getDate()
      this.submission_date = new Date().toISOString().substr(0, 10)
    }, // todayDate()

    // Bill Submission (POST): https://jahidmsk.pythonanywhere.com/api/work-submissions/
    submitBillSubmissionForm() {
      const token = localStorage.getItem("token");

      const config = { headers: { Authorization: `token ${token}` } };

      const bodyParameters = {
        bill: this.bill,
        type: this.type,
        material: this.material,
        submission_date: this.submission_date,
        work_progress: this.work_progress,
      };

      axios
        .post(
          "https://jahidmsk.pythonanywhere.com/api/work-submissions/",
          bodyParameters,
          config
        )
        .then((response) => {
          Swal.fire({
            icon: "success",
            text: "Work Submitted Successfully!",
          }).then((result) => {
            this.$router.go()
            // this.$router.push("work-submission-list")
            console.log(result)
          });
          console.log(response)
        })
        .catch((error) => {
          this.field_validation_data = error.response.data
          console.log("--++", error.response)
        });
      // console.log(response)

    }, // submitBillSubmissionForm

  }, // methods

  created() {

    this.loadBill()
    // this.loadType()
    // this.loadMaterial()
    this.todayDate()

  }, // created

} // export default

</script>


<!-- css section -->
<style>
body {
  width: 100%;
  height: 100%;
  background-color: #fafafa;
}

.shadow-sm {
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.05);
}

.navbar-brand {
  color: #999999;
  font-size: 16px;
}

.navbar a.nav-link {
  font-size: 16px;
  color: #000;
}

.navbar a.logout-btn {
  color: red;
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

@media (max-width: 768px) {
  .header h1 {
    font-size: 24px;
  }

  #submit_button {
    width: 100%;
  }
  .navbar-nav {
    flex-direction: row;
  }
  .navbar-nav li {
    margin-left: 10px;
  }
}
@media (max-width: 425px) {
  .main-container {
    width: 100%;
  }

  .header h1 {
    font-size: 20px;
  }

  .btn {
    width: 100%;
  }

  .navbar-nav li {
    margin-left: 15px;
  }
}

@media (max-width: 320px) {
  .header h1 {
    font-size: 18px;
  }

  .card-body {
    padding: 15px;
  }

  .navbar a.nav-link,
  .navbar a.navbar-brand {
    font-size: 14px;
  }
  .header img {
    width: 40px;
  }
}
</style>