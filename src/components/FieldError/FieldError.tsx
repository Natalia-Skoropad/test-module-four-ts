import css from './FieldError.module.css';

// ================================================================

interface FieldErrorProps {
  id: string;
  message?: string | null;
}

// ================================================================

function FieldError({ id, message }: FieldErrorProps) {
  if (!message) return null;

  return (
    <p id={id} className={css.error} role="alert">
      {message}
    </p>
  );
}

export default FieldError;
