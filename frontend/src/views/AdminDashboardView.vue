<template>
  <main class="dashboard-page">
    <section class="dashboard-header">
      <div>
        <h1>Dashboard Admin</h1>
        <p>Gérer les formations et suivre les participants.</p>
      </div>

      <AppButton class="add-button" @click="showFormationModal = true">
        + Ajouter une formation
      </AppButton>
    </section>

    <section class="formations-grid">
      <div
        v-for="formation in formations"
        :key="formation.id"
        class="formation-card"
      >
        <h2>{{ formation.titre }}</h2>
        <p>{{ formation.description }}</p>

        <div class="formation-info">
          <span>{{ formation.duree }}</span>
          <span>{{ formation.prix }} DH</span>
          <span>{{ formation.participants.length }} participant(s)</span>
        </div>
      </div>
    </section>

    <FormationModal
      v-if="showFormationModal"
      @close="showFormationModal = false"
      @add="addFormation"
    />
  </main>
</template>

<script setup>
import { ref } from "vue";
import AppButton from "@/components/AppButton.vue";
import FormationModal from "@/components/FormationModal.vue";

const showFormationModal = ref(false);

const formations = ref([
  {
    id: 1,
    titre: "Développement Web",
    description: "Apprendre Vue.js et créer des interfaces modernes.",
    duree: "3 mois",
    prix: 1200,
    participants: [],
  },
  {
    id: 2,
    titre: "Backend Express",
    description: "Créer une API REST avec Node.js et Express.",
    duree: "2 mois",
    prix: 900,
    participants:[
      { nom: "Hassani", prenom: "Yassine", email: "yassine@email.com" },
    ],
  },
  {
    id: 3,
    titre: "Base de données MySQL",
    description: "Comprendre SQL, les tables, les relations et les requêtes.",
    duree: "1 mois",
    prix: 700,
    participants: [
      { nom: "Bakkali", prenom: "Nour", email: "nour@email.com" },
      { nom: "Alami", prenom: "Sara", email: "sara@email.com" },],
  },
]);

const addFormation = (formation) => {
  formations.value.push(formation);
  showFormationModal.value = false;
};
</script>