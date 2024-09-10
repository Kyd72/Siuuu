
<template>
  <div class="card">
    <div class="flex mb-3 gap-2 justify-content-end">
      <Button @click="activeAccordion = 0" rounded label="1" class="w-2rem h-2rem p-0" :outlined="activeAccordion !== 0" />
      <Button @click="activeAccordion = 1" rounded label="2" class="w-2rem h-2rem p-0" :outlined="activeAccordion !== 1" />
    </div>
    <Toast />

    <Accordion v-model:activeIndex="activeAccordion">
      <AccordionTab header="Créer un compte">
        <SignUp></SignUp>
      </AccordionTab>
      <AccordionTab header="Se connecter">
       <SignIn></SignIn>
      </AccordionTab>
    </Accordion>
  </div>
</template>

<script setup>
import {reactive, ref} from 'vue';
import { useToast } from 'primevue/usetoast';
import {Practitioner} from "@/models/models.js";
import {createPractitioner} from "@/backend_requests/requests.js";
import SignUp from "@/components/SignUp.vue";
import SignIn from "@/components/SignIn.vue";

const toast = useToast();

const activeAccordion = ref();
const FHIRidentifierValue = ref();
const FHIRactive = ref(false);
const FHIRnameFamily = ref(null);
const FHIRnameGiven = ref(null);
const FHIRtelecomPhoneValue= ref();
const FHIRadressLine = ref(null);
const FHIRadressCity = ref(null);
const FHIRadressState = ref(null);
const FHIRadressPostalcode = ref();
const FHIRgender = ref('Male4');
const FHIRbirthDate = ref();
const FHIRqualificationDisplay = ref();
const specialitiesMedicales = ref([
  { name: 'Pneumologie', code: '1111111' },
  { name: 'Cardiologie', code: '2222222' },
  { name: 'Gastro', code: '3333333' }
]);
const practitioner = ref(null);




//Création d'un médecin

async function createPracticionner(){


  const newPractitioner = new Practitioner();

  // Set identifiers
  newPractitioner.setIdentifier('official', "FIE5-INTEROP", FHIRidentifierValue.value);

  // Set name
  newPractitioner.setName('official', FHIRnameFamily.value, [FHIRnameGiven.value], ['Dr']);

  // Set telecom
  newPractitioner.setTelecom('phone', FHIRtelecomPhoneValue.value, 'work');
  newPractitioner.setTelecom('email', "default@default.com", 'work');
  newPractitioner.setTelecom('fax', "696969", 'work');

  // Set gender and birthDate
  newPractitioner.setGender(FHIRgender.value);
  newPractitioner.setBirthDate(formatDateToYYYYMMDD(  FHIRbirthDate.value));

  // Set qualification
  newPractitioner.setQualification("FIE5-INTEROP", FHIRqualificationDisplay.value.code, FHIRqualificationDisplay.value.name);

  // Set address
  newPractitioner.setAddress('work', [FHIRadressLine.value], FHIRadressCity.value, FHIRadressPostalcode.value, "FRA");

  practitioner.value = newPractitioner;
  console.log('Practitioner created:', newPractitioner);
  await createPractitioner(JSON.stringify(newPractitioner), toast)

  //await updateSinkDescription(selectedSink.value.mac_adress, selectedSinkDescription.value, toast);
}

//Fonction pour mettre la date au bon format accepté par FHIR
function formatDateToYYYYMMDD(date) {
  const formatter = new Intl.DateTimeFormat('en-CA'); // 'en-CA' pour le format yyyy-mm-dd
  return formatter.format(date);
}









</script>


<style scoped>

.form-container {
  display: flex;
  justify-content: center;
  align-items: center;

}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);

}


</style>