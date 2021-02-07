<!-- template section -->
<template>

  <!-- Main Div -->
  <div class="hello">

    <!--  Form Start  -->
    <form class="container mt-5 border border-warning">
      <h1 class="mb-5 mt-3" style="color: #0061A7">Bill Submissions | Dushanbe</h1>

      <!-- Bill-->
      <div class="form-group">
        <label>Bill</label>

        <select class="form-control">
          <option selected disabled>select bill</option>
          <option v-for="bill in bills" :key="bill.id" :value="bill.id">{{ bill.bill_name }}</option>
        </select>
      </div>

      <!-- Type -->
      <div class="form-group">
        <label>Type</label>

        <select class="form-control">
          <option selected disabled>select type</option>
          <option v-for="type in types" :key="type.id" :value="type.id">{{ type.type_name }}</option>
        </select>
      </div>

      <!-- Materials -->
      <div class="position-relative form-group">
        <label>Material</label>

        <select class="form-control">
          <option selected disabled>select material</option>
          <option v-for="material in materials" :key="material.id" :value="material.id">{{ material.material_name }}</option>
        </select>


        <!-- Populated fields -->
        <div class="form-row mt-3">

          <!-- Serial Number -->
          <div class="col-md-4">
            <div class="position-relative form-group">
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
            <div class="position-relative form-group">
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
            <div class="form-group">
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
      <div class="position-relative form-group">

        <!-- main row -->
        <div class="form-row mt-3">

          <!-- Submission Date -->
          <div class="col-md-6">
            <div class="position-relative form-group">
              <label>Date</label>
              <input
                  type="date"
                  id="submission_date"
                  class="form-control"
                  v-model="submission_date"
              />
            </div>
          </div>

          <!-- Work Progress -->
          <div class="col-md-6">
            <div class="position-relative form-group">
              <label>Work Progress</label>
              <input
                  type="number"
                  id="work_progress"
                  class="form-control"
                  v-model="work_progress"
                  placeholder="0"
                  min="0"
              />
            </div>
          </div>

        </div>
        <!-- main row end -->

      </div>

      <!-- Submit Button -->
      <button type="button" class="btn btn-primary btn-lg mb-4">SUBMIT</button>

    </form>
    <!--  Form End  -->

  </div>
  <!-- Main Div End -->

</template>


<!-- script section -->
<script>
/* importing */
import axios from "axios"


/* exporting */
export default {
  name: 'DushanbeHome',

  data() {
    return {

      /* Bill List (GET): http://jahidmsk.pythonanywhere.com/api/bills/ */
      bills: null,

      /* Type List (GET): http://jahidmsk.pythonanywhere.com/api/types/ */
      types: null,

      /* Material List (GET): http://jahidmsk.pythonanywhere.com/api/materials/ */
      materials: null,

      submission_date: null,
      work_progress: null,

    }
  },


  /* methods */
  methods: {

    /* Bill List (GET): http://jahidmsk.pythonanywhere.com/api/bills/ */
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
                this.bills = response.data;
              }.bind(this)
          ) // then

    }, // loadBill

    /* Type List (GET): http://jahidmsk.pythonanywhere.com/api/types/ */
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
                this.types = response.data;
              }.bind(this)
          ) // then

    }, // loadType

    /* Material List (GET): http://jahidmsk.pythonanywhere.com/api/materials/ */
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
                this.materials = response.data;
              }.bind(this)
          ) // then

    }, // loadMaterial

  }, // methods


  /* created cycle */
  created() {
    this.loadBill()
    this.loadType()
    this.loadMaterial()
  },


}
</script>


<!-- css section -->
<style scoped></style>




