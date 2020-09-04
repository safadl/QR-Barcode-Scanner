

import React, { Component } from 'react';
import {
Text,
View,
StyleSheet,
Alert,

Dimensions,

} from 'react-native';
import {RNCamera} from 'react-native-camera';
import AsyncStorage from '@react-native-community/async-storage'
import BarcodeMask from 'react-native-barcode-mask'
import { Snackbar,Paragraph, Dialog, Portal,Button,Provider  } from 'react-native-paper';
import { delay } from 'lodash';

export default class Barcodescanner extends Component {
constructor(props) {
super(props);
this.handleTourch = this.handleTourch.bind(this);

this.state = {
torchOn: false,
values:[],
visible:false
}
console.log("values codes")   
this.barcodeCodes = []; 
this.getValues=[];

}


 async onBarCodeRead(scanResult) {
  if (scanResult.data !== null) {
Alert.alert("Barcode value is : " + scanResult.data, "Barcode type is" + scanResult.type)


this.props.navigation.navigate('Search History')

  this._storeData(scanResult)

 
 
  }


// }
return;

}


showDialog = () => {
  this.setState({
    visible:true
  })
}

hideDialog = () => {
  this.setState({visible:false})
}
  
_storeData = async (e) => {
    try{
 
      
      let oldValues= await AsyncStorage.getItem('barcodes')
      this.state.values=JSON.parse(oldValues)
      
      if(oldValues!==null){
        this.setState({
          values: [...this.state.values,e.data]
        })
      }
      else{
        this.setState({
          values:[this.state.values,e.data]
        })
      }

     AsyncStorage.setItem('barcodes',JSON.stringify(this.state.values));
     console.log('my data stored is : '+this.state.values)
     
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
const { shouldReadBarCode }  = this.state;

return (
  <Provider>
<View style={styles.container}>

<RNCamera
style={styles.preview}
onBarCodeRead={this.onBarCodeRead.bind(this)}
shouldReadBarCode={true}
detectedImageInEvent={true}
ref={cam => this.camera = cam}
androidCameraPermissionOptions={{
  title: 'Permission to use camera',
  message: 'We need your permission to use your camera',
  buttonPositive: 'Ok',
  buttonNegative: 'Cancel',
}}
><BarcodeMask width={350} height={200} edgeColor={'#62B1F6'} showAnimatedLine={true} lineAnimationDuration={2000} edgeBorderWidth={1.5} animatedLineHeight={0.7} /></RNCamera>
<View style={[styles.overlay, styles.topOverlay,styles.bottomOverlay]}>
	  <Text style={styles.scanScreenMessage}>Please scan the barcode.</Text>
	</View>
 
  <Portal>
        <Dialog visible={this.state.visible} onDismiss={this.hideDialog}>
          <Dialog.Title>Alert</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Barcode saved.</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={this.hideDialog}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
</View>
</Provider>
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
overlay: {
  position: 'absolute',
  padding: 16,
  right: 0,
  left: 0,
  alignItems: 'center'
},  bottomOverlay: {
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.4)',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center'
},
enterBarcodeManualButton: {
  padding: 15,
  backgroundColor: 'white',
  borderRadius: 40
},
scanScreenMessage: {
  fontSize: 14,
  color: 'white',
  textAlign: 'center',
  alignItems: 'center',
  justifyContent: 'center'
}
});