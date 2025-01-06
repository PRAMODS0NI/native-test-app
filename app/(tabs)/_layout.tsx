import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

// Define tab configurations
const TAB_CONFIG = [
  {
    name: "home",
    icon: "home",
    label: "Home",
  },
  {
    name: "battery",
    icon: "battery-full",
    label: "Battery",
  },
  {
    name: "camera",
    icon: "camera",
    label: "Camera",
  },
  {
    name: "jadoo",
    icon: "leaf",
    label: "Jadoo",
  },
  {
    name: "network",
    icon: "globe",
    label: "Network",
  },
  {
    name: "sample",
    icon: "footsteps",
    label: "Steps",
  },
] as const;

// Common tab styles
const TAB_STYLES = {
  tabBarStyle: {
    backgroundColor: "#000000",
    borderColor: "transparent",
  },
};

const _layout = () => {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      {TAB_CONFIG.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name={tab.icon} size={size} color={color} />
            ),
            tabBarLabel: tab.label,
            ...TAB_STYLES,
          }}
        />
      ))}
    </Tabs>
  );
};

export default _layout;
