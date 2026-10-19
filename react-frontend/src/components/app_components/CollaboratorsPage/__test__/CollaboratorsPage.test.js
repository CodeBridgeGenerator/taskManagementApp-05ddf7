import React from "react";
import { render, screen } from "@testing-library/react";

import CollaboratorsPage from "../CollaboratorsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../../models";

test("renders collaborators page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <CollaboratorsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("collaborators-datatable")).toBeInTheDocument();
    expect(screen.getByRole("collaborators-add-button")).toBeInTheDocument();
});
