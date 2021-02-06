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
          <option v-for="bill in all_bills" :key="bill.id"
                  :value="bill.id">
            {{ bill.bill_name }}
          </option>
        </select>
      </div>

      <!-- Topics -->
      <div class="form-group">
        <label>Type</label>

        <select class="form-control">
          <option selected disabled>select type</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
      </div>

      <!-- Materials -->
      <div class="position-relative form-group">
        <label>Material</label>

        <select class="form-control">
          <option selected disabled>select material</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>


        <!-- Serial Number -->
        <div class="form-row mt-3">
          <div class="col-md-4">
            <div class="position-relative form-group">
              <input
                  placeholder="Serial Number"
                  id="department_code"
                  v-model="department_code"
                  type="text"
                  disabled
                  class="form-control"
              />
            </div>
          </div>

          <!-- Unit -->
          <div class="col-md-4">
            <div class="position-relative form-group">
              <input
                  disabled
                  placeholder="Unit"
                  v-model="department_code"
                  type="text"
                  class="form-control"
              />
            </div>
          </div>

          <!-- Quantity -->
          <div class="col-md-4">
            <div class="form-group">
              <input
                  disabled
                  placeholder="Quantity"
                  v-model="department_code"
                  type="text"
                  class="form-control"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Submission Date -->
      <div class="position-relative form-group">
        <label>Date</label>
        <input type="date">
      </div>

      <!-- Work Progress -->
      <div class="position-relative form-group">
        <label>Work Progress</label>
        <input
            placeholder="0"
            id="department_name"
            v-model="department_name"
            type="number"
            class="form-control"
            min="0"/>
      </div>

      <!-- Submit Button -->
      <button type="button" class="btn btn-success btn-lg mb-4">SUBMIT</button>

    </form>
    <!--  Form End  -->

  </div>
  <!-- Main Div End -->

</template>


<script>
import axios from "axios"


export default {
  name: 'DushanbeHome',

  data() {
    return {
      all_bills: null
    }
  },


  methods: {
    loadBill: function () {
      // const token = localStorage.getItem("token");
      axios
          .get("http://galib04.pythonanywhere.com/api/bills/", {
            // headers: {
            //   Authorization: token ${token},
            // },
          })
          .then(
              function (response) {
                this.all_bills = response.data;
              }.bind(this)
          );
    },

  },


  created() {
    this.loadBill();
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
