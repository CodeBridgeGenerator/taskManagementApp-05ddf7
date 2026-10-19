import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';
import ProtectedRoute from './ProtectedRoute';

import SingleTasksPage from "../components/app_components/TasksPage/SingleTasksPage";
import TaskProjectLayoutPage from "../components/app_components/TasksPage/TaskProjectLayoutPage";
import SingleCollaboratorsPage from "../components/app_components/CollaboratorsPage/SingleCollaboratorsPage";
import CollaboratorProjectLayoutPage from "../components/app_components/CollaboratorsPage/CollaboratorProjectLayoutPage";
import SingleProgressNotesPage from "../components/app_components/ProgressNotesPage/SingleProgressNotesPage";
import ProgressNoteProjectLayoutPage from "../components/app_components/ProgressNotesPage/ProgressNoteProjectLayoutPage";
//  ~cb-add-import~

const AppRouter = () => {
    return (
        <Routes>
            {/* ~cb-add-unprotected-route~ */}
<Route path="/tasks/:singleTasksId" exact element={<SingleTasksPage />} />
<Route path="/tasks" exact element={<TaskProjectLayoutPage />} />
<Route path="/collaborators/:singleCollaboratorsId" exact element={<SingleCollaboratorsPage />} />
<Route path="/collaborators" exact element={<CollaboratorProjectLayoutPage />} />
<Route path="/progressNotes/:singleProgressNotesId" exact element={<SingleProgressNotesPage />} />
<Route path="/progressNotes" exact element={<ProgressNoteProjectLayoutPage />} />
            <Route element={<ProtectedRoute redirectPath={'/login'} />}>{/* ~cb-add-protected-route~ */}</Route>
        </Routes>
    );
};

const mapState = (state) => {
    const { isLoggedIn } = state.auth;
    return { isLoggedIn };
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data)
});

export default connect(mapState, mapDispatch)(AppRouter);
