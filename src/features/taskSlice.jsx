
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tasks: []
};

const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {

        // Ajouter une tâche
        addTask: (state, action) => {
            state.tasks.push(action.payload);
        },

        // Supprimer une tâche
        deleteTask: (state, action) => {
            state.tasks = state.tasks.filter(
                task => task.id !== action.payload
            );
        },

        // Modifier le statut
        toggleStatus: (state, action) => {
            const task = state.tasks.find(
                task => task.id === action.payload
            );

            if (task) {
                task.completed = !task.completed;
            }
        }

    }
});

export const { addTask, deleteTask, toggleStatus } =
    tasksSlice.actions;

export default tasksSlice.reducer;

