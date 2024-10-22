import { View, Text, Image, ScrollView, TextInput, Alert, } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { createUser } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider'
const Signup = () => {
  const {setUser , setIsLoggedIn} = useGlobalContext()
  const [form, setForm] = useState({
    username:" ",
    email:" ",
    password:" "
  })
  const [isSubmitting, setisSubmitting] = useState(false)

  const submit = async () =>{
    if(!form.username || !form.email || !form.password){
      Alert.alert("Error", "please fill in all the fields")
    }
    setisSubmitting(true);
    try {
      const result = await createUser(form.email, form.password, form.username)
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
         <Text className = "text-white mt-8 text-2xl font-psemibold">Sign Up to Aora</Text>
     <FormField
     title = "Username"
     value = {form.username}
     handleChangeText = {(e) =>setForm({...form, username:e})}
     otherStyles = "mt-10"

     />
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
     title="Sign up"
     handlePress={submit}
     containerStyles="mt-7"
     isloading={isSubmitting}
     />
     <View className =" justify-center pt-5 flex-row gap-2" >
      <Text className ="text-lg text-gray-100 font-pregular" >Already have an account?</Text>
      <Link href="/Sign-in" className="text-lg font-psemibold text-secondary" >Sign in</Link>
     </View>
      </View>
    </ScrollView>
    <StatusBar backgroundColor='#161622' style='light'/>
   </SafeAreaView>
  )
}

export default Signup