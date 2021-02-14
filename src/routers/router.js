import {createRouter, createWebHistory} from 'vue-router'
import Login from "@/components/Login"
import DushanbeHome from "../components/DushanbeHome"
import WorkSubmissionDetail from "@/components/WorkSubmissionDetail";


// custom routes
const routes = [

    {path: '/', name: 'Login', component: Login},
    {path: '/form', name: 'DushanbeHome', component: DushanbeHome},
    {path: '/work-submissions/:id', name: 'WorkSubmissionDetail', component: WorkSubmissionDetail},

]

// configure
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

// exporting
export default router




