import {createRouter, createWebHistory} from 'vue-router'
import Login from "@/components/Login"
import WorkSubmissionCreate from "@/components/WorkSubmissionCreate";
import WorkSubmissionDetail from "@/components/WorkSubmissionDetail";


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




