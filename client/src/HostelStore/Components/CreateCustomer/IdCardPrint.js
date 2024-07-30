import React from "react";
import {
  Document,
  Page,
  View,
  Text,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";
import { getImageUrlPath } from "../../../Constants";
import BarcodeGenerator from "./Barcode";
const styles = StyleSheet.create({
  page: {
    padding: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "90%",
    height: "80%",
    borderWidth: 1,
    borderColor: "#000",
    overflow: "hidden",
    backgroundColor: "#fff",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "106%",
    height: "112%",
    zIndex: -1,
  },
  photoContainer: {
    width: "30%",
    marginRight: 10,
    alignItems: "center",
  },

  detailsContainer: {
    width: "70%",
    flexDirection: "column",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    width: 300,
  },
  logo: {
    width: 90,
    height: 100,
    borderWidth: 2,
    borderColor: "#000",
    top: 43,
    left: -60,
  },
  title: {
    fontSize: 9,
    fontWeight: 900,
    top: -40,
    left: -210,
    backgroundColor: '#343434',
    color: 'white',
    padding: 10,
    textAlign: 'left', 
  },
  details: {
    fontSize: 10,
    marginBottom: 4,
    marginLeft: 70,
    top: -50,
   },
  details1: {
    fontSize: 10,
    marginBottom: 4,
    marginLeft: 70,
    top: -50,
    backgroundColor: "#FF8623",
    color: "black",
    width: 120,
    padding: 3,
    borderRadius: 5,
  },
  label: {
    fontSize: 10,
    fontWeight: "bold",
  },
  qrCode1: {
    width: 40,
    height: 30,
    alignSelf: "left",
    left:-60,
    top:-30

  },
  giftCardText: {
    position: 'absolute',
    bottom:0,
    width: 100,
    right: 10,
    fontSize: 12,
    padding: 5,
    color: 'white'
  },
});

const IdCardPrint = ({ picture, name, dob, phoneNumber, docId }) => (
  <Document>
  <Page orientation="landscape" size="A6" style={styles.page}>
    <View style={styles.card}>
      <Image
        style={styles.backgroundImage}
        src="https://static.vecteezy.com/system/resources/previews/011/200/385/non_2x/modern-simple-clean-professional-business-card-background-vector.jpg"
      />
      <View style={styles.photoContainer}>
        <Image style={styles.photo} src="path/to/photo.png" />
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.header}>
          <Image style={styles.logo} src={getImageUrlPath(picture)} />
          <Text style={styles.title}>SATYAA DIAMONDS & JEWELLERS</Text>
        </View>
        <Text style={styles.details1}>
          <Text style={styles.label1}></Text> {docId}
        </Text>
        <Text style={styles.details}>
          <Text style={styles.label}>NAME :</Text> {name}
        </Text>
        <Text style={styles.details}>
          <Text style={styles.label}>DOB :</Text> {dob}
        </Text>
        <Text style={styles.details}>
          <Text style={styles.label}>PHONE NO :</Text> {phoneNumber}
        </Text>
        <View style={styles.qrCode1}>
          <BarcodeGenerator value={docId} />
        </View>
      </View>
      <Text style={styles.giftCardText}>Customer Card</Text>
    </View>
  </Page>
</Document>
);

export default IdCardPrint;
