import {createRouter, createWebHistory} from 'vue-router'
import Login from "@/views/Login"
import WorkSubmissionCreate from "@/views/WorkSubmissionCreate"
import WorkSubmissionList from "@/components/layouts/partials/work_submission_create/WorkSubmissionList"


// custom routes
const routes = [

    {path: '/', name: 'Login', component: Login},
    {path: '/work-submission-create', name: 'WorkSubmissionCreate', component: WorkSubmissionCreate},
    {path: '/work-submission-list', name: 'WorkSubmissionList', component: WorkSubmissionList},

]

// configure
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

// exporting
export default router




