import ThemeButton from "@/src/components/ThemeButton";
import LanguageButton from "@/src/components/LanguageButton";
import TextData from '@/static/homeTexts.json';
import { Ionicons } from "@expo/vector-icons";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { StatusBar } from "expo-status-bar";
import { Pressable, View } from "react-native";
import { useTheme } from "react-native-paper";

// Closes the drawer navigation panel
// Not necessary for functionality, but included to match the prototype
function CustomDrawerContent(props: any) {
  const theme = useTheme();

  return (
    <DrawerContentScrollView
      {...props}
      style={{ backgroundColor: theme.colors.surface }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
          paddingHorizontal: 16,
          paddingVertical: 12,
          backgroundColor: theme.colors.surface,
        }}
      >
        <Pressable
          onPress={() => props.navigation.closeDrawer()}
          hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
          accessibilityRole="button"
          accessibilityLabel="Close menu"
        >
          <Ionicons name="close" size={24} color={theme.colors.onSurface} />
        </Pressable>
      </View>
      <DrawerItemList {...props} />
      <View
        style={{
          paddingHorizontal: 16,
          paddingVertical: 12,
          borderTopWidth: 1,
          borderTopColor: theme.colors.outlineVariant,
          marginTop: 8,
        }}
      >
        <ThemeButton />
        <LanguageButton />
      </View>
    </DrawerContentScrollView>
  );
}

export default function HomeDrawerLayout() {
  const router = useRouter();
  const theme = useTheme();
  const lang = 'fi'
  const text = TextData[lang]
  return (
    <>
      <StatusBar style={theme.dark ? "light" : "dark"} />
      <Drawer
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerShown: true,
          headerTitle: () => null, // Removing this will show the screen title in the header
          drawerActiveTintColor: theme.colors.primary,
          drawerInactiveTintColor: theme.colors.onSurfaceVariant,
          headerStyle: {
            backgroundColor: theme.colors.surface,
          },
          headerTitleStyle: {
            fontWeight: "bold",
            color: theme.colors.onSurface,
          },
          headerTintColor: theme.colors.onSurface,
          headerRight: () => (
            <Pressable
              onPress={() => router.push("/(tabs)/home/profile")}
              hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
              style={{ marginRight: 12 }}
            >
              <Ionicons
                name="person-circle-outline"
                size={26}
                color={theme.colors.primary}
              />
            </Pressable>
          ),
          drawerType: "front",
          drawerStyle: {
            backgroundColor: theme.colors.surface,
            minWidth: 250,
          },
        }}
      >
        <Drawer.Screen
          name="profile"
          options={{
            // Hide from drawer menu but keep it as a route
            drawerItemStyle: { display: "none" },
            title: `${text.navigationTitles.profile}`,
            drawerIcon: ({ color, size }) => (
              <Ionicons name="person" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="index"
          options={{
            title: `${text.navigationTitles.index}`,
            drawerIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="settings"
          options={{
            // Hide from drawer menu but keep it as a route
            drawerItemStyle: { display: "none" },
            title: `${text.navigationTitles.settings}`,
            drawerIcon: ({ color, size }) => (
              <Ionicons name="settings" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="rewards"
          options={{
            // Hide from drawer menu but keep it as a route
            drawerItemStyle: { display: "none" },
            title: `${text.navigationTitles.rewards}`,
            drawerIcon: ({ color, size }) => (
              <Ionicons name="gift" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="news"
          options={{
            title: `${text.navigationTitles.news}`,
            drawerIcon: ({ color, size }) => (
              <Ionicons name="newspaper" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="safe-haaga-helia"
          options={{
            title: `${text.navigationTitles.safeHaagaHelia}`,
            drawerIcon: ({ color, size }) => (
              <Ionicons name="shield-checkmark" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="rules"
          options={{
            title: `${text.navigationTitles.rules}`,
            drawerIcon: ({ color, size }) => (
              <Ionicons name="document-text" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="crisis-team-contact"
          options={{
            title: `${text.navigationTitles.crisisTeamContact}`,
            drawerIcon: ({ color, size }) => (
              <Ionicons name="people" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="campus-instructions"
          options={{
            title: `${text.navigationTitles.campusInstructions}`,
            drawerIcon: ({ color, size }) => (
              <Ionicons name="school" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="emergency-app"
          options={{
            title: `${text.navigationTitles.emergencyApp}`,
            drawerIcon: ({ color, size }) => (
              <Ionicons name="call" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="about-app"
          options={{
            title: `${text.navigationTitles.about}`,
            drawerIcon: ({ color, size }) => (
              <Ionicons name="information-circle" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="safety-briefing"
          options={{
            // Hide from drawer menu but keep it as a route
            drawerItemStyle: { display: "none" },
            title: `${text.navigationTitles.safetyBriefing}`,
          }}
        />
        <Drawer.Screen
          name="report-description-screen"
          options={{
            // Hide from drawer menu but keep it as a route
            drawerItemStyle: { display: "none" },
          }}
        />
        <Drawer.Screen
          name="report-form-screen"
          options={{
            // Hide from drawer menu but keep it as a route
            drawerItemStyle: { display: "none" },
          }}
        />
        <Drawer.Screen
          name="game"
          options={{ drawerItemStyle: { display: "none" } }} // hide from drawer but keep it as a route
        />
        <Drawer.Screen
          name="safety-info"
          options={{
            // Hide from drawer menu but keep it as a route
            drawerItemStyle: { display: "none" },
            title: `${text.navigationTitles.safetyInfo}`,
            headerLeft: () => (
              <Pressable
                onPress={() => router.navigate("/(tabs)/home/safety-briefing")}
                hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
                style={{ marginLeft: 12 }}
              >
                <Ionicons
                  name="arrow-back"
                  size={24}
                  color={theme.colors.primary}
                />
              </Pressable>
            ),
          }}
        />
      </Drawer>
    </>
  );
}
