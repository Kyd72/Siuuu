<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
         <!-- Header Section -->
         <header class="header">
            <div class="header-inner">
                <div class="logo">
                    <h1 class="logo-text">SIUUUU</h1>
                </div>
                <nav class="nav">
                    <ul class="nav-list">
                        <li><a href="#hero" class="nav-item">Accueil</a></li>
                        <li><a href="#features" class="nav-item">Fonctionnalités</a></li>
                        <li><a href="#about" class="nav-item">À propos</a></li>
                        <li><router-link to="/login" class="nav-item">Se connecter</router-link></li>
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
                        <i class="pi pi-user p-mb-3" style="font-size: 2rem; color: #009688;"></i>
                        <h3>Inscription des Médecins</h3>
                        <p>Ajoutez et gérez les profils des médecins de manière simple et efficace.</p>
                    </div>
                    <div class="feature-item p-shadow-3 p-p-4 p-mb-4 p-d-flex p-flex-column p-ai-center">
                        <i class="pi pi-question-circle p-mb-3" style="font-size: 2rem; color: #009688;"></i>
                        <h3>Gestion des Questionnaires</h3>
                        <p>Créez, distribuez et analysez des questionnaires médicaux en toute simplicité.</p>
                    </div>
                    <div class="feature-item p-shadow-3 p-p-4 p-mb-4 p-d-flex p-flex-column p-ai-center">
                        <i class="pi pi-lock p-mb-3" style="font-size: 2rem; color: #009688;"></i>
                        <h3>Sécurité des Données</h3>
                        <p>Assurez-vous que les données médicales sont protégées avec des normes de sécurité avancées.</p>
                    </div>
                </div>
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
        <section class="cta-section p-py-6 p-text-center">
            <div class="container">
                <h2>Prêt à optimiser votre gestion ?</h2>
                <p class="p-mb-4">Découvrez comment MediSoft peut améliorer vos processus médicaux dès aujourd'hui.</p>
                <Button label="Contactez-nous" icon="pi pi-envelope" class="p-button-rounded p-button-lg p-button-green" />
            </div>
        </section>

        <!-- Footer Section -->
        <footer class="footer p-py-4 p-bg-dark p-text-white">
            <div class="container p-d-flex p-jc-between p-ai-center">
                <div class="footer-logo">
                    <h1 class="p-m-0">SIUUUUUUU</h1>
                </div>
                <ul class="footer-nav p-d-flex p-list-none p-m-0">
                    <li class="p-mr-4"><a href="#hero" class="p-text-white">Accueil</a></li>
                    <li class="p-mr-4"><a href="#features" class="p-text-white">Fonctionnalités</a></li>
                    <li class="p-mr-4"><a href="#about" class="p-text-white">À propos</a></li>
                    <li><RouterLink to="/loginpage" class="p-button-rounded p-button-secondary">Se connecter</RouterLink></li>
                </ul>
                <p>&copy; 2024 SIUUUUUUU. Tous droits réservés.</p>
            </div>
        </footer>
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
    max-width: 100%;
    margin: 0 auto;
}

/* Header Section */
.header {
    background: linear-gradient(90deg, rgba(0, 150, 136, 0.9), rgba(0, 150, 136, 0.7));
    color: white;
    padding: 10px 0; /* Reduced padding */
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 0;
    z-index: 1000;
    width: 100%;
}

.header-inner {
    display: flex;
    justify-content: space-between; /* Aligns logo to the left and nav to the right */
    align-items: center;
    width: 90%;
    max-width: 1200px;
    margin: 0 auto;
}

.logo {
    flex: 1; /* Makes sure the logo takes up space on the left */
}

.logo-text {
    font-size: 1.2rem; /* Reduced logo size */
    margin: 0;
}

.nav {
    flex: 2; /* Takes up the remaining space */
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
    font-size: 1rem; /* Reduced font size */
    transition: color 0.3s, background-color 0.3s, transform 0.3s;
    padding: 8px 15px; /* Reduced padding */
    border-radius: 5px;
}

.nav-item:hover {
    color: #ffffff;
    background-color: rgba(255, 255, 255, 0.3);
    transform: translateY(-3px);
    font-weight: bold;
}

/* Responsive Design */
@media (max-width: 768px) {
    .header-inner {
        flex-direction: column;
        align-items: flex-start;
    }

    .nav-list {
        flex-direction: column;
        width: 100%;
        text-align: left;
    }

    .nav-item {
        padding: 10px;
        width: 100%;
        text-align: center;
    }
}

/* Hero Section */
.hero {
    background: url('@/assets/image1.jpg') no-repeat center center/cover;
    color: white;
    padding: 150px 0;
    text-align: center;
}

.hero-title {
    font-size: 2.5rem;
    margin: 0;
    font-weight: bold;
}

.hero-subtitle {
    font-size: 1.2rem;
    margin: 20px 0;
}

/* Features Section */
.features-section {
    padding: 80px 0;
    background-color: #f4f4f4;
    text-align: center;
}

.features-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
}

.feature-item {
    flex: 1;
    max-width: 300px;
    padding: 20px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
}

.feature-item i {
    color: #009688;
}

/* Testimonials Section */
.testimonials-section {
    padding: 80px 0;
    background-color: #f9f9f9;
}

.testimonials-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
}

.testimonial-item {
    max-width: 400px;
    padding: 20px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
}

/* Call to Action Section */
.cta-section {
    padding: 80px 0;
    background-color: #009688;
    color: white;
}

.cta-section Button {
    font-size: 1.2rem;
}

/* Footer Section */
.footer {
    background-color: #333;
    color: white;
    padding: 20px 0;
    text-align: center;
}

.footer-logo h1 {
    margin: 0;
    font-size: 1.5rem;
}

.footer-nav {
    list-style: none;
    display: flex;
    justify-content: center;
    gap: 15px;
    padding: 0;
    margin: 15px 0;
}

.footer-nav a {
    color: white;
    text-decoration: none;
    font-size: 0.9rem;
}
</style>
