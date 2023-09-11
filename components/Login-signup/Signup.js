import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  FlatList,
  Image,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from 'expo-linear-gradient';
import Btn from "./Btn";
import Field from "./Field";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Animatable from 'react-native-animatable';







export default function Signup(props) {

  const [fdata, setFdata] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    cpassword: '',
    phoneNumber: '',
    gender: '',
    job: '',
    height: '',
    health: '',


  })
  const [errormsg, setErrormsg] = useState(null);

  const Sendtobackend = () => {
    // console.log(fdata);
    if (fdata.firstName == '' ||
      fdata.lastName == '' ||
      fdata.password == '' ||
      fdata.cpassword == '' ||
      fdata.email == '' ||
      fdata.gender == '' ||
      fdata.phoneNumber == '' ||
      fdata.job == '' ||
      fdata.height == '' ||
      fdata.health == '') {
      setErrormsg('All fields are required');
      return;
    }
    else {
      if (fdata.password != fdata.cpassword) {
        setErrormsg('Password and Confirm Password must be same');

        return;
      }
      else {
        fetch('http://10.0.2.2:3000/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(fdata)
        })
          .then(res => res.json()).then(
            data => {
              // console.log(data);
              if (data.error === 'Invalid Credentials') {
                // alert('Invalid Credentials')
                setErrormsg('Invalid Credentials')
              }
              else if (data.message === "User registred Successfully") {
                alert(data.message);
                props.navigation.navigate("Login");
              }

            }
          ).catch(error => {
            console.log(error);
          })
      }
    }

  }





  return (

    <SafeAreaView style={{ flex: 1, }}>
      <LinearGradient
        colors={['#83a351', '#456a0c']}
        start={{ x: 0, y: 0.6 }}
        end={{ x: 1, y:0.3  }}
        style={{ flex: 1, }}
      >
        <View style={{ flex: 2, alignItems:'center', }}>
        <Image source={require('./img/grey.png') } style={{marginTop:60 }}/>       
         </View>

        <Animatable.View  animation="fadeInUpBig" style={{ flex: 5, alignItems: "center", borderTopRightRadius: 30, borderTopLeftRadius: 30, backgroundColor: 'white', }}>
          <Text style={{ paddingVertical: 15, fontSize: 25, fontWeight: 'bold', color: '#5F7045', }} >Create a new Account</Text>
          <ScrollView>
            <Text style={{ paddingLeft: 15, fontSize: 15, fontWeight: "bold", color: '#5F7045' }}>First Name :</Text>
            <Field placeholder="First Name" keyboardType={"Text"} onPressIn={() => setErrormsg(null)}
              onChangeText={(text) => setFdata({ ...fdata, firstName: text })} />
            <Text style={{ paddingLeft: 15, fontSize: 15, fontWeight: "bold", color: '#5F7045' }}>Last Name :</Text>
            <Field placeholder="Last Name" keyboardType={"Text"} onPressIn={() => setErrormsg(null)}
              onChangeText={(text) => setFdata({ ...fdata, lastName: text })} />
            <Text style={{ paddingLeft: 15, fontSize: 15, fontWeight: "bold", color: '#5F7045' }}>Email :</Text>
            <Field placeholder="Email" keyboardType={"email-adress"} onPressIn={() => setErrormsg(null)}
              onChangeText={(text) => setFdata({ ...fdata, email: text })} />
            <Text style={{ paddingLeft: 15, fontSize: 15, fontWeight: "bold", color: '#5F7045' }}>Phone Number :</Text>
            <Field placeholder="Phone Number" keyboardType={"text"} onPressIn={() => setErrormsg(null)}
              onChangeText={(text) => setFdata({ ...fdata, phoneNumber: text })} />
            <Text style={{ paddingLeft: 15, fontSize: 15, fontWeight: "bold", color: '#5F7045' }}>Job :</Text>
            <Field placeholder="job" keyboardType={"text"} onPressIn={() => setErrormsg(null)}
              onChangeText={(text) => setFdata({ ...fdata, job: text })} />
            <Text style={{ paddingLeft: 15, fontSize: 15, fontWeight: "bold", color: '#5F7045' }}>Gender :</Text>
            <Field placeholder="gender" keyboardType={"text"} onPressIn={() => setErrormsg(null)}
              onChangeText={(text) => setFdata({ ...fdata, gender: text })} />
            <Text style={{ paddingLeft: 15, fontSize: 15, fontWeight: "bold", color: '#5F7045' }}>Height :</Text>
            <Field placeholder="height" keyboardType={"text"} onPressIn={() => setErrormsg(null)}
              onChangeText={(text) => setFdata({ ...fdata, height: text })} />
            <Text style={{ paddingLeft: 15, fontSize: 15, fontWeight: "bold", color: '#5F7045' }}>Health :</Text>
            <Field placeholder="health" keyboardType={"text"} onPressIn={() => setErrormsg(null)}
              onChangeText={(text) => setFdata({ ...fdata, health: text })} />
            <Text style={{ paddingLeft: 15, fontSize: 15, fontWeight: "bold", color: '#5F7045' }}>Password :</Text>
            <Field placeholder="Password" secureTextEntry={true} onPressIn={() => setErrormsg(null)}
              onChangeText={(text) => setFdata({ ...fdata, password: text })} />
            <Text style={{ paddingLeft: 15, fontSize: 15, fontWeight: "bold", color: '#5F7045' }}>Confirm Password :</Text>
            <Field placeholder="Confirm Your Password" secureTextEntry={true} onPressIn={() => setErrormsg(null)}
              onChangeText={(text) => setFdata({ ...fdata, cpassword: text })} />



          
          </ScrollView>
          {
              errormsg ? <Text >{errormsg}</Text> : null
            }
        </Animatable.View>
        <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', }}>
          <Btn

            btnLabel="Signup"
            Press={() => {
              Sendtobackend()

            }}
          />
          <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", }}>
            <Text style={{fontSize:18}}>
              Already Have Account ?
            </Text>
            <TouchableOpacity onPress={() => props.navigation.navigate("Login")}>
              <Text style={{color:'#5F7045', fontWeight:'bold',fontSize:18}} >  Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}


