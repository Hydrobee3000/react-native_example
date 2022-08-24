import React, { useState, useEffect } from 'react'
import { useAsyncStorage } from '@react-native-async-storage/async-storage'
import { StatusBar } from 'expo-status-bar'
import { Button, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ShowStoredValue from './components/ShowStoredValue'

export default function App() {
  const [count, setCount] = useState(0)

  const [value, setValue] = useState('value')
  const { getItem, setItem } = useAsyncStorage('@storage_key')

  useEffect(() => {
    readItemFromStorage()
  }, [])

  const readItemFromStorage = async () => {
    const item = await getItem()
    setValue(item)
  }

  const writeItemToStorage = async (newValue) => {
    await setItem(newValue)
    setValue(newValue)
  }

  return (
    <View style={styles.container}>
      <View>
        <Button
          onPress={() => {
            setCount(count + 1)
          }}
          title='Click'
        />

        <Text style={{ marginTop: 15 }}>You clicked {count} times</Text>

        <Button
          onPress={() => {
            setCount(0)
          }}
          title='Reset'
        />
        <Text> </Text>
        <Button
          onPress={() => {
            storeData('first save')
          }}
          title='Save'
        />
      </View>
      <Text style={{ marginTop: 40, marginBottom: 15 }}>Current value: {value}</Text>

      <Button
        onPress={() => {
          writeItemToStorage(Math.random().toString(36).substr(2, 5))
        }}
        title='Update value'
      />
      <ShowStoredValue />
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

// export default function App() {
//   const [count, setCount] = useState(0)
//   const [storedValue, setStoredValue] = useState(null)

//   // const sendRequest = async () => {
//   //   const rawResponse = await fetch('https://httpbin.org/post', {
//   //     method: 'POST',
//   //     headers: {
//   //       Accept: 'application/json',
//   //       'Content-Type': 'application/json',
//   //     },
//   //     body: JSON.stringify({ a: 1, b: 'Textual content' }),
//   //   })
//   //   const content = await rawResponse.json()

//   //   console.log(content)
//   // }

//   const storeData = async (value) => {
//     try {
//       // const jsonValue = JSON.stringify(value)
//       await AsyncStorage.setItem('@storage_Keys', value)
//     } catch (e) {
//       // saving error
//     }
//   }

//   const getData = async () => {
//     try {
//       const value = await AsyncStorage.getItem('@storage_Keys')
//       if (value !== null) {
//         setStoredValue(value)
//         // value previously stored
//       }
//     } catch (e) {
//       // error reading value
//     }
//   }
//   // AsyncStorage.clear()
//   getData()
//   const getAllKeys = async () => {
//     let keys = []
//     try {
//       keys = await AsyncStorage.getAllKeys()
//     } catch (e) {
//       // read key error
//     }

//     console.log(keys)
//     // example console.log result:
//     // ['@MyApp_user', '@MyApp_key']
//   }
//   getAllKeys()

//   return (
//     <View style={styles.container}>
//       <View>
//         <Button
//           onPress={() => {
//             setCount(count + 1)
//           }}
//           title='Click'
//         />

//         <Text>You clicked {count} times</Text>

//         <Button
//           onPress={() => {
//             setCount(0)
//           }}
//           title='Reset'
//         />
//         <Text> </Text>
//         <Button
//           onPress={() => {
//             storeData('first save')
//           }}
//           title='Save'
//         />
//       </View>
//       <ShowStoredValue storedValue={storedValue} />
//       <StatusBar style='auto' />
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// })
