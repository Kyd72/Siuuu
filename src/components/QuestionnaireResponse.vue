<template>
    <div class="questionnaire-list">
      <div v-if="responses.length > 0">
        <div v-for="response in responses" :key="response.id" class="response-card">
          <h3>{{ response.questionnaire.title || 'No Title' }}</h3>
          <p>Status: {{ response.status }}</p>
          <div v-for="group in response.item" :key="group.linkId" class="question-group">
            <h4>{{ group.text }}</h4>
            <div v-for="question in group.item" :key="question.linkId" class="question-item">
              <p>{{ question.text }}</p>
              <div v-for="answer in question.answer" :key="answer.valueString || answer.valueInteger" class="answer">
                <p>{{ answer.valueString || answer.valueInteger }}</p>
              </div>
            </div>
          </div>
          <Button @click="approveResponse(response.id)" label="Approve" icon="pi pi-check" class="p-button-success" />
          <Button @click="rejectResponse(response.id)" label="Reject" icon="pi pi-times" class="p-button-danger" />
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
  
  const responses = ref([]);
  const toast = useToast();
  
  onMounted(async () => {
    const practitionerId = localStorage.getItem('practitionerId');
    if (practitionerId) {
      responses.value = await getQuestionnaireResponses(practitionerId, toast); // Ajout du toast ici
    }
  });
  
  const approveResponse = async (responseId) => {
    await updateResponseStatus(responseId, toast, 'completed'); // Ajout du toast ici
  };
  
  const rejectResponse = async (responseId) => {
    await updateResponseStatus(responseId, toast, 'rejected'); // Ajout du toast ici
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
  