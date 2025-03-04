import {Button, FlatList, Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import images from "@/constants/images";
import icons from "@/constants/icons";
import Search from "@/components/Search";
import {Card, FeaturedCard} from "@/components/Cards";
import Filters from "@/components/Filters";
import {useGlobalContext} from "@/lib/global-provider";
import seed from "@/lib/seed";

export default function Index() {
    const {user} = useGlobalContext();
  return (
    <SafeAreaView className="bg-white h-full">
        <Button title="Seed" onPress={seed}/>
        <FlatList
            data={[1,2,3,4]}
            renderItem={({item}) => <Card/>}
            keyExtractor={(item) => item.toString()}
            contentContainerClassName="pb-32"
            columnWrapperClassName="flex gap-5 px-5"
            showsVerticalScrollIndicator={false}
            numColumns={2}
            ListHeaderComponent={
                <>
                    <View className="px-5">
                        <View className="flex flex-row items-center justify-between mt-5">
                            <View className="flex flex-row items-center">
                                <Image source={{uri: user?.avatar}} className='size-12 rounded-full' />
                                <View className="flex flex-col items-start ml-2 justify-center">
                                    <Text className="text-sm text-black-100">Good Morning</Text>
                                    <Text className="text-xl text-black-300 font-rubik-medium">
                                        {user?.name}
                                    </Text>
                                </View>
                            </View>
                            <Image source={icons.bell} className='size-6' />
                        </View>
                    </View>

                    <Search />

                    <View className="my-5 px-5">
                        <View className="flex flex-row items-center justify-between">
                            <Text className="text-xl font-rubik-bold text-black-300">
                                Featured
                            </Text>
                            <TouchableOpacity>
                                <Text className="text-base font-rubik-bold text-primary-300">
                                    See all
                                </Text>
                            </TouchableOpacity>
                        </View>
                        
                        <FlatList
                            data={[1,2,3,4]}
                            renderItem={({item})=> <FeaturedCard/>}
                            keyExtractor={(item)=>item.toString()}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            bounces={false}
                            contentContainerClassName="flex gap-5 mt-5"
                        />

                        {/*<View className="flex flex-row gap-x-5 mt-3">*/}
                        {/*    <FeaturedCard/>*/}
                        {/*    <FeaturedCard/>*/}
                        {/*</View>*/}

                        <View className="mt-10">
                            <View className="flex flex-row items-center justify-between">
                                <Text className="text-xl font-rubik-bold text-black-300">
                                    Our Recommendation
                                </Text>
                                <TouchableOpacity>
                                    <Text className="text-base font-rubik-bold text-primary-300">
                                        See all
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            <Filters />

                            {/*<View className="flex flex-row gap-x-5 ">*/}
                            {/*    <Card/>*/}
                            {/*    <Card/>*/}
                            {/*</View>*/}
                        </View>
                    </View>
                </>
            }
        />
    </SafeAreaView>
  );
}
