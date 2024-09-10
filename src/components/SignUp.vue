<!--
<template>
  <div class="card">

    <Toast />


        <div class="form-container">

          <div>
            &lt;!&ndash;Identifiant&ndash;&gt;
            <FloatLabel>
            <InputText v-model="FHIRidentifierValue" inputId="FHIRidentifierValueID"  />
            <label for="FHIRidentifierValueID">Identifiant</label>
          </FloatLabel>
            &lt;!&ndash; Actif&ndash;&gt;
            <FloatLabel>
              <InputSwitch id="FHIRactiveID" v-model="FHIRactive" />
              <label for="FHIRactiveID">Actif ?</label>
            </FloatLabel>
          </div>
          <div>
            &lt;!&ndash;Nom&ndash;&gt;
             <FloatLabel>
               <InputText id="FHIRnameFamilyID" v-model="FHIRnameFamily" />
               <label for="FHIRnameFamilyID">Nom</label>
             </FloatLabel>
             &lt;!&ndash;Prenom&ndash;&gt;
             <FloatLabel>
               <InputText id="FHIRnameGivenID" v-model="FHIRnameGiven" />
               <label for="FHIRnameGivenID">Prénom</label>
             </FloatLabel></div>
          <div>
            &lt;!&ndash;N° Tel&ndash;&gt;
            <FloatLabel>
              <InputText v-model="FHIRtelecomPhoneValue" inputId="FHIRtelecomPhoneValueID"  />
              <label for="FHIRtelecomPhoneValueID">N° Tel</label>
            </FloatLabel>
            &lt;!&ndash;GENRE&ndash;&gt;
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
            </div></div>




          &lt;!&ndash;Date de naissance&ndash;&gt;
            <FloatLabel>
              <Calendar id="FHIRbirthDateID" v-model="FHIRbirthDate" dateFormat="yy-mm-dd" />
              <label for="FHIRbirthDateID">Date de naissance</label>
            </FloatLabel>

          &lt;!&ndash;Adresse&ndash;&gt;
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



          &lt;!&ndash;Qualification&ndash;&gt;

            <FloatLabel>
              <Dropdown v-model="FHIRqualificationDisplay" :options="specialitiesMedicales" optionLabel="name" placeholder="Spécialité" class="w-full md:w-14rem" />
            </FloatLabel>

        </div>

        <div class="card flex justify-content-center">
          <Button label="Submit"  @click="createPracticionner()" />
        </div>

  </div>
</template>-->

<template>
  <div class="card form-card">
    <!-- Toast notifications -->
    <Toast />

    <div class="form-container">
      <!-- Identifiant et Actif -->
      <div class="form-row">
        <div class="form-group">
          <FloatLabel>
            <InputText v-model="FHIRidentifierValue" inputId="FHIRidentifierValueID" />
            <label for="FHIRidentifierValueID">Identifiant</label>
          </FloatLabel>
        </div>
        <div class="form-group">
          <Label>
            <InputSwitch id="FHIRactiveID" v-model="FHIRactive" />
            <label for="FHIRactiveID">Actif ?</label>
          </Label>
        </div>
      </div>

      <!-- Nom et Prénom -->
      <div class="form-row">
        <div class="form-group">
          <FloatLabel>
            <InputText id="FHIRnameFamilyID" v-model="FHIRnameFamily" />
            <label for="FHIRnameFamilyID">Nom</label>
          </FloatLabel>
        </div>
        <div class="form-group">
          <FloatLabel>
            <InputText id="FHIRnameGivenID" v-model="FHIRnameGiven" />
            <label for="FHIRnameGivenID">Prénom</label>
          </FloatLabel>
        </div>
      </div>

      <!-- Téléphone et Genre -->
      <div class="form-row">
        <div class="form-group">
          <FloatLabel>
            <InputText v-model="FHIRtelecomPhoneValue" inputId="FHIRtelecomPhoneValueID" />
            <label for="FHIRtelecomPhoneValueID">N° Tel</label>
          </FloatLabel>
        </div>
        <div class="form-group">
          <div class="card flex justify-content-center gender-group">
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
        </div>
      </div>

      <!-- Date de naissance -->
      <div class="form-row">
        <div class="form-group full-width">
          <FloatLabel>
            <Calendar id="FHIRbirthDateID" v-model="FHIRbirthDate" dateFormat="yy-mm-dd" />
            <label for="FHIRbirthDateID">Date de naissance</label>
          </FloatLabel>
        </div>
      </div>

      <!-- Adresse -->
      <div class="form-row">
        <div class="form-group">
          <FloatLabel>
            <InputText id="FHIRadressLineID" v-model="FHIRadressLine" />
            <label for="FHIRadressLineID">Adresse (Ligne 1)</label>
          </FloatLabel>
        </div>
        <div class="form-group">
          <FloatLabel>
            <InputText id="FHIRadressCityID" v-model="FHIRadressCity" />
            <label for="FHIRadressCityID">Ville</label>
          </FloatLabel>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <FloatLabel>
            <InputText id="FHIRadressStateID" v-model="FHIRadressState" />
            <label for="FHIRadressStateID">Département</label>
          </FloatLabel>
        </div>
        <div class="form-group">
          <FloatLabel>
            <InputText id="FHIRadressPostalcodeID" v-model="FHIRadressPostalcode" />
            <label for="FHIRadressPostalcodeID">Code Postal</label>
          </FloatLabel>
        </div>
      </div>

      <!-- Qualification -->
      <div class="form-row">
        <div class="form-group full-width">
          <FloatLabel>
            <Dropdown v-model="FHIRqualificationDisplay" :options="specialitiesMedicales" optionLabel="name" placeholder="Spécialité" class="w-full" />
          </FloatLabel>
        </div>
      </div>

      <!-- Submit Button -->
      <div class="card flex justify-content-center">
        <Button label="Submit" @click="createPracticionner()" />
      </div>
    </div>
  </div>
</template>


<script setup>
import {reactive, ref} from 'vue';
import { useToast } from 'primevue/usetoast';
import {Practitioner} from "@/models/models.js";
import {createPractitioner} from "@/backend_requests/requests.js";

const toast = useToast();
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

.form-card {
  padding: 2rem;
  max-width: 60vw;
  margin: 0 auto;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background-color: #fff;
}

.form-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-row {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.form-group {
  flex: 1;
}

.full-width {
  width: 100%;
}

.gender-group {
  display: flex;
  justify-content: space-around;
}

.card {
  margin-top: 2rem;
}

button {
  margin-top: 1rem;
}

@media (max-width: 768px) {
  .form-row {
    flex-direction: column;
  }
}


</style>