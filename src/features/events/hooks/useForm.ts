import { useState, useEffect, ChangeEvent } from 'react';

export const useForm = <T extends Record<string, any>>(initialFormData: T, requiredFields: (keyof T)[]) => {
  const [formData, setFormData] = useState(initialFormData);
  const [allFieldsFilled, setAllFieldsFilled] = useState(false);

  useEffect(() => {
    const areFieldsFilled = requiredFields.every((field) => {
      const value = formData[field];
      if (field === "aforo") {
        return Number(value) > 0;
      }
      return value !== "";
    });

    setAllFieldsFilled(areFieldsFilled);
  }, [formData, requiredFields]);


  // para manejar el databinding de los inputs
  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return { formData, handleInputChange, allFieldsFilled };
};