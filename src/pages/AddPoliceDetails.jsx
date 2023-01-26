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
} from "firebase/firestore";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';
import ScrollToTop from '../utility/ScrollToTop'


const AddPoliceDetails = ({ user, setActive }) => {

    const initialData = {
        fullName: "",
        tags: [],
        policeDesignation: "",
        height: "",
        dob: "",
        streetAddress: "",
        city: "",
        state: "",
        postalCode: "",
        phone: "",
    }

    const [formData, setForm] = useState(initialData);
    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(null);
    const { fullName, tags, policeDesignation, height, dob, streetAddress, city, state, postalCode, phone } = formData;

    const { id } = useParams();
    const navigate = useNavigate();


    const policeDesignations = [
        "Director General of Police",
        "Police Inspector",
        "Assistant Police Inspector",
        "Police Sub-Inspector ",
        "Assistant Police Sub-Inspector",
        "Head Constable",
        "Police Constable",
    ]

    const handleChange = (e) => {
        setForm({ ...formData, [e.target.name]: e.target.value });
        console.log(formData);
    };


    const onPoliceDesignation = (e) => {
        setForm({ ...formData, policeDesignation: e.target.value });
    };

    const handleTag = (tags) => {
        setForm({ ...formData, tags });

    }

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
        id && getPoliceDetails();
    }, [id])

    const getPoliceDetails = async () => {
        const docRef = doc(db, "polices", id);
        const snapshot = await getDoc(docRef);
        if (snapshot.exists()) {
            setForm({ ...snapshot.data() })
        }
        setActive(null);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (fullName && policeDesignation && height && dob && streetAddress && city && state && postalCode && phone) {
            if (!id) {
                try {
                    await addDoc(collection(db, "polices"), {
                        ...formData,
                        timestamp: serverTimestamp(),
                        author: user.displayName,
                        userId: user.uid,
                    });
                    toast.success("Police Detail Uploaded successfully");
                } catch (err) {
                    toast.error("ERROR IN UPLOADING DATA TO DATABASE");
                    console.log(err);
                }
            } else {
                try {
                    await updateDoc(doc(db, "polices", id), {
                        ...formData,
                        timestamp: serverTimestamp(),
                        author: user.displayName,
                        userId: user.uid,
                    });
                    toast.success("Police Update is successfull");
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

    return (
        <div>
            <ScrollToTop />
            <div className="criminalDataEntryContainer">
                <h1 className='headerText'>{id ? "Update Police Data" : "Police Data Entry"}</h1>
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
                            <span className='F-label'>Officer Image</span>
                            <input
                                type="file"
                                className="form-control form-uploadImg"
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                        </div>

                        {/* {Police Designations}  */}
                        <div className="form-category">
                            <span className='F-label'>Police Designations</span>
                            <select
                                value={formData.policeDesignation}
                                onChange={onPoliceDesignation}
                                required
                                className="form-category form-dropDown">
                                <option>Police Designation</option>
                                {policeDesignations.map((option, index) => (
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
                        {/* PHONE NUMBER */}
                        <div>
                            <span className='F-label'>PHONE NUMBER</span>
                            <input
                                type="number"
                                className="form-input"
                                placeholder="Phone Number"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </div>
                        {/* ADDRESS */}
                        {/* add values attribuite */}
                        <div>
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

                        {/* {TAGS} */}
                        <div className="form-input form-tagsConatiner">
                            <ReactTagInput
                                className="form-tags"
                                tags={tags}
                                placeholder="Tags"
                                onChange={handleTag}>
                            </ReactTagInput>
                        </div>


                        {/* SUBMIT BTN */}
                        <div className="col-12 py-3 text-center">
                            <button className="F-btn btn-add" type='submit' disabled={progress !== null && progress < 100} >
                                {id ? "Update" : "Submit"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddPoliceDetails