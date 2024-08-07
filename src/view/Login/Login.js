import React, { useState } from "react";
import axios from "axios";
import Layout from "../../components/layout/Layout"; 
import styles from '../../components/elements/styles/login.module.css';
import { useNavigate } from 'react-router-dom';


export default function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    checklogin(formData);
  };


  const checklogin = async (data) => {
    //alert(data);
    const headers = {
      'Content-Type': 'application/json',
      //'Authorization': '',
      //'client-id':'default',
      //'X-API-KEY':'d5168cf6-d8e2-4701-9f8f-d51fe287d73a'
      }

      let found = await axios({ 
        method: 'post',
        url: 'http://k2mpg.ddns.net/napapi/api/login',
        data: data,
        headers: headers,
        })
        .catch((error) => {
          return error
        })
        .then((response) => {
          console.log(response.data);
          return response.data;

        });            
        if(found.success==true){
          sessionStorage.setItem('auth', true);  
          navigate('/Home');
        }else{
          navigate('/Login');    
        }
  }

  return (<Layout>
    <div className={styles.widgetbox}>
    <div className={styles.widgetcontent}>   
    <div className={styles.loginpage}>
    <div className={styles.form}>
      <form className={styles.loginform} onSubmit={handleSubmit}>
        <input type="text" name="username" onChange={handleChange} value={formData.username}  placeholder="username" required/>
        <input type="password" name="password" onChange={handleChange} value={formData.password}  placeholder="password" required/>
        <button>login</button>
      </form>
    </div>
    </div>
    </div>
  </div></Layout>);
};

//export default Login;



