import React from 'react'
import "./docCard.css"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import document from "../../icons/doc.webp"
import axios from "axios";
import { toast } from 'react-toastify';
function DocCard({ item, set, reset }) {

  const deleteDocumentHandler = async (id) => {
    const res = await axios.delete(process.env.REACT_APP_BASE_URL + `/document/delete/${id}`);
    reset(!set)
    toast.success(res.data);
  }
  return (
    <Card style={{ width: '18rem' }} className="card">
      <a className='documentCard' href={"http://localhost:8080/public/images/" + item.doc} target={"_blank"}>
        <Card.Img variant="top" src={document} className="docImg" />
      </a>
      <Card.Body>
        <Card.Title>{item.title}</Card.Title>
        <Card.Text>
          {item.description.slice(0, 80)}
        </Card.Text>
        <Button variant="danger" onClick={() => deleteDocumentHandler(item._id)}>Delete</Button>
      </Card.Body>
    </Card>
  )
}

export default DocCard