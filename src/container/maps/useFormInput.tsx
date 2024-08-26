import { ChangeEvent, useState } from 'react';

export const useFormInput = <T extends Object>(initialValue: T) => {
    const [value, setValue] = useState<T>(initialValue);

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        setValue({ ...value, [event.target.name]: event.target.value });
    }

    const inputProps = {
        value: value,
        onChange: handleChange
    };

    return inputProps;
}