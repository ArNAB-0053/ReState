import { Text, View } from "react-native";
import {Link} from "expo-router";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
        <Text className="text-4xl text-blue-950 font-black font-rubik-extrabold"> Welcome to ReState</Text>
        <Link href='/sign-in'>Sign IN</Link>
        <Link href='/explore'>Explore</Link>
        <Link href='/profile'>Profile</Link>
        <Link href='/properties/1'>Property</Link>
    </View>
  );
}
