import { StyleSheet } from "react-native";

export const AppStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  TitlTxtCntr: {
    width: "100%",
    padding: 20,
    paddingLeft: 0,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#0C4160",
  },
  btnCntr: {
    marginTop: 15,
    marginBottom: 10,
    width: "100%",
    // height: 50,
    backgroundColor: "#0C4160",
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    // padding: 40,
  },
  btnTxt: {
    fontSize: 25,
    color: "white",
    fontWeight: "700",
  },
  txtInputCntr: {
    width: "100%",
    margin: 2,
    borderWidth: 1,
    borderColor: "#ABC7E3",
    // padding: 20,
    borderRadius: 10,
  },
  txtInput: {
    textAlignVertical: "center",
    padding: 15,
  },
  signInBtnCntr: {
    width: "100%",
    display: "flex",
    alignItems: "flex-end",
    marginTop: 10,
  },
  linkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
});
