import React, { Component } from 'react';
import { StyleSheet } from "react-native";
import { connect } from "react-redux";
import { editEvent } from "../actions/index";
import { Card, Button, FormLabel, FormInput } from 'react-native-elements';

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
        )
    }

    render() {
        return (
            <Card
                title={this.state.id}
                image={this.props.eveniment.img}>
                <FormLabel>Title</FormLabel>
                <FormInput placeholder={this.state.title} onChangeText={(text) => {
                    this.setState({title: text})
                }}/>
                <Button
                    icon={{name: 'code'}}
                    backgroundColor='#03A9F4'
                    onPress={() => {this._updateEvent()}}
                    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                    title='Update' />
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
)(EventDetail);