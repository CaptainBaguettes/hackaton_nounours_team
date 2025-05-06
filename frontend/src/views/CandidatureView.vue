<script>
export default {
  name: 'CandidatureView',
};
</script>

<template>
  <div class="wrapper">
    <h1 class="title">Candidature spontanée</h1>
    <form class="form" @submit.prevent="onSubmit">
      <div class="field">
        <label for="offer" class="label">Intitulé de l’offre</label>
        <input
          id="offer"
          type="text"
          v-model="offer"
          class="input"
          placeholder="Camion itinérant"
          required
        />
      </div>

      <div class="field">
        <label for="city" class="label">Mairie</label>
        <input
          id="city"
          type="text"
          v-model="city"
          class="input"
          placeholder="Nom de la mairie"
          required
        />
      </div>

      <div class="field">
        <label for="desc" class="label">Description</label>
        <textarea
          id="desc"
          v-model="description"
          class="textarea"
          :maxlength="maxLength"
          placeholder="Décrivez votre offre…"
        ></textarea>
        <div class="char-count">{{ description.length }} / {{ maxLength }}</div>
      </div>

      <button type="submit" class="btn">Candidater</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const offer = ref('');
const city = ref('');
const description = ref('');
const maxLength = 225;

function onSubmit() {
  // TODO: hook this up to your API or parent component
  console.log({
    offer: offer.value,
    city: city.value,
    description: description.value,
  });
  alert('Candidature envoyée !');
}
</script>

<style scoped>
.wrapper {
  max-width: 500px;
  margin: 2rem auto;
  padding: 1rem;
  text-align: center;
}

.title {
  font-size: 1.75rem;
  margin-bottom: 1.5rem;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.field {
  text-align: left;
}

.label {
  display: block;
  margin-bottom: 0.25rem;
  font-weight: 500;
}

.input,
.textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #cbd5e1;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.input:focus {
  outline: none;
  border-color: #3b82f6;
}

.textarea {
  min-height: 100px;
  resize: vertical;
}

.textarea:focus {
  outline: none;
  border-color: #8b5cf6;
}

.char-count {
  text-align: right;
  font-size: 0.875rem;
  color: #6b7280;
  margin-top: 0.25rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  font-size: 1.125rem;
  color: #fff;
  background: #3b82f6;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: background 0.2s;
}

.btn:hover {
  background: #2563eb;
}
</style>
