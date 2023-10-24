import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, onSnapshot, query, getDoc, doc } from "firebase/firestore";
import { db } from "../screens/firebase";

export default function NotesView({ navigation, route }) {
  const [title, changeTitle] = useState("");
  const [desc, changeDesc] = useState("");

  async function load() {
    const index = route.params.id;
    const docRef = doc(db, "notes", index);
    const docSnap = await getDoc(docRef);
    await changeTitle(docSnap.data().title);
    await changeDesc(docSnap.data().body);
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.noteTitle}>{title}</Text>
      <Text style={styles.noteBody}>{desc}</Text>
      <View style={{ flex: 1 }} />
      <Pressable style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Return</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 60,
    padding: 25,
  },
  noteTitle: {
    fontSize: 24,
    fontWeight: "600",
    marginTop: 30,
    marginBottom: 25,
  },
  noteBody: {
    fontSize: 15,
    fontWeight: "400",
  },
  button: {
    backgroundColor: "black",
    borderRadius: 15,
    width: "100%",
    marginBottom: 20,
  },
  buttonText: {
    textAlign: "center",
    fontWeight: "400",
    fontSize: 17,
    padding: 20,
    color: "white",
  },
});
