
import React, { Component } from 'react';
import {

  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  Dimensions,
  View,Button,Image,
  TouchableHighlight,Alert
} from 'react-native';
import _ from 'lodash'
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import Icon from "react-native-vector-icons/MaterialIcons";
import * as Animatable from "react-native-animatable"
import AsyncStorage from '@react-native-community/async-storage'
const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;
import History from './History'
export default class ScanScreen extends Component {
  constructor(props){
super(props)
    this.state={
      Mycamera:"back",
      // switcher:true
      qr:"",
      Savedcode:"",
      values:[],

      
    }
   
    console.log("values")     
  }
   makeSlideOutTranslation(translationType, fromValue) {
    return {
      from: {
        [translationType]: SCREEN_WIDTH * -0.18
      },
      to: {
        [translationType]: fromValue
      }
    };
  }
//////////////////
  onSuccess = (e) => {
    this._storeData(e)
      Linking.openURL(e.data).catch(err =>
        console.error('An error occured', err),
        alert('Unable to open link.')
        
    )
  
  };
  //////////////////
changeCamera=()=>{
  if(this.state.Mycamera==='back')
this.setState({
  Mycamera:'front'
})
else{
  this.setState({
    Mycamera:'back'
  })
}
  }
////////////////
onRead= e =>{
this.setState({
  qr:e.data
})

}

/////////////// store data
_storeData = async (e) => {
try{

  
  let oldValues= await AsyncStorage.getItem('qrcodes')
  
  this.state.values=JSON.parse(oldValues)
  if(oldValues!==null){
    this.setState({
      values: [...this.state.values,e.data],
      
    })
  
  }else{
    this.setState({
      values:[this.state.values,e.data]
    })
  }
  AsyncStorage.setItem('qrcodes',JSON.stringify(this.state.values));
 console.log('my data stored is : '+this.state.values)

}
catch (error) {
alert("error : "+e.data+error)  
}}

  render() {
    //console.log('my state after render() is : '+this.state.Savedcode),

    return (
      <View>

      <QRCodeScanner
        fadeIn={true}
        onRead={this.onSuccess.bind(this)}
         
        //,this._retrieveData
        flashMode={RNCamera.Constants.FlashMode.auto}
        //buttonPositive={true}
    
       reactivate={true}
        reactivateTimeout={2000}
        showMarker={true}
      
        customMarker={<View style={styles.rectangleContainer}>
        <View style={styles.topOverlay}>
         
        </View>

        <View style={{ flexDirection: "row" }}>
          <View style={styles.leftAndRightOverlay} />

          <View style={styles.rectangle}>
          <Image style={{width:250,height:250}} source={require('../images/qr_white.png')}/>
            <Animatable.View
              style={styles.scanBar}
              direction="alternate-reverse"
              iterationCount="infinite"
              duration={1700}
              easing="linear"
              animation={this.makeSlideOutTranslation(
                "translateY",
                SCREEN_WIDTH * -0.54
              )}
            />
          </View>

          <View style={styles.leftAndRightOverlay} />
        </View>

        <View style={styles.bottomOverlay} />
      </View>}
        cameraType= {this.state.Mycamera}
        cameraStyle={{height:Dimensions.get('window').height,width:Dimensions.get('window').width}}
  
  
      

      />

      <Text style={{color:'red'}}>{this.state.qr}</Text>
     
      <View style={{width:100,height:100,margin:10}}>
      <Icon name="switch-camera" size={35} color="white" onPress={this.changeCamera.bind(this)} />
        </View>
      </View>
    );
  }
}
const overlayColor = "rgba(0,0,0,0.5)"; 

const rectDimensions = SCREEN_WIDTH * 0.65;


const scanBarWidth = SCREEN_WIDTH * 0.46; 
const scanBarHeight = SCREEN_WIDTH * 0.0025; 
const styles = StyleSheet.create({
 


  buttonTouchable: {
    padding: 16
  },
  rectangleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent"
  },

  rectangle: {
    height: rectDimensions,
    width: rectDimensions,

    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent"
  },

  topOverlay: {
    flex: 1,
    height: SCREEN_WIDTH,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor,
    justifyContent: "center",
    alignItems: "center"
  },

  bottomOverlay: {
    flex: 1,
    height: SCREEN_WIDTH,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor,
    paddingBottom: SCREEN_WIDTH * 0.25
  },

  leftAndRightOverlay: {
    height: SCREEN_WIDTH * 0.65,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor
  },

  scanBar: {
    width: scanBarWidth,
    height: scanBarHeight,
    backgroundColor: '#FFB7B2'
  }
});