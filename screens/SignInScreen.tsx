import * as React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Button,
} from "react-native";
import { AppStyles } from "../AppStyles";

import { RootStackScreenProps } from "../types";
import { Formik } from "formik";

import * as Yup from "yup";
import Auth from "@aws-amplify/auth";
import { useState } from "react";

const SigninSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(8)
    .required()
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Must Contain One Uppercase, One Lowercase, One Number and one special case Character"
    ),
});

const SignIn = ({ navigation }: RootStackScreenProps<"SignIn">) => {
  const [error, setError] = useState<string | undefined>(undefined);
  return (
    <View style={AppStyles.container}>
      <View style={AppStyles.TitlTxtCntr}>
        <Text style={AppStyles.title}>Sign In</Text>
      </View>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={SigninSchema}
        onSubmit={async (values) => {
          console.log(values);
          try {
            const signInRes = await Auth.signIn({
              username: values.email,
              password: values.password,
            });
            console.log("signInRes =>", signInRes);
          } catch (error) {
            console.log("shit went south signing in =>", error);
            // @ts-ignore
            setError(error?.message);
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
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                placeholder={"Email"}
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
                    errors.password && touched.password ? "red" : "#ABC7E3",
                },
              ]}
            >
              <TextInput
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                placeholder={"Password"}
                secureTextEntry={true}
                style={AppStyles.txtInput}
              />
            </View>
            <Text style={{ color: "red" }}>
              {errors.password && touched.password && errors.password}
            </Text>

            <Text style={{ color: "red", width: "100%" }}>{error}</Text>
            <TouchableOpacity
              onPress={() => handleSubmit()}
              style={AppStyles.btnCntr}
            >
              <Text style={AppStyles.btnTxt}>SignIn</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
      <TouchableOpacity
        onPress={() => navigation.replace("SignUp")}
        style={{ width: "100%", marginTop: 10 }}
      >
        <Text style={AppStyles.linkText}>Sign Up instead?</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignIn;
