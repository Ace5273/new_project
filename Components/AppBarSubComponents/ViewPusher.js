import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Platform } from 'react-native';
import Container from '../Container'

export default class ViewPusher extends Component {
    render() {
        return (
            <Container style={[
                ViewPusher.defaultStyle,
                this.props.style]}/>
        );
    }
}

ViewPusher.propTypes = {
    style: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object
    ])
}

ViewPusher.defaultStyle = {
    height: Platform.OS === 'ios' ? 20 : 24
}


