import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Text, StyleSheet, Platform } from 'react-native';

export default class AppBarText extends Component {
    render() {
        return (
            <Text style={[{
                margin: 16,
                textAlign: Platform.OS === 'ios' ? 'center' : 'left',
                fontSize: Platform.OS === 'ios' ? 20 : 18,
                fontWeight: 'bold',
                flex: 0,
                color: 'white'
            },
                this.props.style]}>

                {this.props.title}
            </Text>
        );
    }
}

AppBarText.propTypes = {
    title: PropTypes.string.isRequired
}