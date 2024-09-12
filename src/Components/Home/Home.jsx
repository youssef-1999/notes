import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import * as yup from 'yup';
import Notes from '../Notes/Notes';
import style from './Home.module.css';
import { useRecoilState } from 'recoil';
import { noteAtom } from '../Atoms/NoteAtom';

function Home() {
  let [notesLength,setNotesLength]=useRecoilState(noteAtom)

  const [notes, setNotes] = useState([]);
  const [show, setShow] = useState(false);

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

  async function addNotes(values) {
    try {
      const res = await axios.post(
        'https://note-sigma-black.vercel.app/api/v1/notes',
        values,
        {
          headers: {
            token: `3b8ny__${localStorage.getItem('userToken')}`,
          },
        }
      );
      console.log(res);
      if (res?.data?.msg === 'done') {
        handleClose();

        getNotes();
      }
    } catch (err) {
      console.error(err);
    }
  }

  const formik = useFormik({
    initialValues: {
      title: '',
      content: '',
    },
    onSubmit: addNotes,
    validationSchema,
  });

  async function getNotes() {
    try {
      const res = await axios.get(
        'https://note-sigma-black.vercel.app/api/v1/notes',
        {
          headers: {
            token: `3b8ny__${localStorage.getItem('userToken')}`,
          },
        }
      );
      console.log(res);
      if (res?.data?.msg === 'done') {
        setNotes(res.data.notes);
        setNotesLength(res?.data?.notes.length);

      }
    } catch (err) {
      console.error(err);
    }
  }
  async function deleteNotes(id) {
    try {
      const res = await axios.delete(
        `https://note-sigma-black.vercel.app/api/v1/notes/${id}`,
        {
          headers: {
            token: `3b8ny__${localStorage.getItem('userToken')}`,
          },
        }
      );
      console.log(res);
      if (res?.data?.msg==="done") {
        setNotes(res?.data?.notes);
        getNotes()
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getNotes();
  }, []);

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
            Add
          </Button>
        </Modal.Footer>
      </Modal>
      <h1>Notes</h1>
      <button className="btn btn-primary d-block ms-auto" onClick={handleShow}>
        Notes <i className="fa-solid fa-plus"></i>
      </button>

      <div className="container">
        <div className="row">
        {notes?.length === 0 ? (
            <h1 className={`fw-bold d-flex justify-content-center align-items-center ${style.ga_maamli_regular}`}>
              No notes found, try to create one
            </h1>
          ) : (
            notes?.map((note, index) => (
              <div className="col-md-3" key={index}>
                <Notes notes={note} key={note._id} deleteFn={deleteNotes} getFn={getNotes} />
              </div>
            ))
          )}
        </div>
      </div>
      <div className="text-end"><p> Number of notes: {notesLength}</p></div>
    </div>
  )
}

export default Home;
