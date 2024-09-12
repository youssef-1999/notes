import { Button, Modal } from 'bootstrap/dist/js/bootstrap.bundle.min';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { Card } from 'react-bootstrap'
import * as yup from 'yup'

function Note({note}) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const validationSchema = yup.object().shape({
        title: yup
          .string()
          .min(5, "At least 5 characters")
          .max(15, "At most 15 characters")
          .required("Title is required"),
        content: yup
          .string()
          .min(5, "At least 5 characters")
          .max(25, "At most 25 characters")
          .required("Content is required"),
      });
    const formik = useFormik({
        initialValues: {
          title: '',
          content: ''
        },
        validationSchema,
        updateNote,
      });

async function updateNote(values) {
    console.log(values);
    
}




  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Notes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={formik.handleSubmit}>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter Title"
              className="form-control mb-1"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.title}
            />
            {formik.errors.title && formik.touched.title && (
              <p className="text-danger mb-1 p-1">{formik.errors.title}</p>
            )}
            <textarea
              id="content"
              name="content"
              placeholder="Enter Content"
              className="form-control"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.content}
            />
            {formik.errors.content && formik.touched.content && (
              <p className="text-danger mb-1 p-1">{formik.errors.content}</p>
            )}
            <Button
              type="submit"
              variant="primary"
              className="mt-3 d-block ms-auto"
            >
              Update
            </Button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="col-md-3 gy-3">
        <Card>
          <Card.Body>
            <Card.Title>{note.title}</Card.Title>
            <Card.Text>{note.content}</Card.Text>
            <Card.Link>
             
              <button onClick={handleShow} className="btn btn-primary">
                <i className="fa-solid fa-pen"></i>
              </button>
            </Card.Link>
            <Card.Link>
              <button className="btn btn-danger">
                <i className="fa-solid fa-trash text-danger"></i>
              </button>
            </Card.Link>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

export default Note
