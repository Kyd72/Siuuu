
<template>
  <div class="card">

    <Toast />


        <div class="form-container">
          <div class="form-grid">

          <!--          Identifiant-->
            <FloatLabel>
              <InputText v-model="FHIRidentifierValue" inputId="FHIRidentifierValueID"  />
              <label for="FHIRidentifierValueID">Identifiant</label>
            </FloatLabel>
          <!--          Actif-->
            <FloatLabel>
              <InputSwitch id="FHIRactiveID" v-model="FHIRactive" />
              <label for="FHIRactiveID">Actif ?</label>
            </FloatLabel>

          <!--          Nom-->
          <FloatLabel>
            <InputText id="FHIRnameFamilyID" v-model="FHIRnameFamily" />
            <label for="FHIRnameFamilyID">Nom</label>
          </FloatLabel>

          <!--          Prenom-->

          <FloatLabel>
            <InputText id="FHIRnameGivenID" v-model="FHIRnameGiven" />
            <label for="FHIRnameGivenID">Prénom</label>
          </FloatLabel>
          <!--          N° Tel-->
            <FloatLabel>
              <InputText v-model="FHIRtelecomPhoneValue" inputId="FHIRtelecomPhoneValueID"  />
              <label for="FHIRtelecomPhoneValueID">N° Tel</label>
            </FloatLabel>

          <!--          GENRE-->
            <div class="card flex justify-content-center">
              <div class="flex flex-wrap gap-3">
                <div class="flex align-items-center">
                  <RadioButton v-model="FHIRgender" inputId="FHIRgenderID1" name="Genre" value="Male" />
                  <label for="FHIRgenderID1" class="ml-2">Homme</label>
                </div>
                <div class="flex align-items-center">
                  <RadioButton v-model="FHIRgender" inputId="FHIRgenderID2" name="Genre" value="Female" />
                  <label for="FHIRgenderID2" class="ml-2">Femme</label>
                </div>
              </div>
            </div>

          <!--          Date de naissance-->

            <FloatLabel>
              <Calendar id="FHIRbirthDateID" v-model="FHIRbirthDate" dateFormat="yy-mm-dd" />
              <label for="FHIRbirthDateID">Date de naissance</label>
            </FloatLabel>

          <!--          Adresse-->
          <FloatLabel>
            <InputText id="FHIRadressLineID" v-model="FHIRadressLine" />
            <label for="FHIRadressLineID">Ligne1</label>
          </FloatLabel>
            <FloatLabel>
              <InputText id="FHIRadressCityID" v-model="FHIRadressCity" />
              <label for="FHIRadressCityID">Ville</label>
            </FloatLabel>
            <FloatLabel>
              <InputText id="FHIRadressStateID" v-model="FHIRadressState" />
              <label for="FHIRadressStateID">Département</label>
            </FloatLabel>
            <FloatLabel>
              <InputText id="FHIRadressPostalcodeID" v-model="FHIRadressPostalcode" />
              <label for="FHIRadressPostalcodeID">Code postal</label>
            </FloatLabel>



          <!--          Qualification-->

            <FloatLabel>
              <Dropdown v-model="FHIRqualificationDisplay" :options="specialitiesMedicales" optionLabel="name" placeholder="Spécialité" class="w-full md:w-14rem" />
            </FloatLabel>

        </div>
        </div>

        <div class="card flex justify-content-center">
          <Button label="Submit"  @click="createPracticionner()" />
        </div>

  </div>
</template>

<script setup>
import {reactive, ref} from 'vue';
import { useToast } from 'primevue/usetoast';
import {Practitioner} from "@/models/models.js";
import {createPractitioner} from "@/backend_requests/requests.js";

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