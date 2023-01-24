import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DocCard from '../../components/docCard/DocCard';
import Header from '../../components/header/Header';
import axios from "axios"
import "./home.css"
function Home() {
  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  const navigate = useNavigate();
  const [userDocument, setUserDocument] = useState([]);
  const [set, reset] = useState(false)
  useEffect(() => {
    if (!localStorage.getItem("addoc")) {
      navigate("/login")
    }
  }, [])
  let userData = JSON.parse(localStorage.getItem("addoc"));

  useEffect(() => {
    const getDocument = async () => {
      try {
        const res = await axios.get(process.env.REACT_APP_BASE_URL + "/document/getall", {
          params: {
            email: userData[0]
          }
        })
        if (res?.data) {
          setUserDocument(res.data);
        }
      } catch (err) {
        console.log(err)
      }
    }
    getDocument();
  }, [set])
  return (
    <div className='homeContainer'>
      <Header companyName="ADDOC" state="Logout" />
      <div className='homeWrapper'>
        <div className="docCards">
          {
            userDocument && userDocument.length
              ? userDocument.map((item, index) => (               
                  <DocCard key={index} item={item} userDocument={userDocument} set={set} reset={reset} />               
              ))
              : <div className='nothingTitle'>Nothing in document !</div>
          }
        </div>
        <span className='addDocumentContainer'>
          <span className='addDocumentTitle' onClick={() => navigate("/document/add")}> + Add Document</span>
        </span>
      </div>
    </div>
  )
}

export default Home