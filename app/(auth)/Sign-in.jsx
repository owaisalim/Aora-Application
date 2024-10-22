import { View, Text, Image, ScrollView, TextInput,Alert } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link } from 'expo-router'
import { createUser, getCurrentUser } from '../../lib/appwrite'
import { StatusBar } from 'expo-status-bar'
import { signIn } from '../../lib/appwrite'
import { router } from 'expo-router'
import { useGlobalContext } from '../../context/GlobalProvider'
const SignIn = () => {
  const {setUser , setIsLoggedIn} = useGlobalContext()
  const [form, setForm] = useState({
    email:" ",
    password:" "
  })
  const [isSubmitting, setisSubmitting] = useState(false)
  const submit = async () =>{
    if(!form.email || !form.password){
      Alert.alert("Error", "please fill in all the fields")
    }
    setisSubmitting(true);
    try {
       await signIn(form.email, form.password)
       const result = await getCurrentUser()
       setUser(result);
       setIsLoggedIn(true)
      router.replace('/home')
    } catch (error) {
      Alert.alert('Error', error.message)
    }
    finally{
      setisSubmitting(false);
    }

  }  
  return (
   <SafeAreaView className = "bg-primary h-full">
    <ScrollView>
      <View className ="w-full justify-center min-h-[85vh] px-4 my-6">
         <Image source={images.logo} className =" w-[115px] h-[34.07]" resizeMode='contain'/>
         <Text className = "text-white mt-8 text-2xl font-psemibold">Login to Aora</Text>
     <FormField
     title = "Email"
     value = {form.email}
     handleChangeText = {(e) =>setForm({...form, email:e})}
     otherStyles = "mt-7"
     keyboardType = "email-address"
     />
     <FormField
     title = "Password"
     value = {form.password}
     handleChangeText = {(e) =>setForm({...form, password:e})}
     otherStyles = "mt-7"
     />
     <CustomButton 
     title="Sign in"
     handlePress={submit}
     containerStyles="mt-7"
     isloading={isSubmitting}
     />
     <View className =" justify-center pt-5 flex-row gap-2" >
      <Text className ="text-lg text-gray-100 font-pregular" >Don't have account?</Text>
      <Link href="/Sign-up" className="text-lg font-psemibold text-secondary" >Sign up</Link>
     </View>
      </View>
    </ScrollView>
    <StatusBar backgroundColor='#161622' style='light'/>
   </SafeAreaView>
  )
}

export default SignIn