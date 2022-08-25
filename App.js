import React, { useState, useEffect } from 'react'
import { useAsyncStorage } from '@react-native-async-storage/async-storage'
import { StatusBar } from 'expo-status-bar'
import { Button, FlatList, StyleSheet, Text, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
// import { checkAPI } from './Api'
import BackgroundFetch from 'react-native-background-fetch'

export default function App() {
  const [count, setCount] = useState(0)

  const { getItem, setItem, removeItem } = useAsyncStorage('@storage_key')

  useEffect(() => {
    initServices()
  }, [])

  const initServices = async () => {
    await readItemFromStorage()
    await initBackgroundFetch() // Initialize BackgroundFetch
  }

  // Start the background worker
  const initBackgroundFetch = async () => {
    console.log('initBackgroundFetch')
    const status = await BackgroundFetch.configure(
      {
        minimumFetchInterval: 15, // 15 minutes
        stopOnTerminate: false, // Set false to continue background-fetch events after user terminates the app.
        // enableHeadless: true, // Set true to enable React Native's Headless JS mechanism, for handling fetch events after app termination
        startOnBoot: true, // Set true to initiate background-fetch events when the device is rebooted.
        // ADDITIONAL CONFIG HERE
      },
      handleTask,
      onTimeout
    )

    console.log('[ RNBF STATUS ]', status)
  }

  // handleTask is called periodically when RNBF triggers an event
  const handleTask = async (taskId) => {
    console.log('store value: ', count)
    console.log('[ RNBF TASK ID: ]', taskId)

    // DO BACKGROUND WORK HERE

    // This MUST be called in order to signal to the OS that your task is complete
    BackgroundFetch.finish(taskId)
  }

  const onTimeout = async () => {
    // The timeout function is called when the OS signals that the task has reached its maximum execution time.

    // ADD CLEANUP WORK HERE (IF NEEDED)

    BackgroundFetch.finish(taskId)
  }
  const readItemFromStorage = async () => {
    const item = await getItem()
    // setValue(item)
    setCount(item)
  }

  const writeItemToStorage = async (newValue) => {
    await setItem(newValue)
    // await checkAPI.postData(newValue)
    // setValue(newValue)
    setCount(newValue)
  }

  const sendRequest = async (value) => {
    const content = axios.post('http://localhost:7261/example', { data: value })

    // const response = await fetch('https://localhost:7261/example', {
    //   method: 'POST',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: value,
    // })
    // const content = await response.json()

    console.log(content)
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
            // sendRequest(count)
          }}
          title='Save'
        />
      </View>
      {/* <Button onPress={scheduleTask} title='Do background work' /> */}
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
