import React, { Component } from 'react';
import { View, Text, Picker, Button } from 'react-native';
import { connect } from 'react-redux';
import EventForm from './EventForm';
import { eventUpdate, eventCreate } from '../actions/events.js';

class CreateEvent extends Component {
    onButtonPress() {
        const { title, location, organizor, nr } = this.props;
        this.props.eventCreate({ title, location, organizor, nr: nr });
    }
    render() {
        return(
            <View>
                <EventForm {...this.props} />
                <Button title="Create" text="create" onPress={ this.onButtonPress.bind(this) } />
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    const { title, location, organizor, nr } = state.eventForm;
    return { title, location, organizor, nr };
};

export default connect(mapStateToProps, { eventUpdate, eventCreate })(CreateEvent);