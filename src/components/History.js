
import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage'
import {Text,View,FlatList,ScrollView} from 'react-native'
import {Button,Card,Avatar,IconButton, ActivityIndicator} from 'react-native-paper'

// import { FlatList } from 'react-native-gesture-handler'; 
class History extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Mydata:[], // changed this from "" to []
            Mydatabar:[],
          };
    }

    componentDidMount(){
   
this.onLoad1()
this.onLoad2()
// AsyncStorage.removeItem('qrcodes');
// AsyncStorage.removeItem('barcodes');

  }
 
  onLoad1=async ()=>{
    try {
      let values= await AsyncStorage.getItem('qrcodes')
      
      if(values!==null){
        let data=[...this.state.Mydata,...JSON.parse(values)]
 
        this.setState({Mydata:data})
       // this.setState({Savedcode:values});
        console.log('************data got from storage successfuly ***************', JSON.parse(values));
        //alert('got successfuly'+JSON.parse(values));
       
        //console.log('state'+this.state.Savedcode);
  
      } else {
        this.setState({Mydata})
      }
     
      }
     catch (err) {
  alert("async storage get data error"+err)
  console.log('async retrieve error')
  }

  }
  onLoad2=async()=>{
    try {
      let values= await AsyncStorage.getItem('barcodes')
      if(values!==null){
        let data=[...this.state.Mydatabar,...JSON.parse(values)]
 
        this.setState({Mydatabar:data})
       // this.setState({Savedcode:values});
        console.log('************data got from storage successfuly ***************', JSON.parse(values));
        //alert('got successfuly'+JSON.parse(values));
       
        //console.log('state'+this.state.Savedcode);

  
      }
      else {
        this.setState({Mydatabar})
      }
     
      }
     catch (err) {
  alert("async storage get data bar codes error"+err)
  console.log('async retrieve error')
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
   
    <ScrollView
      style={{
      
      }}
    >
      {/* <Text style={{fontSize:18,padding:10}}>Website</Text> */}
      {/* <View style={{flexDirection:'row'}}>
        <Text style={{marginLeft:5,fontSize:15,padding:8,justifyContent:'flex-end'}}>{item}</Text>
      
   

  </View> */}
  <Card.Title
    title="Website"
    subtitle={item}
    left={(props) => <Avatar.Icon {...props} icon="link" />}
right={(props)=>  <View style={{padding:10}}><Button style={{marginLRight:0,marginBottom:10,alignSelf:'stretch'}}icon="delete" mode="contained"onPress={()=>this.remove_data(index)}>
Delete
</Button></View> }
  />
  
    </ScrollView>
  );
  _renderItem2 = ({ item,index }) => (
    
    <ScrollView
      style={{
      
      }}
    >
      {/* <Text style={{fontSize:18,padding:10}}>Website</Text> */}
      {/* <View style={{flexDirection:'row'}}>
        <Text style={{marginLeft:5,fontSize:15,padding:8,justifyContent:'flex-end'}}>{item}</Text>
      
   

  </View> */}
  <Card.Title
    title="Barcode"
    subtitle={item}
    left={(props) => <Avatar.Icon {...props} icon="barcode" backgroundColor='#6fcadc' />}
right={(props)=><View style={{padding:10}}><Button color='#6fcadc'style={{marginLRight:0,marginBottom:10,alignSelf:'stretch',color:'#6fcadc'}}icon="delete" mode="contained" onPress={()=>this.remove_barcode(index)}>
Delete
</Button></View> }
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
    render() {
        return (
        <ScrollView>
          <Text style={{fontSize:30,padding:17,fontWeight:'bold'}}>History</Text>
          <ScrollView style={{padding:15}}></ScrollView>
          <FlatList data={this.state.Mydata}
          renderItem={this._renderItem}
         // keyExtractor={(item, index) => index.toString()}
           
          ItemSeparatorComponent={this.renderSeparator}
          /> 
        <View style={{borderColor:'grey',borderWidth:0.5}}></View>
          <FlatList data={this.state.Mydatabar}
          renderItem={this._renderItem2}
         // keyExtractor={(item, index) => index.toString()}
           
          ItemSeparatorComponent={this.renderSeparator}
          /> 
          </ScrollView>
        );
    
  }
// {/* <ActivityIndicator color='red'size={20} /> */}

  

}

export default History;