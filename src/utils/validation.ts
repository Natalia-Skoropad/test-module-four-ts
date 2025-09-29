export const LENGTH = {
  topic: { min: 2, max: 50 },
};

export function validateRequiredLength(
  value: string,
  min: number,
  max: number
): string | null {
  const length = value.trim().length;
  if (length === 0) return 'This field is required';
  if (length < min) return `Enter at least ${min} characters`;
  if (length > max) return `Enter at most ${max} characters`;
  return null;
}

export function validateTopic(value: string): string | null {
  return validateRequiredLength(value, LENGTH.topic.min, LENGTH.topic.max);
}

// ================================================================

export function readString(formData: FormData, key: string): string {
  const raw = formData.get(key);
  return typeof raw === 'string' ? raw : '';
}
