/* eslint-disable react-hooks/exhaustive-deps */
import './App.css';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import SearchIcon from '@mui/icons-material/Search';


function App() {
  const [show, setShow] = useState(false);
  const [main, setMain] = useState(false);
  const [allData, setAllData] = useState([])
  const [searchBar, setSearchBar] = useState('')
  const [id, setId] = useState(0)
  const [info, setInfo] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
    number: '',
  })

  const handleSearchbar = (e) => {
    setSearchBar(e.target.value);
  }

  const handleClose = () => {
    setMain(false)
    setShow(false);
    setInfo({
      name: '',
      year: '',
      status: 'true'
    })
  }


  const GetData = (e) => {
    const { name, value } = e.target
    setInfo(pre => ({
      ...pre,
      [name]: value
    }))
  }


  const toServer = async () => {
    if (info.name.trim() === "" || info.year.trim() === "") {
      return;
    }
    try {
      await axios.post('http://localhost:5000/user', info)
      const result = await axios.get('http://localhost:5000/user')
      setAllData(result.data)
      console.log(result)
    }
    catch (error) {
      console.log(error)
    }
    setInfo({
      name: '',
      year: '',
      status: 'true',
    })
    display()
    handleClose()
  }


  const display = async () => {
    const result = await axios.get('http://localhost:5000/user')
    setAllData(result.data)
    console.log(allData);
  }

  useEffect(() => {
    display();
  }, [])


  const handleShow = (index) => {
    setInfo({
      name: allData[index].name,
      year: allData[index].year
    })
    setId(index)
    setShow(true)
  }


  const deleteData = async (index) => {
    console.log(allData[index]._id);
    await axios.delete(`http://localhost:5000/user/${allData[index]._id}`);
    display();
  }


  const savData = async (index) => {
    if (info.name.trim() === "" || info.year.trim() === "") {
      return;
    }
    setInfo({
      name: '',
      year: '',
      status: 'true'
    })
    handleClose()
    await axios.put(`http://localhost:5000/user/${allData[id]._id}`, info)
    display();
  }



  return (
    <>
      <div className="container">
        <span style={{ "fontSize": "3vh", "paddingRight": "2vh" }}>Add New Data Here</span>
        <AddBoxIcon style={{ "fontSize": "7vh", "color": "#4c9baf", "cursor": "pointer" }} onClick={() => setMain(true)} />
        <TextField className='searchBar' id="filled-basic" label="Search" variant="standard" style={{ "marginLeft": "60%" }} name='search' onChange={handleSearchbar} />
        <SearchIcon className='searchIcon' />

        <Modal show={main} onHide={handleClose} >
          <Modal.Header closeButton>
            <Modal.Title>Create Data</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder='Name'
                  autoFocus
                  value={info.name} name='name' variant="standard" color='success' onChange={GetData}
                />
                <br />
                <Form.Label>Year</Form.Label>
                <Form.Control
                  type="text"
                  placeholder='Year'
                  value={info.year} name='year' variant="standard" color='success' onChange={GetData}
                />
              </Form.Group>

            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={() => toServer()} style={{ "backgroundColor": "#4c9baf" }}>
              Add
            </Button>
          </Modal.Footer>
        </Modal>


        <table className="styled-table" >
          <thead>
            <tr>
              <th style={{ "width": "8vh", "textAlign": "center" }} >Sr No.</th>
              <th >Name</th>
              <th style={{ "width": "20vh" }}>Default Year</th>
              <th style={{ "width": "20vh", "textAlign": "center" }}>Edit</th>
            </tr>
          </thead>
          <tbody>

            {allData.map((item, index) => (item.name.toUpperCase()).includes(searchBar.toUpperCase()) ? (
              <tr key={item.id}>
                <td style={{ "textAlign": "center" }}>{index + 1}</td>
                <td>{item.name}</td>
                <td style={{ "textAlign": "center" }}>{item.year}</td>
                <td><DeleteForeverIcon onClick={() => deleteData(index)} style={{ "color": "red", "marginLeft": "3vh", "cursor": "pointer" }} />
                  <BorderColorIcon onClick={() => handleShow(index)} style={{ "marginLeft": "3vh", "color": "#4c9baf", "cursor": "pointer" }} /></td>
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Update Data</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>SR no.{index}</Form.Label><br />
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder='Name'
                          autoFocus
                          value={info.name} name='name' variant="standard" color='success' onChange={GetData}
                        />
                        <br />
                        <Form.Label>Year</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder='Year'
                          value={info.year} name='year' variant="standard" color='success' onChange={GetData}
                        />
                      </Form.Group>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                    <Button variant="primary" onClick={() => savData(index)} style={{ "backgroundColor": "#4c9baf" }}>
                      Save
                    </Button>
                  </Modal.Footer>
                </Modal>
              </tr>
            ) : null)
            }


          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;

