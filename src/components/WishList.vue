<template>
  <div class="container">
    <h1>Список желаний</h1>
    <form @submit.prevent="addItem" class="form">
      <input v-model="newItem.name" type="text" placeholder="Название товара">
      <input v-model="newItem.link" type="url" placeholder="Ссылка на товар" required>
      <button type="submit">Добавить</button>
    </form>
    <div v-for="(item, index) in items" :key="index" class="item-block">
      <a :href="item.link" target="_blank">{{ item.name }}</a>
      <div class="buttons-container">
        <button @click="removeItem(index)" class="remove-button">Удалить</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newItem: {
        name: '',
        link: ''
      },
      items: JSON.parse(localStorage.getItem('items')) || []
    };
  },
  watch: {
    items: {
      handler(newItems) {
        localStorage.setItem('items', JSON.stringify(newItems));
      },
      deep: true
    }
  },
  methods: {
    addItem() {
      if (!this.newItem.link.trim()) {
        alert('Пожалуйста, введите ссылку перед добавлением товара.');
        return;
      }

      if (!this.newItem.link.startsWith('http://') && !this.newItem.link.startsWith('https://')) {
        alert('Пожалуйста, введите корректную ссылку, начинающуюся с http:// или https://');
        return;
      }

      this.items.push({ ...this.newItem });
      this.newItem = { name: '', link: '' };
    },
    removeItem(index) {
      this.items.splice(index, 1);
    }
  }
};
</script>

<style scoped>
.container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form {
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

.form input[type="text"],
.form input[type="url"] {
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  transition: border-color 0.3s ease;
}

.form input[type="text"]:focus,
.form input[type="url"]:focus {
  border-color: #42b983;
  outline: none;
}

.form button {
  padding: 10px;
  font-size: 1rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-family: 'Roboto', sans-serif;
}

.form button:hover {
  background-color: #34885d;
}

.item-block {
  width: 100%;
  max-width: 400px;
  padding: 15px;
  margin-bottom: 15px;
  background-color: #f5f5dc;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.item-block a {
  font-size: 1.2rem;
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  transition: color 0.3s ease;
}

.item-block a:hover {
  color: #42b983;
}

.buttons-container {
  display: flex;
  gap: 10px;
}

.remove-button {
  background-color: #ff4d4d;
  font-family: 'Roboto', sans-serif;
}

.remove-button:hover {
  background-color: #e53935;
}
</style>