import { Text, StyleSheet, View, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Pedometer } from 'expo-sensors'
import { MaterialCommunityIcons } from '@expo/vector-icons'

export default function Sample() {
  const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking')
  const [stepCount, setStepCount] = useState(0)
  const [pastStepCount, setPastStepCount] = useState(0)

  useEffect(() => {
    let subscription: any

    const subscribe = async () => {
      try {
        const isAvailable = await Pedometer.isAvailableAsync()
        setIsPedometerAvailable(String(isAvailable))

        if (isAvailable) {
          const end = new Date()
          const start = new Date()
          start.setDate(end.getDate() - 1)

          // Get steps from past 24 hours
          const pastSteps = await Pedometer.getStepCountAsync(start, end)
          if (pastSteps) {
            setPastStepCount(pastSteps.steps)
          }

          // Watch live steps
          subscription = Pedometer.watchStepCount(result => {
            setStepCount(result.steps)
          })
        }
      } catch (error) {
        setIsPedometerAvailable('Could not get pedometer data: ' + error)
      }
    }

    subscribe()

    return () => {
      subscription && subscription.remove()
    }
  }, [])

  // Calculate progress towards daily goal (example: 10000 steps)
  const dailyGoal = 10000
  const progress = ((stepCount + pastStepCount) / dailyGoal) * 100

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <MaterialCommunityIcons name="shoe-print" size={40} color="#4CAF50" />
        <Text style={styles.title}>Step Counter</Text>
        
        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{stepCount + pastStepCount}</Text>
            <Text style={styles.statLabel}>Steps Today</Text>
          </View>
          
          <View style={styles.stat}>
            <Text style={styles.statValue}>{dailyGoal}</Text>
            <Text style={styles.statLabel}>Daily Goal</Text>
          </View>
        </View>

        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { width: `${Math.min(progress, 100)}%` }]} />
        </View>
        
        <Text style={styles.progressText}>
          {Math.round(progress)}% of daily goal
        </Text>

        {isPedometerAvailable !== 'true' && (
          <Text style={styles.errorText}>
            {isPedometerAvailable === 'checking' 
              ? 'Checking sensor availability...'
              : 'Pedometer not available'}
          </Text>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#333',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 20,
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  progressContainer: {
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    width: '100%',
    marginVertical: 10,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 5,
  },
  progressText: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  errorText: {
    color: '#f44336',
    marginTop: 10,
    textAlign: 'center',
  },
})