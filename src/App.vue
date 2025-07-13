<template>
  <div class="container">
    <h1>📇 Contact Manager</h1>
    <ContactForm :selected="selected" @saved="onSaved" />
    <ContactList @edit="onEdit" @deleted="fetchContacts" />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import ContactForm from './components/ContactForm.vue';
import ContactList from './components/ContactList.vue';
import api from './api';

export default {
  components: { ContactForm, ContactList },
  setup() {
    const selected = ref(null);
    const contacts = ref([]);

    const fetchContacts = async () => {
      const { data } = await api.get('/contacts');
      contacts.value = data;
    };

    const onEdit = (contact) => {
      selected.value = contact;
    };

    const onSaved = () => {
      selected.value = null;
      fetchContacts();
    };

    onMounted(fetchContacts);

    return {
      selected,
      contacts,
      onEdit,
      onSaved,
      fetchContacts,
    };
  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: auto;
  padding: 2rem;
  font-family: 'Segoe UI', sans-serif;
  background-color: #f9f9f9;
  border-radius: 10px;
}
h1 {
  text-align: center;
  color: #333;
  margin-bottom: 2rem;
}
</style>
