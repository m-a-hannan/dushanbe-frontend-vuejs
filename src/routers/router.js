import {createRouter, createWebHistory} from 'vue-router'
import Login from "@/views/Login"
import WorkSubmissionCreate from "@/views/WorkSubmissionCreate"
import WorkSubmissionDetail from "@/components/layouts/partials/work_submission_create/WorkSubmissionDetail"


// custom routes
const routes = [

    {path: '/', name: 'Login', component: Login},
    {path: '/work-submission-create', name: 'WorkSubmissionCreate', component: WorkSubmissionCreate},
    {path: '/work-submission-detail/:id', name: 'WorkSubmissionDetail', component: WorkSubmissionDetail},

]

// configure
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

// exporting
export default router




