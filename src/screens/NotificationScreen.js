import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Platform,
    Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { Feather, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const SERIF_FONT = Platform.OS === 'ios' ? 'Georgia' : 'serif';
const SANS_FONT = Platform.OS === 'ios' ? 'System' : 'Roboto';

const DATA = [
    {
        title: 'Today', data: [
            {
                id: '1', type: 'like',
                user: { name: 'Anna Mackinslov', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80' },
                text: 'liked your post.',
                time: '2h',
                media: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80'
            },
            {
                id: '2', type: 'follow',
                user: { name: 'Daniel Powell', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80' },
                text: 'started following you.',
                time: '3h',
                isFollowing: false,
            },
            {
                id: '3', type: 'mention',
                user: { name: 'Sarah Jenkins', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80' },
                text: 'mentioned you in a comment: "This is 🔥"',
                time: '5h',
                media: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80'
            }
        ]
    },
    {
        title: 'Yesterday', data: [
            {
                id: '4', type: 'follow',
                user: { name: 'Mike Ross', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80' },
                text: 'started following you.',
                time: '1d',
                isFollowing: true,
            },
            {
                id: '5', type: 'system',
                user: { name: 'The Community', avatar: null },
                text: 'Welcome to the premium member club.',
                time: '1d',
            }
        ]
    }
];

export default function NotificationScreen() {

    const renderItem = ({ item }) => (
        <View style={styles.row}>
            {/* Left: Avatar */}
            <View style={styles.avatarContainer}>
                {item.user.avatar ? (
                    <Image source={{ uri: item.user.avatar }} style={styles.avatar} />
                ) : (
                    <View style={[styles.avatar, styles.systemAvatar]}>
                        <Ionicons name="sparkles" size={18} color="#fff" />
                    </View>
                )}
            </View>

            {/* Center: Text */}
            <View style={styles.contentContainer}>
                <Text style={styles.text}>
                    <Text style={styles.name}>{item.user.name}</Text>
                    <Text style={styles.action}> {item.text}</Text>
                    <Text style={styles.time}> {item.time}</Text>
                </Text>
            </View>

            {/* Right: Media or Liquid Glass Button */}
            <View style={styles.rightContainer}>
                {item.type === 'follow' ? (
                    <TouchableOpacity>
                        <LinearGradient
                            colors={item.isFollowing ? ['#f0f0f0', '#e0e0e0'] : ['#2a2a2a', '#000']}
                            style={[styles.glassBtn, item.isFollowing && styles.glassBtnFollowing]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                        >
                            <Text style={[styles.followText, item.isFollowing && styles.followingText]}>
                                {item.isFollowing ? 'Following' : 'Follow'}
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                ) : item.media ? (
                    <Image source={{ uri: item.media }} style={styles.mediaThumb} />
                ) : null}
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.pageTitle}>Activity</Text>
            </View>

            <FlatList
                data={DATA}
                keyExtractor={(item) => item.title}
                renderItem={({ item }) => (
                    <View>
                        <Text style={styles.sectionHeader}>{item.title}</Text>
                        {item.data.map((notification) => (
                            <View key={notification.id}>{renderItem({ item: notification })}</View>
                        ))}
                    </View>
                )}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />
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
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f5f5f5',
    },
    pageTitle: {
        fontSize: 28,
        fontFamily: SERIF_FONT,
        fontWeight: '700',
        color: '#000',
    },
    listContent: {
        paddingBottom: 40,
    },
    sectionHeader: {
        fontSize: 15,
        fontWeight: '600',
        color: '#000',
        marginLeft: 20,
        marginTop: 25,
        marginBottom: 10,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 20,
        width: '100%',
    },
    avatarContainer: {
        marginRight: 14,
    },
    avatar: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#f0f0f0',
    },
    systemAvatar: {
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentContainer: {
        flex: 1,
        marginRight: 10,
    },
    text: {
        fontSize: 14,
        lineHeight: 20,
        color: '#262626',
    },
    name: {
        fontWeight: '700',
        color: '#000',
    },
    action: {
        color: '#262626',
    },
    time: {
        color: '#888',
    },
    rightContainer: {
        minWidth: 44,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    mediaThumb: {
        width: 44,
        height: 44,
        borderRadius: 12, // Smooth corner radius like glass
        backgroundColor: '#f0f0f0',
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.05)',
    },
    glassBtn: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2, // Deep shadow for glass lift
        shadowRadius: 8,
        elevation: 5,
    },
    glassBtnFollowing: {
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    followText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 13,
        letterSpacing: -0.3,
    },
    followingText: {
        color: '#1a1a1a',
    }
});
