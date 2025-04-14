import { ChangeEvent } from 'react';

interface CheckboxProps {
    id: string;
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    disabled?: boolean;
}

export default function Checkbox({
    id,
    label,
    checked,
    onChange,
    disabled = false,
}: CheckboxProps) {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.checked);
    };

    return (
        <div className='checkbox flex-center'>
            <input
                type='checkbox'
                id={id}
                checked={checked}
                onChange={handleChange}
                disabled={disabled}
                className='checkbox-input'
            />
            <label htmlFor={id} className='checkbox-label'>
                {label}
            </label>
        </div>
    );
}
