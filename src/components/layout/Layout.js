import React, { useState } from "react";
import styles from './../elements/styles/containner.module.css';
import { useNavigate } from 'react-router-dom';

import {
  FiHome,
  FiHelpCircle,
  FiUser,
  FiSettings,
  FiLogOut,
  FiBox,
} from "react-icons/fi";
export default function Layout({ children }) {

  const navigate = useNavigate();

  const isLoggedIn = sessionStorage.getItem('auth');
  let sidebar;
  let btnlogout;

  const logout = () => {
    sessionStorage.clear();
    navigate('/Login');
  };

  if (isLoggedIn) {
      sidebar =<div className={styles.sidebarnav}>   
            <ul>      
              <li><a href="/"><b><FiBox/> ทรัพย์สิน</b></a></li>
              <li><a href="/"><b><FiBox/> ชนิดทรัพย์สิน</b></a></li>
              <li><a href="/"><b><FiBox/> สถานที่เก็บ</b></a></li>
              <li><a href="/"><b><FiBox/> กลุ่มทรัพย์สิน</b></a></li>
            </ul>
            </div>;

      btnlogout = <ul className={styles.right}>
                  <li className={styles.navsettings}><div className={styles.fonticon}><a onClick={logout} ><FiLogOut/><b>Logout</b></a></div></li>
                  </ul> 
   }else{
    sidebar = null;
    btnlogout = null;
  }


  return (    
    <>
    <div className={styles.navbar}>
    <div className={styles.headernav}>
      <div className={styles.nav}>
        <ul className={styles.left}>
          <li className={styles.navsettings}>
            <div className={styles.fonticon}><a href="/Home"><b><FiHome/>ทรัพย์สิน</b></a></div>            
          </li>
          <li className={styles.navsettings}>
            <div className={styles.fonticon}><a href="/"><b>ทรัพย์สิน</b></a></div>
          </li>
        </ul>
        {btnlogout}
      </div>
    </div>
    </div>   
    {sidebar}
  <div className={styles.content}>
      {children}        
  </div>
   </>
  );
}

