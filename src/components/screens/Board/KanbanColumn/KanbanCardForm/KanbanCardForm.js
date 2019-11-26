import React from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import styles from './kanban-card-form.module.css';

const cardSchema = yup.object({
  title: yup.string().required('Required'),
  email: yup
    .string()
    .email('Invalid email address')
    .required('Required'),
  description: yup.string().required('Required'),
});

export const KanbanCardForm = ({ onCancel, onSave }) => {
  const formik = useFormik({
    initialValues: {
      title: '',
      email: '',
      description: '',
    },
    validationSchema: cardSchema,
    onSubmit: onSave,
  });

  return (
    <form className={styles.form} onSubmit={formik.handleSubmit}>
      <label className={styles.label} htmlFor="title">
        Title
      </label>
      <input
        id="title"
        name="title"
        type="text"
        autoFocus
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.title}
        className={styles.input}
      />
      {formik.touched.title && formik.errors.title ? (
        <div className={styles.error}>{formik.errors.title}</div>
      ) : null}

      <label className={styles.label} htmlFor="email">
        Email
      </label>
      <input
        id="email"
        name="email"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
        className={styles.input}
      />
      {formik.touched.email && formik.errors.email ? (
        <div className={styles.error}>{formik.errors.email}</div>
      ) : null}

      <label className={styles.label} htmlFor="description">
        Description
      </label>
      <textarea
        id="description"
        name="description"
        rows={4}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.description}
        className={styles.input}
      />
      {formik.touched.description && formik.errors.description ? (
        <div className={styles.error}>{formik.errors.description}</div>
      ) : null}

      <div className={styles.actions}>
        <button className={styles.ghostButton} type="button" onClick={onCancel}>
          Cancel
        </button>
        <button className={styles.primaryButton} type="submit">
          Save task
        </button>
      </div>
    </form>
  );
};
