import {View, Text, TouchableOpacity, Image} from 'react-native'
import React from 'react'
import images from "@/constants/images";
import icons from "@/constants/icons";
import { Models } from "react-native-appwrite";
import items from "ajv/lib/vocabularies/applicator/items";

interface Props {
    item: Models.Document;
    onPress?: () => void;
}

export const FeaturedCard = ({ item: {image, rating, name, address, price}, onPress }: Props) => {
    return (
        <TouchableOpacity onPress={onPress} className="flex flex-col w-60 h-80 relative rounded-2xl overflow-hidden shadow-lg">

            {/* 🔥 Image & Gradient Overlay Group */}
            <View className="w-full h-full">
                <Image source={{uri: image}} className="w-full h-full rounded-2xl absolute" />
                <Image source={images.cardGradient} className="w-full h-full rounded-2xl absolute bottom-0" />
            </View>

            {/* ⭐ Rating Badge */}
            <View className="absolute top-4 right-4 flex-row items-center bg-white/90 px-3 py-1.5 rounded-full shadow-md">
                <Image source={icons.star} className="w-4 h-4" />
                <Text className="text-xs font-rubik-bold text-primary-300 ml-1 mt-[2px]">{rating}</Text>
            </View>

            {/* 🏡 Card Details */}
            <View className="absolute bottom-5 left-5 right-5">
                <Text className="text-lg font-rubik-extrabold text-white" numberOfLines={1}>
                    {name}
                </Text>
                <Text className="text-sm font-rubik text-gray-200" numberOfLines={1}>
                    {address}
                </Text>

                <View className="flex flex-row items-center justify-between mt-2">
                    <Text className="text-lg font-rubik-extrabold text-white">${price}</Text>
                    <TouchableOpacity className="p-2 bg-white/20 rounded-full">
                        <Image source={icons.heart} className="w-6 h-6" />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export const Card = ({ item: {image, rating, name, address, price}, onPress }: Props) => {
    return (
        <TouchableOpacity
            className="flex-1 w-full mt-4 px-3 py-4 rounded-lg bg-white shadow-lg shadow-black-100/70 relative"
            onPress={onPress}
        >
            <View className="flex flex-row items-center absolute px-2 top-5 right-5 bg-white/90 p-1 rounded-full z-50">
                <Image source={icons.star} className="size-2.5" />
                <Text className="text-xs font-rubik-bold text-primary-300 ml-0.5 mt-1">
                    {rating}
                </Text>
            </View>

            <Image source={{uri: image}} className="w-full h-40 rounded-lg" />

            <View className="flex flex-col mt-2">
                <Text className="text-base font-rubik-bold text-black-300 " numberOfLines={2}>
                    {name}
                </Text>
                <Text className="text-xs font-rubik text-black-100" numberOfLines={2}>
                    {address}
                </Text>

                <View className="flex flex-row items-center justify-between mt-2">
                    <Text className="text-base font-rubik-bold text-primary-300">
                        ${price}
                    </Text>
                    <Image
                        source={icons.heart}
                        className="w-5 h-5 mr-2"
                        tintColor="#191D31"
                    />
                </View>
            </View>
        </TouchableOpacity>
    );
};

