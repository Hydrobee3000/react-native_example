import React, { useState, useEffect } from 'react'
import { useAsyncStorage } from '@react-native-async-storage/async-storage'
import { StatusBar } from 'expo-status-bar'
import { Button, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ShowStoredValue from './components/ShowStoredValue'

export default function App() {
  const [count, setCount] = useState(0)

  const [value, setValue] = useState('value')
  const { getItem, setItem, removeItem } = useAsyncStorage('@storage_key')

  useEffect(() => {
    readItemFromStorage()
  }, [])

  const readItemFromStorage = async () => {
    const item = await getItem()
    // setValue(item)
    setCount(item)
  }

  const writeItemToStorage = async (newValue) => {
    await setItem(newValue)
    // setValue(newValue)
    setCount(newValue)
  }

  return (
    <View style={styles.container}>
      <View>
        <Button
          onPress={() => {
            setCount(parseInt(count) + 1)
          }}
          title='Click'
        />

        <Text style={{ marginTop: 15, marginBottom: 15 }}>You clicked {count} times</Text>

        <Button
          onPress={() => {
            setCount(0)
            removeItem()
          }}
          title='Reset'
        />
        <Text> </Text>
        <Button
          onPress={() => {
            writeItemToStorage(count.toString())
          }}
          title='Save'
        />
      </View>
      {/* <Text style={{ marginTop: 40, marginBottom: 15 }}>Current value: {count}</Text> */}
      <StatusBar style='auto' />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

// const sendRequest = async () => {
//   const rawResponse = await fetch('https://httpbin.org/post', {
//     method: 'POST',
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ a: 1, b: 'Textual content' }),
//   })
//   const content = await rawResponse.json()

//   console.log(content)
// }
