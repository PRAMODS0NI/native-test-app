import { Text, StyleSheet, View } from 'react-native'
import React, { Component } from 'react'
import { Ionicons } from '@expo/vector-icons'

export default function Home() {
    return (
      <View style={styles.container}>
        <Ionicons name='logo-tux' size={200}/>
      </View>
    )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  }
})