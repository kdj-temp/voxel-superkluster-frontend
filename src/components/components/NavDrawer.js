import React, { useEffect, useState } from "react";
import { Link } from "@reach/router";
import ThemeToggleBtn from "../ThemeToggleBtn";
import { Drawer, Button, Menu, Space } from "antd";
import { MenuOutlined, HomeOutlined, CompassOutlined, BarChartOutlined, DiffOutlined, DeploymentUnitOutlined , WalletOutlined} from '@ant-design/icons';

function NavDrawer({funcs , colormodesettle}) {

  const { SubMenu } = Menu;

  const account = localStorage.getItem('account');

  const [visible, setVisible] = useState(false) ;


  useEffect(()=>{
    // console.log(funcs , colormodesettle , 'testing color mode settile') ;
    // console.log('this is fals' ,funcs.colormodesettle ,'dsfs', funcs.colormodesettle.ColorMode) ;
  },[]) ;

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const menuIconStyle = {
    background: 'transparent', 
    borderColor: 'transparent', 
    marginLeft: '5px',
    boxShadow: 'none',
    color: '#f70dff'
  }

  const primaryBtnStyle = {
    width: '90%',
    padding: '10px 40px', 
    color: 'white', 
    backgroundColor: '#f70dff', 
    border: '1px solid #e5e8eb', 
    borderRadius: '5px',
    margin: '30px 13px'
  }

  return (
    <>
      <Button type="primary" className="top-menu-icon" icon={<MenuOutlined />} onClick={showDrawer} style={menuIconStyle} />
      <Drawer
        placement="right"
        width={250}
        onClose={onClose}
        open={visible}
        bodyStyle={{ padding: "0", fontWeight: "bold", opacity: 2 }}
        extra = {
          <Space>
            {
              colormodesettle.ColorMode ?
              <img src='/img/logo.PNG' alt='superkluster' style={{height:'33px',width:'100%'}}/>
              :<img src='/img/logo2.png' alt='superkluster' style={{height:'33px', width:'100%'}}/>
            }
          </Space>
        }
      >
        <Menu
        style={{ width: 250 }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['explore', 'stats']}
        mode="inline"
        >
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to="/home" onClick={onClose}  >
              Home
            </Link>
          </Menu.Item>
          <SubMenu key="explore" icon={<CompassOutlined />} title="Explore">
            <Menu.Item key="2">
              <Link to="/explore" onClick={onClose} >All NFTs</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/explore-collections" onClick={onClose} >Collections</Link>
            </Menu.Item>
          </SubMenu>
          {/* <SubMenu key="stats" icon={<BarChartOutlined />} title="Stats">
            <Menu.Item key="4">
              <Link to="/activity" onClick={onClose} >Activity</Link>
            </Menu.Item>
            <Menu.Item key="5">
              <Link to="/ranking" onClick={onClose} >Ranking</Link>
            </Menu.Item>
          </SubMenu> */}
          <Menu.Item key="4" icon={<DiffOutlined />}>
            <Link to="/ranking" onClick={onClose} >Ranking</Link>
          </Menu.Item>
          {/* <Menu.Item key="6" icon={<DiffOutlined />}>
            <Link to="/" onClick={onClose}  >
              Resource
            </Link>
          </Menu.Item> */}
          {
            account && 
              <Menu.Item key="7"  icon={<DeploymentUnitOutlined />}>
                <Link to="/create" onClick={onClose}  >
                  Create
                </Link>
              </Menu.Item>
          }
          <Menu.Item key="10"  className="mobileToggle" icon={"Turn  Mode"}>
             {/* <ThemeToggleBtn /> */}
            <ThemeToggleBtn funcs={funcs} colormodesettle={colormodesettle}/>
          </Menu.Item>
        </Menu>
        
        {
          !account &&  
          <div>
            <Link to="/wallet" onClick={onClose}>
              <button style={primaryBtnStyle}>Connect Wallet</button>
            </Link>
          </div>
        }
      </Drawer>
    </>
  );
}

export default NavDrawer;
