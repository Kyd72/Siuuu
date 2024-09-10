<script setup>

import router from "@/router"
import {reactive, ref} from 'vue';
import { useToast } from 'primevue/usetoast';
import {Practitioner} from "@/models/models.js";
import {getPractitionerByNameAndIdentifier} from "@/backend_requests/requests.js";


const toastSignIn = useToast();

const FHIRnameFamily_signin = ref();
const FHIRidentifierValue_signin = ref();

//Rechercher le medecin dans la BDD

async function searchPracticionner(){

  await getPractitionerByNameAndIdentifier(FHIRnameFamily_signin.value.toLowerCase(), toastSignIn, FHIRidentifierValue_signin.value.toLowerCase(), router )

}






</script>

<template>
<div id="signin_main">

  <div class="surface-card p-4 shadow-2 border-round w-full lg:w-6">
  <div class="text-center mb-5">
    <img src="/src/assets/medecin.png" alt="Image" height="50" class="mb-3" />
    <div class="text-900 text-3xl font-medium mb-3">Welcome Back</div>
    <span class="text-600 font-medium line-height-3">Don't have an account?</span>
    <a class="font-medium no-underline ml-2 text-blue-500 cursor-pointer">Create today!</a>
  </div>
  <div>
    <label for="FHIRnameFamily_signinID" class="block text-900 font-medium mb-2">Nom de famille</label>
    <InputText id="FHIRnameFamily_signinID" v-model="FHIRnameFamily_signin" type="text" class="w-full mb-3" />

    <label for="FHIRidentifierValue_signinID" class="block text-900 font-medium mb-2">Identifiant Médecin</label>
    <InputText id="FHIRidentifierValue_signinID" v-model="FHIRidentifierValue_signin" type="text" class="w-full mb-3" />

    <!--      <div class="flex align-items-center justify-content-between mb-6">-->
    <!--        <div class="flex align-items-center">-->
    <!--          <Checkbox id="rememberme1" :binary="true" v-model="checked" class="mr-2"></Checkbox>-->
    <!--          <label for="rememberme1">Remember me</label>-->
    <!--        </div>-->
    <!--        <a class="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">Forgot password?</a>-->
    <!--      </div>-->

    <Button label="Se connecter"  @click="searchPracticionner()" icon="pi pi-user" class="w-full"></Button>

  </div>
</div></div>

</template>

<style scoped>
#signin_main {
  display: flex;
  justify-content: center; /* Centre horizontalement */
  align-items: center;     /* Centre verticalement */
}
</style>