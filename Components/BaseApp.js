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
    Animated,
    Easing,
    Dimensions
} from 'react-native';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import ViewPusher from './AppBarSubComponents/ViewPusher'
import AppBar from './AppBar';
import Container from './Container';
import AppBarText from './AppBarSubComponents/AppBarText'
import ActionButton from './Buttons/ActionButton'

import type { NavigationState } from 'react-native-tab-view/types';

type Route = {
    key: string,
    title: string,
};

type State = NavigationState<Route>;

const FirstRoute = () => <View style={[styles.container, { backgroundColor: '#ff4081' }]} />;
const SecondRoute = () => <View style={[styles.container, { backgroundColor: '#673ab7' }]} />;

export default class BaseApp extends Component {

    constructor() {
        super()

        this.state = {
            index: 0,
            routes: [
                { key: '1', title: 'First' },
                { key: '2', title: 'Second' },
            ],
            title: 'KafKaf',
            opacity: new Animated.Value(0.25),
            scale: new Animated.Value(0.5),
            elevation: new Animated.Value(0)
        }
    }

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

    _renderHeader = props => <TabBar {...props} style={styles.header} renderLabel={this._renderLabel(props)} />;

    _renderScene = SceneMap({
        '1': FirstRoute,
        '2': SecondRoute,
    });

    componentDidMount() {
        Animated.parallel(
            [
                Animated.timing(this.state.scale, { toValue: 1, duration: 500, easing: Easing.inOut(Easing.exp) }),
                Animated.timing(this.state.opacity, { toValue: 1, duration: 750, easing: Easing.inOut(Easing.exp) }),
                Animated.timing(this.state.elevation, { toValue: 5, duration: 1500, easing: Easing.inOut(Easing.exp) }),
            ]
        ).start()
    }

    render() {
        if (this.state.restoring) {
            return null;
        }

        const { index } = this.state;

        return (
            <Container style={{ flex: 1 }}>
                <ViewPusher style={{ backgroundColor: 'rgba(85,139,47,1)' }} />
                <AppBar title={this.state.title}
                    ViewTopBarStyle={{
                        backgroundColor: 'rgba(85,139,47,1)', elevation: this.state.elevation, opacity: this.state.opacity,
                        transform: [{ scale: this.state.scale }]
                    }}
                    TextComp={AppBarText}
                    iconNames={
                        [{ name: 'settings', onPress: (e) => console.log('work') }, { name: 'undo' }]}
                />
                <Container style={{ flex: 1 }}>
                    < TabViewAnimated
                        style={styles.container}
                        navigationState={this.state}
                        renderScene={this._renderScene}
                        renderHeader={this._renderHeader}
                        onIndexChange={this._handleIndexChange}
                    />
                </Container>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: 'rgba(85,139,47,1)',
        height: 50
    },
    touchable: {
        padding: 16,
        backgroundColor: 'rgba(85,139,47,1)',
        borderBottomWidth: 1,
    },
    item: {
        fontSize: 16,
        color: '#333',
    },
    label: {
        color: '#fff',
        paddingTop: 5
    },
});