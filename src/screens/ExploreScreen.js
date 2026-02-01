import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Platform,
    Dimensions,
    ImageBackground
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTabBar } from '../context/TabBarContext';


const APP_FONT = Platform.OS === 'ios' ? 'System' : 'sans-serif-medium';
const BODY_FONT = Platform.OS === 'ios' ? 'System' : 'sans-serif';


const HAPPENING_NOW = [
    {
        id: 1,
        title: 'SpaceX Starship launches successfully',
        category: 'Science',
        image: 'https://images.unsplash.com/photo-1517976487492-5750f3195933?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    },
    {
        id: 2,
        title: 'Apple announces new VR headset',
        category: 'Tech',
        image: 'https://images.unsplash.com/photo-1592478411213-61535fdd861d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    },
    {
        id: 3,
        title: 'AI Art wins major competition',
        category: 'Art',
        image: 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    },
    {
        id: 4,
        title: 'Global EV sales surpass combustion',
        category: 'Auto',
        image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    },
    {
        id: 5,
        title: 'New stadium design revealed',
        category: 'Sports',
        image: 'https://images.unsplash.com/photo-1522778119026-d647f0565c6a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    }
];

const TRENDS = [
    { id: 1, topic: '#OpenAI', volume: '125K', category: 'Technology' },
    { id: 2, topic: 'Elections 2026', volume: '540K', category: 'Politics' },
    { id: 3, topic: '#DunePart3', volume: '89K', category: 'Movies' },
    { id: 4, topic: 'Champions League', volume: '2.1M', category: 'Sports' },
    { id: 5, topic: '$NVDA', volume: '45K', category: 'Finance' },
    { id: 6, topic: 'Remote Work', volume: '320K', category: 'Business' },
    { id: 7, topic: '#Cyberpunk2077', volume: '12K', category: 'Gaming' },
    { id: 8, topic: 'Sustainable Fashion', volume: '210K', category: 'Lifestyle' },
    { id: 9, topic: 'Mars Mission', volume: '98K', category: 'Science' },
    { id: 10, topic: '#ReactConf', volume: '15K', category: 'Dev' },
];

export default function ExploreScreen() {
    const [searchQuery, setSearchQuery] = useState('');
    const { showTabBar, hideTabBar } = useTabBar();
    const lastOffsetY = useRef(0);

    const handleScroll = (event) => {
        const currentOffset = event.nativeEvent.contentOffset.y;
        const diff = currentOffset - lastOffsetY.current;

        if (Math.abs(diff) < 10) return;

        if (currentOffset <= 0) {
            showTabBar();
        } else if (diff > 0 && currentOffset > 50) {
            hideTabBar();
        } else if (diff < 0) {
            showTabBar();
        }
        lastOffsetY.current = currentOffset;
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.searchContainer}>
                    <Feather name="search" size={20} color="#666" style={styles.searchIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Search Community"
                        placeholderTextColor="#999"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>
                <TouchableOpacity style={styles.gearButton}>
                    <Ionicons name="options-outline" size={24} color="#1a1a1a" />
                </TouchableOpacity>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
                onScroll={handleScroll}
                scrollEventThrottle={16}
            >

                {/* Section: Happening Now (Horizontal Cards) */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Happening Now</Text>
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.cardsScroll}>
                    {HAPPENING_NOW.map((item) => (
                        <TouchableOpacity key={item.id} style={styles.cardContainer}>
                            <ImageBackground source={{ uri: item.image }} style={styles.cardImage} imageStyle={{ borderRadius: 20 }}>
                                <LinearGradient
                                    colors={['transparent', 'rgba(0,0,0,0.8)']}
                                    style={styles.cardGradient}
                                >
                                    <View style={styles.cardBadge}>
                                        <Text style={styles.cardBadgeText}>{item.category}</Text>
                                    </View>
                                    <Text style={styles.cardTitle}>{item.title}</Text>
                                </LinearGradient>
                            </ImageBackground>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Section: Trending (Ranked List) */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Global Trends</Text>
                    <TouchableOpacity><Text style={styles.seeAllText}>Show more</Text></TouchableOpacity>
                </View>

                <View style={styles.trendsContainer}>
                    {TRENDS.map((item, index) => (
                        <TouchableOpacity key={item.id} style={styles.trendRow}>
                            <Text style={styles.trendRank}>{index + 1}</Text>
                            <View style={styles.trendContent}>
                                <View style={styles.trendTop}>
                                    <Text style={styles.trendTopic}>{item.topic}</Text>
                                    <View style={styles.trendCategoryBadge}>
                                        <Text style={styles.trendCategoryText}>{item.category}</Text>
                                    </View>
                                </View>
                                <Text style={styles.trendVolume}>{item.volume} posts</Text>
                            </View>
                            <Feather name="trending-up" size={20} color="#1a1a1a" />
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Section: Who to Follow */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Who to follow</Text>
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.cardsScroll}>
                    {[1, 2, 3].map((i) => {
                        const [isFollowing, setIsFollowing] = useState(false);
                        return (
                            <View key={i} style={styles.userCard}>
                                <View style={styles.userCardAvatar} />
                                <Text style={styles.userCardName}>User {i}</Text>
                                <Text style={styles.userCardHandle}>@user{i}</Text>

                                {/* Liquid Glass Button */}
                                <TouchableOpacity
                                    style={styles.liquidBtnContainer}
                                    onPress={() => setIsFollowing(!isFollowing)}
                                >
                                    <LinearGradient
                                        colors={isFollowing ? ['#eee', '#ddd'] : ['#2a2a2a', '#000']}
                                        style={styles.liquidBtn}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 1 }}
                                    >
                                        <Text style={[styles.liquidBtnText, isFollowing && { color: '#000' }]}>
                                            {isFollowing ? 'Following' : 'Follow'}
                                        </Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                        )
                    })}
                </ScrollView>

                <View style={{ height: 100 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },
    searchContainer: {
        flex: 1,
        height: 50,
        backgroundColor: '#f5f5f7',
        borderRadius: 25,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    searchIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: '100%',
        fontSize: 16,
        color: '#1a1a1a',
    },
    scrollContent: {
        paddingBottom: 20,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 25,
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: '700',
        fontFamily: APP_FONT,
        color: '#000',
    },
    seeAllText: {
        fontSize: 14,
        color: '#1d9bf0',
        fontWeight: '600',
    },
    cardsScroll: {
        paddingHorizontal: 20,
        paddingBottom: 10,
    },
    cardContainer: {
        width: 280,
        height: 180,
        marginRight: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    cardImage: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
        borderRadius: 20,
        overflow: 'hidden',
    },
    cardGradient: {
        padding: 20,
        paddingTop: 40,
    },
    cardBadge: {
        backgroundColor: '#1a1a1a',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        alignSelf: 'flex-start',
        marginBottom: 8,
    },
    cardBadgeText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: '700',
        textTransform: 'uppercase',
    },
    cardTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '700',
        lineHeight: 24,
    },
    trendsContainer: {
        paddingHorizontal: 20,
    },
    trendRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    trendRank: {
        fontSize: 20,
        fontWeight: '700',
        color: '#ccc',
        width: 35,
        fontFamily: APP_FONT,
    },
    trendContent: {
        flex: 1,
    },
    trendTop: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    trendTopic: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1a1a1a',
        marginRight: 10,
    },
    trendCategoryBadge: {
        backgroundColor: '#f0f0f5',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 6,
    },
    trendCategoryText: {
        fontSize: 10,
        color: '#666',
        fontWeight: '600',
    },
    trendVolume: {
        fontSize: 13,
        color: '#888',
    },
    userCard: {
        width: 140,
        height: 190,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 16,
        marginRight: 12,
        alignItems: 'center',
        padding: 15,
        justifyContent: 'space-between',
    },
    userCardAvatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#ddd',
        marginBottom: 10,
    },
    userCardName: {
        fontSize: 14,
        fontWeight: '700',
        color: '#1a1a1a',
        textAlign: 'center',
    },
    userCardHandle: {
        fontSize: 12,
        color: '#888',
        marginBottom: 10,
    },
    liquidBtnContainer: {
        width: '100%',
    },
    liquidBtn: {
        width: '100%',
        paddingVertical: 8,
        borderRadius: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 5,
    },
    liquidBtnText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
    }
});
