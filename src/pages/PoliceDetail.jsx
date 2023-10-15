import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
    collection,
    doc,
    getDoc,
    getDocs,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { getDownloadURL, ref, listAll, uploadBytesResumable } from "firebase/storage"
import ScrollToTop from '../utility/ScrollToTop';
// import { FaCity } from 'react-icons/fa';
// import { AiOutlineUser } from 'react-icons/ai';
// import { SlCalender } from 'react-icons/sl';
// import { GiBodyHeight } from 'react-icons/gi';
// import { SlPhone } from 'react-icons/sl';
// import { ImAddressBook } from 'react-icons/im';



const PoliceDetail = ({ setActive }) => {

    const { id } = useParams();
    const [police, setPolice] = useState(null);
    const policeDesignation = police?.policeDesignation + ".jpeg";


    useEffect(() => {
        id && getPoliceDetails();
    }, [id])

    const getPoliceDetails = async () => {
        const docRef = doc(db, "polices", id);
        const policeDetails = await getDoc(docRef);
        setPolice(policeDetails.data());
        setActive(null);
    }

    const [imageList, setImageList] = useState([])
    const imageListRef = ref(storage, "Police Designation")

    useEffect(() => {
        listAll(imageListRef).then((response) => {
            response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setImageList((prev) => [...prev, { imageName: [item.name], imageUrl: url }])
                })
            })
        })
    }, [])

    function getImageUrlByName(name) {
        const filteredList = imageList.filter(img =>
            img.imageName &&
            (typeof img.imageName === 'string' ? img.imageName.includes(name) : img.imageName.includes(name))
        )
        if (filteredList.length > 0) {
            console.log("url", filteredList[0].imageUrl)
            return filteredList[0].imageUrl
        } else {
            console.log("error")
            return ''
        }
    }

    return (
        <div>
            {console.log("Criminal", police)}
            <ScrollToTop />
            <div className="DETAIL-criminalDetailContainer">
                <div className="DETAIL-criminalDetailHeader">
                    <div className="DETAIL-criminalNameCard">
                        <div className="DETAIL-crimeTypeContainer officer-header">
                            <span className="DETAIL-crimeType ">OFFICER</span>
                        </div>
                        <div className="DETAIL-criminalImageContainer">
                            <img className="DETAIL-criminalImage" src={police?.imgUrl} alt="image" />
                        </div>
                        <div className="DETAIL-criminalNameContainer officer-name">
                            <span className="DETAIL-criminalName">{police?.fullName}</span>
                        </div>
                    </div>
                    <div className="DETAIL-criminalTypeCard">
                        <div className="">
                            <div className="DETAIL-crimeTypeCategoryCon">
                                <span className="DETAIL-crimeCategory">OFFICER DESIGNATION</span>
                            </div>
                        </div>
                        <div className="DETAIL-crimeTypeImageContainer">
                            <img className="DETAIL-crimeTypeImage" src={getImageUrlByName(policeDesignation)} alt={policeDesignation} />
                        </div>
                        <div className="DETAIL-crimeTypeContainer DETAIL-policeDesignation ">
                            <span className="DETAIL-crimeType">{police?.policeDesignation}</span>
                        </div>
                    </div>

                </div>
                <div className="DETAIL-criminalFullInformationBlue">
                    <div className="DETAIL-criminalFullInformationGrey">
                        <div className="DETAIL-entityInfoGroup">
                            <div className="DETAIL-DetailIcon DETAIL-DetailIconPolice"></div>
                            <div className="DETAIL-entityName">Full NAME</div>
                            <div className="DETAIL-entityValue">{police?.fullName}</div>
                        </div>
                        <div className="DETAIL-entityInfoGroup">
                            <div className="DETAIL-DetailIcon DETAIL-DetailIconPolice"></div>
                            <div className="DETAIL-entityName">CITY</div>
                            <div className="DETAIL-entityValue">{police?.city}</div>
                        </div>
                        <div className="DETAIL-entityInfoGroup">
                            <div className="DETAIL-DetailIcon DETAIL-DetailIconPolice"></div>
                            <div className="DETAIL-entityName">DATE-OF-BIRTH</div>
                            <div className="DETAIL-entityValue">{police?.dob}</div>
                        </div>
                        <div className="DETAIL-entityInfoGroup">
                            <div className="DETAIL-DetailIcon DETAIL-DetailIconPolice"></div>
                            <div className="DETAIL-entityName">HEIGHT</div>
                            <div className="DETAIL-entityValue">{police?.height}</div>
                        </div>
                        <div className="DETAIL-entityInfoGroup">
                            <div className="DETAIL-DetailIcon DETAIL-DetailIconPolice"></div>
                            <div className="DETAIL-entityName">PHONE NO</div>
                            <div className="DETAIL-entityValue">{police?.phone}</div>
                        </div>
                        <div className="DETAIL-entityInfoGroup">
                            <div className="DETAIL-DetailIcon DETAIL-DetailIconPolice"></div>
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