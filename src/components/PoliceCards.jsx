import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { excerpt } from "../utility";
import 'react-toastify/dist/ReactToastify.css';
// import { GiPoliceBadge } from 'react-icons/Gi';
// import { SlCalender } from 'react-icons/Sl';


const PoliceCards = ({ polices, user, handleDelete }) => {
    return (
        <div className="criminalCardMainContainer">
            {/* {console.log(polices)} */}
            {polices?.map((item) => (
                <div className="criminalCardContainer" key={item.id}>
                    <div className="criminalCardConatiner policeCardContainer Flex-center">
                        <div className="criminalImage Flex-center">
                            <img src={item.imgUrl} alt="" />
                        </div>
                        <div className="criminalName policeNameConatiner Flex-center">
                            {item.fullName}
                        </div>
                        <div className="criminalCrime policeDesignation Flex-center">
                            <div className="polcieBadge"></div>
                            <div>{item.policeDesignation}</div>
                        </div>
                        <div className="criminalTime Flex-center">
                            <div></div>

                            {item.timestamp.toDate().toDateString()}
                        </div>
                        <Link to={`/PoliceDetail/${item.id}`}>
                            <div className="criminalReadMoreContainer">
                                <button
                                    className="btnF btn-criminalReadMore Flex-center">
                                    Read More
                                </button>
                            </div>
                        </Link>

                        <div className="CardfooterElements">
                            {(user?.uid === item.userId) && (
                                <Link to={`/updatepolice/${item.id}`}>
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
}

export default PoliceCards