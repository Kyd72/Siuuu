import { createRouter, createWebHistory } from 'vue-router'
import SignUp from "@/components/SignUp.vue";
import LoginPage from "@/components/LoginPage.vue";


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),

    routes: [
        /*All*/
        {
            path: '/',
            name: 'login_page',
            components: {
                loginpage:LoginPage,
            }

        }



    ]


})




export default router