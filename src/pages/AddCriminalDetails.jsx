import { React, useState, useEffect } from 'react'
import ReactTagInput from '@pathofdev/react-tag-input'
import "@pathofdev/react-tag-input/build/index.css"
import { db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { toast } from "react-toastify";
import {
    addDoc,
    collection,
    getDoc,
    serverTimestamp,
    doc,
    updateDoc,
    onSnapshot
} from "firebase/firestore";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';
import ScrollToTop from '../utility/ScrollToTop'

// EXPERIMEMTAL
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import firebase from 'firebase/compat/app';


// NOTE THAT ONLY SPECIAL POLICE OFFICERS CAN ACCESS THIS PAGE!!!
const AddCriminalDetails = ({ user, setActive }) => {

    const [polices, setPolices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsub = onSnapshot(
            collection(db, "polices"),
            (snapshot) => {
                let list = [];
                snapshot.docs.forEach((doc) => {
                    // list.push({ id: doc.data().userId, name: doc.data().fullName });
                    list.push({ id: doc.id, name: doc.data().fullName });
                })
                setPolices(list);
                setLoading(false);
                setActive("home")
            }, (error) => {
                console.log(`Error:`, error);
            }
        )
        return () => {
            unsub();
        }
    }, [setActive]);

    const initialData = {
        fullName: "",
        tags: [],
        crimeCategory: "",
        // policeDesignation: "",
        nationality: "",
        height: "",
        dob: "",
        mostWanted: "",
        // addrress
        streetAddress: "",
        city: "",
        state: "",
        postalCode: "",
        //end
        phone: "",
    }


    const handleChange = (e) => {
        setForm({ ...formData, [e.target.name]: e.target.value });
        // console.log(formData);
    };

    const handleMostWanted = (e) => {
        setForm({ ...formData, mostWanted: e.target.value });
    };

    const handleTag = (tags) => {
        setForm({ ...formData, tags });

    }

    const onCategoryChange = (e) => {
        setForm({ ...formData, crimeCategory: e.target.value });
    };

    const onPoliceDesignationChange = (e) => {
        setForm({ ...formData, policeDesignation: secondCollection.doc(e.target.value) });
        // setForm({ ...formData, policeDesignation: e.target.value });
        // Reference to the document in the second collection
    };

    const onCategoryNationality = (e) => {
        setForm({ ...formData, nationality: e.target.value });
    }

    const crimeOption = [
        "Antisocial behaviour",
        "Burglary",
        "Childhood abuse",
        "Cybercrime and online fraud",
        "Fraud",
        "Robbery",
        "Terrorism",
    ]

    const [formData, setForm] = useState(initialData);
    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(null);
    const { fullName, tags, mostWanted, crimeCategory, policeDesignation, height, dob, streetAddress, city, state, postalCode, phone } = formData;

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const uploadFile = () => {
            const storageRef = ref(storage, file.name);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log("Upload is " + progress + "% done");
                    setProgress(progress);
                    switch (snapshot.state) {
                        case "paused":
                            // console.log("Upload is paused");
                            break;
                        case "running":
                            // console.log("Upload is running");
                            break;
                        default:
                            break;
                    }
                },
                (error) => {
                    console.log(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
                        toast.info("Image uploaded to Database Successfully");
                        setForm((prev) => ({ ...prev, imgUrl: downloadUrl }));
                    });
                }
            );
        };

        file && uploadFile();
    }, [file]);

    useEffect(() => {
        id && getCriminalDetails();
    }, [id])

    const getCriminalDetails = async () => {
        const docRef = doc(db, "criminals", id);
        const snapshot = await getDoc(docRef);
        if (snapshot.exists()) {
            setForm({ ...snapshot.data() })
        }
        setActive(null);
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (fullName & crimeCategory && height && dob && streetAddress, phone) {
            if (!id) {
                try {
                    // await addDoc(collection(db, "criminals"), {
                    //     ...formData,
                    //     timestamp: serverTimestamp(),
                    //     author: user.displayName,
                    //     userId: user.uid,
                    // });
                    submitFinal(e);
                    toast.success("Criminal Detail Uploaded successfully");
                } catch (err) {
                    toast.error("ERROR");
                    console.log(err);
                }
            } else {
                try {
                    // await updateDoc(doc(db, "criminals", id), {
                    //     ...formData,
                    //     timestamp: serverTimestamp(),
                    //     author: user.displayName,
                    //     userId: user.uid,
                    // });
                    updateFinal();
                    toast.success("Criminal Update is successfull");
                } catch (err) {
                    toast.error("ERROR");
                    console.log(err);
                }
            }
        }
        else {
            toast.error("ERROR");
        }
        navigate("/")
    }

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
    // Add a new document to the first collection with a reference to a document in the second collection

    // FOCUS HERE

    const submitFinal = () => {
        firstCollection.add({
            ...formData,
            timestamp: serverTimestamp(),
            author: user.displayName,
            userId: user.uid,
        });
    }

    const updateFinal = () => {
        firstCollection.doc(id).update({
            ...formData,
            timestamp: serverTimestamp(),
            author: user.displayName,
            userId: user.uid,
        });
    }

    // Retrieve the document in the second collection associated with a document in the first collection

    // ==========APPROACH-I =====================

    // const [secondDoc, setSecondDoc] = useState(null);
    // useEffect(() => {
    //     firstCollection
    //         .doc(id)
    //         .get()
    //         .then((firstDoc) => {
    //             if (firstDoc.exists) {
    //                 const policeDesignation = firstDoc.data()?.policeDesignation;
    //                 if (policeDesignation) {
    //                     policeDesignation.get().then((secondDoc) => {
    //                         if (secondDoc.exists) {
    //                             setSecondDoc(secondDoc.data());
    //                             console.log(secondDoc);
    //                         } else {
    //                             console.log("No such document!");
    //                         }
    //                     });
    //                 } else {
    //                     console.log("No policeDesignation property found in firstDoc data");
    //                 }
    //             } else {
    //                 console.log("No such document!");
    //             }
    //         })
    //         .catch((error) => {
    //             console.log("Error getting document:", error);
    //         });
    // }, [])

    // ==========APPROACH-II =====================

    // const [secoundDoc,setSecondDoc] = useState(null);
    // useEffect(() => {
    //     async function fetchData() {
    //         try {
    //             const firstDoc = await firebase.firestore().collection("criminals").doc(id).get();
    //             console.log(firstDoc.data());
    //             const secondDocRef = firstDoc.data().policeDesignation;
    //             const secondDocData = await secondDocRef.get();
    //             setSecondDoc(secondDocData.data());
    //         } catch (error) {
    //             console.log("Error getting document:", error);
    //         }
    //     }
    //     fetchData();
    // }, [id]);


    // EXPERIMEMTAL END


    return (
        <div className="criminalDataEntryContainer">
            <ScrollToTop />
            <h1 className='headerText'>{id ? "Update Criminal Data" : "Criminal Data Entry"}</h1>
            <div className="criminal-entry-container">
                <form className="form-criminalEntry" onSubmit={handleSubmit}>
                    {/* {FULL-NAME} */}
                    <div>
                        <span className='F-label'>FULL NAME</span>
                        <input
                            type="text"
                            className="form-input form-name"
                            placeholder="FullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {/* Image Upload */}
                    <div className="mb-3">
                        <span className='F-label'>criminal Image</span>

                        <input
                            type="file"
                            className="form-control form-uploadImg"
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                    </div>
                    {/* {MOST WANTED?} */}

                    <div className="mostWanted">
                        <p className="mostWantedTitile">Most Wanted Criminal?</p>
                        <div className="AskMostWantedgroupRadio">
                            <div className="AskMostWantedsub">
                                <input
                                    type="radio"
                                    className="radioButton"
                                    value="yes"
                                    name="radioOption"
                                    checked={mostWanted === "yes"}
                                    onChange={handleMostWanted}
                                />
                                <label htmlFor="radioOption" className="form-check-label">
                                    Yes&nbsp;
                                </label>
                            </div>
                            <div className="AskMostWantedsub">
                                <input
                                    type="radio"
                                    className="radioButton"
                                    value="no"
                                    name="radioOption"
                                    checked={mostWanted === "no"}
                                    onChange={handleMostWanted}
                                />
                                <label htmlFor="radioOption" className="form-check-label">
                                    No&nbsp;
                                </label>
                            </div>
                        </div>
                    </div>
                    {/* {TAGS} */}
                    <div className="form-input form-tagsConatiner">
                        <span className='F-label'>TAGS</span>
                        <ReactTagInput
                            className="form-tags"
                            tags={tags}
                            placeholder="Tags"
                            onChange={handleTag}>
                        </ReactTagInput>
                    </div>
                    {/* {Police Designation} */}
                    <div className="form-category">
                        <span className='F-label'>Police Assigned</span>
                        <select
                            value={formData.policeId}
                            onChange={onPoliceDesignationChange}
                            required
                            className="form-category form-dropDown">
                            <option>Police Assigned</option>
                            {/* CHANGES HERE */}
                            {polices.map((option, index) => (
                                <option
                                    value={option.id || ""}
                                    key={index}>
                                    {option.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    {/* {Crime Category} */}
                    <div className="form-category">
                        <span className='F-label'>Crime Category</span>
                        <select
                            value={formData.crimeCategory}
                            onChange={onCategoryChange}
                            required
                            className="form-category form-dropDown">
                            <option>Crime Category</option>
                            {crimeOption.map((option, index) => (
                                <option
                                    value={option || ""}
                                    key={index}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                    {/* DOB */}
                    <div>
                        <span className='F-label'>DATE OF BIRTH</span>
                        <input
                            type="date"
                            name="dob"
                            value={formData.dob}
                            onChange={handleChange}
                        />
                    </div>

                    {/* HEIGHT */}
                    <div>
                        <span className='F-label'>HEIGHT</span>
                        <input
                            type="number"
                            className="form-input"
                            placeholder="Height"
                            name="height"
                            value={formData.height}
                            onChange={handleChange}
                        />
                    </div>
                    {/* {NATIONALITY} */}
                    <div className='form-dropDown'>
                        <span className='F-label'>NATIONALITY</span>
                        <form action="" onChange={onCategoryNationality}>
                            <select name="country"
                                value={formData.nationality}
                                className="form-category form-dropDown">
                                <option> Select Nationality</option>
                                <option value="">Country...</option>
                                <option value="Afghanistan">Afghanistan</option>
                                <option value="Albania">Albania</option>
                                <option value="DZ">Algeria</option>
                                <option value="AS">American Samoa</option>
                                <option value="AD">Andorra</option>
                                <option value="AG">Angola</option>
                                <option value="AI">Anguilla</option>
                                <option value="AG">Antigua &amp; Barbuda</option>
                                <option value="AR">Argentina</option>
                                <option value="AA">Armenia</option>
                                <option value="AW">Aruba</option>
                                <option value="AU">Australia</option>
                                <option value="AT">Austria</option>
                                <option value="AZ">Azerbaijan</option>
                                <option value="BS">Bahamas</option>
                                <option value="BH">Bahrain</option>
                                <option value="BD">Bangladesh</option>
                                <option value="BB">Barbados</option>
                                <option value="BY">Belarus</option>
                                <option value="BE">Belgium</option>
                                <option value="BZ">Belize</option>
                                <option value="BJ">Benin</option>
                                <option value="BM">Bermuda</option>
                                <option value="BT">Bhutan</option>
                                <option value="BO">Bolivia</option>
                                <option value="BL">Bonaire</option>
                                <option value="BA">Bosnia &amp; Herzegovina</option>
                                <option value="BW">Botswana</option>
                                <option value="BR">Brazil</option>
                                <option value="BC">British Indian Ocean Ter</option>
                                <option value="BN">Brunei</option>
                                <option value="BG">Bulgaria</option>
                                <option value="BF">Burkina Faso</option>
                                <option value="BI">Burundi</option>
                                <option value="KH">Cambodia</option>
                                <option value="CM">Cameroon</option>
                                <option value="CA">Canada</option>
                                <option value="IC">Canary Islands</option>
                                <option value="CV">Cape Verde</option>
                                <option value="KY">Cayman Islands</option>
                                <option value="CF">Central African Republic</option>
                                <option value="TD">Chad</option>
                                <option value="CD">Channel Islands</option>
                                <option value="CL">Chile</option>
                                <option value="CN">China</option>
                                <option value="CI">Christmas Island</option>
                                <option value="CS">Cocos Island</option>
                                <option value="CO">Colombia</option>
                                <option value="CC">Comoros</option>
                                <option value="CG">Congo</option>
                                <option value="CK">Cook Islands</option>
                                <option value="CR">Costa Rica</option>
                                <option value="CT">Cote D'Ivoire</option>
                                <option value="HR">Croatia</option>
                                <option value="CU">Cuba</option>
                                <option value="CB">Curacao</option>
                                <option value="CY">Cyprus</option>
                                <option value="CZ">Czech Republic</option>
                                <option value="DK">Denmark</option>
                                <option value="DJ">Djibouti</option>
                                <option value="DM">Dominica</option>
                                <option value="DO">Dominican Republic</option>
                                <option value="TM">East Timor</option>
                                <option value="EC">Ecuador</option>
                                <option value="EG">Egypt</option>
                                <option value="SV">El Salvador</option>
                                <option value="GQ">Equatorial Guinea</option>
                                <option value="ER">Eritrea</option>
                                <option value="EE">Estonia</option>
                                <option value="ET">Ethiopia</option>
                                <option value="FA">Falkland Islands</option>
                                <option value="FO">Faroe Islands</option>
                                <option value="FJ">Fiji</option>
                                <option value="FI">Finland</option>
                                <option value="FR">France</option>
                                <option value="GF">French Guiana</option>
                                <option value="PF">French Polynesia</option>
                                <option value="FS">French Southern Ter</option>
                                <option value="GA">Gabon</option>
                                <option value="GM">Gambia</option>
                                <option value="GE">Georgia</option>
                                <option value="DE">Germany</option>
                                <option value="GH">Ghana</option>
                                <option value="GI">Gibraltar</option>
                                <option value="GB">Great Britain</option>
                                <option value="GR">Greece</option>
                                <option value="GL">Greenland</option>
                                <option value="GD">Grenada</option>
                                <option value="GP">Guadeloupe</option>
                                <option value="GU">Guam</option>
                                <option value="GT">Guatemala</option>
                                <option value="GN">Guinea</option>
                                <option value="GY">Guyana</option>
                                <option value="HT">Haiti</option>
                                <option value="HW">Hawaii</option>
                                <option value="HN">Honduras</option>
                                <option value="HK">Hong Kong</option>
                                <option value="HU">Hungary</option>
                                <option value="IS">Iceland</option>
                                <option value="IN">India</option>
                                <option value="ID">Indonesia</option>
                                <option value="IA">Iran</option>
                                <option value="IQ">Iraq</option>
                                <option value="IR">Ireland</option>
                                <option value="IM">Isle of Man</option>
                                <option value="IL">Israel</option>
                                <option value="IT">Italy</option>
                                <option value="JM">Jamaica</option>
                                <option value="JP">Japan</option>
                                <option value="JO">Jordan</option>
                                <option value="KZ">Kazakhstan</option>
                                <option value="KE">Kenya</option>
                                <option value="KI">Kiribati</option>
                                <option value="NK">Korea North</option>
                                <option value="KS">Korea South</option>
                                <option value="KW">Kuwait</option>
                                <option value="KG">Kyrgyzstan</option>
                                <option value="LA">Laos</option>
                                <option value="LV">Latvia</option>
                                <option value="LB">Lebanon</option>
                                <option value="LS">Lesotho</option>
                                <option value="LR">Liberia</option>
                                <option value="LY">Libya</option>
                                <option value="LI">Liechtenstein</option>
                                <option value="LT">Lithuania</option>
                                <option value="LU">Luxembourg</option>
                                <option value="MO">Macau</option>
                                <option value="MK">Macedonia</option>
                                <option value="MG">Madagascar</option>
                                <option value="MY">Malaysia</option>
                                <option value="MW">Malawi</option>
                                <option value="MV">Maldives</option>
                                <option value="ML">Mali</option>
                                <option value="MT">Malta</option>
                                <option value="MH">Marshall Islands</option>
                                <option value="MQ">Martinique</option>
                                <option value="MR">Mauritania</option>
                                <option value="MU">Mauritius</option>
                                <option value="ME">Mayotte</option>
                                <option value="MX">Mexico</option>
                                <option value="MI">Midway Islands</option>
                                <option value="MD">Moldova</option>
                                <option value="MC">Monaco</option>
                                <option value="MN">Mongolia</option>
                                <option value="MS">Montserrat</option>
                                <option value="MA">Morocco</option>
                                <option value="MZ">Mozambique</option>
                                <option value="MM">Myanmar</option>
                                <option value="NA">Nambia</option>
                                <option value="NU">Nauru</option>
                                <option value="NP">Nepal</option>
                                <option value="AN">Netherland Antilles</option>
                                <option value="NL">Netherlands (Holland, Europe)</option>
                                <option value="NV">Nevis</option>
                                <option value="NC">New Caledonia</option>
                                <option value="NZ">New Zealand</option>
                                <option value="NI">Nicaragua</option>
                                <option value="NE">Niger</option>
                                <option value="NG">Nigeria</option>
                                <option value="NW">Niue</option>
                                <option value="NF">Norfolk Island</option>
                                <option value="NO">Norway</option>
                                <option value="OM">Oman</option>
                                <option value="PK">Pakistan</option>
                                <option value="PW">Palau Island</option>
                                <option value="PS">Palestine</option>
                                <option value="PA">Panama</option>
                                <option value="PG">Papua New Guinea</option>
                                <option value="PY">Paraguay</option>
                                <option value="PE">Peru</option>
                                <option value="PH">Philippines</option>
                                <option value="PO">Pitcairn Island</option>
                                <option value="PL">Poland</option>
                                <option value="PT">Portugal</option>
                                <option value="PR">Puerto Rico</option>
                                <option value="QA">Qatar</option>
                                <option value="ME">Republic of Montenegro</option>
                                <option value="RS">Republic of Serbia</option>
                                <option value="RE">Reunion</option>
                                <option value="RO">Romania</option>
                                <option value="RU">Russia</option>
                                <option value="RW">Rwanda</option>
                                <option value="NT">St Barthelemy</option>
                                <option value="EU">St Eustatius</option>
                                <option value="HE">St Helena</option>
                                <option value="KN">St Kitts-Nevis</option>
                                <option value="LC">St Lucia</option>
                                <option value="MB">St Maarten</option>
                                <option value="PM">St Pierre &amp; Miquelon</option>
                                <option value="VC">St Vincent &amp; Grenadines</option>
                                <option value="SP">Saipan</option>
                                <option value="SO">Samoa</option>
                                <option value="AS">Samoa American</option>
                                <option value="SM">San Marino</option>
                                <option value="ST">Sao Tome &amp; Principe</option>
                                <option value="SA">Saudi Arabia</option>
                                <option value="SN">Senegal</option>
                                <option value="RS">Serbia</option>
                                <option value="SC">Seychelles</option>
                                <option value="SL">Sierra Leone</option>
                                <option value="SG">Singapore</option>
                                <option value="SK">Slovakia</option>
                                <option value="SI">Slovenia</option>
                                <option value="SB">Solomon Islands</option>
                                <option value="OI">Somalia</option>
                                <option value="ZA">South Africa</option>
                                <option value="ES">Spain</option>
                                <option value="LK">Sri Lanka</option>
                                <option value="SD">Sudan</option>
                                <option value="SR">Suriname</option>
                                <option value="SZ">Swaziland</option>
                                <option value="SE">Sweden</option>
                                <option value="CH">Switzerland</option>
                                <option value="SY">Syria</option>
                                <option value="TA">Tahiti</option>
                                <option value="TW">Taiwan</option>
                                <option value="TJ">Tajikistan</option>
                                <option value="TZ">Tanzania</option>
                                <option value="TH">Thailand</option>
                                <option value="TG">Togo</option>
                                <option value="TK">Tokelau</option>
                                <option value="TO">Tonga</option>
                                <option value="TT">Trinidad &amp; Tobago</option>
                                <option value="TN">Tunisia</option>
                                <option value="TR">Turkey</option>
                                <option value="TU">Turkmenistan</option>
                                <option value="TC">Turks &amp; Caicos Is</option>
                                <option value="TV">Tuvalu</option>
                                <option value="UG">Uganda</option>
                                <option value="UA">Ukraine</option>
                                <option value="AE">United Arab Emirates</option>
                                <option value="GB">United Kingdom</option>
                                <option value="US">United States of America</option>
                                <option value="UY">Uruguay</option>
                                <option value="UZ">Uzbekistan</option>
                                <option value="VU">Vanuatu</option>
                                <option value="VS">Vatican City State</option>
                                <option value="VE">Venezuela</option>
                                <option value="VN">Vietnam</option>
                                <option value="VB">Virgin Islands (Brit)</option>
                                <option value="VA">Virgin Islands (USA)</option>
                                <option value="WK">Wake Island</option>
                                <option value="WF">Wallis &amp; Futana Is</option>
                                <option value="YE">Yemen</option>
                                <option value="ZR">Zaire</option>
                                <option value="ZM">Zambia</option>
                                <option value="ZW">Zimbabwe</option>
                            </select>
                        </form>
                    </div>
                    {/* ADDRESS */}
                    <div className='C-addressConatiner'>
                        <span className='F-label'>ADDRESS</span>
                        <form className='form-address' onChange={handleChange}>
                            <div>
                                <label for="streetAddress">Street Address:</label>
                                <input type="text" id="streetAddress" name="streetAddress" value={formData.streetAddress} />
                            </div>
                            <div>
                                <label for="city">City:</label>
                                <input type="text" id="city" name="city" value={formData.city} />
                            </div>
                            <div>
                                <label for="state">State/Province:</label>
                                <input type="text" id="state" name="state" value={formData.state} />
                            </div>
                            <div>
                                <label for="zip">Zip/Postal Code:</label>
                                <input type="number" id="postalCode" name="postalCode" value={formData.postalCode} />
                            </div>
                        </form>
                    </div>

                    {/* PHONE NUMBER */}
                    <div>
                        <input
                            type="number"
                            className="form-input"
                            placeholder="Phone Number"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </div>
                    {/* SUBMIT BTN */}
                    <div className="col-12 py-3 text-center">
                        <button className="F-btn btn-add" type='submit' disabled={progress !== null && progress < 100}>
                            {id ? "Update" : "Submit"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddCriminalDetails