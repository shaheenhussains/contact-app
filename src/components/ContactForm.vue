<template>
  <form class="form" @submit.prevent="save">
    <input v-model="form.name" placeholder="Name" required />
    <input v-model="form.mobile" placeholder="Mobile" />
    <input v-model="form.email" placeholder="Email" />
    <textarea v-model="form.address" placeholder="Address"></textarea>
    <div class="buttons">
      <button type="submit">{{ form.id ? 'Update' : 'Add' }}</button>
      <button type="button" @click="clear">Clear</button>
    </div>
  </form>
</template>

<script>
import { ref, watch } from 'vue';
import api from '../api';

export default {
  props: ['selected'],
  emits: ['saved'],
  setup(props, { emit }) {
    const defaultForm = { id: null, name: '', mobile: '', email: '', address: '' };
    const form = ref({ ...defaultForm });

    watch(() => props.selected, (val) => {
      form.value = val ? { ...val } : { ...defaultForm };
    });

    const save = async () => {
      if (form.value.id) {
        await api.put(`/contacts/${form.value.id}`, form.value);
      } else {
        await api.post('/contacts', form.value);
      }
      emit('saved');
      clear();
    };

    const clear = () => {
      form.value = { ...defaultForm };
    };

    return { form, save, clear };
  },
};
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 2rem;
}
input, textarea {
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
}
textarea {
  min-height: 80px;
}
.buttons {
  display: flex;
  gap: 0.5rem;
}
button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  color: white;
}
button[type="submit"] {
  background-color: #4caf50;
}
button[type="button"] {
  background-color: #9e9e9e;
}
</style>
