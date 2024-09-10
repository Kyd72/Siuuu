<script setup>
//TODO : si le praticien est déjà connecté, on le route directement sur le dashboard
const storedPractitionerId = localStorage.getItem('practitionerId');
console.log('Practitioner ID récupéré du localStorage:', storedPractitionerId);

</script>

<template>

  <RouterView class="homepage" name="landingpage"/>
  <RouterView class="login" name="loginpage"/>
  <RouterView class="dashboardpage" name="loginpage"/>



</template>

<style lang="scss">

@import "primeflex/primeflex.css";
</style>
