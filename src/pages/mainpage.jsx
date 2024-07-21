/* eslint-disable react/prop-types */
import  { useState} from 'react';
import {Container, Form,Row,Col, FloatingLabel} from 'react-bootstrap';
import Swal from 'sweetalert2'
import axios from 'axios';

import Button from '@mui/material/Button';
import '../../src/pages/mainStyle.css'


const API_KEYE = import.meta.env.VITE_WAPI_EKEYR;

const Mainpage = (props) => {
  

 
  const [cityname, setCityName] = useState("");
  // eslint-disable-next-line react/prop-types
  const [resData, setResData] = useState(props.firstLoadData);


//console.log(resData);
  const searchCity = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${API_KEYE}&q=${cityname}&aqi=yes`);
      setResData(response.data);
     // console.log("hello from ainpage",response.data);
    } catch (e){
      Swal.fire({
        title: 'Error!',
        text: 'Invalid input',
        icon: 'error',
        confirmButtonText: 'close'
      })
    }
  };

  const inputCity = (e) => {
    setCityName(e.target.value);
    
  };

  return (
    <div  className='mt-5 '>
      <Form onSubmit={searchCity} className='p-4'>
      <Container  className='d-flex justify-content-center'>
    
        <Container>
         <FloatingLabel controlId="floatingInput"
        label="City Name" xs={8}>
            <Form.Control type="text" style={{width:'100%'}} onChange={inputCity}/>
          </FloatingLabel>         
      </Container>
          <Button variant="contained"  className=' btn m-2' type='submit'><i className="bi bi-search"></i></Button>
      
      
      </Container>
      </Form>
      <Container >
      <Row >
      <Col className='d-flex justify-content-center'><Condition weatherconditiondata={resData}/></Col>
      </Row>
      <Container className='d-flex justify-content-center'>
      <Row xs={1} md={4} >
        <Col><Location  locationdata={resData}/>  </Col>
        <Col><AirQuality  airqualitydata={resData}/></Col>
        <Col>  <Wind windowdata={resData} /></Col>
        <Col>  <Current currentdata={resData} /></Col>
        
      </Row>
      </Container>
        </Container>  
          
        
         
    </div>
  );
 
}




export const Location= (props) => {
  
  const LocationData =props.locationdata;


  return (
    <div className='location m-3'> 
    <Container className="locationsubcontainer ">
      <center><h5> <i className="bi bi-geo-alt p-2"></i>Location</h5></center>
<Col>
      <p>City: {LocationData.location.name}</p>
      <p>Region: {LocationData.location.region}</p>
      <p>Country: {LocationData.location.country}</p>
     </Col>
     <Col>
      <p>Time Zone:  {LocationData.location.tz_id}</p>
      <p>LocalTime: {LocationData.location.localtime}</p>
    </Col>
    <p></p>
    </Container>
    </div>
  )
}




export const Current = (props) => {

  const  is_day=( s)=>{
    if(s){
      return "Day";
    }else{
      return "Night"
    }
  }
  const currentempdata=props.currentdata;

  return (
    <div className='current m-3'>
      <Container className='currentsubcontainer'>
        <center><h5><i className="bi bi-geo p-2"></i>Current</h5></center>
      <p>Latitude: {currentempdata.location.lat}</p>
      <p>Longtitude: {currentempdata.location.lon}</p>
      <p>Temp in celcius: {currentempdata.current.temp_c}</p>
      <p>Day or Night: {is_day(currentempdata.current.is_day)}</p>
      <p>Tempin fahrenheit: {currentempdata.current.temp_f}</p>
    </Container>
    </div>
  )
}




 export const   AirQuality = (props) => 
 {
  const airquaityprops=props.airqualitydata;
  
  return (
    <div className='airqualitycontainer m-3'>
      <Container>
      <center><h5><i className="bi bi-cloud-haze2 p-2"></i>Air Quality</h5></center>
      <p>Carbon dioxide: {airquaityprops.current.air_quality.co}</p>
      <p>Nitrogen dioxide: {airquaityprops.current.air_quality.no2}</p>
      <p>Ozone:  {airquaityprops.current.air_quality.o3}</p>
      <p>Sulfer dioxide: {airquaityprops.current.air_quality.so2}</p>
     
    </Container>
    </div>
  )
}

export const Condition=(props)=>{

    const conditiondata=props.weatherconditiondata;

  return (

    <div  className='condtitioncontainer mb-5'>
      <h2>{conditiondata.current.condition.text}</h2>
      <img   src={conditiondata.current.condition.icon}  alt='day'/>
    </div>
  )

}



export const Wind = (props) => {

  const winddata=props.windowdata;
  return (
    <div className='winddatacontainer m-3'>
      <Container>
      <center><h5><i className="bi-wind p-2"></i>Wind</h5></center>
      <p>Wind in mph: {winddata.current.wind_mph}</p>
      <p>Wind in kph:{winddata.current.wind_kph}</p>
      <p>Wind degree:{winddata.current.wind_degree}</p>
      <p>Wind direction: {winddata.current.wind_dir}</p>
    </Container>
    </div>
  )
}



export const Footer = () => {
  return (
    <div className='footer'>
          <center>made with &#x2764; by mani balaji(<a href='mailto:manibalaji22003@gmail.com'>manibalaji22003@gmail.com</a>)</center>
    </div>
  )
}


export default Mainpage




















