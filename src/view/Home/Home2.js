import Layout from "../../components/layout/Layout";
import styles from '../../components/elements/styles/containner.module.css';
import elstyles from '../../components/elements/styles/elementstyle.module.css';
import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from 'react-select'
import { useNavigate } from 'react-router-dom';

export default function Home() {

  const [group, setGroup] = useState([]);
  const [product, setProduct] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const options = [];
  const steps = [];
  const [Arrproduct,setArray] = useState([]);
  const [counter, setCounter] = useState(0);
  const navigate = useNavigate();


  group.forEach((value) => {
    options.push({
      value: value.idgroup,
      label: value.groupnam,
    });
  });
  
  const handleTypeSelect = (e) => {
    setSelectedOption(e.value);
    axios.get("http://k2mpg.ddns.net/napapi/api/goodsdetail",{ params: {group:e.value}}).then((response) => {
      setProduct(response.data.data.product);
    });
  };

  function handleCount(event, code){
    Arrproduct.push(code);
    setCounter(Arrproduct.length);
  }

  const handleSubmit = (e) => {



    Arrproduct.forEach((element) => {
      console.log(element);
      axios({ 
        method: 'post',
        url: 'http://k2mpg.ddns.net/napapi/api/card',
        data: {code:element},
        })
        .catch((error) => {
          return error
        })
        .then((response) => {
          console.log(response.data);
        });   

    });

    navigate('/Home2');
  };

  product.map((val, key) => {
    steps.push(<div className={elstyles.searchcontainner2}>
      <div className={elstyles.s3}>
      <b>รหัส</b> : {val.stkcod} <b>หมวด</b> : {val.stkgrp}<br />
      <b>รายการพืช</b> : {val.stkdes}<br />
      </div>
      <div className={elstyles.s4}>
         <input type="text" className={elstyles.textbox} />
         <a href="#">ลบ</a>
      </div>        
      </div>);
  });

  useEffect(() => {
      axios.get("http://k2mpg.ddns.net/napapi/api/goodsitm",{ params: {user:1}}).then((response) => {
        setProduct(response.data.data.product);
      });
  }, []);

  return (<Layout>
    <div className={styles.widgetbox}>
      <div className={styles.widgetcontent}>

        <div className={elstyles.card1}>
          {steps}
        </div>
        <div className={elstyles.card2}>
          <div className={elstyles.searchdetail}>
          <div className={elstyles.s3}>
            <b>จำนวนรายการ</b> :({counter})<br />
          </div>
          <div className={elstyles.s4}>
            <button onClick={handleSubmit} className={elstyles.btn}>ยืนยันการสั่งOrder</button>
           
          </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>);
};
