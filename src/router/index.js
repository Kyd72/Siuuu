import { createRouter, createWebHistory } from 'vue-router'
import SignUp from "@/components/SignUp.vue";
import LoginPage from "@/components/LoginPage.vue";
import HomePage from '@/components/HomePage.vue';
import DashboardPage from '@/components/DashboardPage.vue';
import LandingPage from '@/components/LandingPage.vue';


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),

    routes: [
        /*All*/
        {
            path: '/login',
            name: 'login_page',
            components: {
                loginpage:LoginPage,
            },
        },

        {
            path: '/dashboard',
            name: 'dashboard_page',
            components: {
                dashboardpage:DashboardPage,
            },
            },
        {
            path: '/',
            name: 'landing_page',
            components: {
                landingpage:LandingPage,
            }
        }



    ]


})




export default router