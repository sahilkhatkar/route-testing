"use client";

import React, { useState, useEffect } from "react";
import styles from './page.module.css'

const page = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    message: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Submitting form...");

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      console.log(
        "Form Data to Send:",
        Object.fromEntries(formDataToSend.entries())
      );
      console.log("Uploading data...");
      const response = await fetch(
        // "https://m.designindianhomes.com/submitForm",
        "/api/submit-form",
        {
          method: "POST",
          // mode: "no-cors",
          body: formDataToSend,
        }
      );
      console.log("response: ", response);
      console.log("Response status:", response.status);
      console.log("Response headers:", response.headers);
      console.log("Response body:", await response.text());

      if (response.ok) {
        console.log("Form data submitted successfully!");
        console.log(
          "Form Data to Send:",
          Object.fromEntries(formDataToSend.entries())
        );

      } else {
        console.error("Form data submission failed. Response:", response);
      }
    } catch (error) {
      console.error("Error during form data submission:", error);
    }
  };

  return (
    <div className={styles.page}>

        <form className={styles.main} method="post" onSubmit={handleSubmit}>
          {/* Your form elements go here */}
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 ml-2 my-2"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={handleChange}
            className="mt-1 p-2 border-2 rounded-full w-full"
            required
          />
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 ml-2 mt-4 mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={handleChange}
            className="mt-1 p-2 border-2 rounded-full w-full"
            required
          />
          <label
            htmlFor="number"
            className="block text-sm font-medium text-gray-700 ml-2 mt-4 mb-2"
          >
            Contact Number
          </label>
          <input
            type="tel"
            id="number"
            name="number"
            onChange={handleChange}
            className="mt-1 p-2 border-2 rounded-full w-full"
            required
          />
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700 ml-2 mt-4 mb-2"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            onChange={handleChange}
            className="mt-1 p-2 border-2 rounded-full w-full text-sm"
            required
          ></textarea>

          {/* Add other form fields similarly */}

          <button
            type="submit"
            className="bg-gray-900 text-white py-2 px-4 mt-4 rounded-full w-full hover:bg-gray-700 hover:shadow"
          >submit
          </button>
        </form>
    </div>
  );
};


export default page;
