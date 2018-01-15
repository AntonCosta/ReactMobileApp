import React, {Component} from 'react';
import {Text, View, StyleSheet, FlatList, TouchableHighlight, Image} from "react-native";
import {connect} from "react-redux";
import {Actions} from "react-native-router-flux";
import { Card, ListItem, Button } from 'react-native-elements';
import Sidebar from 'react-native-sidebar';
import storageService from '../Services/StorageService';
import {eventsFetch} from "../actions/events";
import * as _ from 'lodash';


class ViewEvents extends Component {

    _keyExtractor = (item, index) => item.id;

    _onSelectItem = (item) => {
        console.log(item);
        console.log("Clicked");
        Actions.eventDetail({event: item});

    };

    componentWillMount() {
        this.props.eventsFetch();
        // this.createDataSource(this.props);
    }

    _renderEventItem = ({item}) => {
        console.log(item.location);
        return (
            <Card
                title={item.title}
                location={item.location}
                organizor = {item.organizor}
                nr = {item.nr}>
                <Text style={{marginBottom: 10}}>
                    {item.title}
                </Text>
                <Button
                    /*icon={{name: 'code'}}*/
                    backgroundColor='#03A9F4'
                    onPress={()=>this._onSelectItem(item)}
                    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                    title='Edit' />
            </Card>
        )
    };

    /*async update(newEvents){
        this.setState({
            reviews: newEvents,
            dataSource: this.ds.cloneWithRows(newEvents)
        });
        await storageService.setEvents(newEvents);
    }*/

    render() {
        console.log("ViewEvents");
        console.log("Props: ", this.props);
        return (

            /*{/!*<Sidebar
                leftSidebar={
                <View>
                    <Button
                        /!*icon={{name: 'home'}}*!/
                        backgroundColor='#03A9F4'
                        onPress={
                            Actions.viewEvents()
                        }
                        buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 10}}
                        title='View Events'/>
                    <Button
                        /!*icon={{name: 'email'}}*!/
                        backgroundColor='#03A9F4'
                        onPress={() => {
                            Linking.openURL('mailto:costaanton96@gmail.com&subject=abcdefg&body=body')
                        }}
                        buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 10}}
                        title='Contact Us' />
                    <Button
                        /!*icon={{name: 'note-add'}}*!/
                        backgroundColor='#03A9F4'
                        onPress={
                            Actions.addEvents()
                        }
                        buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                        title='Add Event' />
                </View>
        }

        style={{flex: 1}}>*!/}*/
        <View style={styles.mainView}>
           <Text> View Events scene </Text>
           <FlatList
               data={this.props.events}
               keyExtractor={this._keyExtractor}
               renderItem={this._renderEventItem}
            />

        </View>
        /*{/!*</Sidebar>*!/}*/
        )
    }
}

const mapStateToProps = (state) => {
    const events = _.map(state.eventData, (val, uid) => {
        return {
            ...val,
            uid
        }
    });
    return { events };
};

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
    },
});



export default connect(
    mapStateToProps,
    {eventsFetch}

)(ViewEvents);