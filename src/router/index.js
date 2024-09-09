import { createRouter, createWebHistory } from 'vue-router'
import ClimatSenseSidebar from "@/components/ClimatSenseComponent.vue";


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),

    routes: [
        /*All*/
        {
            path: '/',
            name: 'monitoring',
            components: {
                sidebar:ClimatSenseSidebar,
            }

        }



    ]


})




export default router