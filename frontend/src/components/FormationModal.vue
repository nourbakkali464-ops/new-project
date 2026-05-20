<template>
  <div class="modal-overlay">
    <div class="modal-card">
      <button class="modal-close" @click="$emit('close')">×</button>

      <h2>Ajouter une formation</h2>
      <p>Remplis les informations de la formation.</p>

      <input v-model="formation.titre" placeholder="Titre de la formation" />
      <input v-model="formation.duree" placeholder="Durée" />
      <textarea v-model="formation.description" placeholder="Description"></textarea>
      <input v-model="formation.prix" type="number" placeholder="Prix en DH" />

      <AppButton @click="submitFormation">Ajouter</AppButton>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import AppButton from "@/components/AppButton.vue";

const emit = defineEmits(["close", "add"]);

const formation = reactive({
  titre: "",
  duree: "",
  description: "",
  prix: "",
});

const submitFormation = () => {
  if (!formation.titre || !formation.duree || !formation.description || !formation.prix) {
    return;
  }

  emit("add", {
    id: Date.now(),
    titre: formation.titre,
    duree: formation.duree,
    description: formation.description,
    prix: formation.prix,
    participants: [],
  });

  emit("close");
};
</script>