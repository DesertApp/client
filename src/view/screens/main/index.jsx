import { StyleSheet, TouchableOpacity, View, Text, Image } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Notifications from "@/view/screens/main/Notifications";
import HubView from "@/view/screens/main/hub";
import AssetsView from "@/view/screens/main/assets";
import PayView from "@/view/screens/main/pay";
import ExploreView from "@/view/screens/main/explore";
import TradeView from "@/view/screens/main/trade";
import { useAuth } from "@/context/AuthProvider";
import { colors } from "@/utils/constants";

import HubIcon from "@/media/icons/HubIcon.svg";
import AssetsIcon from "@/media/icons/AssetsIcon.svg";
import PayIcon from "@/media/icons/PayIcon.svg";
import ExploreIcon from "@/media/icons/ExploreIcon.svg";
import TradeIcon from "@/media/icons/TradeIcon.svg";
import NotificationsIcon from "@/media/icons/NotificationsIcon.svg";

function CustomTabBar({ state, descriptors, navigation }) {
  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: colors.BgPrimary,
        height: 60,
        borderTopWidth: 1,
        borderTopColor: colors.BorderColor,
        alignItems: "center",
      }}
    >
      {state.routes.map((route, i) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === i;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        const icon = options.tabBarIcon;

        return (
          <TouchableOpacity
            key={i}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1, alignItems: "center" }}
          >
            {icon({
              focused: isFocused,
              size: 24,
              color: isFocused ? colors.Yellow500 : colors.TextPrimary,
            })}

            <Text style={{ color: colors.TextPrimary }}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const Tab = createBottomTabNavigator();
const TabView = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={({ route }) => ({
        tabBarLabelPosition: "below-icon",
        tabBarInactiveTintColor: colors.TextPrimary,
        tabBarActiveTintColor: colors.Yellow500,
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "hub") {
            return <HubIcon width={size} height={size} stroke={color} />;
          } else if (route.name === "assets") {
            return <AssetsIcon width={size} height={size} fill={color} />;
          } else if (route.name === "pay") {
            return <PayIcon width={size} height={size} stroke={color} />;
          } else if (route.name === "explore") {
            return <ExploreIcon width={size} height={size} stroke={color} />;
          } else if (route.name === "trade") {
            return <TradeIcon width={size} height={size} stroke={color} />;
          }
        },
      })}
    >
      <Tab.Screen name="hub" component={HubView} />
      <Tab.Screen name="assets" component={AssetsView} />
      <Tab.Screen name="pay" component={PayView} />
      <Tab.Screen name="explore" component={ExploreView} />
      <Tab.Screen name="trade" component={TradeView} />
    </Tab.Navigator>
  );
};

const MainStack = createNativeStackNavigator();
export default function MainStackView() {
  const { user } = useAuth();

  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="TabView"
        component={TabView}
        options={({ navigation }) => ({
          title: "",
          headerLeft: () => (
            <View style={styles.user}>
              <TouchableOpacity
                style={styles.avatar}
                onPress={() => navigation.toggleDrawer()}
              >
                <Image source={user.avatar} />
              </TouchableOpacity>
              <Text style={styles.username}>{user.username}</Text>
            </View>
          ),
          headerRight: () => (
            <TouchableOpacity
              style={styles.avatar}
              onPress={() => navigation.navigate("notifications")}
            >
              <NotificationsIcon width={24} height={24} />
            </TouchableOpacity>
          ),
        })}
      />
      <MainStack.Screen
        name="notifications"
        component={Notifications}
        options={({ navigation }) => ({
          title: "Notifications",
        })}
      />
    </MainStack.Navigator>
  );
}

const styles = StyleSheet.create({
  user: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    overflow: "hidden",
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
