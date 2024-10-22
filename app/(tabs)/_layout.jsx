import { View, Text,Image } from 'react-native'
import React from 'react'
import { Tabs, Redirect } from 'expo-router'
import {icons} from '../../constants'

const TabIcon = ({ icon,color, name ,focused}) =>{
  return(
    <View className ="justify-center items-center gap-1" >
      <Image 
      source={icon}
      resizeMode='contain'
      tintColor={color}
      className = 'w-6 h-6'
      />
      <Text className = {`${focused? 'font-psemibold' :'font-pregular'} text-xs`} style={{color:color}} >{name}</Text>
    </View>
  )
}
const TabsLayout = () => {
  return (
   <>
   <Tabs
    screenOptions={{tabBarShowLabel:false,
      tabBarHideOnKeyboard:true,
tabBarActiveTintColor:"#FFA001",
tabBarInactiveTintColor:"#CDCDE0",
tabBarStyle:{
backgroundColor:"#161622",
borderTopWidth:1,
borderTopColor:"#232533",
height:60
}
   }} >
    <Tabs.Screen name='home' options={{
      headerShown:false, title:"Home",
      tabBarIcon:({color,focused}) =>(
        <TabIcon 
        icon={icons.home}
        color={color}
        name="Home"
        focused={focused}
        />
      )
    }} />
    <Tabs.Screen name='create' options={{
      headerShown:false, title:"Create",
      tabBarIcon:({color,focused}) =>(
        <TabIcon 
        icon={icons.plus}
        color={color}
        name="create"
        focused={focused}
        />
      )
    }} />
    <Tabs.Screen name='profile' options={{
      headerShown:false, title:"Profile",
      tabBarIcon:({color,focused}) =>(
        <TabIcon 
        icon={icons.profile}
        color={color}
        name="profile"
        focused={focused}
        />
      )
    }} />
    <Tabs.Screen name='Bookmark' options={{
      headerShown:false, title:"bookmark",
      tabBarIcon:({color,focused}) =>(
        <TabIcon 
        icon={icons.bookmark}
        color={color}
        name="bookmark"
        focused={focused}
        />
      )
    }} />
   </Tabs>
   </>
  )
}

export default TabsLayout