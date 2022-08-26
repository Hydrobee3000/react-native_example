import React, { useState } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import * as BackgroundFetch from 'expo-background-fetch'
import * as TaskManager from 'expo-task-manager'
import { useAsyncStorage } from '@react-native-async-storage/async-storage'

const BACKGROUND_FETCH_TASK = 'background-fetch'

// 1. Define the task by providing a name and the function that should be executed
// Note: This needs to be called in the global scope (e.g outside of your React components)
TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
  const now = Date.now()

  console.log(BACKGROUND_FETCH_TASK, 'running')
  console.log(`Got background fetch call at date: ${new Date(now).toISOString()}`)

  fetch(`https://jsonplaceholder.typicode.com/todos/1`)
    .then((response) => response.json())
    .then((json) => {
      console.log(json)
    })

  // Be sure to return the successful result type!
  return BackgroundFetch.BackgroundFetchResult.NewData
})

// 2. Register the task at some point in your app by providing the same name, and some configuration options for how the background fetch should behave
// Note: This does NOT need to be in the global scope and CAN be used in your React components!
// async function registerBackgroundFetchAsync() {
//   console.log('register')
//   return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
//     minimumInterval: 60 * 15, // 15 minutes
//     stopOnTerminate: false, // android only,
//     startOnBoot: true, // android only
//   })
// }

const registerBackgroundFetchAsync = async () => {
  console.log('registerBackgroundFetchAsync()')

  await BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
    minimumInterval: 1, // 1 minutes
    // minimumInterval: 60 * 15, // 15 minutes
    stopOnTerminate: false, // android only,
    startOnBoot: true, // android only
  })

  await BackgroundFetch.setMinimumIntervalAsync(600)
  console.log('registerTaskAsync')
}
// 3. (Optional) Unregister tasks by specifying the task name
// This will cancel any future background fetch calls that match the given name
// Note: This does NOT need to be in the global scope and CAN be used in your React components!
async function unregisterBackgroundFetchAsync() {
  console.log('unregister')
  return BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK)
}

//
//
//

export default function App() {
  const [count, setCount] = useState(0)
  const { getItem, setItem, removeItem } = useAsyncStorage('@storage_key')

  const [isRegistered, setIsRegistered] = React.useState(false)
  const [status, setStatus] = React.useState(null)

  React.useEffect(() => {
    checkStatusAsync()
    readItemFromStorage()
    registerBackgroundFetchAsync()
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

  const checkStatusAsync = async () => {
    const status = await BackgroundFetch.getStatusAsync()
    const isRegistered = await TaskManager.isTaskRegisteredAsync(BACKGROUND_FETCH_TASK)
    setStatus(status)
    setIsRegistered(isRegistered)
  }

  // const onDisableTask = async () => {
  //   const isRegisterdFetch = await TaskManager.isTaskRegisteredAsync(BACKGROUND_FETCH_TASK)
  //   if (isRegisterdFetch) {
  //     await BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK)

  //     console.log('unregister')
  //   }
  // }

  const toggleFetchTask = async () => {
    if (isRegistered) {
      await unregisterBackgroundFetchAsync()
    } else {
      await registerBackgroundFetchAsync()
    }

    checkStatusAsync()
  }

  return (
    <View style={styles.container}>
      <View>
        <Text>
          Background fetch status:{' '}
          <Text style={{ fontWeight: 'bold' }}>{status && BackgroundFetch.BackgroundFetchStatus[status]}</Text>
        </Text>
        <Text style={{ marginTop: 20 }}>
          Background fetch task name:{' '}
          <Text style={{ fontWeight: 'bold' }}>{isRegistered ? BACKGROUND_FETCH_TASK : 'Not registered yet!'}</Text>
        </Text>
      </View>
      <View style={{ marginTop: 20 }}>
        <Button title={'toggle'} onPress={toggleFetchTask} />
      </View>
      {/* 
      
      */}
      <View style={{ marginTop: 40 }}>
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
        <Text></Text>
        <Button
          onPress={() => {
            writeItemToStorage(count.toString())
          }}
          title='Save'
        />
      </View>
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
