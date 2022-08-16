import { useState, useCallback } from "react";

const useValidity = () => {
    const [valuesEntered, setValuesEntered] = useState({});
    const [errors, setErrors] = useState({});
    const [isFormValidaty, setIsFormValidaty] = useState(false);

    const handleChanges = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setValuesEntered({
            ...valuesEntered,
            [name]: value,
        });
        setErrors({
            ...errors,
            [name]: event.target.validationMessage,
        });
        setIsFormValidaty(event.target.closest("form").checkValidity());
    };

    const resetForm = useCallback(
        (value = {}, errors = {}, validaty = false) => {
            setValuesEntered(value);
            setErrors(errors);
            setIsFormValidaty(validaty);
        },
        [setValuesEntered, setErrors, setIsFormValidaty]
    );

    return {
        valuesEntered,
        errors,
        handleChanges,
        isFormValidaty,
        resetForm,
    };
};

export default useValidity;