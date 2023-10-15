import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

function YourComponent() {
    const [secondDoc, setSecondDoc] = useState(null);
    useEffect(() => {
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
        firstCollection.add({
            name: "John Doe",
            secondRef: secondCollection.doc("document1") // Reference to the document in the second collection
        });
        // Update an existing document in the first collection with a reference to a different document in the second collection
        firstCollection.doc("firstDoc").update({
            secondRef: secondCollection.doc("document2")
        });
        // Retrieve the document in the second collection associated with a document in the first collection
        firstCollection.doc("firstDoc").get().then(firstDoc => {
            const secondRef = firstDoc.data().secondRef;
            secondRef.get().then(secondDoc => {
                setSecondDoc(secondDoc.data());
            });      });
    }, []);
    return (
        <div>
            {secondDoc && <p>{secondDoc.name}</p>}
        </div>
    );
}
export default YourComponent
