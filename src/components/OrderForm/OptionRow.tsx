import React from "react";
import { Field, useField } from "formik";

import clsx from "clsx";
import css from "./OrderForm.module.css";

//===============================================================

type Props = {
  type: "radio" | "checkbox";
  name: string;
  value: string;
  children: React.ReactNode;
};

//===============================================================

function OptionRow({ type, name, value, children }: Props) {
  const [field] = useField({ name, type, value });

  let checked = false;
  if (type === "radio") {
    checked = field.value === value;
  } else {
    checked = Array.isArray(field.value) && field.value.includes(value);
  }

  return (
    <label
      className={clsx(
        type === "radio" ? css.radioLabel : css.checkboxLabel,
        checked && css.isChecked
      )}
    >
      <Field type={type} name={name} value={value} />
      <span className={css.optionText}>{children}</span>
    </label>
  );
}

export default OptionRow;
