import Student from "./Student";

import React from 'react';
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

test('Should display student name', () => {
  const student = {firstName: "Mack", lastName: "TackTack"}

  render(
    <Student 
      student={student}
      addProfileTag={() => {}}
    />
  );

  const studentName = screen.getByText('Mack TackTack');
  expect(studentName).toBeInTheDocument();
})

test('Should display student profile information', () => {
  const studentInfo = {
    email: "mail@mail.com",
    company: "Yadel",
    skill: "Oracle",
    average: 88.875
  }

  render(
    <Student 
      student={studentInfo}
      addProfileTag={() => {}}
    />
  );

  const email = screen.getByText("Email: mail@mail.com")
  const company = screen.getByText("Company: Yadel")
  const skill = screen.getByText("Skill: Oracle")
  const average = screen.getByText("Average: 88.875")

  expect(email).toBeInTheDocument();
  expect(company).toBeInTheDocument();
  expect(skill).toBeInTheDocument();
  expect(average).toBeInTheDocument();

})