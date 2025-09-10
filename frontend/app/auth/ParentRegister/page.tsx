"use client";
import React, { useState } from "react";
import StepTwoRegisterClient from "@/components/MainPageCom/AuthenticationCom/StepTwoRegisterClient";
import StepOneRegister from "@/components/MainPageCom/AuthenticationCom/StepOneRegister";
import { registerUser, registerServiceProvider } from "../../utils/auth"; 
import StepTwoRegisterServiceProvider from "@/components/MainPageCom/AuthenticationCom/StepTwoRegisterServiceProvider";

const Page = () => {
  const [stepIndex, setStepIndex] = useState(0);

  // common infos
  const [role, setRole] = useState("client");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  

  // client infos
  const [address, setAddress] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [telephone, setTelephone] = useState("");
  const [cin, setcin] = useState<File | null>(null);

  // service provider infos
  
  const [serviceCategory, setServiceCategory] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    // First name: required, no digits
    if (!firstName) newErrors.firstName = "First name is required";
    else if (/\d/.test(firstName))
      newErrors.firstName = "First name cannot contain digits";

    // Last name: required, no digits
    if (!lastName) newErrors.lastName = "Last name is required";
    else if (/\d/.test(lastName))
      newErrors.lastName = "Last name cannot contain digits";

    // Email format
    if (!email) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Invalid email format";

    // Password: at least 8 characters
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 8)
      newErrors.password = "Password must be at least 8 characters";

    // Telephone: exactly 8 digits (Tunisia style)
    if (!telephone) newErrors.telephone = "Telephone is required";
    else if (!/^[0-9]{8}$/.test(telephone))
      newErrors.telephone = "Telephone must be 8 digits";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleClientSubmit = async () => {
    const userData = {
      firstName,
      lastName,
      email,
      password,
      role,
      address,
      dateOfBirth,
      telephone,
      cin
      
    };

    try {
      await registerUser(
        userData.firstName,
        userData.lastName,
        userData.email,
        userData.password,
        userData.telephone,
        userData.role,
        userData.address,
        userData.dateOfBirth,
        userData.cin
        
        
      );
      alert("Client registration works successfully!");
    } catch (e) {
      alert(
        "Failed to register client with info: \n" +
          userData.firstName + ", " +
          userData.lastName + ", " +
          userData.email + ", " +
          userData.password + ", " +
          userData.telephone + ", " +
          userData.role + ", " +
          userData.address + ", " +
          userData.dateOfBirth + ", " 
        );
      console.error(e);
    }
  };

  const handleServiceProviderSubmit = async () => {
    const userData = {
      firstName,
      lastName,
      email,
      password,
      telephone,
      role,
      serviceCategory,
    };

    try {
      await registerServiceProvider(
        userData.firstName,
        userData.lastName,
        userData.email,
        userData.password,
        userData.telephone,
        userData.role,
        userData.serviceCategory
      );
      alert("Service Provider registration works successfully!");
    } catch (e) {
      alert(
        "Failed to register service provider with info: \n" +
          userData.firstName + ", " +
          userData.lastName + ", " +
          userData.email + ", " +
          userData.password + ", " +
          userData.telephone + ", " +
          userData.role + ", " +
          userData.serviceCategory
      );
      console.error(e);
    }
  };

  // ✅ Correct place for return
  return (
    <div>
      {stepIndex === 0 && (
        <StepOneRegister
          role={role}
          setRole={setRole}
          email={email}
          setEmail={setEmail}
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          password={password}
          setPassword={setPassword}
          telephone={telephone}
          setTelephone={setTelephone}
          onNext={() => {
            // simple validation

            if (!role) {
              alert("Please select a role first");
              return;
            }
            setStepIndex(1);
          }}
        />
      )}

      {stepIndex === 1 && role.toLowerCase() === "client" && (
        <StepTwoRegisterClient
          address={address}
          setAddress={setAddress}
          dateOfBirth={dateOfBirth}
          setDateOfBirth={setDateOfBirth}
          telephone={telephone}
          setTelephone={setTelephone}
          cin={cin}
          setCin={setcin}
          onSubmit={handleClientSubmit}
        />
      )}

      {stepIndex === 1 && role.toLowerCase() !== "client" && (
        <StepTwoRegisterServiceProvider
        
          serviceCategory={serviceCategory}
          setServiceCategory={setServiceCategory}
          errors={{}}
          onSubmit={handleServiceProviderSubmit}
        />
      )}
    </div>
  );
};

export default Page;
