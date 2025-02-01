<template>
  <form @submit.prevent="handleSubmit" class="form">
    <input v-model="task.name" type="text" placeholder="Добавить новую задачу">
    <label>
      <input v-model="task.hasDeadline" type="checkbox">
      Добавить дедлайн
    </label>
    <label v-if="task.hasDeadline">
      Дедлайн:
      <input v-model="task.deadline" type="datetime-local">
    </label>
    <button type="submit">Добавить</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      task: {
        name: '',
        hasDeadline: false,
        deadline: ''
      }
    };
  },
  methods: {
    handleSubmit() {
      if (!this.task.name.trim()) {
        return;
      }
      this.$emit('add-task', { ...this.task });
      this.task = { name: '', hasDeadline: false, deadline: '' };
    }
  }
};
</script>

<style scoped>
.form {
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

.form input[type="text"],
.form input[type="datetime-local"] {
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  transition: border-color 0.3s ease;
}

.form input[type="text"]:focus,
.form input[type="datetime-local"]:focus {
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
</style>