import { Text, StyleSheet, View, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import NetInfo, { NetInfoState } from '@react-native-community/netinfo'
import * as Network from 'expo-network'
import { Ionicons } from '@expo/vector-icons'

export default function Networks() {
  const [networkInfo, setNetworkInfo] = useState<NetInfoState | null>(null)
  const [expoNetworkInfo, setExpoNetworkInfo] = useState<{
    ipAddress?: string;
    macAddress?: string;
    isAirplaneMode?: boolean;
  }>({})

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(setNetworkInfo)

    // Add expo-network info fetching
    const getExpoNetworkInfo = async () => {
      const [ip, mac, airplane] = await Promise.all([
        Network.getIpAddressAsync(),
        Network.getMacAddressAsync(),
        Network.isAirplaneModeEnabledAsync()
      ])
      setExpoNetworkInfo({
        ipAddress: ip,
        macAddress: mac,
        isAirplaneMode: airplane
      })
    }

    getExpoNetworkInfo()
    return () => unsubscribe()
  }, [])

  const InfoCard = ({ title, value, icon }: { title: string, value: string | number | boolean, icon: string }) => (
    <View style={styles.card}>
      <Ionicons name={icon as any} size={24} color="#4A90E2" style={styles.icon} />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardValue}>{String(value)}</Text>
      </View>
    </View>
  )

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Ionicons 
          name={networkInfo?.isConnected ? "wifi" : "wifi-off"} 
          size={40} 
          color={networkInfo?.isConnected ? "#4CAF50" : "#F44336"} 
        />
        <Text style={styles.title}>Network Status</Text>
      </View>

      <View style={styles.infoContainer}>
        <InfoCard 
          title="Connection Type" 
          value={networkInfo?.type || 'Unknown'} 
          icon="radio-outline" 
        />
        
        <InfoCard 
          title="Connection Status" 
          value={networkInfo?.isConnected ? 'Connected' : 'Disconnected'} 
          icon="pulse-outline" 
        />

        <InfoCard 
          title="WiFi Enabled" 
          value={networkInfo?.isWifi ? 'Yes' : 'No'} 
          icon="wifi-outline" 
        />

        {networkInfo?.type === 'wifi' && (
          <>
            <InfoCard 
              title="WiFi Strength" 
              value={`${networkInfo?.strength || 0}%`} 
              icon="cellular-outline" 
            />
            <InfoCard 
              title="WiFi Frequency" 
              value={networkInfo?.details?.frequency || 'N/A'} 
              icon="analytics-outline" 
            />
            <InfoCard 
              title="IP Address" 
              value={networkInfo?.details?.ipAddress || 'N/A'} 
              icon="globe-outline" 
            />
          </>
        )}

        {networkInfo?.type === 'cellular' && (
          <>
            <InfoCard 
              title="Cellular Generation" 
              value={networkInfo?.details?.cellularGeneration || 'Unknown'} 
              icon="phone-portrait-outline" 
            />
            <InfoCard 
              title="Carrier" 
              value={networkInfo?.details?.carrier || 'Unknown'} 
              icon="business-outline" 
            />
          </>
        )}

        <InfoCard 
          title="Is Internet Reachable" 
          value={networkInfo?.isInternetReachable ? 'Yes' : 'No'} 
          icon="globe-outline" 
        />

        <InfoCard 
          title="Local IP Address" 
          value={expoNetworkInfo.ipAddress || 'N/A'} 
          icon="laptop-outline" 
        />
        
        <InfoCard 
          title="MAC Address" 
          value={expoNetworkInfo.macAddress || 'N/A'} 
          icon="hardware-chip-outline" 
        />
        
        <InfoCard 
          title="Airplane Mode" 
          value={expoNetworkInfo.isAirplaneMode ? 'On' : 'Off'} 
          icon="airplane-outline" 
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginLeft: 15,
    color: '#2C3E50',
  },
  infoContainer: {
    padding: 10,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  cardContent: {
    marginLeft: 15,
    flex: 1,
  },
  cardTitle: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 4,
  },
  cardValue: {
    fontSize: 16,
    color: '#2C3E50',
    fontWeight: '600',
  },
  icon: {
    backgroundColor: '#EBF5FF',
    padding: 8,
    borderRadius: 8,
  },
})