import {createRouter, createWebHistory} from 'vue-router'
import Login from "@/components/Login"
import DushanbeHome from "../components/DushanbeHome"


// custom routes
const routes = [

    {path: '/', name: 'Login', component: Login},
    {path: '/form', name: 'DushanbeHome', component: DushanbeHome},

]

// configure
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

// exporting
export default router


