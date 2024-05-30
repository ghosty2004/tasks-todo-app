<script lang="ts" setup>
import { ref, reactive } from "vue";
import TaskCard from "./components/TaskCard.vue";
import TaskManager from "./components/TaskManager.vue";
import { findChangedProperties } from "./utils";
import { getTasks, updateTask, type ITask, deleteTask } from "./api";

const managingTask = reactive({
    id: 0,
    type: "none", // none, add, edit
});

// Some hard-coded types
const types = [
    {
        name: "To do",
        type: "todo",
    },
    {
        name: "In progress",
        type: "progress",
    },
    {
        name: "Done",
        type: "done",
    },
];

const tasks = ref(await getTasks());

/**
 * This function will handle the movement of a task between the types.
 */
const handleTaskMove = async (id: number, newType: ITask["type"]) => {
    const task = tasks.value.find((f) => f.id === id);
    if (task) {
        await updateTask(id, {
            type: newType,
        });
        task.type = newType;
    }
};

/**
 * This function will handle the deletion of a task.
 */
const handleTaskDelete = async (id: number) => {
    const index = tasks.value.findIndex((f) => f.id === id);
    if (index === -1) return;
    await deleteTask(id);
    tasks.value.splice(index, 1);
};

/**
 * This funciton will handle the completion of the task management.
 */
const handleTaskManageComplete = (payload: any) => {
    const { manageType } = payload;

    switch (manageType) {
        case "add":
            break;
        case "edit":
            const currentFields = tasks.value.find(
                (f) => f.id === managingTask.id
            );

            const { manageType, currentId: id, ...rest } = payload;

            const changedProperties = findChangedProperties(
                currentFields,
                rest
            );

            console.log("changedProperties", id, changedProperties);
            break;
    }

    managingTask.type = "none";
};
</script>

<template>
    <div
        class="h-screen bg-white flex flex-col gap-5"
        v-bind:class="{ 'opacity-10': managingTask.type !== 'none' }"
    >
        <div class="flex ml-5 mr-5 mt-5">
            <h1 class="text-3xl font-semibold">Your tasks</h1>
            <button
                class="bg-blue-500 text-white px-4 py-2 rounded-lg ml-auto"
                @click="managingTask.type = 'add'"
            >
                Add Task
            </button>
        </div>

        <div class="w-full h-[3px] bg-gray-200" />

        <div class="container mx-auto flex h-full gap-2 w-full">
            <div
                class="flex flex-col w-full"
                v-for="({ type, name }, index) in types"
                :key="index"
            >
                <h2 class="font-semibold">{{ name }}</h2>
                <div class="flex flex-col gap-2">
                    <TaskCard
                        v-for="task in tasks.filter((f) => f.type === type)"
                        :key="task.id"
                        :id="task.id"
                        :title="task.title"
                        :description="task.description"
                        :type="type"
                        @move="handleTaskMove"
                        @edit="
                            managingTask.type = 'edit';
                            managingTask.id = task.id;
                        "
                        @delete="handleTaskDelete"
                    />
                </div>
            </div>
        </div>
    </div>

    <TaskManager
        v-if="managingTask.type !== 'none'"
        :manage-type="managingTask.type"
        :current-id="managingTask.id"
        :current-title="managingTask.type === 'edit' ? tasks.find((f) => f.id === managingTask.id)!.title : ''"
        :current-description="managingTask.type === 'edit' ? tasks.find((f) => f.id === managingTask.id)!.description : ''"
        :current-type="managingTask.type === 'edit' ? tasks.find((f) => f.id === managingTask.id)!.type : 'todo'"
        @cancel="managingTask.type = 'none'"
        @done="handleTaskManageComplete"
    />
</template>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
