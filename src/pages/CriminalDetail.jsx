import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
  collection,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase";
import ReactCountryFlag from "react-country-flag"

const CriminalDetail = ({ setActive }) => {

  const { id } = useParams();
  const [criminal, setCriminal] = useState(null);

  useEffect(() => {
    id && getCriminalDetails();
  }, [id])

  const getCriminalDetails = async () => {
    const docRef = doc(db, "criminals", id);
    const criminalDetails = await getDoc(docRef);
    setCriminal(criminalDetails.data());
    setActive(null);
  }

  return (
    <div>
      {console.log("Criminal", criminal)}
      <div className="DETAIL-criminalDetailContainer">
        <div className="DETAIL-criminalDetailHeader">
          <div className="DETAIL-criminalNameCard">
            <div className="DETAIL-crimeTypeContainer">
              <span className="DETAIL-crimeType">Criminal</span>
            </div>
            <div className="DETAIL-criminalImageContainer">
              <img className="DETAIL-criminalImage" src={criminal?.imgUrl} alt="image" />
            </div>
            <div className="DETAIL-criminalNameContainer">
              <span className="DETAIL-criminalName">{criminal?.fullName}</span>
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
              <span className="DETAIL-crimeType">{criminal?.crimeCategory}</span>
            </div>
          </div>

        </div>
        <div className="DETAIL-criminalFullInformationBlue">
          <div className="DETAIL-criminalFullInformationGrey">

            <div className="DETAIL-entityInfoGroup">
              <div className="DETAIL-DetailIcon">cc</div>
              <div className="DETAIL-entityName">Full NAME</div>
              <div className="DETAIL-entityValue">{criminal?.fullName}</div>
            </div>

            <div className="DETAIL-entityInfoGroup">
              <div className="DETAIL-DetailIcon">icon</div>
              <div className="DETAIL-entityName">CITY</div>
              <div className="DETAIL-entityValue">{criminal?.city}</div>
            </div>

            <div className="DETAIL-entityInfoGroup">
              <div className="DETAIL-DetailIcon">cc</div>
              <div className="DETAIL-entityName">DATE-OF-BIRTH</div>
              <div className="DETAIL-entityValue">{criminal?.dob}</div>
            </div>

            <div className="DETAIL-entityInfoGroup">
              <div className="DETAIL-DetailIcon">cc</div>
              <div className="DETAIL-entityName">HEIGHT</div>
              <div className="DETAIL-entityValue">{criminal?.height}</div>
            </div>

            <div className="DETAIL-entityInfoGroup">
              <div className="DETAIL-DetailIcon">cc</div>
              <div className="DETAIL-entityName">PHONE NO</div>
              <div className="DETAIL-entityValue">{criminal?.phone}</div>
            </div>

            <div className="DETAIL-entityInfoGroup">
              <div className="DETAIL-DetailIcon">cc</div>
              <div className="DETAIL-entityName">ADDRESS</div>
              <div className="DETAIL-entityValue">{criminal?.streetAddress}</div>
            </div>
            <div className="DETAIL-entityInfoGroup">
              <div className="DETAIL-DetailIcon">
                {<ReactCountryFlag
                  countryCode={criminal?.nationality}
                  svg
                  style={{
                    width: '2em',
                    height: '2em',
                  }}
                  title="US"
                />}</div>
              <div className="DETAIL-entityName">Country</div>
              <div className="DETAIL-entityValue">{criminal?.country}</div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default CriminalDetail