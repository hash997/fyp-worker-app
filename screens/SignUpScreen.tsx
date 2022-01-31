import React from "react";
import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { RootStackScreenProps } from "../types";
import { Formik } from "formik";
import * as Yup from "yup";
import { AppStyles } from "../AppStyles";
import { API, Auth } from "aws-amplify";
import { createCustomer } from "../src/graphql/mutations";

interface signUpVals {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

const signUpInitialState = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  password: "",
  confirmPassword: "",
};

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .max(15, "Must be 15 characters or less")
    .required("Required"),
  lastName: Yup.string()
    .max(20, "Must be 20 characters or less")
    .required("Required"),

  email: Yup.string().email("Invalid email").required("Required"),
  phoneNumber: Yup.string()
    .required()
    .matches(
      /^(\+?6?01)[0-46-9]-*[0-9]{7,8}$/,
      "please Enter valid phone Number"
    ),
  password: Yup.string()
    .min(8)
    .required()
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Must Contain One Uppercase, One Lowercase, One Number and one special case Character"
    ),
  confirmPassword: Yup.string()
    .required("Required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});
const confirmationCode = Yup.object().shape({
  code: Yup.string().required("Required"),
});

const SignUp = ({ navigation }: RootStackScreenProps<"SignUp">) => {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [isConfirmationCode, setIsConfirmationCode] = useState(false);
  const [authRes, setAuthRes] = useState<any>();

  const createUserInBD = async (values: signUpVals) => {
    try {
      const createCstmrRes = API.graphql({
        query: createCustomer,
        variables: {
          createCustomerInput: {
            email: values.email,
            fName: values.firstName,
            lName: values.lastName,
            phoneNo: values.phoneNumber,
            postalZipCode: "",
          },
        },
      });
      const createCstmrData = await createCstmrRes;
      console.log("cstmrData=>", createCstmrData);

      createCredForCstmr(values, createCstmrData);
    } catch (error) {
      console.log("shit went south while getting customer =>", error);
    }
  };

  const createCredForCstmr = async (
    values: signUpVals,
    createCstmrData: any
  ) => {
    try {
      const newCstmrToBeSavedOnCognito = {
        username: `${values.firstName}`,
        password: values.password,
        attributes: {
          email: values.email,
          "custom:userId": createCstmrData?.data?.createCustomer?.id,
          "custom:permissions": "CUSTOMER_ACCESS",
        },
      };
      const { user } = await Auth.signUp(newCstmrToBeSavedOnCognito);
      // const createCstmrData = await user;
      console.log("cstmrData=>", user);
      setAuthRes(user);
    } catch (error) {
      console.log("shit went south while getting customer =>", error);
    }
  };

  const submitValidationCode = async (code: string) => {
    console.log("validationcode ffuc invoked");
    try {
      const confrimRes = await Auth.confirmSignUp(authRes?.username, code);
      console.log("confirmRes =>", confrimRes);
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  return (
    <>
      <View style={AppStyles.container}>
        {!isConfirmationCode && (
          <Formik
            initialValues={signUpInitialState}
            validationSchema={SignupSchema}
            onSubmit={async (values) => {
              try {
                setSubmitting(true);
                createUserInBD(values);
                // createCredForCstmr(values);
                setSubmitting(false);
                setIsConfirmationCode(true);
                setSuccess(true);
              } catch (error) {
                setSubmitting(false);
                setError(true);
              }
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <>
                <View style={AppStyles.TitlTxtCntr}>
                  <Text style={AppStyles.title}>Sign Up </Text>
                </View>
                <View
                  style={[
                    AppStyles.txtInputCntr,
                    {
                      borderColor:
                        errors.firstName && touched.firstName
                          ? "red"
                          : "#ABC7E3",
                    },
                  ]}
                >
                  <TextInput
                    placeholder={"First Name"}
                    onChangeText={handleChange("firstName")}
                    onBlur={handleBlur("firstName")}
                    value={values.firstName}
                    style={AppStyles.txtInput}
                  />
                </View>
                <Text style={{ color: "red", width: "100%" }}>
                  {errors.firstName && touched.firstName && errors.firstName}
                </Text>

                <View
                  style={[
                    AppStyles.txtInputCntr,
                    {
                      borderColor:
                        errors.lastName && touched.lastName ? "red" : "#ABC7E3",
                    },
                  ]}
                >
                  <TextInput
                    placeholder={"Last Name"}
                    onChangeText={handleChange("lastName")}
                    onBlur={handleBlur("lastName")}
                    value={values.lastName}
                    style={AppStyles.txtInput}
                  />
                </View>
                <Text style={{ color: "red", width: "100%" }}>
                  {errors.lastName && touched.lastName && errors.lastName}
                </Text>

                <View
                  style={[
                    AppStyles.txtInputCntr,
                    {
                      borderColor:
                        errors.email && touched.email ? "red" : "#ABC7E3",
                    },
                  ]}
                >
                  <TextInput
                    placeholder={"Email"}
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                    style={AppStyles.txtInput}
                  />
                </View>
                <Text style={{ color: "red", width: "100%" }}>
                  {errors.email && touched.email && errors.email}
                </Text>

                <View
                  style={[
                    AppStyles.txtInputCntr,
                    {
                      borderColor:
                        errors.phoneNumber && touched.phoneNumber
                          ? "red"
                          : "#ABC7E3",
                    },
                  ]}
                >
                  <TextInput
                    placeholder={"Phone Number"}
                    onChangeText={handleChange("phoneNumber")}
                    onBlur={handleBlur("phoneNumber")}
                    value={values.phoneNumber}
                    style={AppStyles.txtInput}
                  />
                </View>
                <Text style={{ color: "red", width: "100%" }}>
                  {errors.phoneNumber &&
                    touched.phoneNumber &&
                    errors.phoneNumber}
                </Text>

                <View
                  style={[
                    AppStyles.txtInputCntr,
                    {
                      borderColor:
                        errors.password && touched.password ? "red" : "#ABC7E3",
                    },
                  ]}
                >
                  <TextInput
                    placeholder={"Password"}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                    style={AppStyles.txtInput}
                  />
                </View>
                <Text style={{ color: "red", width: "100%" }}>
                  {errors.password && touched.password && errors.password}
                </Text>

                <View
                  style={[
                    AppStyles.txtInputCntr,
                    {
                      borderColor:
                        errors.confirmPassword && touched.confirmPassword
                          ? "red"
                          : "#ABC7E3",
                    },
                  ]}
                >
                  <TextInput
                    placeholder={"Confirm password "}
                    onChangeText={handleChange("confirmPassword")}
                    onBlur={handleBlur("confirmPassword")}
                    value={values.confirmPassword}
                    style={AppStyles.txtInput}
                  />
                </View>
                <Text style={{ color: "red", width: "100%" }}>
                  {errors.confirmPassword &&
                    touched.confirmPassword &&
                    errors.confirmPassword}
                </Text>

                <TouchableOpacity
                  onPress={() => handleSubmit()}
                  style={AppStyles.btnCntr}
                >
                  <Text style={AppStyles.btnTxt}>SignUp</Text>
                </TouchableOpacity>
              </>
            )}
          </Formik>
        )}
        {isConfirmationCode && (
          <Formik
            initialValues={{ code: "" }}
            validationSchema={confirmationCode}
            onSubmit={async (values) => {
              console.log("onSubmitFunc Invoked");
              try {
                setSubmitting(true);

                submitValidationCode(values.code);
                // setSubmitting(false);
                setSuccess(true);
              } catch (error) {
                setSubmitting(false);
                setError(true);
              }
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <>
                <View style={AppStyles.TitlTxtCntr}>
                  <Text style={AppStyles.title}>Enter Confirmation Code </Text>
                </View>
                <View
                  style={[
                    AppStyles.txtInputCntr,
                    {
                      borderColor:
                        errors.code && touched.code ? "red" : "#ABC7E3",
                    },
                  ]}
                >
                  <TextInput
                    placeholder={"Confirmation code"}
                    onChangeText={handleChange("code")}
                    onBlur={handleBlur("code")}
                    value={values.code}
                    style={AppStyles.txtInput}
                  />
                </View>
                <Text style={{ color: "red", width: "100%" }}>
                  {errors.code && touched.code && errors.code}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    console.log("onpress invoked");
                    handleSubmit();
                  }}
                  style={AppStyles.btnCntr}
                >
                  <Text style={AppStyles.btnTxt}>Confrim Code</Text>
                </TouchableOpacity>
              </>
            )}
          </Formik>
        )}
        <View style={AppStyles.signInBtnCntr}>
          <TouchableOpacity onPress={() => navigation.replace("SignIn")}>
            <Text style={AppStyles.linkText}>SignIn instead</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default SignUp;
