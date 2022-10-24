import React, { useState, useEffect } from "react";
import * as yup from "yup";
import { Button, Form, FormGroup, Label, Input, Alert } from "reactstrap";
import axios from "axios";

import formSchema from "../validation/formSchema";

const initialState = {
  name: "",
  email: "",
  birthDate: "",
  emailConsent: false,
};

const initialFormErrors = {
  name: "",
  email: "",
  birthDate: "",
  emailConsent: "",
};

const ContactForm = () => {
  const [contactPerson, setContactPerson] = useState(initialState);
  const [contactFormErrors, setContactFormErrors] = useState(initialFormErrors);
  const [isDisabled, setIsDisabled] = useState(true);
  const [successMessage, setSuccessMessage] = useState(false);
  const [postErrorMessage, setPostErrorMessage] = useState(false);

  const inputChange = (name, value) => {
    yup
      .reach(formSchema, name)
      .validate(value)
      .then(() => {
        setContactFormErrors({
          ...contactFormErrors,
          [name]: "",
        });
      })
      .catch((err) => {
        setContactFormErrors({
          ...contactFormErrors,
          [name]: err.errors[0],
        });
      });
    setContactPerson({
      ...contactPerson,
      [name]: value,
    });
  };

  const changeHandler = (event) => {
    const { name, value, type, checked } = event.target;
    const valueToUse = type === "checkbox" ? checked : value;
    inputChange(name, valueToUse);
  };

  const submitForm = (event) => {
    event.preventDefault();
    setSuccessMessage(!successMessage);
    axios
      .post(
        "https://my-json-server.typicode.com/JustUtahCoders/interview-users-api/users",
        contactPerson
      )
      .then((res) => {
        //console.log(res.data)
        setContactPerson(initialState);
      })
      .catch((err) => {
        setPostErrorMessage(!postErrorMessage);
        // console.log(err);
      });
  };

  const clearForm = (event) => {
    event.preventDefault();
    setContactPerson(initialState);
  };

  useEffect(() => {
    formSchema
      .isValid(contactPerson)
      .then((isValid) => setIsDisabled(!isValid), [contactPerson]);
  });

  return (
    <>
      <Form onSubmit={submitForm} className="contact-form-container">
        <h2 className="contact-h2">Contact us</h2>
        <FormGroup>
          <Label for="name">Name</Label>
          <Input
            type="text"
            name="name"
            id="name"
            placeholder="enter your name"
            value={contactPerson.name}
            onChange={changeHandler}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="enter your email"
            value={contactPerson.email}
            onChange={changeHandler}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="birthDate">Date of Birth</Label>
          <Input
            type="date"
            name="birthDate"
            id="birthDate"
            placeholder="enter your Date of Birth"
            value={contactPerson.birthDate}
            onChange={changeHandler}
          />
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input
              type="checkbox"
              name="emailConsent"
              id="emailConsent"
              onChange={changeHandler}
              checked={contactPerson.emailConsent}
              onClick={console.log(contactPerson.emailConsent)}
              required
            />
            I agree to be contacted via email.
          </Label>
        </FormGroup>
        <Button type="clear" className="contact-form-btn" onClick={clearForm}>
          Clear
        </Button>
        <Button
          type="submit"
          className="contact-form-btn"
          color="primary"
          disabled={isDisabled}
        >
          Submit
        </Button>
        <div className="error-message-container">
          <p>{contactFormErrors.name}</p>
          <p>{contactFormErrors.email}</p>
          <p>{contactFormErrors.birthDate}</p>
          <p>{contactFormErrors.emailConsent}</p>
        </div>
      </Form>
      {!successMessage ? null : (
        <Alert className="success-message-container" color="success">
          Thank you for filling the form. We will contact you very soon!
        </Alert>
      )}
      {!postErrorMessage ? null : (
        <Alert className="post-error-message-container" color="danger">
          Something went wrong with for submit. Please try again.
        </Alert>
      )}
    </>
  );
};

export default ContactForm;
