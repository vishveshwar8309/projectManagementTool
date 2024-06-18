import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    projectsInfo: localStorage.getItem('projectsInfo') ?
        JSON.parse(localStorage.getItem('projectsInfo')) : null,

}

const projectSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        saveProjects: (state, action) => {
            state.projectsInfo = action.payload;
            localStorage.setItem("projectsInfo", JSON.stringify(action.payload))
        },
        removeProjects: (state, action) => {
            state.projectsInfo = null;
            localStorage.removeItem('projectsInfo');
        }
    }
})

export const { saveProjects, removeProjects } = projectSlice.actions;

export default projectSlice.reducer;