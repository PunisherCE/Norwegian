import { Pressable, StatusBar, StyleSheet, TextInput } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Checkbox } from 'react-native-paper';

export default function add() {

  const [norsk, setNorsk] = useState('')
  const [english, setEnglish] = useState('')
  const [isInputFocused, setInputFocused] = useState(false);
  const [whichCustome, setWichCustom] = useState(0);
  const inputRef1 = useRef<TextInput>(null);
  const inputRef2 = useRef<TextInput>(null);

  let test: string | null

  // Corrected save function using JSON
async function customize(nor: string, eng: string) {
  try {
    let key = '';
    if (whichCustome === 0) key = 'custom';
    else if (whichCustome === 1) key = 'custom2';
    else if (whichCustome === 2) key = 'custom3';
    else if (whichCustome === 3) key = 'custom4';

    if (!key) return;

    // 1. Get the current data. If null, start with an empty array.
    const storedData = await AsyncStorage.getItem(key);
    let dataArray = storedData ? JSON.parse(storedData) : [];

    // 2. Accurately check if the word already exists as a distinct entry
    const wordExists = dataArray.some(
      (item: { norsk: string; english: string }) => item.norsk === nor
    );

    if (!wordExists) {
      // 3. Add the new word as an object to the array.
      dataArray.push({ norsk: nor, english: eng });

      // 4. Save the updated array back to AsyncStorage as a string.
      await AsyncStorage.setItem(key, JSON.stringify(dataArray));
      console.log('Saved successfully to ' + key, dataArray);
    } else {
      console.log('Word already exists, not saving.');
    }
  } catch (e) {
    console.error('Failed to save to AsyncStorage:', e);
  }
}

  const handleBlur = () => {
    if (isInputFocused) {
      inputRef2.current!.focus();
    }
  };
  const handleBlur2 = () => {
    inputRef1.current!.focus();
  };

  return (
    <View style={styles.container}>
      <StatusBar 
        barStyle={'light-content'}
        translucent={true} 
        backgroundColor="transparent"/>
      <View style={{backgroundColor: '#000', }}>
        <TextInput  
          style={styles.textsInput}    
          value={norsk}   
          placeholder='  Norsk' 
          ref={inputRef1}
          autoFocus={true}
          onChangeText={text => setNorsk(text)}
          onFocus={() => setInputFocused(true)}
          onSubmitEditing={handleBlur}
          />
        <TextInput
          value={english}
          style={styles.textsInput} 
          placeholder='  English' 
          ref={inputRef2}
          onChangeText={text => setEnglish(text)}
          onSubmitEditing={() => {
            if(norsk && english ){
              customize(norsk, english)
              setEnglish('')
              setNorsk('')
              setInputFocused(false)
              handleBlur2()
            }
          }}/>
      </View>
      <Pressable
        style={styles.buttons}
        android_ripple={{color: 'purple', borderless: false}}
        onPress={() => {
          if(norsk && english ){
            customize(norsk!, english!)
            setEnglish('')
            setNorsk('')
            setInputFocused(false)
            handleBlur2()
          }
        }}
      ><Text style={{color: '#fff'}}>Save Words</Text></Pressable>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', backgroundColor: '#000' }}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight! + 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  textsInput: {
    color: '#fff',
    backgroundColor: 'gray',
    fontSize: 24,
    fontWeight: 'bold',
    minWidth: 300,
    marginHorizontal: 40,
    marginBottom: 10,
    alignContent: 'center',
    justifyContent: 'center', 
    borderBottomWidth: 2,
    borderBottomColor: '#fff',
    borderRadius: 10
  },
  buttons: {
    backgroundColor: 'blue',
    padding: 15,
    margin: 25,
    borderRadius: 20
  }
});
