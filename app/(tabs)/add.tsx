import { Pressable, StatusBar, StyleSheet, TextInput } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function add() {

  const [norsk, setNorsk] = useState('')
  const [english, setEnglish] = useState('')
  const [isInputFocused, setInputFocused] = useState(false);
  const inputRef1 = useRef<TextInput>(null);
  const inputRef2 = useRef<TextInput>(null);

  let test: string | null

  async function customize(nor: string, eng: string){
    try {
      test = await AsyncStorage.getItem('custom'); 
      console.log('original')
      if (!test!.includes(nor)){
        test = test!.replaceAll('"', '')
        test = test!.concat(',', nor, ',', eng)  
        await AsyncStorage.setItem('custom',test!);
        console.log('add', test)
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
