import {  Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';

import Field from "./Field";
import Btn from "./Btn";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login(props) {
  const [fdata, setFdata] = useState({
    email: '',
    password: ''
  })

  const [errormsg, setErrormsg] = useState(null);

  const Sendtobackend = () => {
    // console.log(fdata);
    if (fdata.email == '' || fdata.password == '') {
      setErrormsg('All fields are required');
      return;
    }
    else {
      fetch('http://10.0.2.2:3000/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(fdata)
      })
        .then(res => res.json()).then(
          data => {
            // console.log(data);
            if (data.error) {
              console.log(data.error);
              setErrormsg(data.error);
            }
            else {
              alert('logged successfully');
              props.navigation.navigate('Home');
            }
          }
        ).catch(error => { console.log(error); })
    }
  }


  return (
    <SafeAreaView style={{ flex: 1, }}>
      <LinearGradient
        colors={['#83a351', '#456a0c']}
        start={{ x: 0, y: 0.6 }}
        end={{ x: 1, y: 0.3 }}
        style={{ flex: 1, }}
      >
        <View style={{ flex: 2, alignItems: 'center', }}>
          <Image source={require('./img/grey.png')} style={{ marginTop: 60 }} />
        </View>
        <Animatable.View animation="fadeInUpBig" style={{ flex: 4, alignItems: "center", borderTopRightRadius: 30, borderTopLeftRadius: 30, backgroundColor: 'white', }}>
          <Text style={styles.textwelcomeback}>Welcome Back</Text>
          <Text style={styles.textloginaccount}>Login to your Account</Text>
          <View style={{ paddingTop: 5 }}>
            <Text style={{ fontSize: 15, fontWeight: "bold", color: '#5F7045', alignSelf: 'flex-start', paddingLeft: 10, paddingVertical: 5 }}>Email :</Text>

            <Field placeholder="Email" keyboardType={"email-adress"}
              onPressIn={() => setErrormsg(null)}
              onChangeText={(text) => setFdata({ ...fdata, email: text })}></Field>
            <Text style={{ fontSize: 15, fontWeight: "bold", color: '#5F7045', alignSelf: 'flex-start', paddingLeft: 10, paddingVertical: 5 }}>Password :</Text>

            <Field placeholder="Password" secureTextEntry={true}
              onChangeText={(text) => setFdata({ ...fdata, password: text })}
              onPressIn={() => setErrormsg(null)}></Field>

            <Text style={styles.textforgotpassword}>
              Forgot your Password ?
            </Text>
          </View>

        </Animatable.View>
        <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', }} >
          <Btn
           btnLabel="Login"
            style={styles.button}
            Press={() => {
              Sendtobackend()
              props.navigation.navigate("AppHome")}

            }
          />
          {
            errormsg ? <Text >{errormsg}</Text> : null
          }
          <View style={{ flexDirection: 'row', paddingTop: 10 }}>
            <Text style={{ fontSize: 18 }}>Don't Have Account ? </Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("Signup")}
            >
              <Text style={{ color: '#5F7045', fontWeight: 'bold', fontSize: 18 }} >Signup</Text>
            </TouchableOpacity>
          </View>
        </View>


      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({



  textwelcomeback: {
    fontSize: 40,
    color: '#5F7045',
    fontWeight: "bold",
    marginTop: 40
  },
  textloginaccount: {
    color: "grey",
    fontSize: 19,
    fontWeight: "bold",
    marginBottom: 20,
  },
  forgotpasswordview: {
    alignItems: "flex-end",
    width: "78%",
    paddingRight: 30,
    marginBottom: 100,
  },
  textforgotpassword: {
    color: '#5F7045',
    fontWeight: "bold",
    fontSize: 16,
    alignSelf: 'flex-end'
  },
  lastview: {
    flexDirection: "row",
    justifyContent: "center",
  },
  donthaveaccounttext: {
    fontWeight: "bold",
    fontSize: 16,
  },
  buttontext: {
    color: '#006A42',
    fontWeight: "bold",
    fontSize: 16,
  },
});
