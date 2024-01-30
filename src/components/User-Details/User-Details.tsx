import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
// import './UserDetails/UserDetails';
import { json } from 'stream/consumers';
import './User-Details.scss'
import { Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';



// מגדיר ממשק UserDetails עם פונקציה onchange שלוקחת אובייקט משתמש כפרמטר ומחזירה void
interface UserDetails {
  onchange: (user:any) =>void;
}


// סכמה לבדיקת תקינות נתונים
const validationSchema = Yup.object({
  id: Yup.number().required('שדה חובה').integer('יש להזין מספרים בלבד').test('len', 'יש להזין בדיוק 9 ספרות', val => (val ? val.toString().length === 9 : false)),
  name: Yup.string().required('שדה חובה'),
  username: Yup.string().required('שדה חובה'),
  email: Yup.string().required('שדה חובה').email('יש להזין כתובת מייל תקנית'),
});

//  מגדיר רכיב React פונקציונלי בשם UserDetails שלוקח אביזרים מסוג UserDetails.

const UserDetails=(props:UserDetails)  => {
 // מגדיר פונקציה handleSubmit שנקראת כאשר הטופס נשלח.
// קורא לפונקציה onchange מאביזרים עם ערכי הטופס ומאפס את הטופס.
  const handleSubmit = (values: any, { resetForm }: { resetForm: () => void }) => {    // טיפול בשליחת הטופס
    props.onchange(values)

  // איפוס הטופס
  resetForm()
  };

  
// משתמש ברכיב Formik כדי לנהל את מצב הטופס
  return (
    <Formik
      initialValues={{
        id: '',
        name: '',
        username: '',
        email: '',
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        
        <div>
          <label htmlFor="id">ID:</label>
          <Field type="text" id="id" name="id" />
          <ErrorMessage name="id" component="div" />
        </div>

        <div>
          <label htmlFor="name">NAME:</label>
          <Field type="text" id="name" name="name" />
          <ErrorMessage name="name" component="div" />
        </div>

        <div>
          <label htmlFor="username">USERNAME:</label>
          <Field type="text" id="username" name="username" />
          <ErrorMessage name="username" component="div" />
        </div>

        <div>
          <label htmlFor="email">EMAIL:</label>
          <Field type="text" id="email" name="email" />
          <ErrorMessage name="email" component="div" />
        </div>

        <button type="submit">Add user</button>
      </Form>
    </Formik>
  );
  
};

export default UserDetails ;




