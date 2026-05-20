<template>
  <main class="auth-page">
    <AuthCard title="Connexion" subtitle="Connecte-toi pour accéder à ton espace">
      <form @submit.prevent="handleSignIn">
        <input v-model="form.email" type="email" placeholder="Email" />
        <input v-model="form.password" type="password" placeholder="Mot de passe" />

        <ErrorMessage :message="error" />

        <AppButton>Se connecter</AppButton>
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
  email: "",
  password: "",
});

const error = ref("");

const handleSignIn = () => {
  error.value = "";

  if (!form.email || !form.password) {
    error.value = "Email et mot de passe obligatoires.";
    return;
  }

  if (!form.email.includes("@")) {
    error.value = "Email invalide.";
    return;
  }

  console.log("Connexion valide", form);
};
</script>