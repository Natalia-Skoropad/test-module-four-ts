import { useId } from "react";

import { Formik, Form, Field, ErrorMessage } from "formik";
import type { FormikHelpers } from "formik";
import OptionRow from "./OptionRow";

import * as Yup from "yup";
import { Button } from "../../index";

import css from "./OrderForm.module.css";

//===============================================================

interface OrderFormValues {
  username: string;
  email: string;
  delivery: string;
  deliveryTime: string;
  restrictions: string[];
  message: string;
}

const initialValues: OrderFormValues = {
  username: "",
  email: "",
  delivery: "pickup",
  deliveryTime: "",
  restrictions: [],
  message: "",
};

//===============================================================

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Name too short")
    .max(50, "Name too long")
    .required("Name is required"),

  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),

  delivery: Yup.string()
    .oneOf(["pickup", "courier", "drone"], "Invalid delivery method")
    .required("Delivery method is required"),

  restrictions: Yup.array().of(Yup.string()),
  deliveryTime: Yup.string().required("Select delivery time"),

  message: Yup.string()
    .min(5, "Message too short")
    .max(300, "Message too long"),
});

//===============================================================

function OrderForm() {
  const fieldId = useId();

  const handleSubmit = (
    values: OrderFormValues,
    actions: FormikHelpers<OrderFormValues>
  ) => {
    console.log("Form submitted:", values);
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <>
        <h2>Order</h2>

        <Form className={css.form}>
          <fieldset className={css.fieldset}>
            <legend className={css.legend}>Client Info</legend>

            <label htmlFor={`${fieldId}-username`}>Name</label>
            <Field
              type="text"
              name="username"
              id={`${fieldId}-username`}
              className={css.input}
            />
            <ErrorMessage
              name="username"
              component="span"
              className={css.error}
            />

            <label htmlFor={`${fieldId}-email`}>Email</label>
            <Field
              type="email"
              name="email"
              id={`${fieldId}-email`}
              className={css.input}
            />
            <ErrorMessage name="email" component="span" className={css.error} />
          </fieldset>

          <fieldset className={css.fieldset}>
            <legend className={css.legend}>Delivery time</legend>

            <label htmlFor={`${fieldId}-deliveryTime`}>
              Preferred delivery time
            </label>
            <Field
              as="select"
              name="deliveryTime"
              id={`${fieldId}-deliveryTime`}
              className={css.input}
            >
              <option value="">-- Choose delivery time --</option>
              <option value="morning">Morning (8:00-12:00)</option>
              <option value="afternoon">Afternoon (12:00-16:00)</option>
              <option value="evening">Evening (16:00-20:00)</option>
            </Field>
            <ErrorMessage
              name="deliveryTime"
              component="span"
              className={css.error}
            />
          </fieldset>

          <fieldset className={css.fieldset}>
            <legend className={css.legend}>Delivery Method</legend>
            <div className={css.optionsGroup}>
              <OptionRow type="radio" name="delivery" value="pickup">
                Pickup
              </OptionRow>
              <OptionRow type="radio" name="delivery" value="courier">
                Courier
              </OptionRow>
              <OptionRow type="radio" name="delivery" value="drone">
                Drone delivery
              </OptionRow>
            </div>
          </fieldset>

          <fieldset className={css.fieldset}>
            <legend className={css.legend}>Dietary Restrictions</legend>
            <div className={css.optionsGroup}>
              <OptionRow type="checkbox" name="restrictions" value="vegan">
                Vegan
              </OptionRow>
              <OptionRow
                type="checkbox"
                name="restrictions"
                value="gluten-free"
              >
                Gluten-free
              </OptionRow>
              <OptionRow type="checkbox" name="restrictions" value="nut-free">
                Nut-free
              </OptionRow>
            </div>
          </fieldset>

          <fieldset className={css.fieldset}>
            <legend className={css.legend}>Comment</legend>

            <label htmlFor={`${fieldId}-message`}>Additional notes</label>
            <Field
              as="textarea"
              name="message"
              id={`${fieldId}-message`}
              rows={5}
              className={css.textarea}
            />
            <ErrorMessage
              name="message"
              component="span"
              className={css.error}
            />
          </fieldset>

          <Button type="submit" text="Place order" />
        </Form>
      </>
    </Formik>
  );
}

export default OrderForm;
