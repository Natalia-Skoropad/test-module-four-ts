import { useId } from 'react';
import type { ChangeEvent } from 'react';
import { FieldError } from '../../index';

import css from './ValidatedInput.module.css';

//===============================================================

interface ValidatedInputProps {
  name: string;
  label: string;
  type?: 'text' | 'email' | 'password';
  placeholder?: string;
  srOnlyLabel?: boolean;

  value: string;
  onChangeValue: (v: string) => void;

  error?: string | null;
}

//===============================================================

export default function ValidatedInput({
  name,
  label,
  type = 'text',
  placeholder,
  srOnlyLabel,
  value,
  onChangeValue,
  error = null,
}: ValidatedInputProps) {
  const uid = useId();
  const inputId = `${uid}-${name}`;
  const errorId = `${inputId}-error`;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChangeValue(e.target.value);
  };

  return (
    <div className={css.field}>
      <label
        className={srOnlyLabel ? 'visually-hidden' : css.label}
        htmlFor={inputId}
      >
        {label}
      </label>

      <input
        className={`${css.input} ${error ? css.inputError : ''}`}
        id={inputId}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
      />

      <div className={css.errorSlot}>
        <FieldError id={errorId} message={error} />
      </div>
    </div>
  );
}
