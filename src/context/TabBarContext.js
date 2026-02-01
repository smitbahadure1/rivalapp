import React, { createContext, useState, useContext, useRef } from 'react';
import { Animated } from 'react-native';

const TabBarContext = createContext();

export const TabBarProvider = ({ children }) => {
    const defaultVisible = true;
    const [isVisible, setIsVisible] = useState(defaultVisible);
    // Animation value: 0 = visible, 1 = hidden
    const animation = useRef(new Animated.Value(0)).current;

    const showTabBar = () => {
        if (isVisible) return;
        setIsVisible(true);
        Animated.timing(animation, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    const hideTabBar = () => {
        if (!isVisible) return;
        setIsVisible(false);
        Animated.timing(animation, {
            toValue: 1, // Will drive translateY
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    return (
        <TabBarContext.Provider value={{ isVisible, showTabBar, hideTabBar, animation }}>
            {children}
        </TabBarContext.Provider>
    );
};

export const useTabBar = () => useContext(TabBarContext);
