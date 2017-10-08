import React, { Component } from 'react';
import {
    AsyncStorage,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Animated
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import { AppBar } from './'

import type { NavigationState } from 'react-native-tab-view/types';

type Route = {
    key: string,
    title: string,
};

type State = NavigationState<Route>;

const FirstRoute = () => <View style={[styles.container, { backgroundColor: '#ff4081' }]} />;
const SecondRoute = () => <View style={[styles.container, { backgroundColor: '#673ab7' }]} />;

export default class App extends Component<void, *, State > {
    state : State = {
        index: 0,
        routes: [
            { key: '1', title: 'First' },
            { key: '2', title: 'Second' },
        ],
        title: 'KafKaf'
    };

    _handleIndexChange = index => this.setState({ index });

    _renderLabel = props => ({ route, index }) => {
        const inputRange = props.navigationState.routes.map((x, i) => i);
        const outputRange = inputRange.map(
            inputIndex => (inputIndex === index ? '#D6356C' : '#222')
        );
        const color = props.position.interpolate({
            inputRange,
            outputRange,
        });

        return (
            <Animated.Text style={[styles.label, { color }]}>
                {route.title}
            </Animated.Text>
        );
    };

    _renderHeader = props => <TabBar {...props} renderLabel={this._renderLabel(props)}   />;

    _renderScene = SceneMap({
        '1': FirstRoute,
        '2': SecondRoute,
    });

    render() {
        if (this.state.restoring) {
            return null;
        }

        const { index } = this.state;
        const backgroundColor = '#222';
        const tintColor = 'white';
        const appbarElevation = 4;
        const borderBottomWidth =
            Platform.OS === 'ios' ? StyleSheet.hairlineWidth : 0;

        return (
            <View style={styles.container}>
                <View
                    style={[
                        styles.appbar,
                        backgroundColor ? { backgroundColor } : null,
                        appbarElevation
                            ? { elevation: appbarElevation, borderBottomWidth }
                            : null,
                    ]}
                >
                    <Text style={[styles.title, tintColor ? { color: tintColor } : null]}>
                        { this.state.title }
                    </Text>
                    <Ionicons
                        name={
                            Platform.OS === 'android'
                                ? 'md-arrow-back'
                                : 'ios-arrow-back'
                        }
                        size={24}
                        color={tintColor}
                    />
                </View>
                <TabViewAnimated
                    style={styles.container}
                    navigationState={this.state}
                    renderScene={this._renderScene}
                    renderHeader={this._renderHeader}
                    onIndexChange={this._handleIndexChange}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    statusbar: {
        backgroundColor: '#222',
        height: Platform.OS === 'ios' ? 20 : 25,
    },
    appbar: {
        flexDirection: 'row',
        alignItems: 'center',
        height: Platform.OS === 'ios' ? 44 : 56,
        backgroundColor: '#222',
        borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    },
    title: {
        flex: 1,
        margin: 16,
        textAlign: Platform.OS === 'ios' ? 'center' : 'left',
        fontSize: Platform.OS === 'ios' ? 20 : 18,
        color: '#fff',
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 56,
        padding: Platform.OS === 'ios' ? 12 : 16,
    },
    touchable: {
        padding: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, .06)',
    },
    item: {
        fontSize: 16,
        color: '#333',
    },
});