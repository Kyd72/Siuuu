<script setup>
import Column from "primevue/column";
import DataTable from "primevue/datatable";
import {onMounted, onUpdated, reactive, ref} from "vue";
import { useToast } from 'primevue/usetoast';
import { getQuestionnaireResponses} from "@/backend_requests/requests.js";
import QuestionnaireResponse from "@/components/QuestionnaireResponse.vue";
// à la créaation du composant, on va chercher les questionnaires du médecin connecté grâce à son id localisé dans le
//local storage
const storedPractitionerId = localStorage.getItem('practitionerId');
const questionnairesResponses = reactive([]);
const toast = useToast();

// Variable réactive pour stocker l'élément sélectionné
const selectedQuestionnaireResponse = ref({});

//Variable pour afficher datatable

const afficherDataTable =ref(true)
const afficherQuestionnaire =ref(false)


// Méthode pour mettre à jour la variable réactive avec l'élément sélectionné
const onSelectionChange = (newSelection) => {


    selectedQuestionnaireResponse.value = newSelection;
    afficherDataTable.value=false
    afficherQuestionnaire.value=true


};


const closeQuestionnaireData = () => {
  afficherDataTable.value=true
  afficherQuestionnaire.value=false
  selectedQuestionnaireResponse.value={}
};



onMounted(async () => {
  if (storedPractitionerId) {
    await getQuestionnaireResponses(storedPractitionerId, toast).then(data => {
      // Si le JSON contient plus de propriétés, elles seront toutes assignées dynamiquement
      Object.assign(questionnairesResponses, data);


    }
    )
  }
})
onUpdated(async () => {
  if (storedPractitionerId) {
    await getQuestionnaireResponses(storedPractitionerId, toast).then(data => {
          // Si le JSON contient plus de propriétés, elles seront toutes assignées dynamiquement
          Object.assign(questionnairesResponses, data);


        }
    )
  }
})








</script>

<template>
  <DataTable v-if="afficherDataTable" :value="questionnairesResponses"
    @click="()=>{console.log(selectedQuestionnaireResponse)}"         selectionMode="single"  :selection="selectedQuestionnaireResponse"  @update:selection="onSelectionChange"
  class="p-datatable-striped">
    <Column field="id" header="ID du questionnaire" />
    <Column field="subject.display" header="Identité patient" />
    <Column field="status" header="Statut" />
    <Column field="authored" header="Date de réponse" />
  </DataTable>
  <QuestionnaireResponse @closeComponent="closeQuestionnaireData" v-if="afficherQuestionnaire" :questionnaireResponse="selectedQuestionnaireResponse"></QuestionnaireResponse>

</template>

<style scoped>

</style>