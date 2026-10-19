import React from "react";
import { render, screen } from "@testing-library/react";

import ProgressNotesPage from "../ProgressNotesPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../../models";

test("renders progressNotes page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ProgressNotesPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("progressNotes-datatable")).toBeInTheDocument();
    expect(screen.getByRole("progressNotes-add-button")).toBeInTheDocument();
});
