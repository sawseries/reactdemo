import Layout from "../../components/layout/Layout";

import styles from '../../components/elements/styles/containner.module.css';
import Table from 'react-bootstrap/Table';

import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoOpen,IoTrashSharp,IoAddCircle } from "react-icons/io5";

export default function Home() {

  const [data, setIsBooked] = useState([]);

  useEffect(() => {
      axios.get("http://localhost/tnswms_local/api/asset").then((response) => {
      setIsBooked(response.data.asset);
  });
  }, []);

  return (<Layout>
    <div className={styles.widgetbox}>
      <div className={styles.widgetcontent}>
        <a className={styles.button+' '+styles.blue+' '+styles.width75} href=""><span className={styles.font20}><IoAddCircle/></span> เพิ่ม</a>
              <Table striped bordered hover className={styles.top}>
              <thead>
                  <tr>
                      <th>Code</th>
                      <th>Name</th>
                      <th>Status</th>
                      <th>Keeper</th>
                      <th>Action</th>
                  </tr>
              </thead>
              <tbody>  
                  {data.map((val, key) => {
                      return (
                          <tr key={key}>
                              <td>{val.asset_code}</td>
                              <td>{val.asset_name}</td>
                              <td>{val.status}</td>
                              <td>{val.serial_num}</td>
                              <td>
                              <a className={styles.button+' '+styles.yellow} href=""><IoOpen/></a>
                              <a className={styles.button+' '+styles.red} href=""><IoTrashSharp/></a>
                              </td>
                          </tr>
                      )
                  })}
               </tbody>   
              </Table>
      </div>
    </div>
  </Layout>);
};
