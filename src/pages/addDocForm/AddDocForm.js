import React, { useRef} from 'react'
import { useNavigate } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Header from '../../components/header/Header';
import "./addDocForm.css"
import axios from "axios";
import { toast } from 'react-toastify';
function AddDocForm() {
  const formRef = useRef();
  const navigate = useNavigate();
  const uploadDocumentHandler = async (e) => {
    e.preventDefault();
    let userData = JSON.parse(localStorage.getItem("addoc"))
    const formData = new FormData(e.target);
    formData.append("email", userData[0]);
    try {

      const res = await axios.post(process.env.REACT_APP_BASE_URL+"/document/add", formData)
      if(res.data){
        toast.success("File uploaded successfully!")
      }
      navigate("/")
    } catch (err) {
      toast.error("Oops something went wrong!")
      console.log(err)
    }
  }

  return (
    <div className='addDocContainer'>
      <Header companyName="ADDOC" state="Cancel" />
      <Form ref={formRef} onSubmit={uploadDocumentHandler} encType="multipart/form-data">
        <div className='addDocWrapper'>
          <Row>
            <Form.Label column lg={2}>
              Document Title
            </Form.Label>
            <Col>
              <Form.Control type="text" placeholder="Enter Title" name="title" />
            </Col>
          </Row>
          <br />
          <Row>
            <Form.Label column lg={2}>
              Document Description
            </Form.Label>
            <Col>
              <textarea className="description" type="text" placeholder="Enter Description" name="description" />
            </Col>
          </Row>
          <Row>
            <Form.Label column lg={2}>
              Upload Here
            </Form.Label>
            <Col>
              <input type="file" id="file" name="file" />
            </Col>
          </Row>
          <div className='uploadBtnContainer'>
            <Button className='uploadBtn' variant="primary" type='submit'>UPLOAD</Button>
          </div>
          <br />
        </div>
      </Form>
    </div>
  )
}

export default AddDocForm