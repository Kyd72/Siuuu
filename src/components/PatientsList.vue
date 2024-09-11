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
  selectedPatientId.value = patientId; // Stocke l'ID du patient sélectionné
}
</script>

<template>
  <div class="table-container">
    <!-- Table des patients -->
    <DataTable :value="connectedPractitionerPatients" class="p-datatable-striped" @row-click="(e) => onPatientClick(e.data.id)">
      <Column field="id" header="ID" />
      <Column field="name.family" header="Nom" />
      <Column field="name.given" header="Prénom" />
      <Column field="gender" header="Genre" />
      <Column field="birthDate" header="Date de Naissance" />
    </DataTable>

    <!-- Composant InfoPatient affiché en fonction du patient sélectionné -->
    <InfoPatientsPage v-if="selectedPatientId" :patientId="selectedPatientId" />
  </div>
</template>

<style scoped>
.table-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

/* Sélecteurs plus spécifiques pour forcer l'application des styles */
.p-datatable-striped .p-datatable-tbody > tr {
  cursor: pointer; /* Changer le curseur au survol pour indiquer que c'est cliquable */
  transition: background-color 0.3s ease;
}

.p-datatable-striped .p-datatable-tbody > tr:hover {
  background-color: #f0f0f0 !important; /* Couleur de fond au survol */
}
</style>