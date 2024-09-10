<script setup>
import { ref } from 'vue';
import Sidebar from 'primevue/sidebar';
import Button from 'primevue/button';

const sidebarVisible = ref(false);

const showSidebar = () => {
  sidebarVisible.value = true;
};

const hideSidebar = () => {
  sidebarVisible.value = false;
};
</script>

<template>
  <div>
    <!-- Button to open the sidebar -->
    <Button label="Show Dashboard" icon="pi pi-menu" @click="showSidebar" />

    <!-- Sidebar component -->
    <Sidebar :visible.sync="sidebarVisible" position="left" :breakpoint="768" showCloseIcon>
      <h3>Dashboard</h3>
      <ul>
        <li>
          <Button label="Questionnaires en Attente" icon="pi pi-clock" class="p-button-text" />
        </li>
        <li>
          <Button label="Questionnaires Répondu" icon="pi pi-check" class="p-button-text" />
        </li>
      </ul>
      <Button label="Close" icon="pi pi-times" @click="hideSidebar" class="p-button-secondary" />
    </Sidebar>

    <!-- Main content area -->
    <div class="p-mt-5">
      <h1>Welcome to the Dashboard</h1>
      <!-- Add your main content here -->
    </div>
  </div>
</template>

<style scoped>
/* Style for the sidebar */
.p-sidebar {
  width: 250px;
}

/* Style for the sidebar items */
.p-sidebar ul {
  list-style-type: none;
  padding: 0;
}

.p-sidebar li {
  margin-bottom: 1rem;
}

/* Style for the buttons in the sidebar */
.p-button-text {
  width: 100%;
  justify-content: flex-start;
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
</style>
