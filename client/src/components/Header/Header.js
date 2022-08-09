import React, { useState } from "react";

import { ProSidebar, Menu, MenuItem, SidebarHeader, SidebarFooter, SidebarContent, } from "react-pro-sidebar";

import { FaList, FaRegHeart } from "react-icons/fa";
import { FiHome, FiLogOut, FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import { RiPencilLine } from "react-icons/ri";
import { BiCog } from "react-icons/bi";
import "react-pro-sidebar/dist/css/styles.css";
import "./Header.css";

import { Button, Container, InputGroup } from 'reactstrap';
import { useTheme } from '../../utils/ThemeContext';
// import ToggleDark from './components/toggleDark';


const Header = () => {
  
  const [menuCollapse, setMenuCollapse] = useState(false)
  const { darkTheme, toggleTheme } = useTheme();
  const menuIconClick = () => {
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  return (
    <>
      <div id="header" className={darkTheme && 'dark-content'}>
        <ProSidebar collapsed={menuCollapse}>
          <SidebarHeader>
          <div className="logotext">
              <p>{menuCollapse ? "Logo" : "Big Logo"}</p>
            </div>
            <div className="closemenu" onClick={menuIconClick}>
              {menuCollapse ? (
                <FiArrowRightCircle/>
              ) : (
                <FiArrowLeftCircle/>
              )}
            </div>
          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="square">
              <MenuItem dataIndex='home' active={true} icon={<FiHome />}>
                Home
              </MenuItem>
              <MenuItem active={true} icon={<FaList />}>Category</MenuItem>
              <MenuItem icon={<FaRegHeart />}>Favourite</MenuItem>
              <MenuItem icon={<RiPencilLine />}>Author</MenuItem>
              <MenuItem icon={<BiCog />}>Settings</MenuItem>
            </Menu>
          </SidebarContent>
          <SidebarFooter>
          <InputGroup>
              <Button
                color="link"
                onClick={toggleTheme}
              >
                <i className={darkTheme ? 'fas fa-sun' : 'fas fa-moon'}></i>
                <span className="d-lg-none d-md-block">Switch mode</span>
              </Button>
        </InputGroup>
            <Menu iconShape="square">
              <MenuItem icon={<FiLogOut />}>Logout</MenuItem>
            </Menu>
          </SidebarFooter>
        </ProSidebar>
      </div>
    </>
  );
};

export default Header;