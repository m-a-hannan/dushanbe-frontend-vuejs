<!-- template section -->
<template>

    <!-- Main Div -->
    <div class="hello">

        <!--  Form Start  -->
        <form class="container mt-5 border border-warning" @submit.prevent="submitBillSubmissionForm">

            <!--Name & Logo-->
            <div class="row">
                <div class="col-md-11">
                    <h1 class="mb-5 mt-3" style="color: #0061A7">Bill Submissions | Dushanbe</h1>
                </div>
                <div class="col-md-1">


                    <router-link :to="{ path: '/bill-list' }">
                        <img src="https://ludwigpfeiffer.com/wp-content/themes/Ludwig-Pfeiffer_Theme/img/logo.png"
                             class="mt-3" alt="Dushanbe" width="70" height="70">
                    </router-link>


                </div>
            </div>

            <!-- Bill-->
            <div class="form-group">
                <label>Bill</label>
                <select v-model="bill" class="form-control"
                        :class="{ 'is-invalid': bill_error_data && bill_error_data.bill }">

                    <option selected disabled>select bill</option>
                    <option v-for="bill in all_bills" :key="bill.id" :value="bill.id">{{ bill.bill_name }}</option>
                </select>

                <!--Error Handling-->
                <div :class="{ 'invalid-feedback': bill_error_data && bill_error_data.bill }"
                     v-if="bill_error_data && bill_error_data.bill">
                    {{ bill_error_data.bill[0] }}
                </div>
            </div>

            <!-- Type -->
            <div class="form-group">
                <label>Type</label>
                <select v-model="type" class="form-control"
                        :class="{ 'is-invalid': bill_error_data && bill_error_data.type }">
                    <option selected disabled>select type</option>
                    <option v-for="type in all_types" :key="type.id" :value="type.id">{{ type.type_name }}</option>
                </select>

                <!--Error Handling-->
                <div :class="{ 'invalid-feedback': bill_error_data && bill_error_data.type }"
                     v-if="bill_error_data && bill_error_data.type">
                    {{ bill_error_data.type[0] }}
                </div>
            </div>

            <!-- Materials -->
            <div class="position-relative form-group">
                <label>Material</label>
                <select class="form-control" v-model="material"
                        :class="{ 'is-invalid': bill_error_data && bill_error_data.material }">
                    <option selected disabled>select material</option>
                    <option v-for="material in all_materials" :key="material.id" :value="material.id">{{
                        material.material_name }}
                    </option>

                    <!--Error Handling-->
                    <div :class="{ 'invalid-feedback': bill_error_data && bill_error_data.material }"
                         v-if="bill_error_data && bill_error_data.material">
                        {{ bill_error_data.material[0] }}
                    </div>
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

                <!-- Date & Work Progress -->
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
                                    :class="{ 'is-invalid': bill_error_data && bill_error_data.submission_date }"
                            />

                            <!--Error Handling-->
                            <div :class="{ 'invalid-feedback': bill_error_data && bill_error_data.submission_date }"
                                 v-if="bill_error_data && bill_error_data.submission_date">
                                {{ bill_error_data.submission_date[0] }}
                            </div>
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
                                    :class="{ 'is-invalid': bill_error_data && bill_error_data.work_progress }"
                            />

                            <!--Error Handling-->
                            <div :class="{ 'invalid-feedback': bill_error_data && bill_error_data.work_progress }"
                                 v-if="bill_error_data && bill_error_data.work_progress">
                                {{ bill_error_data.work_progress[0] }}
                            </div>
                        </div>
                    </div>

                </div>
                <!-- Date & Work Progress end -->

            </div>

            <!-- Submit Button -->

            <button @submit.prevent="submitBillSubmissionForm"
                    class="mb-4 btn btn-primary btn-lg">Submit
            </button>


        </form>
        <!--  Form End  -->

    </div>
    <!-- Main Div End -->

</template>


<!-- script section -->
<script>
    /* importing */
    import axios from "axios"
    import Swal from "sweetalert2";


    /* exporting */
    export default {
        name: 'DushanbeHome',

        data() {
            return {

                /*Load API*/
                all_bills: null,
                all_types: null,
                all_materials: null,

                /*for post*/
                bill: null,
                type: null,
                material: null,
                submission_date: null,
                work_progress: null,

                /*Validation*/
                bill_error_data: {
                    bill: null,
                    type: null,
                    material: null,
                    submission_date: null,
                    work_progress: null,
                }

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
                            this.all_bills = response.data;
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
                            this.all_types = response.data;
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
                            this.all_materials = response.data;
                        }.bind(this)
                    ) // then

            }, // loadMaterial


            async submitBillSubmissionForm() {
                // const token = localStorage.getItem("token");
                const response = await axios
                    .post("http://jahidmsk.pythonanywhere.com/api/bill-submissions/", {
                        /*headers: {
                            Authorization: `token ${token}`,
                        },*/
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
                                text: "You have successfully create a Bill..",
                            });
                            this.$router.push("#");
                        }
                    })
                    .catch((error) => {
                        this.bill_error_data = error.response.data;
                        console.log("--++", error.response);
                    });
                console.log(response);
            },


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
<style scoped>

    .bs-container.large-bootstrap-select {

    .dropdown-menu {
        width: 500px;

    li a span.text {
        word-wrap: break-word;
        white-space: normal;
    }

    }
    }
</style>




