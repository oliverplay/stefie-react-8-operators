import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = ``;
  },
};

// Action creator for user registration
export const registerUser = createAsyncThunk(
  'user/signup',
  async (credentials, thunkAPI) => {
    try {
      // Send a POST request to register the user with the provided credentials
      const response = await axios.post('/users/signup', credentials);
      // Set the token received from the server
      token.set(response.data.token);
      // Return the user data received from the server
      return response.data;
      // Notify success
    } catch (err) {
      // If there is an error during registration, log the error and reject the action with the error value
      console.log(err);
      return thunkAPI.rejectWithValue(err);
      // Notify failure
    }
  }
);

// Action creator for user login
export const loginUser = createAsyncThunk(
  'user/login',
  async (credentials, thunkAPI) => {
    try {
      // Send a POST request to log in the user with the provided credentials
      const response = await axios.post('/users/login', credentials);
      // Set the token received from the server
      token.set(response.data.token);
      // Return the user data received from the server
      return response.data;
      // Notify success 
    } catch (err) {
      // If there is an error during login, log the error and reject the action with the error value
      console.log(err);
      return thunkAPI.rejectWithValue(err);
      // Notify failure 
    }
  }
);

// Action creator for user logout
export const logOutUser = createAsyncThunk(
  'user/logout',
  async (_, thunkAPI) => {
    try {
      // Send a POST request to log out the user
      await axios.post('/users/logout');
      // Unset the token since the user is logging out
      token.unset();
      // Notify success
    } catch (err) {
      // If there is an error during logout, log the error and reject the action with the error value
      console.log(err);
      return thunkAPI.rejectWithValue(err);
      // Notify failure
    }
  }
);
