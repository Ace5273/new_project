import React, { Component } from 'react'
import { Text, View, StyleSheet, Platform } from 'react-native'
import PropTypes from 'prop-types';
import { MaterialIcons } from '@expo/vector-icons'
import Container from './Container'
import ViewTopBar from './AppBarSubComponents/ViewTopBar'
import ActionButton from './Buttons/ActionButton'

export default class AppBar extends Component {

    render() {

        return (
            <ViewTopBar style={this.props.ViewTopBarStyle}>
                <this.props.TextComp title={this.props.title} />

                <Container style={{ flex: 1, flexDirection: 'row-reverse' }}>
                    {this.BuildIcons()}
                </Container>
            </ViewTopBar>
        );
    }

    BuildIcons() {

        // The height of the TopBar
        const height = this.props.ViewTopBarStyle.height || ViewTopBar.defaultStyle.height


        return this.props.iconNames.map(function (item) {

            // This is the icon
            const icon = <MaterialIcons size={this.props.iconSize || height / 2.5} color={this.props.iconColor || 'white'}
                name={item.name} />

            // the container that containes the button
            return (
                <Container key={item.name} style={{ height, width: height}}>
                    <ActionButton key={item.name} size={height / 1.5}
                        style={{ flex: 1, alignSelf: 'stretch', alignContent: 'stretch', justifyContent: 'stretch' }}
                        buttonColor={this.props.ViewTopBarStyle.backgroundColor}
                        hideShadow={true} icon={icon} onPress={ item.onPress }
                    />
                </Container>
                )
        }.bind(this))
    }
}

AppBar.propTypes = {
    title: PropTypes.string.isRequired,
    ViewTopBarStyle: ViewTopBar.propTypes.style,
    TextComp: PropTypes.oneOfType([
        PropTypes.element.isRequired,
        PropTypes.func.isRequired,
    ]),
    iconName: PropTypes.arrayOf(PropTypes.string),
}
