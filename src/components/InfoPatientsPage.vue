<template>
  <div class="info-container">
    <!-- Colonne gauche : Informations du patient -->
    <div class="left-column">
      <h2>Informations du patient</h2>
      <p><strong>ID :</strong> {{ patientData.id }}</p>
      <p><strong>Nom :</strong> {{ patientData.name?.family }}</p>
      <p><strong>Prénom :</strong> {{ patientData.name?.given[0] }}</p>
      <p><strong>Genre :</strong> {{ patientData.gender }}</p>
      <p><strong>Date de Naissance :</strong> {{ patientData.birthDate }}</p>
    </div>
    <!-- Colonne droite : Section supplémentaire -->
    <div class="right-column">
      <h2>Section supplémentaire</h2>
      <p>Contenu personnalisé à venir...</p>
    </div>
  </div>
</template>
<script setup>
import {ref, onMounted, onUpdated} from 'vue';
  import { getPatientById } from "@/backend_requests/requests.js"; // Remplace cette fonction par la requête réelle
  import router from "@/router/index.js";
  import { useToast } from "primevue/usetoast";
  
  const toastPatientsList = useToast(); // Notification pour les erreurs ou succès
  
  // Props pour recevoir l'ID du patient sélectionné
  const props = defineProps({
    patientId: String
  });
  
  const patientData = ref({}); // Stocke les données du patient
  
  onMounted(async () => {
    if (props.patientId) {
      try {
        // Requête pour obtenir les détails du patient en utilisant son ID
        const data = await getPatientById(props.patientId, toastPatientsList, router);
        
        if (data) {
          // Gérer le nom officiel des patients
          const officialName = data.name.find(n => n.use === "official") || data.name[0];
          data.name = {
            family: officialName.family || '',
            given: officialName.given || []
          };
  
          // Assigner les données récupérées à patientData
          patientData.value = data;
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des détails du patient:', error);
        toastPatientsList.add({
          severity: 'error',
          summary: 'Erreur',
          detail: "Impossible de récupérer les informations du patient.",
          life: 3000
        });
      }
    }
  });
/*
  onUpdated(async () => {
    if (props.patientId) {
      try {
        // Requête pour obtenir les détails du patient en utilisant son ID
        const data = await getPatientById(props.patientId, toastPatientsList, router);

        if (data) {
          // Gérer le nom officiel des patients
          const officialName = data.name.find(n => n.use === "official") || data.name[0];
          data.name = {
            family: officialName.family || '',
            given: officialName.given || []
          };

          // Assigner les données récupérées à patientData
          patientData.value = data;
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des détails du patient:', error);
        toastPatientsList.add({
          severity: 'error',
          summary: 'Erreur',
          detail: "Impossible de récupérer les informations du patient.",
          life: 3000
        });
      }
    }
  });
*/

</script>

<style scoped>
.info-container {
  display: flex;
  flex-direction: column; /* Change la direction des éléments en colonne (verticale) */
  justify-content: space-between;
  align-items: flex-start;
  width: 100%; /* Utilise toute la largeur de l'espace disponible */
  padding: 2px; /* Optionnel : ajout d'espacement interne */
}

.left-column, .right-column {
  flex: 1; /* Chaque colonne prend la même largeur */
  padding: 1px; /* Optionnel : ajout d'espacement interne */
}

.left-column {
  margin-right: 2px; /* Espace entre les deux colonnes */
}

.right-column {
  margin-left: 2px; /* Espace entre les deux colonnes */
}
</style>
  