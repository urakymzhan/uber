import React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import tw from "tailwind-react-native-classnames";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { setDestination } from "../slices/navSlice";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import NavFavorites from "./NavFavorites";
import { Button, Icon } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";

const NavigateCard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <Text style={tw`text-center py-5 text-xl`}>Good morning Ulan!</Text>
      <View style={tw`border-t border-gray-200 flex-shrink`}>
        <View>
          <GooglePlacesAutocomplete
            placeholder="Where to?"
            styles={toInputBoxStyles}
            query={{
              key: GOOGLE_MAPS_APIKEY,
              language: "en",
            }}
            onPress={(data, details = null) => {
              dispatch(
                setDestination({
                  location: details.geometry.location,
                  description: data.description,
                })
              );
              navigation.navigate("RideOptionsCard");
            }}
            fetchDetails={true}
            minLength={2}
            returnKeyType={"search"}
            enablePoweredByContainer={false}
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={400}
          />
        </View>
        {/* we can implement onPress here */}
        <NavFavorites />
        <View
          style={tw`flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100`}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("RideOptionsCard")}
            style={tw`flex flex-row justify-between bg-black w-24 px-4 py-3 rounded-full`}
          >
            <Icon name="car" type="font-awesome" color="white" size={16} />
            <Text style={tw`text-white text-center`}>Rides</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`flex flex-row justify-between w-24 px-4 py-3 rounded-full`}
          >
            <Icon
              name="fast-food-outline"
              type="ionicon"
              color="black"
              size={16}
            />
            <Text style={tw`text-center`}>Eats</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NavigateCard;

const toInputBoxStyles = StyleSheet.create({
  container: {
    flex: 0,
    backgroundColor: "#fff",
    paddingTop: 20,
    flex: 0,
  },
  textInput: {
    backgroundColor: "#dddddf",
    borderRadius: 0,
    fontSize: 18,
  },
  textInputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
});
