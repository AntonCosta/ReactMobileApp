import React, { Component } from 'react';
import {openURL, Picker, StyleSheet, TextInput, View} from "react-native";
import { connect } from "react-redux";
import { editEvent } from "../actions/index";
import { Card, Button, FormLabel, FormInput } from 'react-native-elements';
import {Actions} from "react-native-router-flux";
import Text from "react-native-elements/src/text/Text";


class AddEvent extends Component {

    constructor(props) {
        super(props);
        console.log("Before mount: ", this.props);
        console.log("Event: ", this.props.eveniment);
        this.state = {
            id: '',
            title: '',
            img: ''
        }
    }

    _addEvent() {

            const events = this.props.navigation.state.params.events || [];
            let newEvents = events.slice();
            let maxId = Math.max.apply(Math, newEvents.map(function(p){ return p.id; })) + 1;
            if (newEvents.length == 0) {
                maxId = 1;
            }
            newEvents.push({
                id: maxId,
                title: this.state.title,
                image: require("../images/weight_lifting.png")
            });
            this.props.navigation.state.params.update(newEvents);
            this.props.navigation.goBack();


    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', margin: 10}}>
                <Text style={{fontSize: 20}}> Create new element</Text>
                <TextInput style={{fontSize: 20, width: 250}} value={this.state.name} placeholder="Title"
                           onChangeText={(text) => this.setState({name: text})}>
                </TextInput>
                <Text style={{fontSize: 20}}>Quantity</Text>
                <Picker
                    style={{width: 100}}
                    selectedValue={this.state.rate}
                    onValueChange={(itemValue, itemIndex) => this.setState({rate: itemValue})}>
                    <Picker.Item label="1" value="1" />
                    <Picker.Item label="2" value="2" />
                    <Picker.Item label="3" value="3" />
                    <Picker.Item label="4" value="4" />
                    <Picker.Item label="5" value="5" />
                    <Picker.Item label="6" value="6" />
                    <Picker.Item label="7" value="7" />
                    <Picker.Item label="8" value="8" />
                    <Picker.Item label="9" value="9" />
                    <Picker.Item label="10" value="10" />
                </Picker>
                <Button
                    onPress={this._addEvent.bind(this)}
                    title="Save"
                />
                <Button
                    onPress={() =>{
                        let receiver = "costaanton96@gmail.com";
                        let subject = "Email from RevBooks App";
                        let body = "Title: " + this.state.title + "\n" +
                            "  Name: " + this.state.text;
                        let all = "mailto:" + receiver + "?subject=" + subject + "&body=" + body ;
                        openURL(all)}}
                    title="Send Email"
                />
            </View>

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
)(AddEvent);