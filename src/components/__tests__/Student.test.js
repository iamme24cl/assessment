import Student from "../Student";

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

test('Should have a button element', () => {
  render(
    <Student student={{}} addProfileTag={(() => {})}/>
  );
  const button = screen.getByRole('button');
  expect(button).toBeInTheDocument()
})

test('Clicking the button should toggle display student grades', async () => {
  render(
    <Student student={{grades: ["71", "100", "90"]}} addProfileTag={(() => {})}/>
  );
  let grade = screen.queryByText("Test 2: 100")
  expect(grade).toBeNull();

  const button = screen.getByRole('button');
  userEvent.click(button);

  let test = await screen.findByText("Test 2:")
  grade = await screen.findByText("100");

  expect(test).toBeInTheDocument();
  expect(grade).toBeInTheDocument();

  userEvent.click(button);
  test = screen.queryByText("Test 2:")
  grade = screen.queryByText("100");

  expect(test).toBeNull();
  expect(grade).toBeNull();
})

