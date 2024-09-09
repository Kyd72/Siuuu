
<template>
  <div class="card">
    <div class="flex mb-3 gap-2 justify-content-end">
      <Button @click="activeAccordion = 0" rounded label="1" class="w-2rem h-2rem p-0" :outlined="activeAccordion !== 0" />
      <Button @click="activeAccordion = 1" rounded label="2" class="w-2rem h-2rem p-0" :outlined="activeAccordion !== 1" />
    </div>

    <Accordion v-model:activeIndex="activeAccordion">
      <AccordionTab header="Créer un compte">
        <div class="form-container">
          <div class="form-grid">

          <!--          Identifiant-->
            <FloatLabel>
              <InputNumber v-model="FHIRidentifierValue" inputId="FHIRidentifierValueID" :min="0" :max="999999999" />
              <label for="FHIRidentifierValueID">Identifiant</label>
            </FloatLabel>
          <!--          Actif-->
            <FloatLabel>
              <InputSwitch id="FHIRactiveID" v-model="FHIRactive" />
              <label for="FHIRactiveID">Identifiant</label>
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
              <InputNumber v-model="FHIRtelecomPhoneValue" inputId="FHIRtelecomPhoneValueID" :min="0" :max="999999999" />
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
              <InputNumber id="FHIRadressPostalcodeID" v-model="FHIRadressPostalcode" />
              <label for="FHIRadressPostalcodeID">Code postal</label>
            </FloatLabel>



          <!--          Qualification-->

            <FloatLabel>
              <InputNumber id="FHIRadressPostalcodeID" v-model="FHIRadressPostalcode" />
              <label for="FHIRadressPostalcodeID">Code postal</label>
            </FloatLabel>

        </div>
        </div>
      </AccordionTab>
      <AccordionTab header="Se connecter">
        <p class="m-0">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim
          ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
        </p>
      </AccordionTab>
    </Accordion>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const activeAccordion = ref(0);
const FHIRidentifierValue = ref(50);
const FHIRactive = ref(false);
const FHIRnameFamily = ref(null);
const FHIRnameGiven = ref(null);
const FHIRtelecomPhoneValue= ref(50);
const FHIRadressLine = ref(null);
const FHIRadressCity = ref(null);
const FHIRadressState = ref(null);
const FHIRadressPostalcode = ref(0);
const FHIRgender = ref('');
const FHIRbirthDate = ref();










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