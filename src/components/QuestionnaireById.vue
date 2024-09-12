<template>
  <div>
    <Button @click="close" label="Fermer" icon="pi pi-times" class="p-button-warning" />
    <div v-if="questionnaire">
      <h3>{{ questionnaire.title || 'Questionnaire' }}</h3>
      <!-- Affichage des détails du questionnaire -->
      <div v-for="group in questionnaire.item" :key="group.linkId">
        <h4>{{ group.text }}</h4>
        <div v-for="question in group.item" :key="question.linkId">
          <p>{{ question.text }}</p>
          <div v-for="answer in question.answer" :key="answer.valueString || answer.valueInteger">
            <p>{{ answer.valueString || answer.valueInteger }}</p>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Aucun détail disponible pour ce questionnaire.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Button from 'primevue/button';
import { getQuestionnaireById } from "@/backend_requests/requests.js";

// Props pour recevoir l'ID du questionnaire
const props = defineProps({
  questionnaireId: String
});

// Émission pour fermer le composant
const emit = defineEmits(['closeComponent']);
const questionnaire = ref(null);

// Méthode pour fermer le composant
const close = () => {
  emit('closeComponent');
};

// Requête pour récupérer les données du questionnaire par ID
onMounted(async () => {
  if (props.questionnaireId) {
    const data = await getQuestionnaireById(props.questionnaireId);
    questionnaire.value = data;
  }
});
</script>

<style scoped>
</style>
