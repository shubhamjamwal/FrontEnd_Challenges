import React, { useState } from 'react';
import './form.css';

const defaultFormState = {
  firstName: { value: '', error: null },
  lastName: { value: '', error: null },
  emailAddress: { value: '', error: null },
  password: { value: '', error: null },
  confirmPassword: { value: '', error: null },
};

export default function Form() {
  const [formState, setFormState] = useState(defaultFormState);

  const [success, setSuccess] = useState(false);

  const onChangeHandler = (field, value) => {
    setFormState({
      ...formState,
      [field]: {
        value: value,
        error: null,
      },
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let hasErrors = handleFormValidations();

    if (hasErrors) {
      setSuccess(false);
      return;
    }
    setSuccess(true);
  };

  const handleFormValidations = () => {
    let updatedState = { ...formState };
    let error = false;

    const { firstName, lastName, emailAddress, password, confirmPassword } =
      updatedState;
    if (firstName.value?.length < 3) {
      updatedState.firstName.error = 'First Name cannot be less than 3 characters';
      error = true;
    }
    if (lastName.value?.length < 3) {
      updatedState.lastName.error =
        'Last Name cannot be less than 3 characters';
      error = true;
    }

    const re = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

    if (!emailAddress?.value?.match(re)) {
      updatedState.emailAddress.error = 'Email address is invalid';
      error = true;
    }

    if (
      password?.value &&
      confirmPassword?.value &&
      password?.value !== confirmPassword?.value
    ) {
      updatedState.confirmPassword.error = 'Passwords do not match';
      error = true;
    }

    if (!password?.value) {
      updatedState.password.error = 'Password cannot be empty';
      error = true;
    }
    if (!confirmPassword?.value) {
      updatedState.confirmPassword.error = 'Confirm Password cannot be empty';
      error = true;
    }

    setFormState({
      ...formState,
      ...updatedState,
    });
    return error;
  };
  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div className="form-element">
        <label className="label">First Name</label>
        <input
          type="text"
          className="input"
          value={formState?.firstName?.value}
          onChange={(e) => onChangeHandler('firstName', e.target.value)}
          placeholder="Manu"
        />
        {formState?.firstName?.error && (
          <small className="error">{formState.firstName.error}</small>
        )}
      </div>
      <div className="form-element">
        <label className="label">Last Name</label>
        <input
          type="text"
          className="input"
          value={formState?.lastName?.value}
          placeholder="Arora"
          onChange={(e) => onChangeHandler('lastName', e.target.value)}
        />
        {formState?.lastName?.error && (
          <small className="error">{formState.lastName.error}</small>
        )}
      </div>
      <div className="form-element">
        <label className="label">Email Address</label>
        <input
          type="email"
          className="input"
          value={formState?.emailAddress?.value}
          placeholder="contact@manuarora.in"
          onChange={(e) => onChangeHandler('emailAddress', e.target.value)}
        />
        {formState?.emailAddress?.error && (
          <small className="error">{formState.emailAddress.error}</small>
        )}
      </div>
      <div className="form-element">
        <label className="label">Password</label>
        <input
          type="password"
          className="input"
          value={formState?.password?.value}
          onChange={(e) => onChangeHandler('password', e.target.value)}
        />
        {formState?.password?.error && (
          <small className="error">{formState.password.error}</small>
        )}
      </div>
      <div className="form-element">
        <label className="label">Confirm Password</label>
        <input
          type="password"
          className="input"
          value={formState?.confirmPassword?.value}
          onChange={(e) => onChangeHandler('confirmPassword', e.target.value)}
        />
        {formState?.confirmPassword?.error && (
          <small className="error">{formState.confirmPassword.error}</small>
        )}
      </div>
      <button type="submit" className="button">
        Register
      </button>
      {success && (
        <p className="success">Form as been submitted successfully!</p>
      )}
    </form>
  );
}
