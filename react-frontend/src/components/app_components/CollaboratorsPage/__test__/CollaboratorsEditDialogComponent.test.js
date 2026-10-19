import React from "react";
import { render, screen } from "@testing-library/react";

import CollaboratorsEditDialogComponent from "../CollaboratorsEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders collaborators edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <CollaboratorsEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("collaborators-edit-dialog-component")).toBeInTheDocument();
});
