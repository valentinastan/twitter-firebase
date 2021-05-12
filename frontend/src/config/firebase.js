import firebase from 'firebase'

var config = {
  apiKey: "AIzaSyCMHmhkmt_Yfm5dy0ncdlKuYuNVe9YTRBI",
  authDomain: "proiect-softbinator.firebaseapp.com",
  databaseURL: "https://proiect-softbinator.firebaseio.com",
  projectId: "proiect-softbinator",
  appId: "1:894252549789:web:299e7dcb18ad3092397674"
};

export const dbCon = firebase.initializeApp(config)
export const dbStore = dbCon.firestore()

