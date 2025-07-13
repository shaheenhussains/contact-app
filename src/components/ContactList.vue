<template>
  <ul class="contact-list">
    <li v-for="c in contacts" :key="c.id" class="contact-item">
      <div>
        <strong>{{ c.name }}</strong><br />
        📞 {{ c.mobile }} | ✉️ {{ c.email }}<br />
        🏠 {{ c.address }}
      </div>
      <div class="actions">
        <button @click="$emit('edit', c)">Edit</button>
        <button class="danger" @click="del(c.id)">Delete</button>
      </div>
    </li>
  </ul>
</template>

<script>
import { ref, onMounted } from 'vue';
import api from '../api';

export default {
  emits: ['edit', 'deleted'],
  setup(_, { emit }) {
    const contacts = ref([]);

    const load = async () => {
      const { data } = await api.get('/contacts');
      contacts.value = data;
    };

    const del = async (id) => {
      if (confirm('Delete this contact?')) {
        await api.delete(`/contacts/${id}`);
        await load();
        emit('deleted');
      }
    };

    onMounted(load);

    return {
      contacts,
      del,
    };
  },
};
</script>

<style scoped>
.contact-list {
  list-style: none;
  padding: 0;
}
.contact-item {
  display: flex;
  justify-content: space-between;
  background: #fff;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 6px;
  box-shadow: 0 0 5px rgba(0,0,0,0.05);
}
.actions button {
  margin-left: 0.5rem;
  padding: 0.4rem 0.8rem;
  font-size: 0.9rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.actions button:first-child {
  background-color: #2196f3;
  color: white;
}
.actions .danger {
  background-color: #f44336;
  color: white;
}
</style>
