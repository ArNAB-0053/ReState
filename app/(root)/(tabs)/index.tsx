import {ActivityIndicator, Button, FlatList, Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import images from "@/constants/images";
import icons from "@/constants/icons";
import Search from "@/components/Search";
import {Card, FeaturedCard} from "@/components/Cards";
import Filters from "@/components/Filters";
import {useGlobalContext} from "@/lib/global-provider";
import seed from "@/lib/seed";
import {useAppwrite} from "@/lib/useAppwrite";
import {router, useLocalSearchParams} from "expo-router";
import {getLatestProperties, getProperties} from "@/lib/appwrite";
import {useEffect} from "react";
import NoResults from "@/components/NoResults";

export default function Index() {
    const {user} = useGlobalContext();
    const params = useLocalSearchParams<{query?: string; filter?:string}>()

    const handleCardPress = (id: string) => router.push(`/properties/${id}`);

    const {data: latestProperties, loading: latestPropertiesLoading} = useAppwrite({
        fn: getLatestProperties
    });

    const {data: properties, loading: propertiesLoading, refetch} = useAppwrite({
        fn: getProperties,
        params: {
            query: params.query!,
            filter: params.filter!,
            limit: 6
        },
        skip: true,
    });

    useEffect(()=>{
        refetch({
            filter: params.filter!,
            query: params.query!,
            limit: 6
        })
    }, [params.filter, params.query])
  return (
    <SafeAreaView className="bg-white h-full">
        {/*Data Seeding Button*/}
        {/*<Button title="Seed" onPress={seed}/>*/}

        <FlatList
            data={properties}
            renderItem={({ item }) => (
                <Card
                    item={item}
                    onPress={() => handleCardPress(item.$id)}
                />
            )}
            keyExtractor={(item) => item.$id}
            contentContainerClassName="pb-32"
            columnWrapperClassName="flex gap-5 px-5"
            showsVerticalScrollIndicator={false}
            numColumns={2}
            ListEmptyComponent={
                propertiesLoading? (
                    <ActivityIndicator size="large" className="text-primary-300" />
                ): ( <NoResults/> )
            }
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

                        {latestPropertiesLoading
                            ? (<ActivityIndicator size="large" className="text-primary-300" />)
                            : !latestProperties || latestProperties.length === 0
                                ? <NoResults />
                                : (<FlatList
                                        data={latestProperties}
                                        renderItem={({ item }) => (
                                            <FeaturedCard
                                                item={item}
                                                onPress={() => handleCardPress(item.$id)}
                                            />
                                        )}
                                        keyExtractor={(item)=>item.$id}
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                        bounces={false}
                                        contentContainerClassName="flex gap-5 mt-5"
                                    />)
                        }

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
