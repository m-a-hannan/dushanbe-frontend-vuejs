<template>
  <div class="hello">


    <form class="container mt-5 border border-warning">
      <h1 class="mb-5 mt-3" style="color: #ff0090">Dushanbe</h1>
      <!--      Bill-->
      <div class="form-group">
        <label>Bill</label>
        <select class="form-control">
          <option selected disabled>Select Bill</option>
          <option v-for="bill in all_bills" :key="bill.id"
                  :value="bill.id">
            {{ bill.bill_name }}
          </option>
        </select>
      </div>
      <!--      Topics-->
      <div class="form-group">
        <label>Topic</label>
        <select class="form-control">
          <option selected disabled>Select Topic</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
      </div>

      <!--      Materials-->
      <div class="position-relative form-group">
        <label>Materials</label>
        <select class="form-control">
          <option selected disabled>Select Materials</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>

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


      <!--      work_progress-->
      <div class="position-relative form-group">
        <label>work progress</label>
        <input
            placeholder="0"
            id="department_name"
            v-model="department_name"
            type="number"
            class="form-control"/>
      </div>

      <button type="button" class="btn btn-success btn-lg mb-4">Submit</button>

    </form>
  </div>
</template>

<script>
import axios from "axios"

export default {
  name: 'HelloWorld',
  data() {
    return {
      all_bills: null
    }
  },


  methods: {
    LoadBill: function () {
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
    this.LoadBill();
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
