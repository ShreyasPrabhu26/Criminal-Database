import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { excerpt } from "../utility";
import 'react-toastify/dist/ReactToastify.css';

const CriminalCards = ({ criminals, user, handleDelete }) => {
    const userId = user?.userId;

    return (
        <div className="criminalCardMainContainer">
            {criminals?.map((item) => (
                <div className="criminalCardContainer" key={item.id}>
                    <div className="criminalCardConatiner Flex-center">
                        <div className="criminalImage Flex-center">
                            <img src={item.imgUrl} alt="" />
                        </div>
                        <div className="criminalName Flex-center">
                            {item.fullName}
                        </div>
                        <div className="criminalCrime Flex-center">
                            <div>Crime </div>
                            <div>{item.crimeCategory}</div>
                        </div>
                        <div className="criminalTime Flex-center">
                            <div>Date</div>
                            {item.timestamp.toDate().toDateString()}
                        </div>
                        <Link to={`/CriminalDetail/${item.id}`}>
                            <div className="criminalReadMoreContainer">
                                <button
                                    className="btnF btn-criminalReadMore Flex-center">
                                    Read More
                                </button>
                            </div>
                        </Link>

                        <div className="CardfooterElements">
                            {(user?.uid === item.userId) && (
                                <Link to={`/updatecriminal/${item.id}`}>
                                    <div className="btn-delete-container">
                                        <button
                                            className="btnF btn-edit"
                                        >
                                            Edit
                                        </button>
                                    </div>
                                </Link>

                            )}
                            {(user?.uid === item.userId) && (
                                <div className="btn-delete-container">
                                    <button
                                        className="btnF btn-delete"
                                        onClick={() => handleDelete(item.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ))
            }
        </div>
    );
};

export default CriminalCards;
