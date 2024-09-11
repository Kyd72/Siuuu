<template>
    <div class="questionnaire-list">
      <Button @click="close" label="Fermer" icon="pi pi-times" class="p-button-warning" />

      <div v-if="questionnaireResponse !== null ">
          <h3>{{ questionnaireResponse.questionnaire || 'Réponse au questionnaire' }}</h3>
          <p>Status: {{questionnaireResponse.status }}</p>
          <div v-for="group in questionnaireResponse.item" :key="group.linkId" class="question-group">
            <h4>{{ group.text }}</h4>
            <div v-for="question in group.item" :key="question.linkId" class="question-item">
              <p>{{ question.text }}</p>
              <div v-for="answer in question.answer" :key="answer.valueString || answer.valueInteger" class="answer">
                <p>{{ answer.valueString || answer.valueInteger }}</p>
              </div>
            </div>
      </div>

        <div>
          <Button @click="approveResponse(questionnaireResponse.id)" label="Approve" icon="pi pi-check" class="p-button-success" />
          <Button @click="rejectResponse(questionnaireResponse.id)" label="Reject" icon="pi pi-times" class="p-button-danger" />
        </div>

      </div>


      <div v-else>
        <p>No responses found.</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import Button from 'primevue/button';
  import { useToast } from 'primevue/usetoast';
  import { getQuestionnaireResponses, updateResponseStatus } from "@/backend_requests/requests.js";

  // On reçoit l'objet JSON dans les props
  const props = defineProps({
    questionnaireResponse: Object
  });

  // Importer la fonction emit pour émettre des événements
  const emit = defineEmits(['closeComponent']);

  //Dire qu'on a fermé le composant
  const close = () => {

      emit('closeComponent'); // Émission de l'événement avec la réponse sélectionnée

  };
  
  const toast = useToast();
  

  const approveResponse = async (responseId) => {
    await updateResponseStatus(responseId, toast, 'completed'); // Ajout du toast ici
  };
  
  const rejectResponse = async (responseId) => {
    await updateResponseStatus(responseId, toast, 'amended'); // Ajout du toast ici
  };
  </script>
  
  <style scoped>
  .questionnaire-list {
    padding: 16px;
  }
  
  .response-card {
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 16px;
    background: #f9f9f9;
  }
  
  .question-group {
    margin-bottom: 16px;
  }
  
  .question-item {
    margin-bottom: 8px;
  }
  
  .answer {
    margin-top: 4px;
  }
  
  .p-button-success {
    margin-right: 8px;
  }
  
  .p-button-danger {
    margin-left: 8px;
  }
  </style>
  