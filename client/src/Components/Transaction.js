import React, { useState,useMemo } from 'react';
import '../App.css';
import {connect} from "react-redux";
import Moment from 'react-moment';
import {deleteTransaction} from "../actions/assets";
import classnames from "classnames";
import {loadUser} from "../actions/auth";
import { withRouter } from 'react-router-dom';

const Transaction = ({ date,amount,price,priceUsd,singleAssetData,_id,deleteTransaction,loadUser}) => {

    const [toggleTransaction, setToggleTransaction] = useState(false);
    const [percentChange, setPercentChange] = useState("");

    const handleToggle = () => {
        setToggleTransaction(!toggleTransaction)
    };

    const calculateUsdPaid = () => {
        return amount * priceUsd;
    };

    const calculateBtcPaid = () => {
        return amount * price;

    };

    const calculateChange = () => {
        if(singleAssetData){
            if(singleAssetData.id === "bitcoin"){
                let priceNow = singleAssetData.market_data.current_price.usd;
                let valueOnPurchasedDay = priceUsd;
                let difference =  priceNow - valueOnPurchasedDay;

                let res = (difference / valueOnPurchasedDay ) * 100;
                setPercentChange(res.toFixed(2))
            }else{
                let priceNow = singleAssetData.market_data.current_price.btc;
                let valueOnPurchasedDay = price;
                let difference =  priceNow - valueOnPurchasedDay;

                let res = (difference / valueOnPurchasedDay ) * 100;
                setPercentChange(res.toFixed(2))
            }
        }
    };

    const checkIfNegative = () => {
        if(percentChange){
            if(percentChange < 0){
                return true
            }
        }
    };

     const handleDeleteTransaction = async () => {
        if(singleAssetData){
            const data = {
                assetId: singleAssetData.id,
                transactionId: _id
            };
            await deleteTransaction(data);
            await loadUser();
        }
    };




    useMemo(() => {
        calculateChange();
    },[singleAssetData]);


    return (
            <div className={classnames("transaction", {
                "transaction--toggled" : toggleTransaction,
                "disable--hover": toggleTransaction
            })}>
                {singleAssetData ?
                <div onClick={handleToggle} className="transaction--content">
                    <p className="transaction--amount"><Moment format="DD.MM.YYYY HH:mm">{date}</Moment></p>
                    <p className="transaction--value">Price: {singleAssetData.id === "bitcoin" ? priceUsd : price}</p>
                    <p className="transaction--change">Amount: {amount}</p>
                </div>
                    : null}
                <div className={classnames("transaction--content--dropdown", {
                    "make--visible" : toggleTransaction
                })}>
                    {singleAssetData ?
                        <div className="transaction--content--dropdown--content">
                            <div onClick={handleToggle} className="transaction--content">

                                <p className={classnames("transaction--amount--paid align-left",{
                                    "makeInvisible": singleAssetData.id === "bitcoin"
                                })}>BTC Paid: {calculateBtcPaid().toFixed(8)}</p>

                                <p className="transaction--amount--paid ">USD
                                    Paid: {calculateUsdPaid().toFixed(2)} $</p>
                                <p className={classnames("transaction--change makeGreen", {
                                    "makeRed": checkIfNegative()
                                })}>{percentChange ? percentChange + " %"
                                    :
                                    "0.00 %"}</p>
                            </div>
                            <div className="transaction--content--dropdown--content--buttons--container">
                                <button onClick={handleDeleteTransaction}
                                        className="delete--transaction--button">Delete
                                </button>
                            </div>
                        </div>
                    :null}
                </div>
            </div>
        );
    };


const mapStateToProps = state => ({
    singleAssetData: state.assets.singleAssetData
});

export default  withRouter(connect(mapStateToProps,{ deleteTransaction,loadUser })(Transaction));
