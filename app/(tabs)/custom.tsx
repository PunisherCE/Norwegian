import { View, Text, StatusBar, StyleSheet, TextInput, Button, FlatList, Alert, Pressable } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';

const custom = () => {

  const [customArray, setCustomArray] = useState<string[]>([])
  let customList: string
  let listaFinal: string[] = []

  async function loadCustom(){
    const customs = await AsyncStorage.getItem('custom')
    if(customs){
      let itemFinal: string = ''
      customList = customs
      const crearLista = customList.split(',') 
      for(const word of crearLista){
        if(crearLista.indexOf(word) % 2 === 0){
          itemFinal = word
        } else{
          itemFinal = itemFinal.concat(',' + word)
          listaFinal.push(itemFinal)
          itemFinal = ''
        }
      }
      setCustomArray(listaFinal)
      console.log(listaFinal)
    }
  }

  async function removeCustom(item: string) {
    let customs = await AsyncStorage.getItem('custom')
    if(customs!.endsWith(item)){
      customs = customs!.replace(',' + item , '')
    } else if((customs!.endsWith(item) && customs!.startsWith(item)) || (customs!.endsWith(item + ',') && customs!.startsWith(item))){
      customs = ''
    } else {
      customs = customs!.replace(item + ',' , '')
    }
    await AsyncStorage.setItem('custom', customs)
    loadCustom()
  }

  async function clear() {
    await AsyncStorage.setItem('custom', 'elsker med deg,make love to you')
    setCustomArray([])
  }

  useLayoutEffect(() => { loadCustom()}, [])

  return (
    <View style={styles.container}>
      <StatusBar 
        barStyle={'light-content'}
        translucent={true} 
        backgroundColor="transparent"/>
      <FlatList
        style={{margin: 20}}
        data={customArray}
        renderItem={({item}) =>(
          <View style={{flexDirection: 'row', backgroundColor: '#000', marginBottom: 5}}>
            <Pressable
              style={{margin: 5}}
              onPress={() => {
                removeCustom(item)
              }}>
              <AntDesign name="delete" size={24} color="red" />
            </Pressable>
            <Text style={{color: '#fff'}}>{item}</Text>
          </View>  )}
      />
      <View style={{flexDirection: 'row'}}>
        <Pressable
          style={styles.buttons}
          disabled={setCustomArray.length === 0}
          onPress={() => Alert.alert(
            'Confirmation',
            'Are you sure you want to clear?',
            [
              {
                text: 'No',
                style: 'cancel',
              },
              {
                text: 'Yes',
                onPress: clear,
              },
            ],
            { cancelable: true }
          )}
          android_ripple={{color: 'gray', borderless: true}} 
        ><Text style={{color: 'white'}}>Clear</Text></Pressable>
        <Pressable
          style={styles.buttons}
          onPress={() => loadCustom()}
          android_ripple={{color: 'gray', borderless: true}} 
        ><Text style={{color: 'white'}}>Update</Text></Pressable>
      </View>
    </View>
  )
}


export default custom

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: '#fff',
    paddingTop: StatusBar.currentHeight! + 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  buttons: {
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    fontSize: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
    marginHorizontal: 15, 
    marginBottom: 25
  }
})
