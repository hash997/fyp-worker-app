import { AppStyles } from "../../AppStyles";
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  MaskedViewComponent,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { JobRequest, Offer, OfferStatus } from "../../src/API";
import { createOffer } from "../../src/graphql/mutations";
import { useAuth } from "../../state-store/auth-state";
import { API } from "aws-amplify";
import DateTimePicker, {
  WindowsDatePickerChangeEvent,
} from "@react-native-community/datetimepicker";
import moment from "moment";

const NearbyJobRequest = ({ job }: { job: JobRequest }) => {
  const [offer, setOffer] = useState(0);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const [workerOffer, setWorkerOffer] = useState<Offer | undefined>();
  // prettier-ignore

  const [date, setDate] = useState(
    new Date(
      new Date(
        `${new Date().getFullYear()}/${new Date().getMonth() + 1}/${
          new Date().getDate() + 2
        }`
      ).setHours(10, 0, 0, 0)
    )
  );

  const onChange = (
    event: WindowsDatePickerChangeEvent,
    selectedDate: Date
  ) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  const handleSubmitOffer = async () => {
    if (!job.id) throw new Error("job id is undefined");
    if (!user?.id) throw new Error("user id is undefined");

    setLoading(true);
    const createOfferInput = {
      customerId: job.customerId,
      jobId: job.id,
      price: offer,
      workerId: user.id,
      suggestedTime: date.toISOString(),
      vendorsLocation: user.city,
    };
    try {
      const createOfferRes = await API.graphql({
        query: createOffer,
        variables: {
          createOfferInput: createOfferInput,
        },
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      return;
    }
    if (!job) {
      return;
    }
    if (!job.offers || job.offers.length === 0) {
      return;
    }
    const hasOffer = job.offers.find((ofr) => ofr?.workerId === user.id);
    setWorkerOffer(hasOffer);
  }, [user, job]);

  if (loading) {
    return (
      <View style={AppStyles.container}>
        <Text>Loading ...</Text>
      </View>
    );
  }

  return (
    <View style={AppStyles.container}>
      <View
        style={{
          // height: 200,
          width: "100%",
          borderColor: "#136494",
          borderWidth: 1.4,
          borderRadius: 10,
          padding: 10,
        }}
      >
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            <Text style={{ fontSize: 20, color: "#0C4160", fontWeight: "700" }}>
              {job.title}
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Entypo name="location" size={18} color={"#0C4160"} />

              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 20,
                  color: "#0C4160",
                  fontWeight: "700",
                }}
              >
                {job.city}
              </Text>
            </View>
          </View>
          <Text style={{ color: "#0C4160" }}>{job.description}</Text>
          <Text style={{ marginTop: 10 }}>Customer's preferred Time: </Text>

          {new Date(job.preferedTime).getFullYear() < 2000 ? (
            <Text>Customer would like this job to be done asap.</Text>
          ) : (
            <>
              <Text style={{ marginTop: 5, fontSize: 18 }}>
                {moment(new Date(job.preferedTime)).format(
                  "MMMM Do YYYY, h:mm a"
                )}
              </Text>
            </>
          )}
        </View>

        <View style={{ marginTop: 10 }}>
          <TextInput
            style={{
              width: "100%",
              borderColor: "#136494",
              borderWidth: 1,
              borderRadius: 5,
              padding: 10,
            }}
            keyboardType="numeric"
            value={offer.toString() === "0" ? "" : offer.toString()}
            onChangeText={(text) => setOffer(+text)}
            placeholder="Enter your offer here"
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          <TouchableOpacity
            disabled={!offer}
            style={{
              width: "100%",
              backgroundColor: !workerOffer
                ? "#136494"
                : workerOffer?.status === OfferStatus.SENT
                ? "orange"
                : workerOffer?.status === OfferStatus.ACCEPTED
                ? "green"
                : "#136494",
              padding: 10,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
            }}
            onPress={handleSubmitOffer}
          >
            <Text style={{ color: "white", fontSize: 20 }}>
              {workerOffer ? "Send Another Offer" : "Send Offer"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          <TouchableOpacity
            style={{
              width: "100%",
              backgroundColor: "grey",
              padding: 10,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
            }}
            onPress={() => {}}
          >
            <Text style={{ color: "white", fontSize: 20 }}>Reject</Text>
          </TouchableOpacity>
        </View> */}
      </View>
    </View>
  );
};

export default NearbyJobRequest;
