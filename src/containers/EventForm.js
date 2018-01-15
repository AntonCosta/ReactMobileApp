import React, { Component } from 'react';
import { View, Text, Picker, Button } from 'react-native';
import { connect } from 'react-redux';
import { eventUpdate } from '../actions/events';
import {Card} from "./common/Card";
import {CardItem} from "./common/CardItem";
import {Input} from "./common/Input";
// import RNFetchBlob from 'react-native-fetch-blob'
// import CameraRollPicker from 'react-native-camera-roll-picker'

class EventForm extends Component {

    // convertToByteArray = (input) => {
    //     var binary_string = this.atob(input);
    //     var len = binary_string.length;
    //     var bytes = new Uint8Array(len);
    //     for (var i = 0; i < len; i++) {
    //         bytes[i] = binary_string.charCodeAt(i);
    //     }
    //     return bytes
    // }
    //
    // atob = (input) => {
    //     const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    //
    //     let str = input.replace(/=+$/, '');
    //     let output = '';
    //
    //     if (str.length % 4 == 1) {
    //         throw new Error("'atob' failed: The string to be decoded is not correctly encoded.");
    //     }
    //     for (let bc = 0, bs = 0, buffer, i = 0;
    //          buffer = str.charAt(i++);
    //
    //          ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
    //          bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
    //     ) {
    //         buffer = chars.indexOf(buffer);
    //     }
    //
    //     return output;
    // }
    //
    // getSelectedImages = (selectedImages, currentImage) => {
    //
    //     const image = this.convertToByteArray(currentImage.base64);


        // const Blob = RNFetchBlob.polyfill.Blob;
        // const fs = RNFetchBlob.fs;
        // window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
        // window.Blob = Blob;


        // let uploadBlob = null;
        // const imageRef = firebase.storage().ref('posts').child("test.jpg");
        // let mime = 'image/jpg';
        // fs.readFile(image, 'base64')
        //     .then((data) => {
        //         return Blob.build(data, { type: `${mime};BASE64` })
        //     })
        //     .then((blob) => {
        //         uploadBlob = blob;
        //         this.props.eventUpdate({ prop: 'image', value: uploadBlob})
                // this.setState({image: uploadBlob})
                // return imageRef.put(blob, { contentType: mime })
            // })
            // .then(() => {
            //     uploadBlob.close();
                // return imageRef.getDownloadURL()
            // })
            // .then((url) => {
                // URL of the image uploaded on Firebase storage
                // console.log(url);
            //
            // })
            // .catch((error) => {
            //     console.log(error);
            //
            // })
    // }

    render() {
        return(
            <Card>
                <CardItem>
                    <Input
                        placeholder="Enter the title of your post"
                        autoCorrect={false}
                        label="title"
                        value={this.props.title}
                        onChangeText={text => this.props.eventUpdate({ prop: 'title', value: text})}
                    />
                </CardItem>
                <CardItem>
                    {/*<CameraRollPicker selected={[]} maximum={1} callback={this.getSelectedImages} />*/}
                    <Input
                        placeholder="Enter the location name"
                        autoCorrect={false}
                        label="location"
                        value={this.props.location}
                        onChangeText={location => this.props.eventUpdate({ prop: 'location', value: location})}/>
                </CardItem>
                <CardItem>
                    <Input
                        placeholder="Enter the name of the organizor"
                        autoCorrect={false}
                        label="organizor"
                        value={this.props.organizor}
                        onChangeText={org => this.props.eventUpdate({ prop: 'organizor', value: org})}
                    />
                </CardItem>
                <CardItem>
                    <Text>Nr of people</Text>
                    <Picker
                        selectedValue={this.props.nr}
                        onValueChange={nr => this.props.eventUpdate({ prop: 'nr', value: nr })}>
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
                </CardItem>
            </Card>
        );
    }
}

const mapStateToProps = (state) => {
    const { title, location, organizor, nr } = state.eventForm;
    return { title, location, organizor, nr };
};

export default connect(mapStateToProps, { eventUpdate })(EventForm);