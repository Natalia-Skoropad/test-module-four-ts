import { useState } from 'react';
import { Button, ValidatedInput } from '../../index';

import { readString, validateTopic } from '../../utils/validation';
import { useLocalStorageString } from '../../utils/useLocalStorageString';

import toast from 'react-hot-toast';
import css from './SearchForm.module.css';

//===============================================================

interface SearchFormProps {
  onSubmit: (topic: string) => void;
}

//===============================================================

const LS_KEY = 'searchForm.topic';

function SearchForm({ onSubmit }: SearchFormProps) {
  const [topic, setTopic] = useLocalStorageString(LS_KEY, '');
  const [error, setError] = useState<string | null>(null);

  const handleChange = (val: string) => {
    setTopic(val);
    setError(validateTopic(val));
  };

  const handleSubmit = (formData: FormData) => {
    const topic = readString(formData, 'topic');
    const err = validateTopic(topic);
    if (err) {
      setError(err);
      toast.error('Something went wrong');
      return;
    }
    onSubmit(topic.trim());
    setTopic('');
    setError(null);
  };

  return (
    <>
      <h2>Search</h2>

      <form className={css.form} action={handleSubmit}>
        <div className={css.inputWrap}>
          <ValidatedInput
            name="topic"
            label="Search"
            srOnlyLabel
            placeholder="Enter search topic"
            value={topic}
            onChangeValue={handleChange}
            error={error}
          />
        </div>

        <Button text="Search" variant="normal" type="submit" />
      </form>
    </>
  );
}

export default SearchForm;
