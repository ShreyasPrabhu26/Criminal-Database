import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
    collection,
    doc,
    getDoc,
    getDocs,
} from "firebase/firestore";
import { db } from "../firebase";

const PoliceDetail = ({ setActive }) => {

    const { id } = useParams();
    const [police, setPolice] = useState(null);

    useEffect(() => {
        id && getPoliceDetails();
    }, [id])

    const getPoliceDetails = async () => {
        const docRef = doc(db, "polices", id);
        const policeDetails = await getDoc(docRef);
        setPolice(policeDetails.data());
        setActive(null);
    }
    return (
        <div>
            {console.log("Criminal", police)}
            <div className="DETAIL-criminalDetailContainer">
                <div className="DETAIL-criminalDetailHeader">
                    <div className="DETAIL-criminalNameCard">
                        <div className="DETAIL-crimeTypeContainer">
                            <span className="DETAIL-crimeType">Criminal</span>
                        </div>
                        <div className="DETAIL-criminalImageContainer">
                            <img className="DETAIL-criminalImage" src={police?.imgUrl} alt="image" />
                        </div>
                        <div className="DETAIL-criminalNameContainer">
                            <span className="DETAIL-criminalName">{police?.fullName}</span>
                        </div>
                    </div>

                    <div className="DETAIL-criminalTypeCard">
                        <div className="DETAIL-crimeTypeContainer">
                            <span className="DETAIL-crimeCategory">Crime Category</span>
                        </div>
                        <div className="DETAIL-crimeTypeImageContainer">
                            <img className="DETAIL-crimeTypeImage" src="" alt="image" />
                        </div>
                        <div className="DETAIL-crimeTypeContainer">
                            <span className="DETAIL-crimeType">{police?.crimeCategory}</span>
                        </div>
                    </div>

                </div>
                <div className="DETAIL-criminalFullInformationBlue">
                    <div className="DETAIL-criminalFullInformationGrey">

                        <div className="DETAIL-entityInfoGroup">
                            <div className="DETAIL-DetailIcon">cc</div>
                            <div className="DETAIL-entityName">Full NAME</div>
                            <div className="DETAIL-entityValue">{police?.fullName}</div>
                        </div>

                        <div className="DETAIL-entityInfoGroup">
                            <div className="DETAIL-DetailIcon">icon</div>
                            <div className="DETAIL-entityName">CITY</div>
                            <div className="DETAIL-entityValue">{police?.city}</div>
                        </div>

                        <div className="DETAIL-entityInfoGroup">
                            <div className="DETAIL-DetailIcon">cc</div>
                            <div className="DETAIL-entityName">DATE-OF-BIRTH</div>
                            <div className="DETAIL-entityValue">{police?.dob}</div>
                        </div>

                        <div className="DETAIL-entityInfoGroup">
                            <div className="DETAIL-DetailIcon">cc</div>
                            <div className="DETAIL-entityName">HEIGHT</div>
                            <div className="DETAIL-entityValue">{police?.height}</div>
                        </div>

                        <div className="DETAIL-entityInfoGroup">
                            <div className="DETAIL-DetailIcon">cc</div>
                            <div className="DETAIL-entityName">PHONE NO</div>
                            <div className="DETAIL-entityValue">{police?.phone}</div>
                        </div>

                        <div className="DETAIL-entityInfoGroup">
                            <div className="DETAIL-DetailIcon">cc</div>
                            <div className="DETAIL-entityName">ADDRESS</div>
                            <div className="DETAIL-entityValue">{police?.streetAddress}</div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default PoliceDetail