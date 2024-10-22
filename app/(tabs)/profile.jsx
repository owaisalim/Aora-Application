          import { View, Text, FlatList, Touchable, TouchableOpacity, Image } from 'react-native'
          import React from 'react'
          import { SafeAreaView } from 'react-native-safe-area-context'
          import { StatusBar } from 'expo-status-bar'
          import EmptyState from '../../components/EmptyState'
          import useAppwrite from '../../lib/useAppwrite'
          import VideoCard from '../../components/VideoCard'
          import { useGlobalContext } from '../../context/GlobalProvider'
          import { getUserPosts} from '../../lib/appwrite';
          import { icons } from '../../constants'
          import { signout } from '../../lib/appwrite'
          import InfoBox from '../../components/InfoBox'
          import { router } from 'expo-router'
          const Profile = () => {
          const { setIsLoggedIn, user, setUser,} = useGlobalContext()
          const {data:posts} = useAppwrite(() => getUserPosts(user.$id));
         
          const logout=  async() =>{
            await signout();
            setUser(null)
            setIsLoggedIn(false)
            router.replace("/Sign-in")
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
                  <View className ="w-full justify-center items-center mt-6 mb-12 px-4" >
          <TouchableOpacity className ="w-full items-end mb-10"
          onPress={logout}
          >
          <Image source={icons.logout} className ="w-6 h-6" resizeMode='contain' />
          </TouchableOpacity>
          <View className = "w-16 h-16 border border-secondary items-center justify-center rounded-lg" >
          <Image source={{uri:user?.avatar}}
          className ="w-[90%] h-[90%] rounded-lg"
          resizeMode='cover'
          />
          </View>
          <InfoBox 
          title = {user?.username}
          containerStyles = "mt-5"
          titleStyles = "text-lg"
          />
          <View className = "mt-5 flex-row" >
          <InfoBox 
          title = {posts.length || 0}
          subtitle = "posts"
          containerStyles = "mr-10"
          titleStyles = "text-xl"
          />
          <InfoBox 
          title = "1.2K"
          subtitle = "Followers"
          titleStyles = "text-xl"
          />
          </View>
          </View>
                )
              }}
              ListEmptyComponent={() =>(
              <EmptyState title = "No videos found" 
              subtitle = "no videos founded for this search query"
              />
              )}/>
              <StatusBar backgroundColor='#161622' style='light'/>
              </SafeAreaView>
            )
          }
          export default Profile