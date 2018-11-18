import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Logo } from '../atoms/Logo.js';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';

import api from '../../api';

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItem = ({ title, icon, linkTo, ...rest }) => (
  <Link to={linkTo}>
    <Menu.Item {...rest}>
      <Icon type={icon} theme="outlined" />
      {title}
    </Menu.Item>
  </Link>
);

export class SiderMenu extends Component {
  state = {
    isAdmin: false,
  };

  componentDidMount() {
    this.setState.authorized = true;
    if (localStorage.getItem('token')) {
      api.defaults.headers.common['Authorization'] = localStorage.getItem(
        'token',
      );
      api
        .get('/')
        .then(({ data }) => {
          console.log('login check arrived');
          this.setState(() => ({
            authorized: true,
            isAdmin: localStorage.isAdmin,
          }));
        })
        .catch(e => {
          console.log(e);
          this.setState(() => ({
            authorized: false,
          }));
        });
    } else {
      console.log('nemas token vole');
      this.setState(() => ({
        authorized: false,
      }));
    }
  }
  state = {
    collapsed: false,
    authorized: true,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    if (!this.state.authorized) {
      return <Redirect to="/" />;
    }
    return (
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={broken => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="logoMenu">
          <Logo />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={window.location.pathname.split('/')}
        >
          <MenuItem
            key="home"
            title="User List"
            icon="team"
            linkTo="/home"
            style={this.state.isAdmin ? {} : { display: 'none' }}
          />
          <MenuItem
            key="AddUser"
            title="Add User"
            icon="user-add"
            linkTo="/AddUser"
            style={this.state.isAdmin ? {} : { display: 'none' }}
          />
          <MenuItem
            key="AddTask"
            title="Add task"
            icon="form"
            linkTo="/AddTask"
            style={this.state.isAdmin ? {} : { display: 'none' }}
          />
          <MenuItem
            key="My Tasks"
            title="My Tasks"
            icon="project"
            linkTo="/UserTasks"
          />
          <MenuItem
            key="Settings"
            title="Settings"
            icon="setting"
            linkTo="/Settings"
          />
          <MenuItem
            key="Logout"
            title="Logout"
            icon="logout"
            linkTo="/"
            onClick={() => {
              localStorage.removeItem('token');
            }}
          />
        </Menu>
      </Sider>
    );
  }
}
