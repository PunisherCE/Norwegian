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

  async function customize(nor: string, eng: string){
    try {
      if(whichCustome == 0){
        test = await AsyncStorage.getItem('custom'); 
        console.log('original')
        if (!test!.includes(nor)){
          test = test!.replaceAll('"', '')
          test = test!.concat(',', nor, ',', eng)  
          await AsyncStorage.setItem('custom',test!);
          console.log('add', test)
        }
      } else if(whichCustome == 1){
        test = await AsyncStorage.getItem('custom2'); 
        console.log('original')
        if (!test!.includes(nor)){
          test = test!.replaceAll('"', '')
          test = test!.concat(',', nor, ',', eng)  
          await AsyncStorage.setItem('custom2',test!);
          console.log('add', test)
        }
      } else if(whichCustome == 2){
        test = await AsyncStorage.getItem('custom3'); 
        console.log('original')
        if (!test!.includes(nor)){
          test = test!.replaceAll('"', '')
          test = test!.concat(',', nor, ',', eng)  
          await AsyncStorage.setItem('custom3',test!);
          console.log('add', test)
        }
      } else if(whichCustome == 3){
        test = await AsyncStorage.getItem('custom4'); 
        console.log('original')
        if (!test!.includes(nor)){
          test = test!.replaceAll('"', '')
          test = test!.concat(',', nor, ',', eng)  
          await AsyncStorage.setItem('custom4',test!);
          console.log('add', test)
        }
      }
    } catch(e){
      console.log(e)
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
