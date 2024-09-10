<template>
    <div class="questionnaire-component">
      <h2>{{ questionnaire.title }}</h2>
      <p>{{ questionnaire.description }}</p>
      
      <div v-for="group in questionnaire.item" :key="group.linkId" class="question-group">
        <h3>{{ group.text }}</h3>
        <div v-for="question in group.item" :key="question.linkId" class="question-item">
          <label :for="question.linkId">{{ question.text }}</label>
  
          <!-- Champ de saisie selon le type de question -->
          <input 
            v-if="question.type === 'string'" 
            type="text" 
            :id="question.linkId" 
            v-model="responses[question.linkId]" 
          />
          <input 
            v-if="question.type === 'date'" 
            type="date" 
            :id="question.linkId" 
            v-model="responses[question.linkId]" 
          />
          <input 
            v-if="question.type === 'integer'" 
            type="number" 
            :id="question.linkId" 
            v-model="responses[question.linkId]" 
          />
        </div>
      </div>
      
      <button @click="submitResponses">Submit</button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const questionnaire = ref({
    resourceType: "Questionnaire",
    id: "neuro01",
    url: "https://fhir.alliance4u.io/api/Questionnaire/neuro01",
    identifier: [
      {
        system: "https://fhir.alliance4u.io/api/Questionnaire",
        value: "eval-cognitive-neuro-001"
      }
    ],
    version: "1.0.0",
    name: "EvaluationCognitiveNeurologique",
    title: "Évaluation Cognitive Neurologique",
    status: "active",
    date: "2024-09-10",
    publisher: "Département de Neurologie - Hôpital Exemple",
    description: "Questionnaire pour évaluer les capacités cognitives d'un patient dans un contexte neurologique.",
    item: [
      {
        linkId: "1",
        text: "Orientation du patient",
        type: "group",
        item: [
          {
            linkId: "1.1",
            text: "Quelle est la date d'aujourd'hui ?",
            type: "date"
          },
          {
            linkId: "1.2",
            text: "Où vous trouvez-vous actuellement (ville, établissement, service) ?",
            type: "string"
          },
          {
            linkId: "1.3",
            text: "Qui est le président actuel ?",
            type: "string"
          }
        ]
      },
      {
        linkId: "2",
        text: "Évaluation de la mémoire",
        type: "group",
        item: [
          {
            linkId: "2.1",
            text: "Répétez les mots suivants : Pomme, Table, Sou.",
            type: "string"
          },
          {
            linkId: "2.2",
            text: "Rappelez-vous les trois mots après quelques minutes.",
            type: "string"
          }
        ]
      }
      // Vous pouvez ajouter les autres groupes ici
    ]
  });
  
  // Réponses du patient
  const responses = ref({});
  
  // Fonction pour soumettre les réponses
  const submitResponses = () => {
    console.log("Réponses soumises : ", responses.value);
  };
  </script>
  
  <style scoped>
  .questionnaire-component {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .question-group {
    margin-bottom: 20px;
  }
  
  .question-item {
    margin-bottom: 10px;
  }
  
  label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  input {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    border-radius: 4px;
    border: 1px solid #ccc;
  }
  
  button {
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #45a049;
  }
  </style>
  