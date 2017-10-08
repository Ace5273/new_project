import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import { MainView } from './Components/MainView';

export default class App extends Component {

    render() {
        return (
            <MainView ></MainView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});