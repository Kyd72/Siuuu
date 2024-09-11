<!--<template>
  <div>
    &lt;!&ndash; Bouton pour créer un nouveau Fieldset &ndash;&gt;
    <Button label="Ajouter un Fieldset" icon="pi pi-plus" class="p-button-sm mb-2" @click="addFieldset" />

    &lt;!&ndash; Affichage de chaque Fieldset dynamique &ndash;&gt;
    <div v-for="(fieldset, fieldsetIndex) in fieldsets" :key="fieldsetIndex">
      &lt;!&ndash; Input pour modifier le legend du Fieldset &ndash;&gt;
      <label :for="`legend-${fieldsetIndex}`" class="block text-900 font-medium mb-2">Modifier le Legend</label>
      <InputText :id="`legend-${fieldsetIndex}`" v-model="fieldset.legend" placeholder="Entrez le titre du Fieldset" class="w-full mb-3" />

      <Fieldset :legend="fieldset.legend" :toggleable="true">
        &lt;!&ndash; Bouton pour ajouter un nouveau champ InputText dans le Fieldset &ndash;&gt;
        <Button label="Ajouter un InputText" icon="pi pi-plus" class="p-button-sm mb-2" @click="addInputText(fieldsetIndex)" />

        &lt;!&ndash; Affichage des champs InputText dynamiques &ndash;&gt;
        <div v-for="(input, inputIndex) in fieldset.inputs" :key="inputIndex">
          <label :for="`input-${fieldsetIndex}-${inputIndex}`" class="block text-900 font-medium mb-2">{{ input.label }}</label>
          <InputText :id="`input-${fieldsetIndex}-${inputIndex}`" v-model="input.value" type="text" class="w-full mb-3" />
        </div>
      </Fieldset>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';

// Tableau réactif pour les Fieldsets
const fieldsets = reactive([]);

// Fonction pour ajouter un nouveau Fieldset
const addFieldset = () => {
  const newFieldset = {
    legend: `Questions spécifiques ${fieldsets.length + 1}`, // Nom par défaut du Fieldset
    inputs: reactive([]) // Tableau réactif pour les InputText de ce Fieldset
  };
  fieldsets.push(newFieldset);
};

// Fonction pour ajouter un InputText dans un Fieldset spécifique
const addInputText = (fieldsetIndex) => {
  const newInput = {
    label: `Input ${fieldsets[fieldsetIndex].inputs.length + 1}`, // Label du nouveau InputText
    value: '' // Valeur réactive du champ de texte
  };
  fieldsets[fieldsetIndex].inputs.push(newInput);
};
</script>

<style>
/* Style optionnel pour les boutons et champs */
.p-button-sm {
  font-size: 0.8rem;
  padding: 0.4rem 0.8rem;
}
</style>-->

<template>

  <div class="fieldset-header">
    <FloatLabel >
      <InputText id="Titrequestionnaire" v-model="titreDuQuestionnaire" placeholder="Entrez le titre du questionnaire" class="w-full mb-3" />
      <label for="Titrequestionnaire" class="block text-900 font-medium mb-2">Titre du questionnaire</label>
    </FloatLabel>
  </div>
  <Toast></Toast>

    <div>
    <!-- Bouton pour créer un nouveau Fieldset -->
    <Button label="Ajouter un thème" icon="pi pi-plus" class="p-button-sm mb-2" @click="addFieldset" />

    <!-- Affichage de chaque Fieldset dynamique -->
    <div v-for="(fieldset, fieldsetIndex) in fieldsets" :key="fieldsetIndex" class="fieldset-container">
      <!-- Input pour modifier le legend du Fieldset -->
      <div class="fieldset-header">
        <label :for="`legend-${fieldsetIndex}`" class="block text-900 font-medium mb-2">Modifier le thème</label>
        <InputText :id="`legend-${fieldsetIndex}`" v-model="fieldset.legend" placeholder="Entrez le titre du thème" class="w-full mb-3" />

        <!-- Bouton pour supprimer le Fieldset -->
        <Button icon="pi pi-times" class="p-button-danger p-button-sm" @click="removeFieldset(fieldsetIndex)" />
      </div>

      <Fieldset :legend="fieldset.legend" :toggleable="true">
        <!-- Bouton pour ajouter un nouveau champ InputText dans le Fieldset -->
        <Button label="Ajouter une question" icon="pi pi-plus" class="p-button-sm mb-2" @click="addInputText(fieldsetIndex)" />

        <!-- Affichage des champs InputText dynamiques -->
        <div v-for="(input, inputIndex) in fieldset.inputs" :key="inputIndex">
          <label :for="`input-${fieldsetIndex}-${inputIndex}`" class="block text-900 font-medium mb-2">{{ input.label }}</label>
          <InputText :id="`input-${fieldsetIndex}-${inputIndex}`" v-model="input.value" type="text" class="w-full mb-3" />
        </div>
      </Fieldset>
    </div>

  </div>
  <Button label="Créer le formulaire"  @click="generateJson" icon="pi pi-list" ></Button>

</template>

<script setup>
import {reactive, ref} from 'vue';
import {createQuestionnaire} from "@/backend_requests/requests.js";
import {useToast} from "primevue/usetoast";


const titreDuQuestionnaire=ref('')
// Tableau réactif pour les Fieldsets
const fieldsets = reactive([]);

// Fonction pour ajouter un nouveau Fieldset
const addFieldset = () => {
  const newFieldset = {
    legend: `Questions spécifiques ${fieldsets.length + 1}`, // Nom par défaut du Fieldset
    inputs: reactive([]) // Tableau réactif pour les InputText de ce Fieldset
  };
  fieldsets.push(newFieldset);
};

// Fonction pour ajouter un InputText dans un Fieldset spécifique
const addInputText = (fieldsetIndex) => {
  const newInput = {
    label: `Question ${fieldsets[fieldsetIndex].inputs.length + 1}`, // Label du nouveau InputText
    value: '' // Valeur réactive du champ de texte
  };
  fieldsets[fieldsetIndex].inputs.push(newInput);
};

const toast= useToast()

// Fonction pour supprimer un Fieldset avec tous ses inputs
const removeFieldset = (fieldsetIndex) => {
  fieldsets.splice(fieldsetIndex, 1); // Suppression du Fieldset sélectionné
};

// Fonction pour générer le JSON à partir des Fieldsets et Inputs
 const generateJson = () => {
  // Création de la structure de base du questionnaire
  const questionnaireJson = {
    resourceType: "Questionnaire",
    identifier: [{
      system: "urn:ietf:rfc:3986",
      value: "urn:oid:2.16.840.1.113883.4.642.20.6"
    }],
    status: "active",
    name:titreDuQuestionnaire.value,
    title:titreDuQuestionnaire.value,
    subjectType: ["Patient"],
    code: [{
      system: "http://example.org/system/code/lifelines/nl",
      code: "VL 1-1, 18-65_1.2.2",
      display: titreDuQuestionnaire.value // Utilisation du titre saisi
    }],
    item: []
  };

  // Ajout des Fieldsets (groupes d'items)
  fieldsets.forEach((fieldset, fieldsetIndex) => {
    const groupItem = {
      linkId: (fieldsetIndex + 1).toString(),
      text: fieldset.legend,
      type: "group",
      item: []
    };

    // Ajout des questions (Inputs) dans chaque Fieldset
    fieldset.inputs.forEach((input, inputIndex) => {
      const questionItem = {
        linkId: `${fieldsetIndex + 1}.${inputIndex + 1}`,
        text: input.value,
        type: "string" // Type de la question par défaut, modifiable selon vos besoins
      };
      groupItem.item.push(questionItem);
    });

    questionnaireJson.item.push(groupItem);
  });

  // Stocker le JSON généré dans la variable réactive
  console.log(  JSON.stringify(questionnaireJson, null, 2));

   createQuestionnaire(JSON.stringify(questionnaireJson, null, 2), toast)
};

</script>

<style>
/* Style optionnel pour les boutons et champs */
.p-button-sm {
  font-size: 0.8rem;
  padding: 0.4rem 0.8rem;
}

.fieldset-container {
  position: relative;
  margin-bottom: 1rem;
}

.fieldset-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.p-button-danger {
  margin-left: 1rem;
}
</style>



