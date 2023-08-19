import axios from "axios";
import { IDP_BASE_URL } from './config';

export default axios.create({
    baseURL: IDP_BASE_URL,
    headers: {
        "Content-type": "application/x-www-form-urlencoded"
    }
});