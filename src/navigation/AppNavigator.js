import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Dimensions, Animated } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import ExploreScreen from '../screens/ExploreScreen';
import NotificationScreen from '../screens/NotificationScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { TabBarProvider, useTabBar } from '../context/TabBarContext';

const Tab = createBottomTabNavigator();
const { width } = Dimensions.get('window');

// Placeholder for the "Analytics" tab seen in the reference
const PlaceholderScreen = () => <View style={{ flex: 1, backgroundColor: '#fff' }} />;

const CustomTabBar = ({ state, descriptors, navigation }) => {
    const { animation } = useTabBar();

    const translateY = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 150], // Slide down out of view
    });

    return (
        <Animated.View style={[styles.container, { transform: [{ translateY }] }]}>
            {/* Transparent "Crystal" Glass Capsule - LIGHT MODE */}
            <LinearGradient
                colors={['rgba(255, 255, 255, 0.85)', 'rgba(240, 240, 255, 0.95)']} // Frosted Light Glass
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.dock}
            >
                {/* Visual Glass Reflection (White sheen) */}
                <LinearGradient
                    colors={['rgba(255,255,255,0.9)', 'rgba(255,255,255,0)']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0.5, y: 1 }}
                    style={styles.glossHighlight}
                />

                {/* Subtle sheen across the top */}
                <View style={styles.topSheen} />

                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const isFocused = state.index === index;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name);
                        }
                    };

                    let iconName;
                    let label;
                    let IconComponent = Ionicons;

                    if (route.name === 'Home') {
                        iconName = isFocused ? 'home' : 'home-outline';
                        label = 'Home';
                    } else if (route.name === 'Explore') {
                        iconName = isFocused ? 'search' : 'search-outline';
                        label = 'Search';
                    } else if (route.name === 'Notifications') {
                        iconName = isFocused ? 'time' : 'time-outline';
                        label = 'History';
                    } else if (route.name === 'Profile') {
                        iconName = isFocused ? 'person' : 'person-outline';
                        label = 'Profile';
                    }

                    return (
                        <TouchableOpacity
                            key={route.key}
                            onPress={onPress}
                            style={styles.tabItem}
                            activeOpacity={0.7}
                        >
                            <View style={styles.iconWrapper}>
                                <IconComponent
                                    name={iconName}
                                    size={22}
                                    color={'#000'} // Dark icons for light mode
                                    style={{ opacity: isFocused ? 1 : 0.5 }}
                                />
                            </View>
                            <Text style={[styles.label, { opacity: isFocused ? 1 : 0.5 }]}>
                                {label}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </LinearGradient>
        </Animated.View>
    );
};

export default function AppNavigator() {
    return (
        <TabBarProvider>
            <NavigationContainer>
                <Tab.Navigator
                    tabBar={(props) => <CustomTabBar {...props} />}
                    screenOptions={{ headerShown: false }}
                >
                    <Tab.Screen name="Home" component={HomeScreen} />
                    <Tab.Screen name="Explore" component={ExploreScreen} />
                    <Tab.Screen name="Notifications" component={NotificationScreen} />
                    <Tab.Screen name="Profile" component={ProfileScreen} />
                </Tab.Navigator>
            </NavigationContainer>
        </TabBarProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 20, // Moved down slightly
        left: 0,
        right: 0,
        alignItems: 'center',
        pointerEvents: 'box-none',
    },
    dock: {
        flexDirection: 'row',
        borderRadius: 40, // Slightly reduced radius
        paddingVertical: 8, // Reduced height
        paddingHorizontal: 20,
        width: width * 0.85, // Reduced width for a sleeker look
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 8,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.6)',
        overflow: 'hidden',
    },
    glossHighlight: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 150,
        height: 150,
        borderRadius: 75,
        transform: [{ translateX: 30 }, { translateY: -40 }],
        opacity: 0.6,
    },
    topSheen: {
        position: 'absolute',
        top: 0,
        left: 20,
        right: 20,
        height: 1,
        backgroundColor: 'rgba(255,255,255,0.8)',
    },
    tabItem: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 48, // Reduced tap target width
        height: 44, // Reduced height
    },
    iconWrapper: {
        marginBottom: 2, // Tighter spacing
    },
    label: {
        fontSize: 9, // Smaller text
        color: '#000',
        fontWeight: '600',
    }
});
