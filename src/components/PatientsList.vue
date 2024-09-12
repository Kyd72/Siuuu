<script setup>
import Column from "primevue/column";
import DataTable from "primevue/datatable";
import {onMounted, reactive, ref} from "vue";
import {getPatients} from "@/backend_requests/requests.js";
import router from "@/router/index.js";
import {useToast} from "primevue/usetoast";
import InfoPatientsPage from "./InfoPatientsPage.vue"; // Import du composant InfoPatient

const toastPatientsList = useToast();
const connectedPractitionerPatients = reactive([]);
const storedPractitionerId = localStorage.getItem('practitionerId');
const selectedPatientId = ref(null); // Stocker l'ID du patient sélectionné
const selected = ref(null); // Stocker l'ID du patient sélectionné
const afficherInfos = ref(false); // Stocker l'ID du patient sélectionné



onMounted(async () => {
  await getPatients(storedPractitionerId, toastPatientsList, router).then(data => {
    Object.assign(connectedPractitionerPatients, data);

    // Gérer le nom officiel des patients
    connectedPractitionerPatients.forEach((patient) => {
      const officialName = patient.name.find(n => n.use === "official") || patient.name[0];
      patient.name = {
        family: officialName.family || '',
        given: officialName.given ? officialName.given[0] || '' : ''
      };
    });
  }).catch(error => {
    toastPatientsList.add({ severity: 'error', summary: 'Info', detail: "Erreur de récupération des données", life: 3000 });
    console.error('Erreur lors de la récupération des données:', error);
  });
});

// Fonction déclenchée au clic sur un patient
function onPatientClick(patientId) {
  selectedPatientId.value = patientId;
    // Stocke l'ID du patient sélectionné

  afficherInfos.value = false;

  // Attendre un petit délai pour que Vue prenne en compte le changement
  setTimeout(() => {
    afficherInfos.value = true;
  }, 10); // Utilisation d'un délai très court
}
</script>

<template>
  <div class="table-info-container">
    <!-- Table des patients -->
    <div class="table-container">
      <DataTable :value="connectedPractitionerPatients" selectionMode="single" :selection="selected" class="p-datatable-striped" @rowClick="(e) => onPatientClick(e.data.id)">
        <Column field="id" header="ID" />
        <Column field="name.family" header="Nom" />
        <Column field="name.given" header="Prénom" />
        <Column field="gender" header="Genre" />
        <Column field="birthDate" header="Date de Naissance" />
      </DataTable>
    </div>
    <!-- Composant InfoPatient affiché en fonction du patient sélectionné -->
    <div class="info-container">
      <InfoPatientsPage v-if="afficherInfos" :patientId="selectedPatientId" ></InfoPatientsPage>
    </div>
  </div>
</template>

<style scoped>
.table-info-container {
  display: flex;
  justify-content: space-between; /* Espace entre les deux colonnes */
  width: 100%; /* Utiliser toute la largeur disponible */
}

.table-container, .info-container {
  flex: 1; /* Chaque élément occupe la même largeur */
  padding: 5px; /* Optionnel : Espacement interne */
}

.table-container {
  margin-right: 2px; /* Espace entre la table et l'info */
  width: 10vw;
}

.info-container {
  margin-left: 2px; /* Espace entre l'info et la table */
}
</style>
