<script lang="ts" setup>
defineProps({
    id: Number,
    title: String,
    description: String,
    type: String, // todo, progress, done
});

defineEmits(["edit", "delete", "move"]);
</script>

<template>
    <div class="flex flex-col bg-white rounded-lg shadow-lg p-4">
        <h2 class="text-lg font-semibold">{{ title }}</h2>
        <p class="text-sm text-gray-500">{{ description }}</p>
        <select
            class="mt-4"
            @change="$emit('move', id, ($event.target! as any).value)"
        >
            <option value="todo" :selected="type === 'todo'">To Do</option>
            <option value="progress" :selected="type === 'progress'">
                In Progress
            </option>
            <option value="done" :selected="type === 'done'">Done</option>
        </select>
        <div class="flex justify-between mt-4 gap-3">
            <button
                class="bg-blue-500 text-white px-4 py-2 rounded-lg"
                @click="$emit('edit', id)"
            >
                Edit
            </button>
            <button
                class="bg-red-500 text-white px-4 py-2 rounded-lg"
                @click="$emit('delete', id)"
            >
                Delete
            </button>
        </div>
    </div>
</template>
