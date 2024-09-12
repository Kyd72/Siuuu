<script setup>
import Column from "primevue/column";
import DataTable from "primevue/datatable";
import { onMounted, reactive, ref } from "vue";
import { useToast } from 'primevue/usetoast';
import { getQuestionnairesAll } from "@/backend_requests/requests.js";
import QuestionnaireById from "./QuestionnaireById.vue";

// Liste réactive des questionnaires
const questionnaires = reactive([]);
const toast = useToast();

// Variable réactive pour stocker le questionnaire sélectionné
const selectedQuestionnaire = ref(null);

// Variable pour afficher ou cacher le DataTable
const afficherDataTable = ref(true);
const afficherQuestionnaire = ref(false);

// Méthode pour sélectionner un questionnaire et changer l'affichage
const onSelectionChange = (newSelection) => {
  selectedQuestionnaire.value = newSelection.id;  // On récupère l'ID du questionnaire sélectionné
  afficherDataTable.value = false;                // On cache le tableau
  afficherQuestionnaire.value = true;             // On affiche le composant détaillé
};

const closeQuestionnaireData = () => {
  afficherDataTable.value = true;   // On réaffiche le tableau
  afficherQuestionnaire.value = false; // On cache le composant détaillé
  selectedQuestionnaire.value = null;  // On réinitialise le questionnaire sélectionné
};

// Appel à l'API pour récupérer les questionnaires au chargement du composant
onMounted(async () => {
    await getQuestionnairesAll(toast).then(data => {
      Object.assign(questionnaires, data);  // On charge les données dans la liste réactive
    });
});
</script>

<template>
  <!-- Tableau des questionnaires -->
  <DataTable v-if="afficherDataTable" :value="questionnaires"
    selectionMode="single" :selection="selectedQuestionnaire" @update:selection="onSelectionChange"
    class="p-datatable-striped">
    <Column field="id" header="ID du questionnaire" />
    <Column field="title" header="Titre du questionnaire" />
    <Column field="status" header="Statut" />
  </DataTable>

  <!-- Composant détaillé affiché après la sélection -->
  <QuestionnaireById v-if="afficherQuestionnaire" @closeComponent="closeQuestionnaireData" :questionnaireId="selectedQuestionnaire"></QuestionnaireById>
</template>

<style scoped>
</style>
