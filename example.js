// import React, { useEffect } from 'react'
// import { StyleSheet, Text, View } from 'react-native'
// import * as BackgroundFetch from 'expo-background-fetch'
// import * as TaskManager from 'expo-task-manager'
// import * as Permissions from 'expo-permissions'
// import { Notifications } from 'expo'
// import { Button } from 'react-native'

// const BACKGROUND_FETCH_TASK = 'upload-job-task_test'

// TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
//   await fetch('https://merchant-app-development.azurewebsites.net/api/notfound-background')
//   console.log(BACKGROUND_FETCH_TASK, 'running')
//   return BackgroundFetch.Result.NewData
// })

// export default function App() {
//   useEffect(() => {
//     const initBackgroundFetch = async () => {
//       console.log('initBackgroundFetch()')

//       const notificationPermission = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS)
//       if (notificationPermission.status === 'granted') {
//         await Notifications.presentLocalNotificationAsync({
//           categoryId: 'JOB_UPLOAD_FAILED_CATEGORY',
//           title: 'Background Fetch',
//           body: 'Setting up jobs',
//           ios: { _displayInForeground: true },
//         })

//         const backgroundFetchStatus = await BackgroundFetch.getStatusAsync()
//         switch (backgroundFetchStatus) {
//           case BackgroundFetch.Status.Restricted:
//             console.log('Background fetch execution is restricted')
//             return

//           case BackgroundFetch.Status.Denied:
//             console.log('Background fetch execution is disabled')
//             return

//           default:
//             console.log('Background fetch execution allowed')

//             await BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
//               minimumInterval: 10,
//               startOnBoot: false,
//               stopOnTerminate: false,
//             })

//             await BackgroundFetch.setMinimumIntervalAsync(600)
//             console.log('registerTaskAsync')

//             break
//         }
//       }
//     }
//     initBackgroundFetch()
//   }, [])

//   const onDisableTask = async () => {
//     const isRegisterdFetch = await TaskManager.isTaskRegisteredAsync(BACKGROUND_FETCH_TASK)
//     if (isRegisterdFetch) await BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK)
//   }
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app! 2.1.13</Text>
//       <Button onPress={onDisableTask} title='Disable Background Task' color='#841584' />
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
