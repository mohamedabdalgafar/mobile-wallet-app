import React from "react";

import messaging from "@react-native-firebase/messaging"

const FcmToken=async()=>await messaging().getToken()

export default FcmToken