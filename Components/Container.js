import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Animated } from 'react-native';

export default class Container extends Component {
    render() {

        const { props, children } = this.props;

        return (
            <Animated.View style={[{
                flex: 0,
                borderWidth: 1, borderColor: 'red'
            }, this.props.style]} { ...props }>
                { children }
            </Animated.View>
        );
    }
}

Container.propTypes = {
    style: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object
    ])
}

