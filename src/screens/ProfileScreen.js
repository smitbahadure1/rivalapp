import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Platform,
    Dimensions,
    ImageBackground,
    StatusBar
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { Feather, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTabBar } from '../context/TabBarContext';

const { width, height } = Dimensions.get('window');
const APP_FONT = Platform.OS === 'ios' ? 'System' : 'sans-serif-medium';
const BODY_FONT = Platform.OS === 'ios' ? 'System' : 'sans-serif';


const USER = {
    name: 'Anna Mackinslov',
    handle: '@annadesign',
    role: 'Designer',
    bio: 'Building the next gen social layer.\nFocused on clarity & connection.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    stats: {
        posts: '452',
        followers: '12.5K',
        following: '342'
    }
};

const POSTS = [
    {
        id: 1,
        type: 'text',
        content: 'True innovation means breaking the standard patterns. We don\'t need another timeline clone, but we do need clarity.',
        time: '2h',
        likes: 128,
        replies: 12,
        reposts: 5
    },
    {
        id: 2,
        type: 'image',
        content: 'The new glassmorphism engine is live. Look at these refractions 🧊',
        image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
        time: '1d',
        likes: 1205,
        replies: 89,
        reposts: 230
    },
    {
        id: 3,
        type: 'text',
        content: 'Minimalism isn\'t about lack of detail, it\'s about "just enough" detail. Finding that balance is the hardest part of design.',
        time: '2d',
        likes: 540,
        replies: 45,
        reposts: 12
    },
    {
        id: 4,
        type: 'image',
        content: 'Workspace setup for the weekend. Deep work mode on.',
        image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
        time: '3d',
        likes: 890,
        replies: 56,
        reposts: 34
    },
    {
        id: 5,
        type: 'text',
        content: 'Thinking about the future of typography in spatial computing. How do we read when text floats in 3D space?',
        time: '4d',
        likes: 310,
        replies: 22,
        reposts: 8
    },
    {
        id: 6,
        type: 'image',
        content: 'Architecture inspiration from my trip to Valencia.',
        image: 'https://images.unsplash.com/photo-1470058869958-2a77ade41c02?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
        time: '5d',
        likes: 675,
        replies: 30,
        reposts: 15
    },
    {
        id: 7,
        type: 'text',
        content: 'Just shipped v2.0 of the design system. Feels good to clear that backlog.',
        time: '1w',
        likes: 890,
        replies: 102,
        reposts: 55
    }
];

export default function ProfileScreen() {
    const [activeTab, setActiveTab] = useState('Feed');
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

    const renderFeedItem = (post) => (
        <View key={post.id} style={styles.postCard}>
            <View style={styles.postHeader}>
                <Image source={{ uri: USER.avatar }} style={styles.postAvatar} />
                <View style={styles.postMeta}>
                    <Text style={styles.postName}>{USER.name}</Text>
                    <Text style={styles.postHandle}>{USER.handle} · {post.time}</Text>
                </View>
                <Ionicons name="ellipsis-horizontal" size={18} color="#999" />
            </View>

            <Text style={styles.postContent}>{post.content}</Text>

            {post.image && (
                <Image source={{ uri: post.image }} style={styles.postImage} contentFit="cover" />
            )}

            <View style={styles.postActions}>
                <View style={styles.actionItem}>
                    <Ionicons name="chatbubble-outline" size={18} color="#666" />
                    <Text style={styles.actionText}>{post.replies}</Text>
                </View>
                <View style={styles.actionItem}>
                    <Ionicons name="repeat-outline" size={20} color="#666" />
                    <Text style={styles.actionText}>{post.reposts}</Text>
                </View>
                <View style={styles.actionItem}>
                    <Ionicons name="heart-outline" size={20} color="#666" />
                    <Text style={styles.actionText}>{post.likes}</Text>
                </View>
                <View style={styles.actionItem}>
                    <Ionicons name="share-outline" size={20} color="#666" />
                </View>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1 }}
                onScroll={handleScroll}
                scrollEventThrottle={16}
            >

                {/* Full Screen Profile Image */}
                <View style={styles.imageContainer}>
                    <ImageBackground
                        source={{ uri: USER.avatar }}
                        style={styles.fullImage}
                        contentFit="cover"
                    >
                        <LinearGradient
                            colors={['rgba(0,0,0,0.1)', 'transparent', 'rgba(0,0,0,0.4)', 'rgba(0,0,0,0.8)']}
                            style={styles.gradientOverlay}
                        >
                            <SafeAreaView style={styles.safeArea}>
                                {/* Top Nav */}
                                <View style={styles.navBar}>
                                    <TouchableOpacity style={styles.iconBtn}>
                                        <Ionicons name="chevron-back" size={24} color="#fff" />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.iconBtn}>
                                        <Ionicons name="settings-outline" size={24} color="#fff" />
                                    </TouchableOpacity>
                                </View>

                                {/* Bottom Info Overlay */}
                                <View style={styles.infoOverlay}>
                                    <Text style={styles.name}>{USER.name}</Text>
                                    <Text style={styles.role}>{USER.role} • {USER.handle}</Text>
                                    <Text style={styles.bio}>{USER.bio}</Text>

                                    <View style={styles.metaRow}>
                                        <Text style={styles.statText}><Text style={styles.bold}>{USER.stats.followers}</Text> Followers</Text>
                                        <View style={styles.dot} />
                                        <Text style={styles.statText}><Text style={styles.bold}>{USER.stats.following}</Text> Following</Text>
                                    </View>

                                    {/* Own Profile Actions */}
                                    <View style={styles.actionRow}>
                                        <TouchableOpacity style={styles.editBtn}>
                                            <Text style={styles.editBtnText}>Edit Profile</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.shareBtn}>
                                            <Text style={styles.shareBtnText}>Share Profile</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </SafeAreaView>
                        </LinearGradient>
                    </ImageBackground>
                </View>

                {/* Light Mode Content Section */}
                <View style={styles.contentSection}>
                    {/* Tabs */}
                    <View style={styles.tabRow}>
                        {['Feed', 'Media', 'Replies'].map(tab => (
                            <TouchableOpacity
                                key={tab}
                                onPress={() => setActiveTab(tab)}
                                style={[styles.tab, activeTab === tab && styles.tabActive]}
                            >
                                <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>{tab}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* FEED LIST VIEW */}
                    <View style={styles.feedList}>
                        {POSTS.map(renderFeedItem)}
                    </View>

                    <View style={{ height: 100 }} />
                </View>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    imageContainer: {
        height: height * 0.65,
        width: '100%',
    },
    fullImage: {
        width: '100%',
        height: '100%',
    },
    gradientOverlay: {
        flex: 1,
        justifyContent: 'space-between',
    },
    safeArea: {
        flex: 1,
        justifyContent: 'space-between',
    },
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginTop: 10,
    },
    iconBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(0,0,0,0.3)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    infoOverlay: {
        paddingHorizontal: 25,
        paddingBottom: 40,
    },
    name: {
        fontSize: 32,
        fontWeight: '700',
        color: '#fff',
        fontFamily: SERIF_FONT,
        marginBottom: 5,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 4,
    },
    role: {
        fontSize: 16,
        color: 'rgba(255,255,255,0.9)',
        marginBottom: 10,
        fontWeight: '600',
    },
    bio: {
        fontSize: 15,
        color: 'rgba(255,255,255,0.95)',
        lineHeight: 22,
        marginBottom: 15,
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    statText: {
        color: '#fff',
        fontSize: 15,
    },
    bold: {
        fontWeight: '700',
    },
    dot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: 'rgba(255,255,255,0.8)',
        marginHorizontal: 10,
    },
    actionRow: {
        flexDirection: 'row',
        gap: 15,
    },
    editBtn: {
        flex: 1,
        backgroundColor: '#fff',
        paddingVertical: 12,
        borderRadius: 30,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    editBtnText: {
        color: '#000',
        fontSize: 15,
        fontWeight: '700',
    },
    shareBtn: {
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.5)',
        paddingVertical: 12,
        borderRadius: 30,
        alignItems: 'center',
    },
    shareBtnText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '700',
    },
    contentSection: {
        backgroundColor: '#fff',
        minHeight: 500,
        paddingTop: 20,
        paddingHorizontal: 0,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginTop: -30,
    },
    tabRow: {
        flexDirection: 'row',
        marginBottom: 0,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        paddingHorizontal: 20,
    },
    tab: {
        marginRight: 25,
        paddingVertical: 15,
    },
    tabActive: {
        borderBottomWidth: 2,
        borderBottomColor: '#000',
    },
    tabText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#888',
    },
    tabTextActive: {
        color: '#000',
    },
    feedList: {
        paddingBottom: 20,
    },
    postCard: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    postHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        justifyContent: 'space-between',
    },
    postAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
        backgroundColor: '#eee',
    },
    postMeta: {
        flex: 1,
    },
    postName: {
        fontSize: 15,
        fontWeight: '700',
        color: '#000',
        marginBottom: 2,
    },
    postHandle: {
        fontSize: 13,
        color: '#666',
    },
    postContent: {
        fontSize: 16,
        color: '#1a1a1a',
        lineHeight: 24,
        marginBottom: 12,
    },
    postImage: {
        width: '100%',
        height: 250,
        borderRadius: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#f0f0f0',
    },
    postActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 20,
        marginTop: 5,
    },
    actionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    actionText: {
        fontSize: 13,
        color: '#666',
    }
});
