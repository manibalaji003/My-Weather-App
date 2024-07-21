import  { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Mainpage, { Footer } from './pages/mainpage';
import {Navbar } from 'react-bootstrap';
import { ThreeCircles } from 'react-loader-spinner'

const API_KEYS = import.meta.env.VITE_WAPI_EKEYR;

function App() {
  const [firstData, setFirstData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${API_KEYS}&q=tirunelveli&aqi=yes`);
       // console.log("Total response is ", response);
        setFirstData(response.data);
      } catch (e) {
        console.error(e);
        setError(e);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) return <div><ThreeCircles
  visible={true}
  height="100"
  width="100"
  color="#4fa94d"
  ariaLabel="three-circles-loading"
  wrapperStyle={{}}
  wrapperClass=""
  /></div>;


  return (
    <>
    <div className='bg-image'></div>
    <Navbar className='navbar' data-bs-theme="dark">
          <Navbar.Brand>
            &nbsp;
            &nbsp;
          <img
              alt=""
              src='newlogo.png'
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
              Weather App
            </Navbar.Brand>
      </Navbar>
      {(!error)?
    <div className='totaldata'>
      <Mainpage firstLoadData={firstData} />
    </div>:<center><div className='error'>ERROR 404  NOT FOUND</div></center>}

    <Footer />
    </>
  );
}




export default App;
