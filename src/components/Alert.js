// Alert.js (Assumed to be where showAlert is defined)
import React from "react";

const Alert = ({ message, type }) => {
  return <div className={`alert alert-${type}`}>{message}</div>;
};

export const showAlert = (message, type) => {
  // Logic to show alert, for example using a context or directly setting state
  console.log(`${type}: ${message}`);
};

export default Alert;
