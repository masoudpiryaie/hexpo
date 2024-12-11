import React, { createContext, useContext, useState } from "react";

const FormDataContext = createContext();

export const useFormData = () => useContext(FormDataContext);

export const FormDataProvider = ({ children }) => {
  const [ispersonal, setIspersonal] = useState(1);

  const [formData, setFormData] = useState({
    userType: {
      userType: 1,
      userTypeName: "حقیقی",
    },
    personalInfo: {
      name: "",
      familyName: "",
      idNumber: "",
      birthday: "",
      password: "",
      gender: "مرد",
      agentName: "",
      agentFamilyName: "",
      agentIdNumber: "",
      agentBirthday: "",
      companyName: "",
      companyId: "",
      legalType: "",
      nameFamily: "",
      legalphoneNumber: "",
      partnership: "",
    },
    contactInfo: {
      mobileNumber: "",
      homeNumber: "",
      email: "",
      province: "",
      city: "",
      zipCode: "",
      location: "",
      address: "",
      pelak: "",
      unit: "",
      description: "",
    },
    bankAccountInfo: {
      shabaNumber: "",
      cardNumber: "",
      bankAccountNumber: "",
    },
  });

  const [shopData, setShopData] = useState(null);

  const updateFormData = (section, data) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [section]: { ...prevFormData[section], ...data },
    }));
  };

  const updateShopList = (shopListData) => {
    setShopData(shopListData);
  };

  return (
    <FormDataContext.Provider
      value={{
        formData,
        updateFormData,
        ispersonal,
        setIspersonal,
        shopData,
        updateShopList,
      }}
    >
      {children}
    </FormDataContext.Provider>
  );
};
