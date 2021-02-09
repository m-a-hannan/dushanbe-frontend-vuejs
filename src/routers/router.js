import {createRouter, createWebHistory} from 'vue-router'
import DushanbeHome from "../components/DushanbeHome";

const routes = [

    {
        path: '/',
        name: 'DushanbeHome',
        component: DushanbeHome
    },

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
