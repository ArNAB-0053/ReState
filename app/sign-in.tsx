import {View, Text, ScrollView, Image, TouchableOpacity, Alert} from 'react-native'
import {SafeAreaView} from "react-native-safe-area-context";
import images from "@/constants/images";
import icons from "@/constants/icons";
import {login} from "@/lib/appwrite";
import {useGlobalContext} from "@/lib/global-provider";
import {Redirect} from "expo-router";

const SignIn = () => {
    const {refetch, loading, isLogged} = useGlobalContext()

    if(!loading && isLogged){
        return <Redirect href='/'/>
    }

    const handleSignIn = async () => {
        const res = await login();
        if (res) {
            // console.log("Logged In Successfully!");
            refetch();
        } else {
            Alert.alert("Login failed!");
        }
    }
  return (
    <SafeAreaView className="bg-white h-full">
        <ScrollView contentContainerClassName="h-full">
            <Image source={images.onboarding} resizeMode={"contain"} className="w-full h-4/6" />
            <View className="px-10">
                <Text className="text-base font-rubik text-center uppercase text-black-200">Welcome to ReState</Text>
                <Text className="text-3xl font-rubik-bold py-1 uppercase text-center  text-black-300 mt-3 leading-8">
                    Let's Get Closer to {"\n"}
                        <Text className="text-primary-300">Your Ideal Home</Text>
                </Text>
                <Text className="text-xl font-rubik text-center  text-black-300 mt-10">Login ReState With Google</Text>

                <TouchableOpacity onPress={handleSignIn} className="text-black-300 border mt-4 bg-white h-12 shadow-md shadow-zinc-300 rounded-full px-3 py-3">
                    <View className="flex items-center justify-center w-full h-full gap-x-3 flex-row">
                        <Image
                            source={icons.google}
                            resizeMode="contain"
                            className="w-5 h-5"
                        />
                        <Text className="text-black-300 font-rubik-medium text-lg">
                            Continue with Google
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn