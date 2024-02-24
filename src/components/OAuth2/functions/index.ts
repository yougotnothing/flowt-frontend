import { api } from "../../../api/axiosConfig";

import { NavigateFunction } from "react-router-dom";
import { user } from "../../../stores/toUser.mobx";
import { OAuth } from "../../../stores/toOAuthButtons.mobx";

export const exchangeCodeToJWT = async (type: 'facebook' | 'google', accessToken: string | null, navigate: NavigateFunction) => {
	switch(type) {
		case "facebook":
			try {
				const response = await api.post('/auth/oauth/facebook', {
					accessToken: accessToken
				});

				if(response) {
					const token = response.data.token;
					localStorage.setItem('token', token);
					navigate('/home');
					if(user) {
						user.login();
					}
				}
			}catch(error: any) {
				console.error(error);
			}
			break;
		case "google":
			try {
				const response = await api.post('/auth/oauth/google', {
					authorizationCode: accessToken
				});
				if(response) {
					const token = response.data.token;
					localStorage.setItem('token', token);
					navigate('/home');
					if(token) {
						user.login();
					}
				}
			}catch(error: any) {
				if(error.response.status === 409) {
					OAuth.setOAuthData(error.response.data);
					console.log(OAuth.email);
				}else{
					console.error(error.response.data);
				}
			}
			break;
	}
}