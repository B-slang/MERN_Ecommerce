import React, { useState, useEffect } from "react"
import { cartEmpty, loadCart } from "./helper/cartHelper";
import { Link } from "react-router-dom";
import { getmeToken, processPayment } from "./helper/paymentbhelper";
import { createOrder } from "./helper/OderHelper";
// import isAutheticated from "../auth/helper"
import { isAutheticated } from "../auth/helper";
import DropIn from "braintree-web-react"



const Paymentb = ({ products, setReload = f => f, reload = undefined }) => {
    
    const [info, setInfo] = useState({
        loading: false,
        success: false,
        ClientToken: null,
        error: ""
})

    const userId = isAutheticated() && isAutheticated().user_id
    const token = isAutheticated() && isAutheticated().token

    


    const getToken = (userId, token) => {
        getmeToken(userId, token).then(info => {
            
            console.log("INFORMATION", info)


            if (info.error) {
                setInfo({ ...info, error: info.error })
            } else {
                const ClientToken = info.ClientToken
                setInfo({ClientToken})
            }
        })
    }

    useEffect(() => {
        getToken(userId, token)
    }, [])



    return (



        <div>
       <h3>test BT</h3>     
        </div>
    )
}


export default Paymentb;
