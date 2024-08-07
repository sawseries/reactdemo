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
      //axios.post("http://localhost/tnswms_local/api/card",{ params: {code:element}}).then((response) => {
      //console.log(response.data);
      //});

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
    //group.map((group) => { <option value={group.idgroup}>{group.groupnam}</option>})
     //alert("submit");
    //setSelectedOption(e.value);
    //axios.post("http://k2mpg.ddns.net/napapi/api/goodsdetail",{ params: {products:product}}).then((response) => {
     // console.log(response.data.data.product);
      //setProduct(response.data.data.product);
    //});
  };

  product.map((val, key) => {
    steps.push(<div className={elstyles.searchcontainner}>
      <div className={elstyles.s1}>
      <b>รหัส</b> : {val.stkcod}<br />
      <b>หมวด</b> : {val.stkgrp}<br />
      <b>รายการพืช</b> : {val.stkdes}<br />
      <b>CS Adjust</b> : 0 <b>Total</b> : 0 <br />
      </div>
      <div className={elstyles.s2}>
         <button onClick={(e) => {handleCount(e, val.stkcod);}}>เพิ่ม</button>
      </div>        
      </div>);
  });

  useEffect(() => {
      axios.get("http://k2mpg.ddns.net/napapi/api/group").then((response) => {
        setGroup(response.data.group);
      });
  }, []);

  return (<Layout>
    <div className={styles.widgetbox}>
      <div className={styles.widgetcontent}>
        
      <Select options={options}
        onChange={handleTypeSelect}
        value={options.find(function (option) {
          return option.value === selectedOption;
        })}
        defaultValue={{ label: "--ค้นหาจากหมวด--", value: "" }}
        label="Single select" className={elstyles.selectctl}/>


        <div className={elstyles.card1}>
          {steps}
        </div>
        <div className={elstyles.card2}>
          <div className={elstyles.searchdetail}>
          <div className={elstyles.s1}>
            <b>จำนวนรายการ</b> :({counter})<br />
          </div>
          <div className={elstyles.s2}>
            <button onClick={handleSubmit} className={elstyles.btn}>จำนวนสั่ง</button>
          </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>);
};
