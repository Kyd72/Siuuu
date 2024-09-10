<script setup>
import { ref } from 'vue';
import Sidebar from 'primevue/sidebar';
import Button from 'primevue/button';
</script>

<template>
    <div class="landing-page">
        <!-- Header Section -->
        <header class="header">
            <div class="container header-container p-d-flex p-jc-between p-ai-center">
                <div class="logo">
                    <h1 class="logo-text">MediSoft</h1>
                </div>
                <nav class="nav">
                    <ul class="nav-list p-m-0 p-d-flex p-ai-center">
                        <li><a href="#hero" class="nav-item">Accueil</a></li>
                        <li><a href="#features" class="nav-item">Fonctionnalités</a></li>
                        <li><a href="#about" class="nav-item">À propos</a></li>
                        <li><Button label="Se connecter" class="p-button-rounded p-button-secondary"></Button></li>
                    </ul>
                </nav>
            </div>
        </header>

        <!-- Hero Section -->
        <section id="hero" class="hero p-d-flex p-jc-center p-ai-center p-flex-column">
            <div class="container text-center">
                <h1 class="hero-title p-text-bold">Optimisez la gestion des médecins</h1>
                <p class="hero-subtitle">Une solution intelligente pour l'inscription des médecins et la gestion des questionnaires médicaux.</p>
                <Button label="En savoir plus" icon="pi pi-info" class="p-button-rounded p-button-lg p-mt-3" />
            </div>
        </section>

        <!-- Features Section -->
        <section id="features" class="features-section">
            <div class="container">
                <h2 class="p-text-center">Nos Fonctionnalités</h2>
                <div class="features-grid p-d-flex p-jc-around p-flex-wrap">
                    <div class="feature-item p-shadow-3 p-p-4 p-mb-4 p-d-flex p-flex-column p-ai-center">
                        <i class="pi pi-user p-mb-3" style="font-size: 2rem;"></i>
                        <h3>Inscription des Médecins</h3>
                        <p>Ajoutez et gérez les profils des médecins de manière simple et efficace.</p>
                    </div>
                    <div class="feature-item p-shadow-3 p-p-4 p-mb-4 p-d-flex p-flex-column p-ai-center">
                        <i class="pi pi-question-circle p-mb-3" style="font-size: 2rem;"></i>
                        <h3>Gestion des Questionnaires</h3>
                        <p>Créez, distribuez et analysez des questionnaires médicaux en toute simplicité.</p>
                    </div>
                    <div class="feature-item p-shadow-3 p-p-4 p-mb-4 p-d-flex p-flex-column p-ai-center">
                        <i class="pi pi-lock p-mb-3" style="font-size: 2rem;"></i>
                        <h3>Sécurité des Données</h3>
                        <p>Assurez-vous que les données médicales sont protégées avec des normes de sécurité avancées.</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- About Section -->
        <section id="about" class="about-section p-py-6">
            <div class="container">
                <h2 class="p-text-center p-mb-4">À propos de nous</h2>
                <p class="p-text-center p-mx-auto p-mb-4" style="max-width: 800px;">
                    MediSoft est dédié à fournir des solutions efficaces pour les professionnels de la santé. Notre objectif est de simplifier la gestion des médecins et des questionnaires, tout en garantissant la sécurité des données médicales. Avec notre logiciel, vous pouvez vous concentrer sur ce qui est important : offrir les meilleurs soins possibles à vos patients.
                </p>
            </div>
        </section>

        <!-- Testimonials Section -->
        <section class="testimonials-section p-py-6 p-bg-light">
            <div class="container">
                <h2 class="p-text-center">Témoignages</h2>
                <div class="testimonials-grid p-d-flex p-jc-around p-flex-wrap p-mt-4">
                    <div class="testimonial-item p-shadow-3 p-p-4 p-mb-4 p-flex p-flex-column p-ai-center">
                        <p class="p-mb-4">"MediSoft a transformé notre gestion des médecins. Les fonctionnalités sont intuitives et la sécurité des données est impeccable."</p>
                        <span>– Dr. Sophie Martin, Médecin Généraliste</span>
                    </div>
                    <div class="testimonial-item p-shadow-3 p-p-4 p-mb-4 p-flex p-flex-column p-ai-center">
                        <p class="p-mb-4">"Un outil indispensable pour les cliniques. La gestion des questionnaires est simplifiée, et la protection des données est rassurante."</p>
                        <span>– Dr. Pierre Lefebvre, Chirurgien</span>
                    </div>
                </div>
            </div>
        </section>

        <!-- Call to Action Section -->
        <section class="cta-section p-py-6 p-text-center p-bg-primary p-text-white">
            <div class="container">
                <h2>Prêt à optimiser votre gestion ?</h2>
                <p class="p-mb-4">Découvrez comment MediSoft peut améliorer vos processus médicaux dès aujourd'hui.</p>
                <Button label="Contactez-nous" icon="pi pi-envelope" class="p-button-rounded p-button-lg p-button-warning" />
            </div>
        </section>

        <!-- Footer Section -->
        <footer class="footer p-py-4 p-bg-dark p-text-white">
            <div class="container p-d-flex p-jc-between p-ai-center">
                <div class="footer-logo">
                    <h1 class="p-m-0">MediSoft</h1>
                </div>
                <ul class="footer-nav p-d-flex p-list-none p-m-0">
                    <li class="p-mr-4"><a href="#hero" class="p-text-white">Accueil</a></li>
                    <li class="p-mr-4"><a href="#features" class="p-text-white">Fonctionnalités</a></li>
                    <li class="p-mr-4"><a href="#about" class="p-text-white">À propos</a></li>
                    <li><a href="#login" class="p-text-white">Se connecter</a></li>
                </ul>
                <p>&copy; 2024 MediSoft. Tous droits réservés.</p>
            </div>
        </footer>
    </div>
</template>

<style scoped>
/* General Styles */
body {
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.container {
    width: 90%;
    max-width: 1200px;
    margin: 0 auto;
}

/* Header Section */
.header {
    background: linear-gradient(135deg, #4a90e2, #50e3c2);
    color: white;
    padding: 20px 0;
    position: sticky;
    top: 0;
    z-index: 1000;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.logo {
    display: flex;
    align-items: center;
}

.logo-text {
    font-size: 2rem;
    font-weight: bold;
    text-transform: uppercase;
}

.nav {
    margin-left: auto;
}

.nav-list {
    list-style: none;
    display: flex;
    gap: 20px;
    margin: 0;
    padding: 0;
}

.nav-item {
    color: white;
    text-decoration: none;
    font-size: 1.1rem;
    transition: color 0.3s, transform 0.3s;
}

.nav-item:hover {
    color: #ff9800;
    transform: translateY(-2px);
}

.nav-item:last-child {
    margin-left: auto;
}

/* Hero Section */
.hero {
    background: url('../src/assets/image1.jpg') no-repeat center center/cover;
    color: white;
    padding: 150px 0;
    text-align: center;
}

/* Features Section */
.features-section {
    padding: 100px 0;
    background-color: #f9f9f9;
    text-align: center;
}

/* Footer Section */
.footer {
    background-color: #333;
    color: white;
    padding: 40px 0;
    text-align: center;
}
</style>
