import TextData from "@/static/homeTexts.json";
import { Ionicons } from "@expo/vector-icons";
import { Tabs, useRouter } from "expo-router";
import { useTheme } from "react-native-paper";

export default function TabLayout() {
  const theme = useTheme();
  const router = useRouter();
  const lang = "fi";
  const text = TextData[lang].tabs;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.outlineVariant,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: `${text.home}`, // This should be the same title as the nested drawer navigations index file (home/index.tsx)
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
        listeners={{
          tabPress: (e) => {
            // On Home tab press, always go to the Home drawer root
            // Prevent default (would restore the last visited screen under Home)
            e.preventDefault();
            // Navigating here mounts the drawer and shows 'home/index.tsx'
            router.navigate("/(tabs)/home");
          },
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: `${text.search}`,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="camera"
        options={{
          title: `${text.camera}`,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="camera" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
