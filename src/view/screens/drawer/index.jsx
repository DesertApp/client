import { useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MainStackView from "@/view/screens/main/index";
import Profile from "@/view/screens/drawer/Profile";
import Theme from "@/view/screens/drawer/Theme";
import Language from "@/view/screens/drawer/Language";
import AppIcon from "@/view/screens/drawer/AppIcon";
import InviteFriends from "@/view/screens/drawer/InviteFriends";
import ReportBug from "@/view/screens/drawer/ReportBug";
import FAQ from "@/view/screens/drawer/FAQ";
import Protocol from "@/view/screens/drawer/Protocol";
import TermsAndConditions from "@/view/screens/drawer/TermsAndConditions";
import PrivacyPolicy from "@/view/screens/drawer/PrivacyPolicy";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import BackIcon from "@/media/icons/BackIcon.svg";

import ProfileIcon from "@/media/icons/ProfileIcon.svg";
import ThemeIcon from "@/media/icons/ThemeIcon.svg";
import LanguageIcon from "@/media/icons/LanguageIcon.svg";
import IconAppIcon from "@/media/icons/IconAppIcon.svg";
import InviteFriendsIcon from "@/media/icons/InviteFriendsIcon.svg";
import ReportBugIcon from "@/media/icons/ReportBugIcon.svg";
import FAQIcon from "@/media/icons/FAQIcon.svg";
import ProtocolIcon from "@/media/icons/ProtocolIcon.svg";
import TermsAndConditionsIcon from "@/media/icons/TermsAndConditionsIcon.svg";
import PrivacyPolicyIcon from "@/media/icons/PrivacyPolicyIcon.svg";
import LogOutIcon from "@/media/icons/LogOutIcon.svg";

import { Image } from "expo-image";
import { useAuth } from "@/context/AuthProvider";

import {
  useWindowDimensions,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {
  SafeAreaView,
  DrawerContentScrollView,
  Group,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { colors, fonts, gaps } from "@/utils/constants";

const Drawer = createDrawerNavigator();
export default function DrawerView() {
  const { user } = useAuth();

  const settingsItems = [
    {
      component: Profile,
      icon: ProfileIcon,
      label: "Profile",
      name: "profile",
    },
    { component: Theme, icon: ThemeIcon, label: "Theme", name: "theme" },
    {
      component: Language,
      icon: LanguageIcon,
      label: "Language",
      name: "language",
    },
    {
      component: AppIcon,
      icon: IconAppIcon,
      label: "App Icon",
      name: "app-icon",
    },
  ];

  const shareAndSupportItems = [
    {
      component: InviteFriends,
      icon: InviteFriendsIcon,
      label: "Invite Friends",
      name: "invite-friends",
    },
    {
      component: ReportBug,
      icon: ReportBugIcon,
      label: "Report Bug",
      name: "report-bug",
    },
    {
      component: FAQ,
      icon: FAQIcon,
      label: "FAQ",
      name: "faq",
    },
  ];

  const aboutItems = [
    {
      component: Protocol,
      icon: ProtocolIcon,
      label: "Protocol",
      name: "protocol",
    },
    {
      component: TermsAndConditions,
      icon: TermsAndConditionsIcon,
      label: "Terms and Conditions",
      name: "terms-and-conditions",
    },
    {
      component: PrivacyPolicy,
      icon: PrivacyPolicyIcon,
      label: "Privacy Policy",
      name: "privacy-policy",
    },
  ];

  const dimensions = useWindowDimensions();
  const isLargeScreen = dimensions.width >= 1024;

  const [contentHeight, setContentHeight] = useState(0);

  const insets = useSafeAreaInsets();

  return (
    <Drawer.Navigator
      drawerContent={(props) => {
        return (
          <DrawerContentScrollView
            onContentSizeChange={(_, height) => setContentHeight(height)}
            scrollEnabled={contentHeight > dimensions.height}
            contentContainerStyle={{
              paddingTop: insets.top,
            }}
            {...props}
          >
            <View style={styles.header}>
              <View style={styles.topPart}>
                <Image source={user.avatar} style={styles.avatar} />
                <View style={styles.backIconWrapper}>
                  <TouchableOpacity
                    onPress={() => props.navigation.closeDrawer()}
                  >
                    <BackIcon width={24} height={24} />
                  </TouchableOpacity>
                </View>
              </View>

              <Text style={styles.username}>@{user.username}</Text>
            </View>
            {/* Settings */}
            <Text style={styles.groupTitle}>Settings</Text>
            <View style={styles.group}>
              {settingsItems.map((Item, i) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => props.navigation.navigate(Item.name)}
                  style={styles.item}
                >
                  <Item.icon width={24} height={24} />
                  <Text style={styles.itemLabel}>{Item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
            {/* Share & Support */}
            <Text style={styles.groupTitle}>Share & Support</Text>
            <View style={styles.group}>
              {shareAndSupportItems.map((Item, i) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => props.navigation.navigate(Item.name)}
                  style={styles.item}
                >
                  <Item.icon width={24} height={24} />
                  <Text>{Item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
            {/* About */}
            <Text style={styles.groupTitle}>About</Text>
            <View style={styles.group}>
              {aboutItems.map((Item, i) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => props.navigation.navigate(Item.name)}
                  style={styles.item}
                >
                  <Item.icon width={24} height={24} />
                  <Text>{Item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
            {/* Logout */}
            <View style={styles.group}>
              <TouchableOpacity
                style={styles.item}
                onPress={() => console.log("logout")}
              >
                <LogOutIcon width={24} height={24} />
                <Text>Log out</Text>
              </TouchableOpacity>
            </View>
            <DrawerItemList {...props} />
          </DrawerContentScrollView>
        );
      }}
      screenOptions={{
        headerShown: true,
        drawerItemStyle: { display: "none" },
        drawerType: isLargeScreen ? "permanent" : "front",
        drawerStyle: isLargeScreen ? null : { width: "100%" },
        drawerPosition: "right",
      }}
    >
      <Drawer.Screen
        name="MainStackView"
        options={{ headerShown: false }}
        component={MainStackView}
      />
      {[...settingsItems, ...shareAndSupportItems, ...aboutItems].map(
        (Item, i) => {
          return (
            <Drawer.Screen
              key={i}
              name={Item.name}
              options={{
                title: Item.label,
              }}
              component={Item.component}
            />
          );
        }
      )}
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    paddingTop: 0,
  },
  header: {
    marginHorizontal: "auto",
    alignItems: "center",
    flex: 1,
    gap: 6,
    width: "100%",
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  topPart: {
    position: "relative",
    alignItems: "center",
    width: "100%",
  },
  username: {
    fontSize: 18,
    fontFamily: fonts.SemiBold,
  },
  backIconWrapper: {
    position: "absolute",
    left: 4,
    top: "50%",
    transform: [{ translateY: -12 }],
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  list: {
    backgroundColor: "white",
    padding: 16,
  },
  groupTitle: {
    marginHorizontal: 12,
    marginBottom: 6,
    paddingLeft: 8,
    fontSize: 12,
    fontFamily: fonts.Regular,
  },
  group: {
    marginBottom: 16,
    marginHorizontal: 12,
    borderWidth: 1,
    borderColor: colors.BorderColor,
    borderRadius: 8,
    shadowColor: "#eee",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  itemLabel: {
    fontFamily: fonts.Medium,
    fontSize: 16,
  },
  avatar: {
    width: 40,
    height: 40,
  },
});
