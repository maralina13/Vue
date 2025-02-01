<template>
  <div class="container">
    <h1>Трекер привычек</h1>
    <form @submit.prevent="addHabit" class="form">
      <input v-model="newHabit.name" type="text" placeholder="Добавить новую привычку">
      <button type="submit">Добавить</button>
    </form>
    <div v-for="(habit, index) in habits" :key="index" class="habit-item">
      <div class="habit-title">{{ habit.name }}</div>
      <div class="checkbox-container">
        <label v-for="(check, i) in habit.checks" :key="i">
          <input type="checkbox" v-model="habit.checks[i].completed">
          {{ formatDate(check.date) }}
        </label>
      </div>
      <div class="buttons-container">
        <button @click="addCheck(index)">Добавить отметку</button>
        <button @click="removeHabit(index)" class="remove-button">Удалить привычку</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newHabit: {
        name: ''
      },
      habits: JSON.parse(localStorage.getItem('habits')) || []
    };
  },
  watch: {
    habits: {
      handler(newHabits) {
        localStorage.setItem('habits', JSON.stringify(newHabits));
      },
      deep: true
    }
  },
  methods: {
    addHabit() {
      if (this.newHabit.name.trim() === '') return;
      this.habits.push({
        name: this.newHabit.name,
        checks: []
      });
      this.newHabit = '';
    },
    addCheck(index) {
      const today = new Date();
      today.setHours(today.getHours() + 3);
      this.habits[index].checks.push({
        date: today.toISOString().split('T')[0],
        completed: false
      });
    },
    removeHabit(index) {
      this.habits.splice(index, 1);
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString();
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

.form input[type="text"] {
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  transition: border-color 0.3s ease;
}

.form input[type="text"]:focus {
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

.habit-item {
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

.habit-title {
  font-size: 1.2rem;
  font-weight: bold;
}

.checkbox-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
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