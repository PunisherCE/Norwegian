import { View, Text, StatusBar, StyleSheet, FlatList, Alert, Pressable } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Checkbox } from 'react-native-paper';

let reviewList: string

const review = () => {

  const [reviewArray, setReviewArray] = useState<string[]>([])

  async function loadReview(){
    const review = await AsyncStorage.getItem('review')
    if(review){
      reviewList = review
      setReviewArray(reviewList.split(','))   
      console.log(reviewList)
    }
  }

  async function removeReview(item: string) {
    if(reviewList.endsWith(item)){
      reviewList = reviewList.replace(',' + item , '')
    } else if((reviewList.endsWith(item) && reviewList.startsWith(item)) || (reviewList.endsWith(item + ',') && reviewList.startsWith(item))){
      reviewList = ''
    } else {
      reviewList = reviewList.replace(item + ',' , '')
    }
    await AsyncStorage.setItem('review', reviewList)
    setReviewArray(reviewList.split(','))
  }

  async function clear() {
    await AsyncStorage.setItem('review', '')
    setReviewArray([])
  }

  useLayoutEffect(() => { loadReview()}, [])

  return (
    <View style={styles.container}>
      <StatusBar 
        barStyle={'light-content'}
        translucent={true} 
        backgroundColor="transparent"/>
      <FlatList
        style={{margin: 20}}
        data={reviewArray}
        renderItem={({item}) =>(
          <View style={{flexDirection: 'row', backgroundColor: '#000'}}>
            <Checkbox
              status={reviewList.includes(item)? 'checked': 'unchecked'}
              onPress={() => {
                removeReview(item)
              }}
            ></Checkbox>
            <Text style={{color: '#fff'}}>{item}</Text>
          </View>  )}
      />
      <View style={{flexDirection: 'row'}}>
        <Pressable
          style={styles.buttons}
          disabled={setReviewArray.length === 0}
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
          onPress={() => loadReview()}
          android_ripple={{color: 'gray', borderless: true}} 
        ><Text style={{color: 'white'}}>Update</Text></Pressable>
      </View>
    </View>
  )
}


export default review

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
    marginHorizontal: 15,
    marginBottom: 25,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    fontSize: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue'
  }
})
