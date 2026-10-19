import React from "react";
import { render, screen } from "@testing-library/react";

import ProgressNotesCreateDialogComponent from "../ProgressNotesCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders progressNotes create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ProgressNotesCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("progressNotes-create-dialog-component")).toBeInTheDocument();
});
