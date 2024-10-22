import { View, Text, FlatList } from 'react-native'
import { useEffect } from 'react'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import SearchInput from '../../components/SearchInput'
import EmptyState from '../../components/EmptyState'
import useAppwrite from '../../lib/useAppwrite'
import VideoCard from '../../components/VideoCard'
import { searchPosts } from '../../lib/appwrite'
import { useLocalSearchParams } from 'expo-router'
const Search = () => {
  const {query} = useLocalSearchParams()
const {data:posts, refetch} = useAppwrite( () => searchPosts(query));

        useEffect(() =>{
        refetch()
        },[query])
          return (

    <SafeAreaView className = " bg-primary  h-full">
    <FlatList 
  
     data={posts} 
    keyExtractor={(item) =>item.$id} 
    renderItem={({item}) => ( 
      <VideoCard video={item} />
    )}
    ListHeaderComponent={() =>{
      return (
        <View className=" my-6 px-4">
              <Text className="font-pmedium text-gray-100">Search results</Text>
              <Text className="text-2xl font-psemibold text-white">{query}</Text>
              <View className = "mt-6 mb-8" >
                 <SearchInput initialQuery = {query} />
              </View>
           
        </View>
      )
    }}
    ListEmptyComponent={() =>(
     <EmptyState title = "No videos found" 
     subtitle = "no videos founded for this search query"
     />
    )}
 
    />
    <StatusBar backgroundColor='#161622' style='light'/>
    </SafeAreaView>

  )
}

export default Search