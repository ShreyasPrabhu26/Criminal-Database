import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  limit,
  onSnapshot,
  query,
  orderBy,
  where,
  startAfter,
} from "firebase/firestore";
import { db } from "../firebase";
import ReactCountryFlag from "react-country-flag"
import { storage } from "../firebase";
import { getDownloadURL, ref, listAll, uploadBytesResumable } from "firebase/storage"
import ScrollToTop from '../utility/ScrollToTop';
// import { FaCity } from 'react-icons/fa';
// import { AiOutlineUser } from 'react-icons/ai';
// import { SlCalender } from 'react-icons/sl';
// import { GiBodyHeight } from 'react-icons/gi';
// import { SlPhone } from 'react-icons/sl';
// import { ImAddressBook } from 'react-icons/im';

// POLICE DETAILS IMPORT
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import firebase from 'firebase/compat/app';


const CriminalDetail = ({ setActive }) => {

  const { id } = useParams();
  const [criminal, setCriminal] = useState(null);
  const crimeType = criminal?.crimeCategory + ".jpeg";
  const policeDesignation = criminal?.policeDesignation;

  //========================================================
  // GETTING CRIMINALS DATA WITH TAGS
  // const [criminals, setCriminals] = useState(null);
  // const [tags, setTags] = useState(null);

  // useEffect(() => {
  //   const getCriminalData = async () => {
  //     const blogRef = collection(db, "criminals");
  //     const blogs = await getDocs(blogRef);
  //     setCriminals(blogs.doc.map((doc) => ({ id: doc.id, ...doc.data() })));
  //     let tags = [];
  //     blogs.docs.map((doc) => tags.push(...doc.get("tags")));
  //     let uniqueTags = [...new Set(tags)]
  //     setTags(uniqueTags)
  //   }

  //   getCriminalData()
  // }, [])
  //====================================================


  useEffect(() => {
    id && getCriminalDetails();
  }, [id])

  const getCriminalDetails = async () => {
    const docRef = doc(db, "criminals", id);
    const criminalDetails = await getDoc(docRef);
    setCriminal(criminalDetails.data());
    const imageName = criminal?.crimeCategory
    setActive(null);
  }
  // =================================
  // GETTING THE REFERNCE VALUES HERE
  // EXPERIMEMTAL FOR REFERENCE
  // Initialize Firebase
  const firebaseConfig = {
    apiKey: "AIzaSyAIZjyt4pcb3s6UzKciaB4wnbN8nizk_yA",
    authDomain: "criminaldatabase-59f4c.firebaseapp.com",
    projectId: "criminaldatabase-59f4c",
    storageBucket: "criminaldatabase-59f4c.appspot.com",
    messagingSenderId: "104472593863",
    appId: "1:104472593863:web:1c44fd54ba1424681285e2"
  };
  firebase.initializeApp(firebaseConfig);
  const firestore = firebase.firestore();
  // Reference the first collection
  const firstCollection = firestore.collection("criminals");
  // Reference the second collection
  const secondCollection = firestore.collection("polices");

  // =====================================
  // Add a new document to the first collection with a reference to a document in the second collection

  const [police, setPolice] = useState(null);
  useEffect(() => {
    async function fetchData() {
      try {
        const firstDoc = await firebase.firestore().collection("criminals").doc(id).get();
        console.log(firstDoc.data());
        const secondDocRef = firstDoc.data().policeDesignation;
        const secondDocData = await secondDocRef.get();
        setPolice(secondDocData.data());
      } catch (error) {
        console.log("Error getting document:", error);
      }
    }
    fetchData();
  }, [id]);

  //==========================================================================
  // LATER WORKS

  //TO INCLUDE THE TAGS
  // const [polices, setPolices] = useState([]);
  // useEffect(() => {
  //   const unsub = onSnapshot(
  //     collection(db, "polices"),
  //     (snapshot) => {
  //       let list = [];
  //       snapshot.docs.forEach((doc) => {
  //         list.push({ id: doc.id, ...doc.data() });
  //       })
  //       setPolices(list);
  //     }, (error) => {
  //       console.log(`Error:`, error);
  //     }
  //   )
  //   return () => {
  //     unsub();
  //   }
  // }, [setActive]);
  //==========================================================================


  const [imageList, setImageList] = useState([])
  const imageListRef = ref(storage, "Criminal Category")

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
      return filteredList[0].imageUrl
    } else {
      console.log("error fetching URL")
      return ''
    }
  }

  return (
    <div>
      <ScrollToTop />
      <div className="DETAIL-criminalDetailContainer">
        <div className="DETAIL-criminalDetailHeader">
          <div className="DETAIL-criminalNameCard">
            <div className="DETAIL-crimeTypeContainer DETAIL-crimeTypeCon">
              <span className="DETAIL-crimeType">Criminal</span>
            </div>
            <div className="DETAIL-criminalImageContainer">
              <img className="DETAIL-criminalImage" src={criminal?.imgUrl} alt="image" />
            </div>
            <div className="DETAIL-criminalNameContainer DETAIL-crimeTypeName">
              <span className="DETAIL-criminalName">{criminal?.fullName}</span>
            </div>
          </div>

          <div className="DETAIL-criminalTypeCard">
            <div className="DETAIL-crimeTypeContainer">
              <span className="DETAIL-crimeCategory">Crime Category</span>
            </div>
            <div className="DETAIL-crimeTypeImageContainer">
              <img className='DETAIL-criminalImage' src={getImageUrlByName(crimeType)} alt={criminal?.crimeCategory} />
            </div>
            <div className="DETAIL-crimeTypeContainer">
              <span className="DETAIL-crimeType">{criminal?.crimeCategory}</span>
            </div>
          </div>

          <div className="DETAIL-criminalTypeCard">
            <div className="">
              <div className="DETAIL-crimeTypeCategoryCon">
                <span className="DETAIL-crimeCategory">OFFICER DESIGNATION</span>
              </div>
            </div>
            <div className="DETAIL-crimeTypeImageContainer">
              <img className="DETAIL-crimeTypeImage" src={police?.imgUrl} alt={police?.policeDesignation} />
            </div>
            <div className="DETAIL-crimeTypeContainer DETAIL-policeDesignation ">
              <span className="DETAIL-crimeType">{police?.fullName}</span>
            </div>
          </div>


        </div>
        <div className="DETAIL-criminalFullInformationBlue">
          <div className="DETAIL-criminalFullInformationGrey">

            <div className="DETAIL-entityInfoGroup">
              <div className="DETAIL-DetailIcon">
                {/* <AiOutlineUser /> */}
              </div>
              <div className="DETAIL-entityName">Full NAME</div>
              <div className="DETAIL-entityValue">{criminal?.fullName}</div>
            </div>

            <div className="DETAIL-entityInfoGroup">
              <div className="DETAIL-DetailIcon">

              </div>
              <div className="DETAIL-entityName">CITY</div>
              <div className="DETAIL-entityValue">{criminal?.city}</div>
            </div>

            <div className="DETAIL-entityInfoGroup">
              <div className="DETAIL-DetailIcon"></div>
              <div className="DETAIL-entityName">DATE-OF-BIRTH</div>
              <div className="DETAIL-entityValue">{criminal?.dob}</div>
            </div>

            <div className="DETAIL-entityInfoGroup">
              <div className="DETAIL-DetailIcon"></div>
              <div className="DETAIL-entityName">HEIGHT</div>
              <div className="DETAIL-entityValue">{criminal?.height}</div>
            </div>

            <div className="DETAIL-entityInfoGroup">
              <div className="DETAIL-DetailIcon"></div>
              <div className="DETAIL-entityName">PHONE NO</div>
              <div className="DETAIL-entityValue">{criminal?.phone}</div>
            </div>

            <div className="DETAIL-entityInfoGroup">
              <div className="DETAIL-DetailIcon"></div>
              <div className="DETAIL-entityName">ADDRESS</div>
              <div className="DETAIL-entityValue">{criminal?.streetAddress}</div>
            </div>
            <div className="DETAIL-entityInfoGroup">
              <div className="DETAIL-DetailIcon no-background">
                {<ReactCountryFlag
                  countryCode={criminal?.nationality}
                  svg
                  className='countryFlagIcon'
                  style={{
                    width: '2em',
                    height: '2em',
                  }}
                  title={criminal?.nationality}
                />}</div>
              <div className="DETAIL-entityName">Country</div>
              <div className="DETAIL-entityValue">{criminal?.nationality}</div>
              {/* {RENDER TAGS HERE} */}
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default CriminalDetail