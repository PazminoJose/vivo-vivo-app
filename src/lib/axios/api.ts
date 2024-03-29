import { AxiosRequestConfig } from "axios";
import axios from "./config/axios.config";

const API = {
  get,
  post,
  put,
  patch,
  del,
  axios
};

export interface RequestParams {
  url: string;
  params?: object;
  data?: object | string;
  headers?: object;
}

function get<T>(params: AxiosRequestConfig): Promise<T> {
  return axios<T>({
    ...params
  }).then((res) => res.data);
}

function post<T>({ method, ...params }: AxiosRequestConfig): Promise<T> {
  return axios<T>({
    method: "POST",
    ...params
  }).then((res) => res.data);
}

function put<T>(params: RequestParams): Promise<T> {
  return axios<T>({
    url: params.url,
    method: "PUT",
    params: params.params,
    data: params.data,
    headers: params.headers
  }).then((res) => res.data);
}

function patch<T>(params: RequestParams): Promise<T> {
  return axios<T>({
    url: params.url,
    method: "PATCH",
    params: params.params,
    data: params.data,
    headers: params.headers
  }).then((res) => res.data);
}

function del<T>(params: RequestParams): Promise<T> {
  return axios<T>({
    url: params.url,
    method: "DELETE",
    params: params.params,
    data: params.data,
    headers: params.headers
  }).then((res) => res.data);
}

export default API;
