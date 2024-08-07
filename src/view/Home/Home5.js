import Layout from "../../components/layout/Layout";
import styles from '../../components/elements/styles/containner.module.css';
import elstyles from '../../components/elements/styles/elementstyle.module.css';
import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from 'react-select'
import { useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
export default function Home() {

  const [group, setGroup] = useState([]);
  const [product, setProduct] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const options = [];
  const steps = [];
  const [counter, setCounter] = useState(0);
  const navigate = useNavigate();
  const [myArray, setMyArray] = useState([])
  const [sonum, setSonum] = useState([]);


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



  function clearData(){
    this.setState({
      txtcnt: ''
    })
  }


  async function fetchData() {
    axios.post("http://k2mpg.ddns.net/napapi/api/oesohd").then(function(response) {
      console.log("sonum "+response.data.data.sonum);
        setSonum(response.data.data.sonum);
      }); 
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const {tcnt} = event.target.elements;
    const {tcode} = event.target.elements;
    

    //fetchData();
   
     console.log("sonum L :"+sonum);


  

    for (var i = 0, l = tcnt.length; i < l; i++) {
    
      if(tcnt[i].value!=""){
      var params = {
        code:tcode[i].value,
        cnt:tcnt[i].value,
        sonum:sonum
      }
      tcnt[i].value="";
      axios.post("http://k2mpg.ddns.net/napapi/api/oesoln", params).then(function(response) {
        console.log(response.data);
      });    
      }
    }
   
    //alert("เพิ่มข้อมูลสำเร็จ");
    //<input type="text" id="txtcnt"  onChange={(e) => {handleCount(e, val.stkcod);}} className={elstyles.textbox} />
  };

  product.map((val, key) => {
    steps.push(<div className={elstyles.searchcontainner}>
      <div className={elstyles.s1}>{val.stkdes}<br /></div>
      <div className={elstyles.s2}>
      <input type="text" id="txtcode" value={val.stkcod} className={elstyles.textbox} hidden/>
      <input type="number" id="txtcnt" name="txtcnt"  className={elstyles.textbox} />
      </div>        
      </div>);
  });

  useEffect(() => {
      axios.get("http://k2mpg.ddns.net/napapi/api/group").then((response) => {
        setGroup(response.data.group);
      });

      fetchData();
  }, []);

  return (<Layout>
    <div className={styles.widgetbox}>
      <div className={styles.widgetcontent}>        
      <div className={elstyles.head2}><b>Lotus - จรัญสนิทวงศ์</b></div>
         <form onSubmit={handleSubmit}>
          <div className={elstyles.head1}> 
          <Select options={options}
          onChange={handleTypeSelect}
          value={options.find(function (option) {
          return option.value === selectedOption;
          })}
          defaultValue={{ label: "--ค้นหาจากหมวด--", value: "" }}
          label="Single select" className={elstyles.selectctl}/>
          </div>

        <div className={elstyles.card3}>
        <div className={elstyles.searchheader}>
        <div className={elstyles.s1}><b>รายการพืช</b></div>
        <div className={elstyles.s2}><b>จำนวนสั่ง</b></div>        
        </div>
        </div>
        <div className={elstyles.card1}>
      {steps}
        </div>
        <div className={elstyles.card2}>
          <div className={elstyles.searchdetail}>
          <div className={elstyles.s1}>
            <b>จำนวนรายการ</b> :({counter})<br />
          </div>
          <div className={elstyles.s2}>
            <button type="submit" className={elstyles.btn}>Save</button>
          </div>
          </div>
        </div>
        </form>
      </div>
    </div>
  </Layout>);
};
