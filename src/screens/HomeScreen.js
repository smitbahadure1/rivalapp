import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    Platform,
    Dimensions,
    Alert,
    ToastAndroid,
    Modal,
    TextInput,
    KeyboardAvoidingView,
    Share
} from 'react-native';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTabBar } from '../context/TabBarContext';

const APP_FONT = Platform.OS === 'ios' ? 'System' : 'sans-serif-medium';
const BODY_FONT = Platform.OS === 'ios' ? 'System' : 'sans-serif';

const posts = [
    {
        id: 1,
        user: { name: 'Anna Mackinslov', handle: '@annadesign', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80' },
        time: '2h',
        content: 'True innovation means breaking the standard patterns. We don\'t need another timeline clone, but we do need clarity.',
        image: null,
        stats: { likes: 128, replies: 12 }
    },
    {
        id: 2,
        user: { name: 'Daniel Powell', handle: '@dpowell', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80' },
        time: '3h',
        content: 'The new glassmorphism engine is live. Look at these refractions.',
        image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        stats: { likes: 1205, replies: 89 }
    },
    {
        id: 3,
        user: { name: 'Sarah Jenkins', handle: '@sarah', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80' },
        time: '5h',
        content: 'Minimalism isn\'t about lack of detail, it\'s about "just enough" detail. Finding that balance is the hardest part of design.',
        image: null,
        stats: { likes: 540, replies: 45 }
    },
    {
        id: 4,
        user: { name: 'Tech Insider', handle: '@techinsider', avatar: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80' },
        time: '6h',
        content: 'Just got my hands on the new M4 chip. The performance per watt is absolutely insane. Benchmarks thread below. 🧵',
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        stats: { likes: 2100, replies: 156 }
    },
    {
        id: 5,
        user: { name: 'Marcus Chen', handle: '@marcus_c', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80' },
        time: '8h',
        content: 'Coffee shop vibes this morning. Sometimes you just need to get away from the desk to think clearly.',
        image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        stats: { likes: 89, replies: 8 }
    },
    {
        id: 6,
        user: { name: 'Elena Rodriguez', handle: '@elena_arch', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80' },
        time: '10h',
        content: 'Form follows function, but emotion follows form. Never underestimate the power of beauty in architecture.',
        image: null,
        stats: { likes: 432, replies: 28 }
    },
    {
        id: 7,
        user: { name: 'David Kim', handle: '@dkim_photo', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80' },
        time: '12h',
        content: 'Chasing sunsets in Kyoto. The colors here are unlike anywhere else in the world.',
        image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        stats: { likes: 3402, replies: 201 }
    },
    {
        id: 8,
        user: { name: 'StartUp Daily', handle: '@startupdaily', avatar: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80' },
        time: '14h',
        content: 'Funding for AI startups has hit a new record high this quarter. Is it a bubble or the new baseline?',
        image: null,
        stats: { likes: 670, replies: 95 }
    },
    {
        id: 9,
        user: { name: 'Jenny Wilson', handle: '@jenny_w', avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80' },
        time: '16h',
        content: 'Does anyone else feel like 2026 is flying by? We are already in Q2!',
        image: null,
        stats: { likes: 124, replies: 45 }
    },
    {
        id: 10,
        user: { name: 'Space Explorer', handle: '@cosmos_fan', avatar: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80' },
        time: '18h',
        content: 'The latest images from the James Webb telescope are mind-blowing. We are barely scratching the surface.',
        image: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        stats: { likes: 5890, replies: 412 }
    }
];

export default function HomeScreen() {
    const [activeTab, setActiveTab] = useState('For You');
    const [feedPosts, setFeedPosts] = useState(posts);
    const { showTabBar, hideTabBar } = useTabBar();
    const lastOffsetY = useRef(0);
    const [commentModalVisible, setCommentModalVisible] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const [commentText, setCommentText] = useState('');
    const [postDetailVisible, setPostDetailVisible] = useState(false);

    const openPostDetail = (post) => {
        setSelectedPost(post);
        setPostDetailVisible(true);
    };

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

    const toggleLike = (id) => {
        setFeedPosts(currentPosts => currentPosts.map(post => {
            if (post.id === id) {
                const isLiked = post.isLiked;
                return {
                    ...post,
                    isLiked: !isLiked,
                    stats: {
                        ...post.stats,
                        likes: isLiked ? post.stats.likes - 1 : post.stats.likes + 1
                    }
                };
            }
            return post;
        }));
    };

    const toggleRepost = (id) => {
        setFeedPosts(currentPosts => currentPosts.map(post => {
            if (post.id === id) {
                return { ...post, isReposted: !post.isReposted };
            }
            return post;
        }));
    };

    const openCommentModal = (post) => {
        setSelectedPost(post);
        setCommentModalVisible(true);
    };

    const submitComment = () => {
        if (commentText.trim()) {
            // Update the post's reply count
            setFeedPosts(currentPosts => currentPosts.map(post => {
                if (post.id === selectedPost.id) {
                    return {
                        ...post,
                        stats: {
                            ...post.stats,
                            replies: post.stats.replies + 1
                        }
                    };
                }
                return post;
            }));

            // Show feedback
            if (Platform.OS === 'android') {
                ToastAndroid.show('Comment posted!', ToastAndroid.SHORT);
            } else {
                Alert.alert('Success', 'Comment posted!');
            }

            // Close modal and reset
            setCommentText('');
            setCommentModalVisible(false);
        }
    };

    const handleShare = async (post) => {
        try {
            const result = await Share.share({
                message: `${post.content}\n\n- ${post.user.name} (@${post.user.handle})`,
                title: 'Share Post',
            });

            if (result.action === Share.sharedAction) {
                if (Platform.OS === 'android') {
                    ToastAndroid.show('Post shared!', ToastAndroid.SHORT);
                }
            }
        } catch (error) {
            console.error('Error sharing:', error);
            Alert.alert('Error', 'Failed to share post');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />

            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerTitleContainer}>
                    <Text style={styles.headerTitle}>Rival</Text>
                    <View style={styles.liveBadge} />
                </View>

                {/* Search & Menu */}
                <View style={styles.headerActions}>
                    <TouchableOpacity style={styles.iconBtn}>
                        <Feather name="search" size={22} color="#1a1a1a" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconBtn}>
                        <Ionicons name="notifications-outline" size={22} color="#1a1a1a" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Clean Tab Bar - No Pills, just Text */}
            <View style={styles.tabBar}>
                <TouchableOpacity onPress={() => setActiveTab('For You')} style={styles.tabItem}>
                    <Text style={[styles.tabText, activeTab === 'For You' && styles.tabTextActive]}>For You</Text>
                    {activeTab === 'For You' && <View style={styles.activeDot} />}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setActiveTab('Following')} style={styles.tabItem}>
                    <Text style={[styles.tabText, activeTab === 'Following' && styles.tabTextActive]}>Following</Text>
                    {activeTab === 'Following' && <View style={styles.activeDot} />}
                </TouchableOpacity>
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
            >

                {feedPosts.map((post) => (
                    <View key={post.id} style={styles.postBlock}>
                        {/* Header Row: Avatar + Name + Time */}
                        <View style={styles.postHeader}>
                            <Image source={{ uri: post.user.avatar }} style={styles.avatar} />
                            <View style={styles.headerText}>
                                <Text style={styles.userName}>{post.user.name}</Text>
                                <Text style={styles.userHandle}>{post.user.handle}</Text>
                            </View>
                            <Text style={styles.postTime}>{post.time}</Text>
                        </View>

                        {/* Content - Tappable */}
                        <TouchableOpacity
                            activeOpacity={0.95}
                            onPress={() => openPostDetail(post)}
                        >
                            <View style={styles.postContent}>
                                <Text style={styles.bodyText}>{post.content}</Text>

                                {post.image && (
                                    <View style={styles.mediaContainer}>
                                        <Image
                                            source={{ uri: post.image }}
                                            style={styles.image}
                                            contentFit="cover"
                                            placeholder="L6PZfSi_.AyE_3t7t7R**0o#DgR4"
                                            cachePolicy="memory-disk"
                                        />
                                    </View>
                                )}
                            </View>
                        </TouchableOpacity>

                        {/* Action Bar - Spaced Out with Glass Buttons */}
                        <View style={styles.actionRow}>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => openCommentModal(post)}
                            >
                                <LinearGradient
                                    colors={['rgba(240, 240, 255, 0.6)', 'rgba(255, 255, 255, 0.4)']}
                                    style={styles.glassBtn}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                >
                                    <Ionicons name="chatbubble-outline" size={18} color="#1a1a1a" />
                                    <Text style={styles.actionLabel}>{post.stats.replies}</Text>
                                </LinearGradient>
                            </TouchableOpacity>

                            <TouchableOpacity activeOpacity={0.7} onPress={() => toggleRepost(post.id)}>
                                <LinearGradient
                                    colors={post.isReposted
                                        ? ['rgba(0, 255, 0, 0.1)', 'rgba(0, 255, 0, 0.05)'] // Subtle Green tint
                                        : ['rgba(240, 240, 255, 0.6)', 'rgba(255, 255, 255, 0.4)']}
                                    style={styles.glassBtn}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                >
                                    <Ionicons
                                        name="repeat-outline"
                                        size={20}
                                        color={post.isReposted ? "#00b894" : "#1a1a1a"}
                                    />
                                </LinearGradient>
                            </TouchableOpacity>

                            <TouchableOpacity activeOpacity={0.7} onPress={() => toggleLike(post.id)}>
                                <LinearGradient
                                    colors={post.isLiked
                                        ? ['rgba(255, 0, 0, 0.1)', 'rgba(255, 0, 0, 0.05)'] // Subtle Red tint
                                        : ['rgba(240, 240, 255, 0.6)', 'rgba(255, 255, 255, 0.4)']}
                                    style={styles.glassBtn}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                >
                                    <Ionicons
                                        name={post.isLiked ? "heart" : "heart-outline"}
                                        size={20}
                                        color={post.isLiked ? "#e17055" : "#1a1a1a"}
                                    />
                                    <Text style={[styles.actionLabel, post.isLiked && { color: "#e17055" }]}>
                                        {post.stats.likes}
                                    </Text>
                                </LinearGradient>
                            </TouchableOpacity>


                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => handleShare(post)}
                            >
                                <LinearGradient
                                    colors={['rgba(240, 240, 255, 0.6)', 'rgba(255, 255, 255, 0.4)']}
                                    style={styles.glassBtn}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                >
                                    <Ionicons name="share-outline" size={18} color="#1a1a1a" />
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>

                        {/* Post Separator */}
                        <View style={styles.divider} />
                    </View>
                ))}

                <View style={{ height: 100 }} />
            </ScrollView>

            {/* Comment Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={commentModalVisible}
                onRequestClose={() => setCommentModalVisible(false)}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.modalContainer}
                >
                    <TouchableOpacity
                        style={styles.modalBackdrop}
                        activeOpacity={1}
                        onPress={() => setCommentModalVisible(false)}
                    />

                    <View style={styles.modalContent}>
                        {/* Modal Header */}
                        <View style={styles.modalHeader}>
                            <TouchableOpacity onPress={() => setCommentModalVisible(false)}>
                                <Ionicons name="close" size={28} color="#1a1a1a" />
                            </TouchableOpacity>
                            <Text style={styles.modalTitle}>Add Comment</Text>
                            <TouchableOpacity onPress={submitComment}>
                                <Text style={styles.postButton}>Post</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Original Post Preview */}
                        {selectedPost && (
                            <View style={styles.originalPost}>
                                <View style={styles.postHeaderSmall}>
                                    <Image source={{ uri: selectedPost.user.avatar }} style={styles.avatarSmall} />
                                    <View>
                                        <Text style={styles.userNameSmall}>{selectedPost.user.name}</Text>
                                        <Text style={styles.userHandleSmall}>{selectedPost.user.handle}</Text>
                                    </View>
                                </View>
                                <Text style={styles.postContentSmall} numberOfLines={3}>
                                    {selectedPost.content}
                                </Text>
                            </View>
                        )}

                        {/* Comment Input */}
                        <View style={styles.commentInputContainer}>
                            <TextInput
                                style={styles.commentInput}
                                placeholder="Write your comment..."
                                placeholderTextColor="#999"
                                multiline
                                value={commentText}
                                onChangeText={setCommentText}
                                autoFocus
                            />
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </Modal>

            {/* Post Detail Modal */}
            <Modal
                animationType="slide"
                transparent={false}
                visible={postDetailVisible}
                onRequestClose={() => setPostDetailVisible(false)}
            >
                <SafeAreaView style={styles.detailContainer}>
                    <StatusBar barStyle="dark-content" />

                    {/* Header */}
                    <View style={styles.detailHeader}>
                        <TouchableOpacity onPress={() => setPostDetailVisible(false)}>
                            <Ionicons name="arrow-back" size={24} color="#1a1a1a" />
                        </TouchableOpacity>
                        <Text style={styles.detailHeaderTitle}>Post</Text>
                        <View style={{ width: 24 }} />
                    </View>

                    <ScrollView showsVerticalScrollIndicator={false}>
                        {selectedPost && (
                            <View style={styles.detailContent}>
                                {/* User Info */}
                                <View style={styles.detailUserSection}>
                                    <Image source={{ uri: selectedPost.user.avatar }} style={styles.detailAvatar} />
                                    <View style={styles.detailUserInfo}>
                                        <Text style={styles.detailUserName}>{selectedPost.user.name}</Text>
                                        <Text style={styles.detailUserHandle}>{selectedPost.user.handle}</Text>
                                    </View>
                                </View>

                                {/* Post Content */}
                                <Text style={styles.detailBodyText}>{selectedPost.content}</Text>

                                {/* Post Image */}
                                {selectedPost.image && (
                                    <View style={styles.detailMediaContainer}>
                                        <Image
                                            source={{ uri: selectedPost.image }}
                                            style={styles.detailImage}
                                            contentFit="cover"
                                            placeholder="L6PZfSi_.AyE_3t7t7R**0o#DgR4"
                                            cachePolicy="memory-disk"
                                        />
                                    </View>
                                )}

                                {/* Time */}
                                <Text style={styles.detailTime}>{selectedPost.time} ago</Text>

                                {/* Stats */}
                                <View style={styles.detailStats}>
                                    <View style={styles.detailStatItem}>
                                        <Text style={styles.detailStatNumber}>{selectedPost.stats.replies}</Text>
                                        <Text style={styles.detailStatLabel}>Replies</Text>
                                    </View>
                                    <View style={styles.detailStatItem}>
                                        <Text style={styles.detailStatNumber}>{selectedPost.stats.likes}</Text>
                                        <Text style={styles.detailStatLabel}>Likes</Text>
                                    </View>
                                </View>

                                {/* Action Buttons */}
                                <View style={styles.detailActions}>
                                    <TouchableOpacity
                                        style={styles.detailActionBtn}
                                        onPress={() => {
                                            setPostDetailVisible(false);
                                            setTimeout(() => openCommentModal(selectedPost), 300);
                                        }}
                                    >
                                        <Ionicons name="chatbubble-outline" size={24} color="#1a1a1a" />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.detailActionBtn}
                                        onPress={() => toggleRepost(selectedPost.id)}
                                    >
                                        <Ionicons
                                            name="repeat-outline"
                                            size={26}
                                            color={selectedPost.isReposted ? "#00b894" : "#1a1a1a"}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.detailActionBtn}
                                        onPress={() => toggleLike(selectedPost.id)}
                                    >
                                        <Ionicons
                                            name={selectedPost.isLiked ? "heart" : "heart-outline"}
                                            size={24}
                                            color={selectedPost.isLiked ? "#e17055" : "#1a1a1a"}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.detailActionBtn}
                                        onPress={() => handleShare(selectedPost)}
                                    >
                                        <Ionicons name="share-outline" size={22} color="#1a1a1a" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    </ScrollView>
                </SafeAreaView>
            </Modal>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#fff',
    },
    headerTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    headerTitle: {
        fontSize: 26, // Increased from 20
        fontFamily: APP_FONT,
        fontWeight: '800', // Made slightly bolder
        color: '#000',
        letterSpacing: 1.5,
        textTransform: 'uppercase',
    },
    // Removed liveBadge to clean up the logo area
    liveBadge: {
        display: 'none',
    },
    headerActions: {
        flexDirection: 'row',
        gap: 15,
    },
    iconBtn: {
        padding: 5,
    },
    tabBar: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f5f5f5',
    },
    tabItem: {
        marginRight: 30,
        paddingBottom: 12,
        position: 'relative',
    },
    tabText: {
        fontSize: 16,
        color: '#888',
        fontWeight: '600',
    },
    tabTextActive: {
        color: '#000',
        fontWeight: '700',
    },
    activeDot: {
        position: 'absolute',
        bottom: 0,
        left: '50%',
        marginLeft: -10,
        width: 20,
        height: 3,
        borderRadius: 2,
        backgroundColor: '#000',
    },
    scrollContent: {
        paddingTop: 10,
    },
    postBlock: {
        paddingHorizontal: 20,
        marginBottom: 5,
    },
    postHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    avatar: {
        width: 44,
        height: 44,
        borderRadius: 22,
        marginRight: 12,
        backgroundColor: '#eee',
    },
    headerText: {
        flex: 1,
    },
    userName: {
        fontSize: 15,
        fontWeight: '700',
        color: '#1a1a1a',
        marginBottom: 2,
    },
    userHandle: {
        fontSize: 13,
        color: '#666',
    },
    postTime: {
        fontSize: 13,
        color: '#999',
    },
    postContent: {
        paddingLeft: 0, // No indentation to avoid Thread look
    },
    bodyText: {
        fontSize: 17,
        lineHeight: 26,
        color: '#1a1a1a',
        fontFamily: BODY_FONT,
        marginBottom: 12,
        letterSpacing: 0.2,
    },
    mediaContainer: {
        width: '100%',
        height: 250,
        borderRadius: 16,
        overflow: 'hidden',
        marginBottom: 15,
        backgroundColor: '#f5f5f5',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    actionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: 20,
        paddingBottom: 15,
    },
    glassBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.8)',
        shadowColor: 'rgba(0,0,0,0.05)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 4,
    },
    actionLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1a1a1a',
    },
    divider: {
        height: 1,
        backgroundColor: '#f5f5f5',
        marginBottom: 15,
    },
    // Modal Styles
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    modalBackdrop: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingTop: 20,
        paddingBottom: 40,
        paddingHorizontal: 20,
        maxHeight: '80%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 10,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1a1a1a',
        fontFamily: APP_FONT,
    },
    postButton: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1d9bf0',
    },
    originalPost: {
        backgroundColor: '#f8f8f8',
        borderRadius: 12,
        padding: 15,
        marginBottom: 20,
    },
    postHeaderSmall: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        gap: 10,
    },
    avatarSmall: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#eee',
    },
    userNameSmall: {
        fontSize: 14,
        fontWeight: '700',
        color: '#1a1a1a',
    },
    userHandleSmall: {
        fontSize: 12,
        color: '#666',
    },
    postContentSmall: {
        fontSize: 14,
        lineHeight: 20,
        color: '#666',
    },
    commentInputContainer: {
        minHeight: 120,
    },
    commentInput: {
        fontSize: 16,
        lineHeight: 24,
        color: '#1a1a1a',
        fontFamily: BODY_FONT,
        textAlignVertical: 'top',
        padding: 0,
    },
    // Post Detail Modal Styles
    detailContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    detailHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    detailHeaderTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1a1a1a',
        fontFamily: APP_FONT,
    },
    detailContent: {
        padding: 20,
    },
    detailUserSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        gap: 12,
    },
    detailAvatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#eee',
    },
    detailUserInfo: {
        flex: 1,
    },
    detailUserName: {
        fontSize: 17,
        fontWeight: '700',
        color: '#1a1a1a',
        marginBottom: 2,
    },
    detailUserHandle: {
        fontSize: 15,
        color: '#666',
    },
    detailBodyText: {
        fontSize: 20,
        lineHeight: 30,
        color: '#1a1a1a',
        fontFamily: BODY_FONT,
        marginBottom: 20,
        letterSpacing: 0.3,
    },
    detailMediaContainer: {
        width: '100%',
        height: 350,
        borderRadius: 16,
        overflow: 'hidden',
        marginBottom: 20,
        backgroundColor: '#f5f5f5',
    },
    detailImage: {
        width: '100%',
        height: '100%',
    },
    detailTime: {
        fontSize: 15,
        color: '#666',
        marginBottom: 20,
    },
    detailStats: {
        flexDirection: 'row',
        gap: 30,
        paddingVertical: 15,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#f0f0f0',
        marginBottom: 15,
    },
    detailStatItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    detailStatNumber: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1a1a1a',
    },
    detailStatLabel: {
        fontSize: 14,
        color: '#666',
    },
    detailActions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
    },
    detailActionBtn: {
        padding: 10,
    }
});
