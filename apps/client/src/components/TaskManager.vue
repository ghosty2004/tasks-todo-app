<script lang="ts" setup>
import { capitalizeFirstLatter } from "@/utils";
import { ref } from "vue";

const props = defineProps({
    manageType: String, // add, edit
    currentId: Number,
    currentTitle: String,
    currentDescription: String,
    currentType: String,
});

const title = ref(props.currentTitle || "");
const description = ref(props.currentDescription || "");
const type = ref(props.currentType || "");

defineEmits(["done", "cancel"]);
</script>

<template>
    <div
        class="absolute top-1/2 left-1/2 transform translate-x-[-50%] translate-y-[-50%]"
    >
        <h1>{{ manageType === "add" ? "Create a new task" : "Edit task" }}</h1>
        <form
            class="flex flex-col"
            @submit.prevent="
                $emit('done', {
                    manageType,
                    currentId,
                    title,
                    description,
                    type,
                })
            "
        >
            <input
                required
                v-model="title"
                type="text"
                placeholder="Title"
                class="border border-gray-300 p-2 rounded-lg"
            />
            <textarea
                required
                v-model="description"
                placeholder="Description"
                class="border border-gray-300 p-2 rounded-lg mt-2"
            ></textarea>
            <select
                required
                v-model="type"
                class="border border-gray-300 p-2 rounded-lg mt-2"
            >
                <option value="todo">To Do</option>
                <option value="progress">In Progress</option>
                <option value="done">Done</option>
            </select>
            <div class="flex justify-between">
                <button
                    type="submit"
                    class="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2"
                >
                    {{ capitalizeFirstLatter(manageType!) }} Task
                </button>
                <button
                    @click="$emit('cancel')"
                    class="bg-red-500 text-white px-4 py-2 rounded-lg mt-2 ml-2"
                >
                    Cancel
                </button>
            </div>
        </form>
    </div>
</template>
