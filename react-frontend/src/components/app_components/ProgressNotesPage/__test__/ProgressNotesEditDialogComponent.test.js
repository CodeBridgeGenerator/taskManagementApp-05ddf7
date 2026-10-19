import React from "react";
import { render, screen } from "@testing-library/react";

import ProgressNotesEditDialogComponent from "../ProgressNotesEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders progressNotes edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ProgressNotesEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("progressNotes-edit-dialog-component")).toBeInTheDocument();
});
