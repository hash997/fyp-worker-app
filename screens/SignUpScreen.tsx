import React, { useRef } from "react";
import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  ScrollViewBase,
} from "react-native";
import { RootStackScreenProps } from "../types/types";
import { Formik } from "formik";
import * as Yup from "yup";
import { AppStyles } from "../AppStyles";
import { API, Auth } from "aws-amplify";
import { createWorker } from "../src/graphql/mutations";
import { WorkerSpeciality } from "../src/API";
import { Picker } from "@react-native-picker/picker";

interface signUpVals {
  firstName: string;
  lastName: string;
  email: string;
  icNo: string;
  phoneNumber: string;
  speciality: WorkerSpeciality;
  hourlyRate: string;
  city: string;
  password: string;
  confirmPassword: string;
}

const signUpInitialState = {
  firstName: "",
  lastName: "",
  email: "",
  icNo: "",
  phoneNumber: "",
  speciality: WorkerSpeciality.HANDYMAN,
  hourlyRate: "",
  city: "",
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
  icNo: Yup.string().required("Required"),
  hourlyRate: Yup.number().required("Required"),
  city: Yup.string().required("Required"),
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
  const [selectedSpeciality, setSelectedSpeciality] =
    useState<WorkerSpeciality>(WorkerSpeciality.HANDYMAN);
  const pickerRef = useRef();
  const [step, setStep] = useState(0);

  const createUserInBD = async (values: signUpVals) => {
    try {
      const createCstmrRes = API.graphql({
        query: createWorker,
        variables: {
          createWorkerInput: {
            fName: values.firstName,
            lName: values.lastName,
            email: values.email,
            phoneNo: values.phoneNumber,
            hourlyRate: values.hourlyRate,
            icNo: values.icNo,
            city: values.city,
            speciality: values.speciality,
          },
        },
      });
      const createWrkrData = await createCstmrRes;

      createCredForWrkr(values, createWrkrData);
    } catch (error) {}
  };

  const createCredForWrkr = async (values: signUpVals, createWrkrData: any) => {
    try {
      const newCstmrToBeSavedOnCognito = {
        username: `${values.firstName}${values.lastName}`,
        password: values.password,
        attributes: {
          email: values.email,
          "custom:userId": createWrkrData?.data?.createWorker?.id,
          "custom:permissions": "Worker_ACCESS",
        },
      };
      const { user } = await Auth.signUp(newCstmrToBeSavedOnCognito);
      // const createCstmrData = await user;
      setAuthRes(user);
      // navigation.navigate("Root");
    } catch (error) {
      // console.log("shit went south creating user", error);
    }
  };

  const submitValidationCode = async (code: string) => {
    try {
      const confrimRes = await Auth.confirmSignUp(authRes?.username, code);
      // console.log("confirmRes", confrimRes);

      navigation.navigate("Root");
    } catch (error) {
      return error;
    }
  };

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={AppStyles.container}>
            {!isConfirmationCode && (
              <Formik
                initialValues={signUpInitialState}
                validationSchema={SignupSchema}
                onSubmit={async (values) => {
                  try {
                    setSubmitting(true);
                    createUserInBD(values);
                    // createCredForWrkr(values);
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
                    {step == 0 && (
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
                            placeholderTextColor={"grey"}
                            onChangeText={handleChange("firstName")}
                            onBlur={handleBlur("firstName")}
                            value={values.firstName}
                            style={AppStyles.txtInput}
                          />
                        </View>
                        <Text style={{ color: "red", width: "100%" }}>
                          {errors.firstName &&
                            touched.firstName &&
                            errors.firstName}
                        </Text>

                        <View
                          style={[
                            AppStyles.txtInputCntr,
                            {
                              borderColor:
                                errors.lastName && touched.lastName
                                  ? "red"
                                  : "#ABC7E3",
                            },
                          ]}
                        >
                          <TextInput
                            placeholder={"Last Name"}
                            placeholderTextColor={"grey"}
                            onChangeText={handleChange("lastName")}
                            onBlur={handleBlur("lastName")}
                            value={values.lastName}
                            style={AppStyles.txtInput}
                          />
                        </View>
                        <Text style={{ color: "red", width: "100%" }}>
                          {errors.lastName &&
                            touched.lastName &&
                            errors.lastName}
                        </Text>

                        <View
                          style={[
                            AppStyles.txtInputCntr,
                            {
                              borderColor:
                                errors.email && touched.email
                                  ? "red"
                                  : "#ABC7E3",
                            },
                          ]}
                        >
                          <TextInput
                            placeholder={"Email"}
                            placeholderTextColor={"grey"}
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
                            placeholderTextColor={"grey"}
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
                                errors.icNo && touched.icNo ? "red" : "#ABC7E3",
                            },
                          ]}
                        >
                          <TextInput
                            placeholder={"IC Number"}
                            placeholderTextColor={"grey"}
                            onChangeText={handleChange("icNo")}
                            onBlur={handleBlur("icNo")}
                            value={values.icNo}
                            style={AppStyles.txtInput}
                          />
                        </View>
                        <Text style={{ color: "red", width: "100%" }}>
                          {errors.icNo && touched.icNo && errors.icNo}
                        </Text>
                        <View
                          style={[
                            AppStyles.txtInputCntr,
                            {
                              borderColor:
                                errors.hourlyRate && touched.hourlyRate
                                  ? "red"
                                  : "#ABC7E3",
                            },
                          ]}
                        >
                          <TextInput
                            placeholder={"Hourly Rate"}
                            placeholderTextColor={"grey"}
                            onChangeText={handleChange("hourlyRate")}
                            onBlur={handleBlur("hourlyRate")}
                            value={values.hourlyRate}
                            style={AppStyles.txtInput}
                            keyboardType={"decimal-pad"}
                          />
                        </View>
                        <Text style={{ color: "red", width: "100%" }}>
                          {errors.hourlyRate &&
                            touched.hourlyRate &&
                            errors.hourlyRate}
                        </Text>

                        <View
                          style={[
                            AppStyles.txtInputCntr,
                            {
                              borderColor:
                                errors.city && touched.city ? "red" : "#ABC7E3",
                            },
                          ]}
                        >
                          <TextInput
                            placeholder={"City"}
                            placeholderTextColor={"grey"}
                            onChangeText={handleChange("city")}
                            onBlur={handleBlur("city")}
                            value={values.city}
                            style={AppStyles.txtInput}
                          />
                        </View>
                        <Text style={{ color: "red", width: "100%" }}>
                          {errors.city && touched.city && errors.city}
                        </Text>
                        <TouchableOpacity
                          onPress={() => setStep(1)}
                          style={AppStyles.btnCntr}
                          disabled={
                            !values.city ||
                            !values.firstName ||
                            !values.lastName ||
                            !values.email ||
                            !values.phoneNumber ||
                            !values.icNo ||
                            !values.hourlyRate
                              ? true
                              : false
                          }
                        >
                          <Text style={AppStyles.btnTxt}>Next</Text>
                        </TouchableOpacity>
                      </>
                    )}
                    {step === 1 && (
                      <>
                        <View
                          style={[
                            AppStyles.txtInputCntr,
                            {
                              borderColor:
                                errors.speciality && touched.speciality
                                  ? "red"
                                  : "#ABC7E3",
                            },
                          ]}
                        >
                          <Picker
                            // ref={pickerRef}

                            numberOfLines={2}
                            mode="dropdown"
                            enabled={false}
                            selectedValue={selectedSpeciality}
                            onValueChange={(itemValue, itemIndex) =>
                              setSelectedSpeciality(itemValue)
                            }
                          >
                            <Picker.Item
                              style={{ height: 20 }}
                              label={WorkerSpeciality.HANDYMAN}
                              value={WorkerSpeciality.HANDYMAN}
                            />
                            <Picker.Item
                              label={WorkerSpeciality.AIRCONSPEC}
                              value={WorkerSpeciality.AIRCONSPEC}
                            />
                            <Picker.Item
                              label={WorkerSpeciality.DRIVER}
                              value={WorkerSpeciality.DRIVER}
                            />
                            <Picker.Item
                              label={WorkerSpeciality.PLUMBER}
                              value={WorkerSpeciality.PLUMBER}
                            />
                          </Picker>
                        </View>
                        <Text style={{ color: "red", width: "100%" }}>
                          {errors.speciality &&
                            touched.speciality &&
                            errors.speciality}
                        </Text>

                        <View
                          style={[
                            AppStyles.txtInputCntr,
                            {
                              borderColor:
                                errors.password && touched.password
                                  ? "red"
                                  : "#ABC7E3",
                            },
                          ]}
                        >
                          <TextInput
                            placeholder={"Password"}
                            onChangeText={handleChange("password")}
                            onBlur={handleBlur("password")}
                            value={values.password}
                            placeholderTextColor={"grey"}
                            secureTextEntry={true}
                            style={AppStyles.txtInput}
                          />
                        </View>
                        <Text style={{ color: "red", width: "100%" }}>
                          {errors.password &&
                            touched.password &&
                            errors.password}
                        </Text>

                        <View
                          style={[
                            AppStyles.txtInputCntr,
                            {
                              borderColor:
                                errors.confirmPassword &&
                                touched.confirmPassword
                                  ? "red"
                                  : "#ABC7E3",
                            },
                          ]}
                        >
                          <TextInput
                            placeholder={"Confirm password "}
                            placeholderTextColor={"grey"}
                            secureTextEntry={true}
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
                        <TouchableOpacity
                          onPress={() => setStep(0)}
                          style={[
                            AppStyles.btnCntr,
                            { backgroundColor: "grey" },
                          ]}
                        >
                          <Text style={AppStyles.btnTxt}>back</Text>
                        </TouchableOpacity>
                      </>
                    )}
                  </>
                )}
              </Formik>
            )}
            {isConfirmationCode && (
              <Formik
                initialValues={{ code: "" }}
                validationSchema={confirmationCode}
                onSubmit={async (values) => {
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
                      <Text style={AppStyles.title}>
                        Enter Confirmation Code{" "}
                      </Text>
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
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
};

export default SignUp;
