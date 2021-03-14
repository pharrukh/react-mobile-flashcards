import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import AsyncStorage from '@react-native-async-storage/async-storage'

const NOTIFICATION_KEY = 'DeckApp:notifications'

export function getDeckTitle(str) {
  return str.replace(/\W/g, '-')
}


export const INITIAL_DATA = {
  Uzbekistan: {
    title: 'Uzbekistan',
    questions: [
      {
        question: 'Tamerlane was born in 1336',
        answer: 'True'
      },
      {
        question: "Plato's and Aristotle's works were scrutinized by Avicena",
        answer: 'True'
      },
      {
        question: 'Tamerlane could not read or write',
        answer: 'True'
      },
      {
        question: 'Samarkand is located in Uzbekistan',
        answer: 'True'
      },
      {
        question: 'Uzbek language is closer to Turkish than Tajik',
        answer: 'True'
      },
      {
        question: 'Population of Uzbekistan is bigger than 30 millions',
        answer: 'True'
      },
      {
        question: 'Samarkand was once a capical of Uzbekistan',
        answer: 'True'
      },
      {
        question: 'Uzbekistan is located in Central America',
        answer: 'False'
      },
      {
        question: 'Registan square is in Bukhara',
        answer: 'False'
      },
      {
        question: 'Mathematics was popular in Uzbekistan in 18th century',
        answer: 'True'
      },
      {
        question: 'Ibn Khaldun met Tamerlane',
        answer: 'True'
      }
    ]
  },
  Muqaddimah: {
    title: 'Muqaddimah',
    questions: [
      {
        question: 'Ibn Khaldun is the author of the Muqaddimah',
        answer: 'True'
      }
    ]
  }
}

export function getDailyReminderValue() {
  return {
    today: "👋 Don't forget to log your data today!"
  }
}


export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification() {
  return {
    content: {
      title: "Time's up!",
      body: 'Change sides!',
    },

    // body: "👋 don't forget to take a quiz today!",
    // ios: {
    //   sound: true,
    // },
    // android: {
    //   sound: true,
    //   priority: 'high',
    //   sticky: false,
    //   vibrate: true,
    // }
    trigger: { seconds: 1, repeats: true }
  }
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()
              Notifications.scheduleNotificationAsync(
                {
                  content: {
                    title: "You've got mail! 📬",
                    body: 'Here is the notification body',
                    data: { data: 'goes here' },
                  },
                }
              )

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}