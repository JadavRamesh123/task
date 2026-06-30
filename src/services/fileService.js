import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
  getDoc,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  arrayUnion,
} from "firebase/firestore";

import { db } from "../firebase";

/* -----------------------------
   COLLECTIONS
------------------------------ */
const filesCollection = collection(db, "files");

/* -----------------------------
   CREATE FILE
------------------------------ */
export const createFile = async (fileData) => {
  return await addDoc(filesCollection, {
    ...fileData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
};

/* -----------------------------
   READ ALL FILES
------------------------------ */
export const getFiles = async () => {
  const snapshot = await getDocs(filesCollection);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

/* -----------------------------
   GET SINGLE FILE
------------------------------ */
export const getFile = async (id) => {
  const snapshot = await getDoc(doc(db, "files", id));

  if (!snapshot.exists()) return null;

  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
};

/* -----------------------------
   DELETE FILE
------------------------------ */
export const deleteFile = async (id) => {
  return await deleteDoc(doc(db, "files", id));
};

/* -----------------------------
   SAVE HISTORY (IMPORTANT)
------------------------------ */
export const saveFileHistory = async (fileId, oldData, userId) => {
  try {
    await addDoc(collection(db, "files", fileId, "history"), {
      content: oldData.content || "",
      title: oldData.title || "",
      editedBy: userId,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("History save failed:", error);
  }
};

/* -----------------------------
   UPDATE FILE + HISTORY
------------------------------ */
export const updateFile = async (id, data, userId) => {
  const fileRef = doc(db, "files", id);

  const oldSnap = await getDoc(fileRef);

  if (oldSnap.exists()) {
    await saveFileHistory(id, oldSnap.data(), userId);
  }

  await updateDoc(fileRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
};

/* -----------------------------
   REAL-TIME FILE LIST
------------------------------ */
export const subscribeToFiles = (userId, callback) => {
  const q = query(
    collection(db, "files"),
    where("ownerId", "==", userId)
  );

  return onSnapshot(q, (snapshot) => {
    const files = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    callback(files);
  });
};

/* -----------------------------
   FIND USER BY EMAIL
------------------------------ */
export const findUserByEmail = async (email) => {
  const q = query(
    collection(db, "users"),
    where("email", "==", email)
  );

  const snapshot = await getDocs(q);

  if (snapshot.empty) return null;

  return {
    id: snapshot.docs[0].id,
    ...snapshot.docs[0].data(),
  };
};

/* -----------------------------
   SHARE FILE
------------------------------ */
export const shareFile = async (fileId, userId, role) => {
  const fileRef = doc(db, "files", fileId);

  await updateDoc(fileRef, {
    sharedWith: arrayUnion({
      uid: userId,
      role: role,
    }),
  });
};

/* -----------------------------
   GET SHARED FILES
------------------------------ */
export const getSharedFiles = async (userId) => {
  const snapshot = await getDocs(collection(db, "files"));

  const files = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return files.filter((file) => {
    if (!file.sharedWith) return false;

    return file.sharedWith.some(
      (user) => user.uid === userId
    );
  });
};

/* -----------------------------
   REAL-TIME HISTORY
------------------------------ */
export const subscribeToHistory = (fileId, callback) => {
  return onSnapshot(
    collection(db, "files", fileId, "history"),
    (snapshot) => {
      const history = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      callback(history);
    }
  );
};


export const subscribeToFile = (fileId, callback) => {
  const fileRef = doc(db, "files", fileId);

  return onSnapshot(fileRef, (snapshot) => {
    if (!snapshot.exists()) return;

    callback({
      id: snapshot.id,
      ...snapshot.data(),
    });
  });
};