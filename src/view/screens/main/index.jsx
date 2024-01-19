import {
  StyleSheet,
  Platform,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import { Image } from "expo-image";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Notifications from "@/view/screens/main/Notifications";
import Scan from "@/view/screens/main/Scan";
import HubView from "@/view/screens/main/hub";
import AssetsView from "@/view/screens/main/assets";
import PayView from "@/view/screens/main/pay";
import ExploreView from "@/view/screens/main/explore";
import TradeView from "@/view/screens/main/trade";
import { useAuth } from "@/context/AuthProvider";
import { colors, fonts, gaps } from "@/utils/constants";

import HubIcon from "@/media/icons/HubIcon.svg";
import AssetsIcon from "@/media/icons/AssetsIcon.svg";
import PayIcon from "@/media/icons/PayIcon.svg";
import ExploreIcon from "@/media/icons/ExploreIcon.svg";
import TradeIcon from "@/media/icons/TradeIcon.svg";
import NotificationsIcon from "@/media/icons/NotificationsIcon.svg";
import ScanIcon from "@/media/icons/ScanIcon.svg";

const isWeb = Platform.OS === "web";

function CustomTabBar({ state, descriptors, navigation }) {
  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: colors.BgPrimary,
        borderTopWidth: 1,
        paddingTop: 12,
        paddingBottom: 28,
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
          headerStyle: { height: 50 },
          headerLeft: () => (
            <View style={styles.user}>
              <TouchableOpacity
                style={styles.avatar}
                onPress={() => navigation.toggleDrawer()}
              >
                <Image source={user.avatar} style={{ width: 32, height: 32 }} />
              </TouchableOpacity>
              <Text style={styles.username}>@{user.username}</Text>
            </View>
          ),
          headerRight: () => (
            <View style={styles.buttons}>
              <TouchableOpacity onPress={() => navigation.navigate("scan")}>
                <ScanIcon style={{ width: 24, height: 24 }} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("notifications")}
              >
                <NotificationsIcon style={{ width: 24, height: 24 }} />
              </TouchableOpacity>
            </View>
          ),
        })}
      />
      <MainStack.Screen
        name="scan"
        component={Scan}
        options={({ navigation }) => ({
          title: "Scan",
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
    // marginTop: 4,
    height: 40,
    marginLeft: isWeb ? gaps.screenMargin : 0,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  avatar: {
    borderRadius: 16,
    overflow: "hidden",
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
  },
  buttons: {
    marginTop: 4,
    marginRight: isWeb ? gaps.screenMargin : 0,
    flexDirection: "row",
    gap: 12,
  },
});
