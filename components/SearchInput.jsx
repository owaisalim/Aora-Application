import { View, Text, TextInput, TouchableOpacity,Image, Alert } from 'react-native'
import { icons } from '../constants'
import { useState } from 'react'
import React from 'react'
import { router, usePathname } from 'expo-router'
const SearchInput = ({initialQuery}) => {
  const parhName = usePathname()
  const [query, setQuery] = useState(initialQuery || '')
  return (
 <View className = "w-full h-16 border-2 border-black-200 focus:border-secondary px-4 bg-black-100 rounded-2xl items-center flex-row space-x-4">
 <TextInput className =" text-base mt-0.5 text-white flex-1 font-pregular"
    value={query}
    placeholder="Search for a video topic"
    placeholderTextColor='#CDCDE0'
    onChangeText={(e) =>setQuery(e)}
    
        />
    <TouchableOpacity
    onPress={() =>{
        if(!query){
            return Alert.alert("Missing query", "please input something to search results across database")
        }
        if(parhName.startsWith("/search")) router.setParams({query})
            else router.push(`/search/${query}`)
    }}
    >
    <Image source={icons.search} className ="h-5 w-5" resizeMode='contain' />
    </TouchableOpacity>
    </View>   
    )}

export default SearchInput