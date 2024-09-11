<template>
  <div class="login-page p-d-flex p-flex-column p-ai-center p-justify-center">
    <div class="card p-shadow-4 p-border-round p-p-4">
      <div class="p-d-flex p-mb-4 gap-3 p-jc-center">
        <Button @click="activeAccordion = 0" rounded label="Inscription" class="p-button-primary" :outlined="activeAccordion !== 0" />
        <Button @click="activeAccordion = 1" rounded label="Connexion" class="p-button-secondary" :outlined="activeAccordion !== 1" />
      </div>
      <Toast />

      <Accordion v-model:activeIndex="activeAccordion" class="p-m-0">
        <AccordionTab header="Créer un compte" class="p-p-4">
          <div class="form-container">
            <SignUp />
          </div>
        </AccordionTab>
        <AccordionTab header="Se connecter" class="p-p-4">
          <div class="form-container">
            <SignIn />
          </div>
        </AccordionTab>
      </Accordion>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useToast } from 'primevue/usetoast';
import SignUp from '@/components/SignUp.vue';
import SignIn from '@/components/SignIn.vue';

const toast = useToast();
const activeAccordion = ref(0); // Default to SignUp tab
</script>

<style scoped>
.login-page {
    min-height: 100vh;
    background: url('../assets/bg3blur.png') no-repeat center center/cover;
    padding: 3rem 1.5rem; /* Augmentation du padding */
}

.card {
    width: 100%;
    max-width: 800px; /* Augmentation de la largeur maximale */
    margin: auto;
    background: rgba(255, 255, 255, 0.9); /* Cadre légèrement transparent */
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    padding: 2rem; /* Augmentation du padding intérieur */
}

.p-button-primary, .p-button-secondary {
    font-size: 1.1rem; /* Taille des boutons */
    padding: 0.8rem 1.5rem; /* Padding pour les boutons */
}

.p-button-primary {
    background-color: #009688;
    border-color: #009688;
    color: white;
}

.p-button-secondary {
    background-color: #00796b;
    border-color: #00796b;
    color: white;
}

.p-button-primary:focus,
.p-button-secondary:focus {
    box-shadow: 0 0 0 0.2rem rgba(0, 150, 136, 0.25);
}

.accordion-tab-header {
    background-color: #009688;
    color: white;
}

.accordion-tab-header:focus {
    box-shadow: 0 0 0 0.2rem rgba(0, 150, 136, 0.25);
}

.accordion-tab-content {
    padding: 2rem; /* Padding pour le contenu des accordéons */
}

.form-container {
    max-height: 500px; /* Limite la hauteur du conteneur du formulaire */
    width: 100%; /* Assure que le formulaire occupe toute la largeur du conteneur */
    overflow: auto; /* Ajoute des barres de défilement si nécessaire */
}

.form-container ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}

.form-container ::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
}

.p-d-flex {
    display: flex;
}

.p-flex-column {
    flex-direction: column;
}

.p-ai-center {
    align-items: center;
}

.p-justify-center {
    justify-content: center;
}

.p-mb-4 {
    margin-bottom: 2rem; /* Marge inférieure */
}

.p-p-4 {
    padding: 1rem; /* Padding pour les sections */
}
</style>
