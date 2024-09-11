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
  
      <!-- Colonne droite : Pour que tu ajoutes des informations supplémentaires -->
      <div class="right-column">
        <h2>Section supplémentaire</h2>
        <!-- Ajoute ici les éléments supplémentaires que tu veux afficher -->
        <p>Contenu personnalisé à venir...</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
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
  </script>
  
  <style scoped>
  .info-container {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
  
  .left-column, .right-column {
    width: 45%; /* Ajuste la largeur des colonnes */
  }
  
  .left-column p, .right-column p {
    margin: 10px 0;
    font-size: 16px;
  }
  </style>
  