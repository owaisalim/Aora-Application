import { View, Text, FlatList, Image, RefreshControl, Alert } from 'react-native'
import { useEffect, useState } from 'react'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {images} from '../../constants'
import { StatusBar } from 'expo-status-bar'
import SearchInput from '../../components/SearchInput'
import Trending from '../../components/Trending'
import EmptyState from '../../components/EmptyState'
import CustomButton from '../../components/CustomButton'
import { getAllPosts } from '../../lib/appwrite'
import useAppwrite from '../../lib/useAppwrite'
import VideoCard from '../../components/VideoCard'
import { getLatestPosts } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider'
const Home = () => {
  const { setIsLoggedIn, user, setUser,} = useGlobalContext()
const {data:posts, refetch} = useAppwrite(getAllPosts);
const {data:latestPosts} = useAppwrite(getLatestPosts);
 

const [refreshing, setRefreshing] = useState(false)
  const OnRefresh = async() => {
    setRefreshing(true)
    await refetch()
    setRefreshing(false)
  }

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
        <View className=" my-6 px-4 space-x-6">
          <View className="justify-between items-start flex-row mb-6">
            <View>
              <Text className="font-pmedium text-gray-100">Welcome Back,</Text>
              <Text className="text-2xl font-psemibold text-white">{user?.username}</Text>
            </View>
            <View className=" mt-1.5">
              <Image source={images.logoSmall}
                className="w-9 h-10" resizeMode='contain' />
            </View>
          </View>
          <SearchInput />
          <View className="w-full flex-1 pt-5 pb-8">
            <Text className=" text-gray-100 text-lg font-pregular mb-3">latest videos</Text>
            <Trending posts={latestPosts ?? []} />
          </View>
        </View>

      )
    }}
    ListEmptyComponent={() =>(
     <EmptyState title = "No videos found" 
     subtitle = "be the first one to upload the video"
     />
    )}
    refreshControl={<RefreshControl refreshing = {refreshing} onRefresh={OnRefresh} />}
    />
    <StatusBar backgroundColor='#161622' style='light'/>
    </SafeAreaView>

  )
}

export default Home