import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Platform, Animated } from 'react-native';
import Container from '../Container'

export default class ViewTopBar extends Component {
    constructor() {
        super()

    }

    componentDidMount() {
    }


    render() {
        return (
            <Container style={[ViewTopBar.defaultStyle, this.props.style]} onLayout={this.props.onLayout} >
                {this.props.children}
            </Container>
        );
    }
}

ViewTopBar.propTypes = {
    style: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object
    ]),

    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element
    ])
}

ViewTopBar.defaultStyle = {
    flex: 0,
    height: Platform.OS === 'ios' ? 40 : 56,
    flexDirection: 'row',
    elevation: 5,
}