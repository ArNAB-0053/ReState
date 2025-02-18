import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native'
import React, {useState} from 'react'
import {router, useLocalSearchParams, usePathname} from "expo-router";
import icons from "@/constants/icons";
import {useDebouncedCallback} from "use-debounce";

const Search = () => {
    const path = usePathname();
    const params = useLocalSearchParams<{query?: string}>();
    const [search, setSearch] = useState(params.query);

    const debouncedSearch = useDebouncedCallback(
        (text: string) => router.setParams({query: text}), 500
    )

    const handleSearch = (text: string) => {
        setSearch(text);
        debouncedSearch(text);
    }

    return (
        <View className="px-5 w-full">
            <View className="bg-accent-100 border border-primary-100 mt-5 py-2 rounded-lg flex flex-row items-center pl-2 pr-3">
                <View className="flex-1 flex flex-row items-center h-12">
                    <View className="border-r border-black-100 pl-1 py-1 pr-3 flex items-center justify-center">
                        <Image source={icons.search} className="w-5 h-5" />
                    </View>
                    <TextInput
                        value={search}
                        onChangeText={handleSearch}
                        placeholder="Search for anything..."
                        className="flex-1 ml-2 text-md font-rubik text-black-300 placeholder:text-black-100"
                        style={{
                            height: 40,
                            paddingVertical: 0,
                            textAlignVertical: "center",
                        }}
                    />
                </View>
                <TouchableOpacity>
                    <Image source={icons.filter} className="size-5" />
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default Search
