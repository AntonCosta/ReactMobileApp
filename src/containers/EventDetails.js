/*
import React, { Component } from 'react';
import { StyleSheet } from "react-native";
import { connect } from "react-redux";
import { editEvent } from "../actions/index";
import { Card, Button, FormLabel, FormInput } from 'react-native-elements';
import {Actions} from "react-native-router-flux";

class EventDetail extends Component {
    constructor(props) {
        super(props);
        console.log("Before mount: ", this.props);
        console.log("Event: ", this.props.eveniment);
        this.state = {
            id: this.props.eveniment.id,
            title: this.props.eveniment.title,
            img: this.props.eveniment.img
        }
    }

    _updateEvent() {
        // console.log(this.state);
        console.log("Update: ", this.state.id);
        this.props.updateEvent(
            this.state.id,
            this.state.title
        );
        Actions.viewEvents();
    }

    render() {
        return (
            <Card
                title={this.state.title}
                image={this.props.eveniment.img}>
                <FormLabel>Title</FormLabel>
                <FormInput placeholder={this.state.title} onChangeText={(text) => {
                    this.setState({title: text})
                }}/>
                <Button
                    /!*icon={{name: 'code'}}*!/
                    backgroundColor='#03A9F4'
                    onPress={() => {this._updateEvent()}}
                    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                    title='Update' />
                <Button
                    onPress={() =>{
                        let receiver = "costaanton96@gmail.com";
                        let subject = "Email from Erasmood App";
                        let body = "Title: " + this.state.title + "\n" +
                            "  Name: " + this.state.text;
                        let all = "mailto:" + receiver + "?subject=" + subject + "&body=" + body ;
                        Linking.openURL(all)}}
                    title="Send Email"
                />
            </Card>

        )
    }
}

const styles = StyleSheet.create({
    saveBtn: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: "skyblue",
        padding: 20,
    }
});

const mapDispatchToProps = (dispatch) => {
    return {
        updateEvent: (id, title) => {
            dispatch(editEvent(id, title))
        }
    }
};

export default connect(
    () => {return {}},
    mapDispatchToProps
)(EventDetail);*/

import React, { Component } from 'react';
import _ from 'lodash';
import { View, Text, Picker, Button } from 'react-native';
import { connect } from 'react-redux';
import Communications from 'react-native-communications'
import { eventUpdate, eventCreate, eventSave, eventDelete } from '../actions/events';
import EventForm from "./EventForm";
import {Confirm} from "./common/Confirm";
import {Actions} from "react-native-router-flux";

class EventDetail extends Component {
    state = {
        visible: false,
    };

    componentWillMount() {
        _.each(this.props.event, (value, prop) => {
            this.props.eventUpdate({ prop, value});
        });
    }

    onButtonPress() {
        const { title, location, organizor, nr, uid } = this.props;
        console.log(this.props.event.uid);
        this.props.eventSave({ title, location, organizor, nr, uid: this.props.event.uid });
    }

    onTextPress() {
        const { phone, shift } = this.props;
        Communications.text(phone, `You schedlue begins on ${shift}`);
    }

    onDeletePress() {
        this.setState({
            visible: !this.state.visible
        });
    }

    onAccept() {
        this.setState({
            visible: false,
        });
        this.props.eventDelete({ uid: this.props.event.uid });
    }

    onReject() {
        this.setState({
            visible: false,
        });
    }

    render() {
        return(
            <View>
                <Confirm visible={this.state.visible}
                         onAccept={this.onAccept.bind(this)}
                         onReject={this.onReject.bind(this)}
                >
                    <Text>Do you want to delete the post of the event?</Text>
                </Confirm>
                <EventForm { ...this.props } />
                <Button title="Save changes" text="save changes" onPress={() => {
                    if(this.props.isAdmin) {
                        this.onButtonPress.bind(this)
                    }
                }}/>
                {/*<Button title="Text Schedule" text="Text Schedule" onPress={ this.onTextPress.bind(this) } />*/}
                <Button title="Delete" text="Delete" onPress={() => {
                    if (this.props.isAdmin) {
                        this.onDeletePress.bind(this)
                    }
                }}/>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    const { title, location, organizor, nr, visible } = state.eventForm;
    return { title, location, organizor, nr, visible };
};

export default connect(mapStateToProps, {
    eventUpdate,
    eventCreate,
    eventSave,
    eventDelete,
})(EventDetail);

