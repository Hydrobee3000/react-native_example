import React from 'react'
import { Text } from 'react-native'

const ShowStoredValue = ({ storedValue }) => {
  if (storedValue) {
    return <Text>{storedValue}</Text>
  }
}

export default ShowStoredValue
