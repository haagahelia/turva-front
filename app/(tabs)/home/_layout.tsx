import { Ionicons } from '@expo/vector-icons';
import { Drawer } from 'expo-router/drawer';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export default function HomeDrawerLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Drawer
        screenOptions={{
          headerShown: true,
          drawerActiveTintColor: '#007AFF',
          drawerInactiveTintColor: '#666',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          drawerType: 'front',
          drawerStyle: {
            backgroundColor: '#fff',
            width: 240,
          },
        }}
      >
      <Drawer.Screen
        name="index"
        options={{
          title: 'Index',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="profile"
        options={{
          title: 'Profile',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),// headerRight is needed for adding icons to the header these can be made functional later
          headerRight: () => (
            <View style={styles.headerRight}>
              <TouchableOpacity style={styles.headerButton}>
                <Ionicons name="share" size={24} color="#007AFF" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.headerButton}>
                <Ionicons name="ellipsis-horizontal" size={24} color="#007AFF" />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="settings"
        options={{
          title: 'Settings',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="notifications"
        options={{
          title: 'Notifications',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="notifications" size={size} color={color} />
          ),
         
        }}
      />
    </Drawer>
    </>
  );
}

const styles = StyleSheet.create({
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  headerButton: {
    marginLeft: 15,
    padding: 5,
  },
});
