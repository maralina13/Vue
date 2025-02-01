// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import TaskTracker from '../components/TaskTracker.vue';
import HabitTracker from '../components/HabitTracker.vue';
import WishList from '../components/WishList.vue';

const routes = [
    {
        path: '/',
        name: 'TaskTracker',
        component: TaskTracker
    },
    {
        path: '/habits',
        name: 'HabitTracker',
        component: HabitTracker
    },
    {
        path: '/wishlist',
        name: 'WishList',
        component: WishList
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;

