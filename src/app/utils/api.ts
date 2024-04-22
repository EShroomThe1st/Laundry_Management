import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { Envs } from './env'
import { CreateLaundry } from '../models/laundry'
import { CreateUser, User } from '../models/user'
import { CreateServiceType } from '../models/service'

const baseURL = Envs.apiLocal

const getAllUser = async () => {
  try {
    NProgress.start()
    const response = await axios.get(`${baseURL}/user/all-accounts`)
    NProgress.done()
    return response.data
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}

const getAllLaundryPack = async () => {
  try {
    NProgress.start()
    const response = await axios.get(`${baseURL}/laundry/all-laundry-packs`)
    NProgress.done()
    return response.data
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}

const getAllServiceType = async () => {
  try {
    NProgress.start()
    const response = await axios.get(`${baseURL}/laundry/all-service-types`)
    NProgress.done()
    return response.data
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}

const getAllService = async (data: object) => {
  try {
    NProgress.start();
    const response = await axios.get(`${baseURL}/laundry/service-type`, data );
    NProgress.done();
    return response.data;
  } catch (error) {
    console.error('Error fetching service data:', error);
    throw error;
  }
};

const createLaundryPack = async (data: CreateLaundry) => {
  try {
    NProgress.start()
    const response = await axios.post(`${baseURL}/laundry/new-laundry-pack`, data)
    NProgress.done()
    return response.data
  } catch (error) {
    console.error('Error creating laundry pack:', error)
    throw error
  }
}

const createNewAccount = async (data: CreateUser) => {
  try {
    NProgress.start()
    const token = localStorage.getItem('token')
    const response = await axios.post(`${baseURL}/user/new-account-admin`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    NProgress.done()
    return response.data
  } catch (error) {
    console.error('Error creating new account:', error)
    throw error
  }
}

const createNewServiceType = async (data: CreateServiceType) => {
  try {
    NProgress.start()
    const response = await axios.post(`${baseURL}/laundry/new-service-type`, data)
    NProgress.done()
    return response.data
  } catch (error) {
    console.error('Error creating new service type:', error)
    throw error
  }
}

const updateAccount = async (data: User) => {
  try {
    NProgress.start()
    const response = await axios.patch(`${baseURL}/user/account`, data)
    NProgress.done()
    return response.data
  } catch (error) {
    console.error('Error updating account:', error)
    throw error
  }
}

const deleteLaundryPack = async (data: Object) => {
  try {
    NProgress.start()
    const response = await axios.delete(`${baseURL}/laundry/laundry-pack`, { data })
    NProgress.done()
    return response.data
  } catch (error) {
    console.error('Error deleting laundry pack:', error)
    throw error
  }
}

const deleteServiceType = async (data: Object) => {
  try {
    NProgress.start()
    const response = await axios.delete(`${baseURL}/laundry/service-type`, { data })
    NProgress.done()
    return response.data
  } catch (error) {
    console.error('Error deleting laundry pack:', error)
    throw error
  }
}

export {
  getAllUser,
  getAllLaundryPack,
  createLaundryPack,
  deleteLaundryPack,
  createNewAccount,
  getAllServiceType,
  createNewServiceType,
  deleteServiceType,
  updateAccount,
  getAllService
}
