import { AppStyles } from "../../AppStyles";
import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, TextInput } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { JobRequest, Offer, OfferStatus } from "../../src/API";
import { createOffer, updateJobRequest } from "../../src/graphql/mutations";
import { useAuth } from "../../state-store/auth-state";
import { API } from "aws-amplify";

const NearbyJobRequest = ({ job }: { job: JobRequest }) => {
  const [offer, setOffer] = useState(0);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const [workerOffer, setWorkerOffer] = useState<Offer | undefined>();

  const handleSubmitOffer = async () => {
    if (!job.id) throw new Error("job id is undefined");
    if (!user?.id) throw new Error("user id is undefined");

    setLoading(true);
    const createOfferInput = {
      customerId: job.customerId,
      jobId: job.id,
      price: offer,
      workerId: user.id,
    };
    try {
      const createOfferRes = await API.graphql({
        query: createOffer,
        variables: {
          createOfferInput: createOfferInput,
        },
      });
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      console.log("user is undefined");
      return;
    }
    if (!job) {
      console.log("job is undefined");
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
