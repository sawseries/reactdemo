import Layout from "../../components/layout/Layout";

import styles from '../../components/elements/styles/containner.module.css';
import elstyles from '../../components/elements/styles/elementstyle.module.css';
import Table from 'react-bootstrap/Table';

import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from 'react-select'
export default function Home() {

  //const [data, setIsBooked] = useState([]);
  const [group, setGroup] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const options = [
    { value: "0", label: "0" },
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
    { value: "6", label: "6" },
    { value: "7", label: "7" },
    { value: "8", label: "8" },
    { value: "9", label: "9" },
    { value: "10", label: "10" },
    { value: "11", label: "11" },
    { value: "12", label: "12" }
  ];

  const opt = [
    {value: "",label: "Select a company",},
  ];

  const handleTypeSelect = (e) => {
    setSelectedOption(e.value);
  };
  const steps = [];
  for (let i = 1; i <= 20; i++) {
    steps.push(<div className={elstyles.searchdetail}>
      <div className={elstyles.s1}>
      <b>รหัส</b> : 200<br />
      <b>หมวด</b> : 01 สลัด<br />
      <b>รายการพืช</b> : สลัด คอร์สเขียว เบบี้<br />
      <b>CS Adjust</b> : 0 <b>Total</b> : 0 <br />
      </div>
      <div className={elstyles.s2}>
      <a href="#">เพิ่ม</a>
      <a href="#">ลบ</a>
      </div>        
      </div>);
  }

  useEffect(() => {
      //axios.get("http://localhost/tnswms_local/api/asset").then((response) => {
      //setIsBooked(response.data.asset);
      //});


      (async () => {
        const { data } = await axios.get("http://localhost/tnswms_local/api/group");
        //data = response.data.group;
        data.forEach((value) => {
          opt.push({
            value: value.idgroup,
            label: value.groupnam,
          });
        });

        console.log(opt);

      })();
  
      setOptions(opt);

      axios.get("http://localhost/tnswms_local/api/group").then((response) => {
      setGroup(response.data.group);


      });

      /*const opt = [
       {key: "Select a company",value: ""},
      ];

      (async () => {
        const { data } = await axios.get("http://localhost/tnswms_local/api/group");
        data.forEach((value) => {
          opt.push({
            key: value.idgroup,
            value: value.groupnam,
          });
        });
      })();
      setGroup(opt);*/

  }, []);

  return (<Layout>
    <div className={styles.widgetbox}>
      <div className={styles.widgetcontent}>
        
      <Select
        options={options}
        onChange={handleTypeSelect}
        value={options.find(function (option) {
          return option.value === selectedOption;
        })}
        defaultValue={{ label: "8", value: "8" }}
        label="Single select"
      />
  

      <Select className={elstyles.selectctl}
            name="tech"
            options={group.map((group) => ({
              id: group.idgroup,
              title: group.groupnam,
            }))}
            placeholder="Nenhum selecionado"
          />
        <select className={elstyles.selectctl}>
          {group.map((group) => { <option value={group.idgroup}>{group.groupnam}</option>})}
        </select>
       

        <div className={elstyles.searchblock1}>
          {steps}
        </div>
        <div className={elstyles.searchblock2}>
        <div className={elstyles.searchdetail}>
        <div className={elstyles.s1}>
        <b>จำนวนรายการ</b> :(10)<br />
        </div>
        <div className={elstyles.s2}>
          <a href="/Home2" className={elstyles.btn}>จำนวนสั่ง</a>
        </div>
        </div>
        </div>

      </div>
    </div>
  </Layout>);
};
