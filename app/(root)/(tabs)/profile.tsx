import {View, Text, ScrollView, Image, TouchableOpacity, ImageSourcePropType, Alert} from 'react-native'
import React from 'react'
import {useLocalSearchParams} from "expo-router";
import {SafeAreaView} from "react-native-safe-area-context";
import icons from "@/constants/icons";
import images from "@/constants/images";
import {settings} from "@/constants/data";
import {useGlobalContext} from "@/lib/global-provider";
import {logout} from "@/lib/appwrite";

interface SettingsItemsProps {
    icon: ImageSourcePropType;
    title: string;
    onPress?: () => void;
    textStyle?: string;
    showArrow?: boolean;
}

const SettingsItems = ({
    icon,
    title,
    onPress,
    textStyle,
    showArrow = true
}: SettingsItemsProps) => (
    <TouchableOpacity onPress={onPress} className="flex flex-row items-center justify-between py-3">
        <View className="flex items-center gap-x-3 flex-row">
            <Image source={icon} className="size-6" />
            <Text className={`text-lg font-rubik-medium text-black-300 ${textStyle}`}>{title}</Text>
        </View>

        {showArrow && (<Image source={icons.rightArrow} className="size-5" />)}
    </TouchableOpacity>
)

const Profile = () => {
    const { user, refetch } = useGlobalContext()

    const handleLogout = async () => {
        const res = await logout()
        if (res) {
            Alert.alert("Success", "Your account has been logged out.");
            refetch()
        } else {
            Alert.alert("Failed to logout");
        }
    }
    return (
        <SafeAreaView className="h-full bg-white">
            <ScrollView
                contentContainerClassName="pb-32 px-7"
                showsVerticalScrollIndicator={false}
            >
                <View className="flex items-center justify-between flex-row">
                    <Text className="text-xl font-rubik-bold">Profile</Text>
                    <Image source={icons.bell} className="size-5" />
                </View>

                <View className="flex flex-col items-center justify-center mt-5">
                    <View className="flex items-center justify-center flex-col  relative mt-5 ">
                        <Image source={{uri: user?.avatar}} className="size-44 relative rounded-full" />

                        <TouchableOpacity className="absolute bottom-1 right-1 ">
                            <Image source={icons.edit} className="size-9" />
                        </TouchableOpacity>

                    </View>
                    <Text className="text-2xl font-rubik-bold mt-2">{user?.name}</Text>
                </View>

                <View className="flex flex-col mt-10">
                    <SettingsItems icon={icons.calendar} title="My Bookings" />
                    <SettingsItems icon={icons.wallet} title="Payments" />
                </View>

                <View className="mt-5 border-primary-200 border-t pt-5 flex flex-col">
                    {settings.slice(2).map((item, i) => (
                        <SettingsItems key={i} {...item} />
                    ))}
                </View>

                <View className="mt-5 border-primary-200 border-t pt-5 flex flex-col">
                    <SettingsItems
                        icon={icons.logout}
                        title="Logout"
                        onPress={handleLogout}
                        textStyle="text-danger"
                        showArrow={false}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default Profile
