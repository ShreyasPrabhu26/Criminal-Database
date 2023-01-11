import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { excerpt } from "../utility";
import 'react-toastify/dist/ReactToastify.css';

const CriminalCards = ({ criminals, user, handleDelete }) => {
    const userId = user?.userId;

    return (
        <div className="criminalCardMainContainer">
            {criminals?.map((item) => (
                <div className="criminalCardContainer">
                    <div className="criminalCardConatiner Flex-center">
                        <div className="criminalImage Flex-center">
                            <img src={item.imgUrl} alt="" />
                        </div>
                        <div className="criminalName Flex-center">
                            {item.fullName}
                        </div>
                        <div className="criminalCrime Flex-center">
                            <div>Icon</div>
                            <div>{item.crimeCategory}</div>
                        </div>
                        <div className="criminalTime Flex-center">
                            <div>Icon</div>

                            {item.timestamp.toDate().toDateString()}
                        </div>
                        <Link to={`/CriminalDetail/${item.id}`}>
                            <button
                                className="btn-criminalReadMore Flex-center">
                                Read More
                            </button>
                        </Link>

                        {(user?.uid === item.userId) && (
                            <div className="btn-delete-container">
                                <button
                                    className="btn-delete"
                                    onClick={() => handleDelete(item.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            ))
            }
        </div>
    );
};

export default CriminalCards;
