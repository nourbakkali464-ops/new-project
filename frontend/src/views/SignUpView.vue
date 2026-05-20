<template>
  <main class="auth-page">
    <AuthCard title="Créer un compte" subtitle="Inscris-toi pour choisir une formation">
      <form @submit.prevent="handleSignUp">
        <input v-model="form.nom" type="text" placeholder="Nom" />
        <input v-model="form.prenom" type="text" placeholder="Prénom" />
        <input v-model="form.email" type="email" placeholder="Email" />
        <input v-model="form.password" type="password" placeholder="Mot de passe" />

        <ErrorMessage :message="error" />

        <AppButton>Créer mon compte</AppButton>
      </form>
    </AuthCard>
  </main>
</template>

<script setup>
import { reactive, ref } from "vue";
import AuthCard from "@/components/AuthCard.vue";
import AppButton from "@/components/AppButton.vue";
import ErrorMessage from "@/components/ErrorMessage.vue";

const form = reactive({
  nom: "",
  prenom: "",
  email: "",
  password: "",
});

const error = ref("");

const handleSignUp = () => {
  error.value = "";

  if (!form.nom || !form.prenom || !form.email || !form.password) {
    error.value = "Tous les champs sont obligatoires.";
    return;
  }

  if (!form.email.includes("@")) {
    error.value = "Veuillez entrer un email valide.";
    return;
  }

  if (form.password.length < 6) {
    error.value = "Le mot de passe doit contenir au moins 6 caractères.";
    return;
  }

  console.log("Inscription valide", form);
};
</script>