import {CustomerState} from "../states/customer_state";
import {CustomerMessageDTO} from "../dto/customer_message_dto";
import axios, {AxiosRequestConfig} from "axios";
import {
    customer_message_url,
    customer_order_list_url,
    customer_order_url,
    customer_url,
    order_url
} from "../config/urls";
import {ThunkDispatch} from "redux-thunk";
import {appActions} from "./app_action";
import {CustomerDTO} from "../dto/customer_dto";
import {Gender} from "../models/gender";
import {OrderListState} from "../states/order_state";
import {SET_ORDER_LIST} from "./order_action";

export const SET_CUSTOMER = "set_customer"

interface SetCustomerAction {
    type: typeof SET_CUSTOMER,
    payload: CustomerState
}

export type customerActions = SetCustomerAction;



export const sendCustomerMessage = async (message: CustomerMessageDTO) => {
    const config: AxiosRequestConfig = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    return await axios.post(customer_message_url, JSON.stringify(message), config).then((response) => {
        if (response.status == 200) {
            return 1
        }
        return 0
    }).catch((e) => {
        return 0
    })
}

export const getCustomer = async (dispatch: ThunkDispatch<{}, {}, appActions>, jwt: string) => {
    const config: AxiosRequestConfig = {
        headers: {
            "Authorization": "Bearer " + jwt
        }
    }
    return await axios.get(customer_url, config).then((response) => {
        if (response.status == 200) {
            const customer: CustomerState = response.data
            customer.gender = customer.gender != null ? customer.gender.toString() == Gender[Gender.FEMALE] ? Gender.FEMALE : Gender.MALE : Gender.FEMALE
            dispatch({
                type: SET_CUSTOMER,
                payload: customer
            })
            return 1
        }
        return 0
    }).catch((e) => {
        return 0
    })
}


export const updateCustomer = async (dispatch: ThunkDispatch<{}, {}, appActions>, jwt: string, customerDTO: CustomerDTO) => {
    const config: AxiosRequestConfig = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + jwt
        }
    }
    return await axios.put(customer_url, JSON.stringify(customerDTO), config).then((response) => {
        if (response.status == 200) {
            const customerState: CustomerState = response.data
            dispatch({
                type: SET_CUSTOMER,
                payload: customerState
            })
            return 1
        }
        return 0;
    }).catch((e) => {
        return 0;
    })
}

export const getCustomerOrders = async (dispatch: ThunkDispatch<{}, {}, appActions>, jwt: string) => {
    const config: AxiosRequestConfig = {
        headers: {
            "Authorization": "Bearer " + jwt
        }
    }
    return await axios.get(customer_order_list_url, config).then((response) => {
        if (response.status == 200) {
            const orderListState: OrderListState = {
                orders: response.data
            }
            dispatch({
                type: SET_ORDER_LIST,
                payload: orderListState
            })
            return 1
        }
        return 0;
    }).catch((e) => {
        return 0;
    })

}
