import { View, Text, StatusBar, StyleSheet, FlatList, Alert, Pressable } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';
import { Checkbox } from 'react-native-paper';

interface WordPair {
  norsk: string;
  english: string;
}

const custom = () => {

  const [customArray, setCustomArray] = useState<string[]>([])
  const [whichCustome, setWichCustom] = useState(0);

    // in your custom component
  async function loadCustom() {
    const key = `custom${whichCustome === 0 ? '' : whichCustome + 1}`;
    const customs = await AsyncStorage.getItem(key);

    if (customs) {
      // Parse the JSON string back into an array of objects
      const dataArray: WordPair[] = JSON.parse(customs);
      
      // Now you can easily convert the data to your desired format
      const listaFinal = dataArray.map(item => `${item.norsk},${item.english}`);
      setCustomArray(listaFinal);
      console.log(listaFinal);
    } else {
      // Handle the case where the key is empty or null
      setCustomArray([]);
      console.log('No data found for key:', key);
    }
  }

  async function removeCustom(item: string) {
    const key = `custom${whichCustome === 0 ? '' : whichCustome + 1}`;
    
    try {
      const customs = await AsyncStorage.getItem(key);
      
      if (customs) {
        const dataArray = JSON.parse(customs);
        
        // Filter out the item based on the string from the FlatList
        const [norskToRemove, englishToRemove] = item.split(',');
        const newArray = dataArray.filter(
          (wordPair: { norsk: string; english: string }) => 
            wordPair.norsk !== norskToRemove || wordPair.english !== englishToRemove
        );
        
        await AsyncStorage.setItem(key, JSON.stringify(newArray));
  
        // Reload the component to reflect the change
        loadCustom(); // <-- No argument is passed here
      }
    } catch (e) {
      console.error('Failed to remove custom item:', e);
    }
  }

  async function clear() {
    if(whichCustome == 0){
      await AsyncStorage.setItem('custom', 'elsker med deg,make love to you')
    } else if(whichCustome == 1){
      await AsyncStorage.setItem('custom2', 'elsker med deg,make love to you')
    } else if(whichCustome == 2){
      await AsyncStorage.setItem('custom3', 'elsker med deg,make love to you')
    } else if(whichCustome == 3){
      await AsyncStorage.setItem('custom4', 'elsker med deg,make love to you')
    }    
    setCustomArray([])
  }

  useEffect(() => {
    loadCustom();
  }, [whichCustome]);

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
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', backgroundColor: '#000', marginBottom: 20 }}>
        <Checkbox 
          status={whichCustome == 0? 'checked' : 'unchecked'}
          onPress={() => setWichCustom(0)}>
        </Checkbox>
        <Checkbox 
          status={whichCustome == 1? 'checked' : 'unchecked'}
          onPress={() => setWichCustom(1)}>
        </Checkbox>
        <Checkbox 
          status={whichCustome == 2? 'checked' : 'unchecked'}
          onPress={() => setWichCustom(2)}>
        </Checkbox>
        <Checkbox 
          status={whichCustome == 3? 'checked' : 'unchecked'}
          onPress={() => setWichCustom(3)}>
        </Checkbox>
      </View>
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
