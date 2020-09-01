
import React, { Component } from 'react';
import {
Text,
View,
StyleSheet,
Alert,
TouchableOpacity,
Image,
Dimensions
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import AsyncStorage from '@react-native-community/async-storage'

export default class Barcodescanner extends Component {
constructor(props) {
super(props);
this.handleTourch = this.handleTourch.bind(this);
this.state = {
torchOn: false,
values:[]
}
console.log("values codes")     

}
onBarCodeRead = (e) => {
Alert.alert("Barcode value is" + e.data, "Barcode type is" + e.type);

}
_storeData = async (e) => {
    try{
 
      
      let oldValues= await AsyncStorage.getItem('barcodes')
      this.state.values=JSON.parse(oldValues)
      
      if(oldValues==null){
        this.setState({
          values: [this.state.values,e.data]
        })
      }
      else{
    this.setState({
      values: [...this.state.values,e.data]
    })
      }

     AsyncStorage.setItem('barcodes',JSON.stringify(this.state.values));
     console.log('my data stored is : '+this.state.values)
     this.onBarCodeRead(e)
    }
    catch (error) {
    
    
    alert("error : "+e.data+error)  

    }}
render() {
    const CAM_VIEW_HEIGHT = Dimensions.get('screen').height * 1.5;
const CAM_VIEW_WIDTH = Dimensions.get('screen').width;

const leftMargin = 100;
const topMargin = 50;
const frameWidth = 200;
const frameHeight = 250;

const scanAreaX = leftMargin / CAM_VIEW_HEIGHT;
const scanAreaY = topMargin / CAM_VIEW_WIDTH;

return (
<View style={styles.container}>

<RNCamera
style={styles.preview}
FlashMode={this.state.torchOn ? RNCamera.Constants.FlashMode.on : RNCamera.Constants.FlashMode.off}
onBarCodeRead={this.onBarCodeRead,this._storeData}
ref={cam => this.camera = cam}


>

</RNCamera>

<View style={styles.bottomOverlay}>
<TouchableOpacity onPress={() => this.handleTourch(this.state.torchOn)}>
<Image style={styles.cameraIcon}
source={this.state.torchOn === true ? require('../images/flasher_on.png') : require('../images/flasher_off.png')} />
</TouchableOpacity>
</View>
</View>

)
}
handleTourch(value) {
if (value === true) {
this.setState({ torchOn: false });
} else {
this.setState({ torchOn: true });
}
}
}
const Screen_width=Dimensions.get('window').width;
const Screen_height=Dimensions.get('window').height;

const styles = StyleSheet.create({
container: {
flex: 1,
flexDirection: 'row',
width:Screen_width,
height:Screen_height
},
preview: {
flex: 1,
justifyContent: 'flex-end',
alignItems: 'center'
},
cameraIcon: {
margin: 5,
height: 40,
width: 40
},
bottomOverlay: {
position: "absolute",
width: "100%",
flex: 20,
flexDirection: "row",
justifyContent: "space-between",

},
});