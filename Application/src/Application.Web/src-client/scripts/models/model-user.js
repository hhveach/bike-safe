import Backbone from 'backbone'
import $ from 'jquery'

export const UserModel = Backbone.Model.extend({
	initialize: () => {},
	
	urlRoot: '/api/accounts',
	idAttribute: 'id'
});

UserModel.logIn =  (username, password) => {
	if(typeof username !== 'string' || typeof password !== 'string'  ){ 
		throw new Error(`UserModel.login() must receive string 2 string paramaters for username and password`); 
	};

	return $.ajax({
		method: 'POST',
		data: JSON.stringify({ email: username, password: password}),
		headers: {
			'Content-Type': 'application/json'
		},
		url: '/api/accounts/login'
	});
};

UserModel.register =  (dataObj) => {
	if(typeof dataObj !== 'object' ){ 
		throw new Error(`UserModel.register() must receive an object`);
	};
	if(typeof dataObj.email === 'undefined' || typeof dataObj.password === 'undefined'  ){ 
		throw new Error(`UserModel.register() must receive an object w/ username + password`);
	};

	return $.ajax({
		method: 'POST',
		data: JSON.stringify(dataObj),
		headers: {
			'Content-Type': 'application/json'
		},
		url: '/api/accounts/register'
	});
};

UserModel.getCurrentUser = () => {
	return $.ajax({
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		},
		url: '/api/accounts'
	});
};

UserModel.logOut =  () => {
	return $.ajax({
		method: 'POST',
		url: '/api/accounts/logout'
	});
};
