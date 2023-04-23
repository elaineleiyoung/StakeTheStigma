import { getAuth } from "firebase/auth";
import { useState, useEffect } from 'react';
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";

function Insights() {
    //currently logged user
    const [user, setUser] = useState([]);
    //currently logged user's topics
    const [topics, setTopics] = useState([]);
    //total topics amongst all users on the application
    const [totalTopics, setTotalTopics] = useState(0);
    //num of times currently logged user's topics are stored across all users on the application
    const [sameTopic, setSameTopic] = useState(0);
    //total num of users on application
    const [totalUsers, setTotalUsers] = useState(0);
    //total num of topics selected across all users on application
    const [totalNumTopics, setTotalNumTopics] = useState(0);

    useEffect(() => {
        const auth = getAuth();
        const loggedUser = auth.onAuthStateChanged(async (user) => {
        if (user) {
            setUser(user);
            //get currentUser's topics
            const userDocRef = doc(db, "users", user.uid);
            const userDoc = await getDoc(userDocRef);
            setTopics(userDoc.data().topics);
        } else {
            setUser(null);
        }
        });
        return () => loggedUser();
    }, []);

    if (!user) {
        return <div>Loading...</div>;
    }

    //insights

    const getUsers = async () => {
        const userCollectionRef = collection(db, "users");
        const userDocs = await getDocs(userCollectionRef);
        let sameTopicCount = 0
        let numTopics = 0
        let numUsers = 0
        let totalTopicUserCount = 0
        userDocs.docs.forEach((doc) => {
            const tempArr = doc.data().topics;
            numTopics += tempArr.length
            numUsers += 1;
            if (topics.filter(element => tempArr.includes(element)).length > 0) {
                //counts topics that are the same from each document (user)
                sameTopicCount += topics.filter(element => tempArr.includes(element)).length;
                //adds this user to num total users that share common topics
                totalTopicUserCount += 1
            }
        });
        setTotalUsers(numUsers);
        setSameTopic(sameTopicCount);
        setTotalTopics(totalTopicUserCount);
        setTotalNumTopics(numTopics);
    };
/*
    useEffect(() => {
        getUsers();
    }, [topics]); 
*/
    return(
        <section>
            <h1>Hello, {user.email}!</h1>
            <p>{(totalTopics/totalUsers) * 100}% of users share some or all of the same topics as you!</p>
            <p>Your topics make up {(sameTopic/totalNumTopics) * 100}% of all selected topics on this platform!</p>
        </section>
    );
}

export default Insights;