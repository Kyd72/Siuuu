<script setup>
import {onMounted, onUpdated, reactive, ref} from 'vue';
import Sidebar from 'primevue/sidebar';
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import router from '@/router';
import {Practitioner} from "@/models/models.js";
import {getPractitionerById} from "@/backend_requests/requests.js";
import {useToast} from "primevue/usetoast";
import QuestionnaireResponse from './QuestionnaireResponse.vue';
import PatientsList from "@/components/PatientsList.vue";
import QuestionnairePage from "@/components/QuestionnairePage.vue";
const toastDash = useToast();

const sidebarVisible = ref(false);
const activeTab = ref('home');

const showSidebar = () => {
  sidebarVisible.value = true;
};

const hideSidebar = () => {
  sidebarVisible.value = false;
};

const selectTab = (tab) => {
  activeTab.value = tab;
};



const logout = () => {
  // Utilise le hook useRouter pour accéder au routeur

    // Supprimer l'élément "practitionerId" du localStorage
    localStorage.removeItem('practitionerId');

  // Redirige vers la page de la landing page
  router.push('/'); // Assure-toi que 'LandingPage' correspond au nom défini dans ton routeur
};


// à la créaation du composant, on va chercher les infos du patient connectées grâce à son id localisé dans le
//local storage
const connectedPractitioner = reactive({}) ;
const storedPractitionerId = localStorage.getItem('practitionerId');


onMounted(async () => {

  await getPractitionerById(storedPractitionerId, toastDash, router ).then(data => {
    // Si le JSON contient plus de propriétés, elles seront toutes assignées dynamiquement
    Object.assign(connectedPractitioner, data);
  }).catch(error => {
    toastDash.add({ severity: 'error', summary: 'Info', detail: "Erreur de récupération de données\n", life: 3000 })
    console.error('Erreur lors de la récupération des données:', error);
  });
});

onUpdated(async () => {




});

</script>

<template>
  <div class="container">
    <!-- Button to open the sidebar -->
    <Button icon="pi pi-menu" @click="showSidebar" class="show-sidebar-button" />

    <!-- Sidebar component -->
    <Sidebar :visible.sync="sidebarVisible" position="left" :breakpoint="768" >
      <!-- User info section -->
      <div class="user-info">
        <div class="user-avatar-container">
          <img src="/src/assets/Profil.png" alt="User Avatar" class="user-avatar" />
        </div>
        <div class="user-details">
          <p class="user-name">{{connectedPractitioner.name[0].family}}, {{connectedPractitioner.name[0].given[0]}} </p>
          <p class="user-number">{{connectedPractitioner.identifier[0].value}}</p>
        </div>
      </div>
      
      <!-- Navigation links -->
      <ul class="sidebar-links">
        <li>
          <Button 
            label="Accueil" 
            icon="pi pi-home" 
            class="p-button-text"
            @click="selectTab('home')"
            :class="{ 'active': activeTab === 'home' }"
          />
        </li>
        <li>
          <Button 
            label="Questionnaires en Attente" 
            icon="pi pi-clock" 
            class="p-button-text"
            @click="selectTab('pending')"
            :class="{ 'active': activeTab === 'pending' }"
          />
        </li>
        <li>
          <Button 
            label="Questionnaires Répondu" 
            icon="pi pi-check" 
            class="p-button-text"
            @click="selectTab('answered')"
            :class="{ 'active': activeTab === 'answered' }"
          />
        </li>
        <li>
          <Button 
            label="Mes Patients" 
            icon="pi pi-users" 
            class="p-button-text"
            @click="selectTab('patients')"
            :class="{ 'active': activeTab === 'patients' }"
          />
        </li>
      </ul>

      <Button label="Close" icon="pi pi-times" @click="hideSidebar" class="p-button-secondary" />
    </Sidebar>

    <!-- Main content area -->
    <div :class="{ 'main-content': true, 'sidebar-open': sidebarVisible }">
      <div v-if="activeTab === 'home'">
        <h1>Welcome to the Dashboard</h1>
        <p>Welcome to the main page of the dashboard.</p>
      </div>
      <div v-if="activeTab === 'pending'">
        <!-- Content for pending questionnaires -->
         <p>Mes réponses </p>
        <QuestionnaireResponse></QuestionnaireResponse>
    </div>
      <div v-if="activeTab === 'answered'">
        <!-- Content for answered questionnaires -->
        <p>Answered questionnaires will be displayed here.</p>
        <QuestionnairePage></QuestionnairePage>
      </div>
      <div v-if="activeTab === 'patients'">
        <!-- Content for patient data -->
        <PatientsList></PatientsList>
      </div>
    </div>

    <!-- Logout Button positioned on the right side -->
    <Button label="Logout" icon="pi pi-sign-out" @click="logout" class="logout-button" />

    
  </div>
</template>

<style scoped>
/* Container for the layout */
.container {
  display: flex;
  position: relative;
}

/* Style for the sidebar */
.p-sidebar {
  width: 250px;
  z-index: 1000; /* Ensures the sidebar is above other content */
}

/* Adjusting the main content area */
.main-content {
  flex: 1;
  padding: 1rem;
  transition: margin-left 0.3s ease;
}

/* When sidebar is visible, add margin to main content */
.sidebar-open {
  margin-left: 250px; /* Same width as the sidebar */
}

/* Button to show sidebar */
.show-sidebar-button {
  margin: 1rem;
  font-size: 1rem; /* Adjust font size */
  padding: 0.5rem 1rem; /* Adjust padding */
}

/* User info section */
.user-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #ddd;
}

/* Container for the user avatar */
.user-avatar-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 4px solid #555; /* Dark gray border color */
  overflow: hidden;
  margin-bottom: 1rem;
}

/* Style for the user avatar image */
.user-avatar {
  width: 100%;
  height: auto;
  object-fit: cover;
}

/* User details */
.user-details {
  text-align: center;
}

.user-name {
  font-weight: bold;
}

.user-number {
  color: #555;
}

/* Style for the sidebar links */
.sidebar-links {
  list-style-type: none;
  padding: 0;
}

.sidebar-links li {
  margin-bottom: 1rem;
}

/* Style for the buttons in the sidebar */
.p-button-text {
  width: 100%;
  justify-content: flex-start;
}

/* Style for the active tab */
.active {
  background-color: #f0f0f0;
  border-radius: 4px;
}

/* Style for the close button */
.p-button-secondary {
  width: 100%;
  text-align: center;
}

/* Main content area */
.p-mt-5 {
  margin-top: 2rem;
}

/* Style for the DataTable */
.p-datatable-striped .p-datatable-tbody > tr:nth-child(odd) > td {
  background-color: #f9f9f9;
}

/* Logout button positioned on the right side */
.logout-button {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 1001; /* Ensure the logout button is above other content */
}
</style>
