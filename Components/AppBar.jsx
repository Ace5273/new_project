import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class App extends Component()
{
    render() {
            <View
                style={ oStyleSheet.statusbar }
            />
    }
}

const oStyleSheet = StyleSheet.create({
    statusbar: {
        backgroundColor: '#222',
        height: Platform.OS === 'ios' ? 20 : 25,
    },
    appbar: {
        flexDirection: 'row',
        alignItems: 'Center',
        height: Platform.OS == 'ios' ? 44 : 56,
        background: '#222',
        borderBottomColor: 'rgba(0,0,0,1)'
    }
});