<template>
  <div class="container">
    <h1>Трекер задач</h1>
    <TaskForm @add-task="addTask" />
    <div v-for="(task, index) in tasks" :key="index" class="task-item">
      <div class="task-name">{{ task.name }}</div>
      <div v-if="task.deadline" class="deadline-container">
        <div class="deadline-date">
          <span class="label">Дедлайн:</span>
          <span class="value">{{ formatDeadline(task.deadline) }}</span>
        </div>
        <div class="countdown">
          <span class="label">Осталось времени:</span>
          <span class="value">{{ getCountdown(task.deadline) }}</span>
        </div>
      </div>
      <div class="buttons-container">
        <button @click="removeTask(index)" class="remove-button">Удалить задачу</button>
      </div>
    </div>
  </div>
</template>

<script>
import TaskForm from './TaskForm.vue';

export default {
  components: {
    TaskForm
  },
  data() {
    return {
      tasks: JSON.parse(localStorage.getItem('tasks')) || [],
      now: new Date()
    };
  },
  watch: {
    tasks: {
      handler(newTasks) {
        localStorage.setItem('tasks', JSON.stringify(newTasks));
      },
      deep: true
    }
  },
  methods: {
    addTask(task) {
      this.tasks.push(task);
      if (!this.interval) {
        this.startTimer();
      }
    },
    removeTask(index) {
      this.tasks.splice(index, 1);
      if (this.tasks.length === 0) {
        clearInterval(this.interval);
        this.interval = null;
      }
    },
    formatDeadline(deadline) {
      if (!deadline) return '';
      const date = new Date(deadline);
      return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    },
    startTimer() {
      this.interval = setInterval(() => {
        this.now = new Date();
      }, 1000);
    }
  },
  computed: {
    getCountdown() {
      return (deadline) => {
        if (!deadline) return '';
        const target = new Date(deadline);
        const diff = target - this.now;
        if (diff <= 0) return 'Истек';
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        return `${days} дней, ${hours} часов, ${minutes} минут, ${seconds} секунд`;
      };
    }
  },
  mounted() {
    if (this.tasks.some(task => task.deadline)) {
      this.startTimer();
    }
  },
  beforeDestroy() {
    clearInterval(this.interval);
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

.task-item {
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

.task-name {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 10px;
}

.deadline-container {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-top: 10px;
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.deadline-date,
.countdown {
  display: flex;
  align-items: center;
  gap: 5px;
}

.label {
  font-weight: bold;
  color: #2c3e50;
  white-space: nowrap;
}

.value {
  color: #42b983;
  font-weight: 500;
}

.countdown .value {
  color: #ff4d4d;
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