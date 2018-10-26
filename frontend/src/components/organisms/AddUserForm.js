import React, { Component } from 'react';
import { Row,Col, Form, Button, notification, Select, DatePicker } from 'antd';
import { InputWithIcon } from '../molecules/Login/InputWithIcon';
import { Formik } from 'formik';
import { Notification } from '../atoms/Notification';
import moment from 'moment';

import api from '../../api';

const FormItem = Form.Item;
const Option = Select.Option

const departments = [{
  value: 'HR',
  label: 'Human Resources',
}, {
  value: 'IT',
  label: 'IT',
}, {
  value: 'Fin',
  label: 'Finance',
}];

export class AddUserForm extends Component {
	state = {
		departments: "",
		dob: "",
	}

	handleSelectChange = (value) => {
		console.log(value);
		this.setState({departments: value}, function () {
			console.log(this.state);
		});
	}

	handleDateChange = (value) => {
		console.log(value);
		this.setState({dob: value}, function () {
			console.log(this.state);
		});
	}

	render() {
	    const initialValues = {
				firstname: '',
				lastname: '',
				email: '',
				phone: '',
				department: '',
				dob: '',
			};
	    return (
	      <Formik
	        initialValues={initialValues}
	        onSubmit={(values, actions) => {
						values.department = this.state.departments;
						values.dob = this.state.dob.format("YYYY-MM-DD");
						console.log(values);
	          api.post('addUser', values)
	            .then(({ data }) => {
								if (data.status) {
									Notification('success', 'User Created', 'User has been created and has received an email with link to complete registration.')
								}else{
									Notification('error', 'Error', 'Error while creating user!')
								}
								console.log(data);
	              actions.setSubmitting(false);
	            })
							.catch(err => console.log('There was an error:' + err))
	        }}
	        render={({
	          values,
	          handleBlur,
	          handleChange,
	          handleSubmit,
	          isSubmitting,
	        }) => (
					<Row type="flex" justify="space-around" align="middle" className="addUser-wrap">
						<Col>
							<h1>Create New User</h1>
						<Form className="addUser-form" onSubmit={handleSubmit}>
							<FormItem label="First Name">
								<InputWithIcon
									iconType="lock" placeholder="Enter user first name" type="text" name="firstname"
									id="firstname" value={values.firstname} onChange={handleChange} onBlur={handleBlur}
								/>
							</FormItem>
							<FormItem label="Last Name">
								<InputWithIcon
									iconType="lock" placeholder="Enter user last name" type="text" name="lastname"
									id="lastname" value={values.lastname} onChange={handleChange} onBlur={handleBlur}
								/>
							</FormItem>
							<FormItem label="Email">
								<InputWithIcon
									iconType="user" placeholder="Enter user email" type="email" name="email"
									id="email" value = {values.email} onChange={handleChange} onBlur={handleBlur}
								/>
							</FormItem>
							<FormItem label="Tel.">
								<InputWithIcon
									iconType="user" placeholder="Enter user phone number" type="tel" name="phone"
									id="phone" value = {values.phone} onChange={handleChange} onBlur={handleBlur}
								/>
							</FormItem>
							<FormItem label="Department">
								<Select
									name="departments"
									id="departments"
									 onChange={this.handleSelectChange}
								>
									<Option value="HR" key="HR">Human Resources</Option>
									<Option value="IT" key="IT">IT</Option>
									<Option value="Fin" key="Fin">Finance</Option>
								</Select>
							</FormItem>
							<FormItem label="Date of Birth">
								<DatePicker
									dropdownClassName = "dob"
									name="dob" id="dob"
									 onChange={this.handleDateChange}
								/>
							</FormItem>
							<FormItem>
								<Button type="primary" htmlType="submit" className="login-form-button" disabled={isSubmitting} loading={isSubmitting}>
									Log-in
								</Button>
							</FormItem>
						</Form>
						</Col>
					</Row>
	        )}
	      />
	    );
	  }
}
