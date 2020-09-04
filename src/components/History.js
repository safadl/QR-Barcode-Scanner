
import React, { Component, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage'
import {Text,View,FlatList,ScrollView, Linking,StyleSheet} from 'react-native'
import {Button,Card,Avatar,IconButton, ActivityIndicator} from 'react-native-paper'
import { TouchableOpacity, TouchableHighlight } from 'react-native-gesture-handler';




class History extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Mydata:[], 
            Mydatabar:[],
            update:false
         
          };
       
        }
       
    componentDidMount() {

const { navigation } = this.props;
this.focusListener = navigation.addListener("focus", () => {
console.log('focused **************************')
this.onLoad1()
this.onLoad2()

});
  }


  onLoad1=async ()=>{
    try {
     
     
      await AsyncStorage.getItem('qrcodes').then(data => {if(data!==null){
      this.setState({ Mydata:JSON.parse(data)}); }});
 
 // console.log('update value : '+this.state.update)
  
      }
     catch (err) {
  alert("async storage get data error"+err)
  console.log('async retrieve error')
  }

  }
  onLoad2=async()=>{

    try {

   
    await AsyncStorage.getItem('barcodes').then(data => {if(data!==null){this.setState({ Mydatabar:JSON.parse(data)})}});
      }
     catch (err) {
  alert("async storage get data bar codes error"+err)
  console.log('async retrieve error')
  }
}

///// clear function  
removeEverything = async () => {
  try {
    await AsyncStorage.clear()
 alert('Storage successfully cleared!')
    this.setState({Mydata:[],Mydatabar:[]})
  } catch (e) {
    alert('Failed to clear the async storage.')
  }
  
}
  

async remove_data(id)  {
  try {
    this.state.Mydata.splice(id, 1);
    await AsyncStorage.setItem("qrcodes",JSON.stringify(this.state.Mydata))
    this.setState({ Mydata: JSON.parse(await AsyncStorage.getItem("qrcodes")) })

  } catch (error) {
    console.log(error);
  }
};
async remove_barcode(id)  {
  try {
    this.state.Mydatabar.splice(id, 1);
    await AsyncStorage.setItem("barcodes",JSON.stringify(this.state.Mydatabar))
    this.setState({ Mydatabar: JSON.parse(await AsyncStorage.getItem("barcodes")) })

  } catch (error) {
    console.log(error);
  }
};
  _renderItem = ({ item,index }) => (
  
console.log("my item is : "+item+" index: "+index),

    <ScrollView
    >
  <Card.Title
    title="Website"
    subtitle={item}
    left={(props) => <TouchableOpacity onPress={()=>this.OpenLink(item.toString())}><Avatar.Icon {...props} icon="link" /></TouchableOpacity>}
right={(props)=>
  <View style={{padding:10}}>
    <Button style={{marginLRight:0,marginBottom:10,alignSelf:'stretch'}}icon="delete" mode="contained"onPress={()=>this.remove_data(index)}>
Delete
</Button>
</View> }

  />

    </ScrollView>
   
  );
  _renderItem2 = ({ item,index }) => (
   
    <ScrollView
      style={{
      
      }}
    >
 
  <Card.Title
    title="Barcode"
    subtitle={item}
    left={(props) => <Avatar.Icon {...props} icon="barcode"  />} //backgroundColor='#6fcadc'
right={(props)=><View style={{padding:10}}><Button style={{marginLRight:0,marginBottom:10,alignSelf:'stretch'}}icon="delete" mode="contained" onPress={()=>this.remove_barcode(index)}>
Delete
</Button></View> }
//,color:'#6fcadc'
  />
    </ScrollView>
    
  );
  renderSeparator = () => (
    <View
      style={{
        backgroundColor: 'grey',
        height: 0.5,
      }}
    />
  );
  OpenLink= (Mylink) => {

    Linking.openURL(Mylink).catch(err =>
      console.error('An error occured', err),
     
  )

};
listEmpty=()=>{
  if(this.state.Mydata!==null&&this.state.Mydatabar!==null) 
   return(
<View style={{marginTop:"50%"}}><Text style={{textAlign:'center'}}>There is no results yet.</Text></View>
  )
}
    render() {
        return (
          <ScrollView >
          <View><Text style={{fontSize:23,padding:20,paddingBottom:30,fontWeight:'light',letterSpacing:2}}>History</Text>
          <Button  color='#6fcadc' onPress={this.removeEverything}>Clear</Button>
          </View> 
        
          <View style={{padding:15}}>
          <FlatList data={this.state.Mydata}
          
          renderItem={this._renderItem}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={this.renderSeparator}
          
          /> 
        
          <FlatList data={this.state.Mydatabar}
          renderItem={this._renderItem2}
         keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={this.renderSeparator}
          
                /> 
        </View>

</ScrollView>
        );
    
  }

}
export default History;

