import React, {useEffect} from 'react';
import {Alert, Platform} from 'react-native';
import Home from './screen/Home';

import {Notifications} from 'react-native-notifications';
import messaging from '@react-native-firebase/messaging';
import {
  requestUserPermission,
  registerNotificationHandler,
} from './services/notification';

requestUserPermission();
registerNotificationHandler();

let localNotification = Notifications.postLocalNotification({
  body: 'Local notification!',
  title: 'Local Notification Title',
  silent: false,
  category: 'SOME_CATEGORY',
  userInfo: {},
});

const App = () => {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    messaging().onNotificationOpenedApp((remoteMessage) => {
      'Notification caused app to open from background state:',
        console.log(remoteMessage.notification);
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
        }
      });

    return unsubscribe;
  }, []);

  return <Home />;
};

export default App;
