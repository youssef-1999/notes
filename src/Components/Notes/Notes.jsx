import React from 'react'
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { useFormik } from 'formik';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import * as yup from 'yup';

function Notes({notes,deleteFn,getFn}) {
    const [show, setShow] = useState(false);
  const [note, setNote] = useState([]);


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    const validationSchema = yup.object().shape({
      title: yup
        .string()
        .min(4, 'At least 4 characters')
        .max(10, 'At most 10 characters')
        .required('Title is required'),
      content: yup
        .string()
        .min(4, 'At least 4 characters')
        .max(30, 'At most 30 characters')
        .required('Content is required'),
    });

    const formik = useFormik({
        initialValues: {
          title: '',
          content: '',
        },
        onSubmit: updateNotes,
        validationSchema,
      });


      async function updateNotes(values) {
        try {
          const res = await axios.put(
            `https://note-sigma-black.vercel.app/api/v1/notes/${notes._id}`,values,
            {
              headers: {
                token: `3b8ny__${localStorage.getItem('userToken')}`,
              },
            }
          );
          console.log(res);
          if (res?.data?.msg === 'done') {
            setNote(res.data.notes);
            getFn()
            handleClose()
          }
        } catch (err) {
          console.error(err);
        }
      }
  return (
    <div>
         <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Notes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="title"
                id="title"
                className="form-control my-2"
                placeholder="Add title..."
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.title && formik.touched.title && (
                <p className="text-danger">{formik.errors.title}</p>
              )}
            </div>
            <div className="form-group">
              <input
                type="text"
                name="content"
                id="content"
                className="form-control"
                placeholder="Add content..."
                value={formik.values.content}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.content && formik.touched.content && (
                <p className="text-danger">{formik.errors.content}</p>
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit" onClick={formik.handleSubmit}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
      <Card>
      <Card.Body>
        <Card.Title>{notes.title}</Card.Title>
        <Card.Text>
          {notes.content}
        </Card.Text>
        <Card.Link>  <button className='btn btn-primary'onClick={handleShow}  ><i className='fa-solid fa-pen mx-2'></i>Update</button> </Card.Link>
        <Card.Link> <button onClick={()=>deleteFn(notes._id)} className='btn btn-danger'><i  className='fa-solid fa-trash mx-2'></i> Remove</button> </Card.Link>
      </Card.Body>
    </Card>
    </div>
  )
}

export default Notes
