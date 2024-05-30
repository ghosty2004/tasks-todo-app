<script lang="ts" setup>
import { reactive } from "vue";
import TaskCard from "./components/TaskCard.vue";
import TaskManager from "./components/TaskManager.vue";
import { findChangedProperties } from "./utils";
import {
    getTasks,
    updateTask,
    type ITask,
    deleteTask,
    createTask,
} from "./api";
import useApiCall from "./hooks/useApiCall";

const managingTask = reactive({
    id: "0",
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

const { data: tasks } = useApiCall(getTasks);

/**
 * This function will handle the movement of a task between the types.
 */
const handleTaskMove = async (id: string, newType: ITask["type"]) => {
    if (!tasks?.value) return;
    const task = tasks.value.find((f) => f.id === id);
    if (task) {
        const { type } = await updateTask(id, {
            type: newType,
        });
        task.type = type;
    }
};

/**
 * This function will handle the deletion of a task.
 */
const handleTaskDelete = async (id: string) => {
    if (!tasks?.value) return;
    const index = tasks.value.findIndex((f) => f.id === id);
    if (index === -1) return;
    await deleteTask(id);
    tasks.value.splice(index, 1);
};

/**
 * This funciton will handle the completion of the task management.
 */
const handleTaskManageComplete = async (payload: any) => {
    if (!tasks?.value) return;

    const { manageType, ...payloadV2 } = payload;

    switch (manageType) {
        case "add":
            const newTask = await createTask(payloadV2);
            tasks.value.push(newTask);
            break;
        case "edit":
            const { currentId, ...rest } = payloadV2;

            const task = tasks.value.find((f) => f.id === currentId);

            const changedProperties = findChangedProperties(task, rest);

            if (Object.keys(changedProperties).length === 0) return;

            await updateTask(currentId, changedProperties);

            Object.entries(changedProperties).forEach(([key, value]) => {
                // @ts-ignore
                task[key] = value;
            });
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
                        v-for="task in tasks?.filter((f) => f.type === type)"
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
        :current-title="managingTask.type === 'edit' ? tasks?.find((f) => f.id === managingTask.id)!.title : ''"
        :current-description="managingTask.type === 'edit' ? tasks?.find((f) => f.id === managingTask.id)!.description : ''"
        :current-type="managingTask.type === 'edit' ? tasks?.find((f) => f.id === managingTask.id)!.type : 'todo'"
        @cancel="managingTask.type = 'none'"
        @done="handleTaskManageComplete"
    />
</template>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
./hooks/useApiCall
