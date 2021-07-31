import StudentsContainer from "../StudentsContainer";

import React from 'react';
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';

test("Renders form input fields to filter students by name and tag", async () => {
  render(
    <StudentsContainer />
  );

  const nameInput = await screen.findByPlaceholderText('Search by name')
  const tagInput = await screen.findByPlaceholderText('Search by tag')

  expect(nameInput).toBeInTheDocument();
  expect(tagInput).toBeInTheDocument();
})