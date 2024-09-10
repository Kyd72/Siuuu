<script setup>
import Column from "primevue/column";
import DataTable from "primevue/datatable";
import {onMounted, reactive, ref} from "vue";
import {getPatients} from "@/backend_requests/requests.js";
import router from "@/router/index.js";
import {useToast} from "primevue/usetoast";

const toastPatientsList = useToast();




// Dummy data for demonstration
const patients = reactive([
  /*{ id: '1', name: 'John Doe', gender: 'Male', birthDate: '1980-01-01', address: '123 Main St' },
  { id: '2', name: 'Jane Smith', gender: 'Female', birthDate: '1990-05-15', address: '456 Elm St' },*/
  // Add more patient records as needed
]);


// à la créaation du composant, on va chercher les patients de medcein conectes grâce à son id localisé dans le
//local storage
const connectedPractitionerPatients = reactive([]) ;
const storedPractitionerId = localStorage.getItem('practitionerId');


onMounted(async () => {

  await getPatients(storedPractitionerId, toastPatientsList, router ).then(data => {
    // Si le JSON contient plus de propriétés, elles seront toutes assignées dynamiquement
    Object.assign(connectedPractitionerPatients, data);

    // Fonction pour ne garder que l'utilisation "official" ou le premier si inexistant
    // Fonction pour transformer le tableau name en un objet simple avec le premier élément
    connectedPractitionerPatients.forEach((patient) => {
      // Prend le premier élément avec use: "official", sinon le premier élément du tableau
      const officialName = patient.name.find(n => n.use === "official") || patient.name[0];

      // Met à jour le champ name pour qu'il ne contienne plus de tableau
      patient.name = {
        family: officialName.family || '',
        given: officialName.given ? officialName.given[0] || '' : ''
      };
    });

  }).catch(error => {
    toastPatientsList.add({ severity: 'error', summary: 'Info', detail: "Erreur de récupération de données\n", life: 3000 })
    console.error('Erreur lors de la récupération des données:', error);
  });
});
</script>

<template>
  <DataTable :value="connectedPractitionerPatients" class="p-datatable-striped">
    <Column field="id" header="ID" />
    <Column field="name.family" header="Nom" />
    <Column field="name.given" header="Prénom" />
    <Column field="gender" header="Gender" />
    <Column field="birthDate" header="Birth Date" />
  </DataTable>

</template>

<style scoped>

</style>