import React, {Component} from 'react';
import {StyleSheet} from "react-native";
import {Router, Scene, Stack} from "react-native-router-flux";
import Main from "./src/containers/Main";
import ViewEvents from "./src/containers/ViewEvents";
import {createStore} from 'redux';
import {Reducer} from './src/reducers';
import {editEvent} from "./src/actions/index";
import Provider from "react-redux/src/components/Provider";
import EventDetails from "./src/containers/EventDetails";

let appStore = createStore(Reducer);

console.log(appStore.getState());


let unsubscribe = appStore.subscribe(() => {
    console.log("Modified: ", appStore.getState());
});

export default class App extends Component {

    render() {
        return (
            <Provider store={appStore}>
                <Router>
                    <Scene key="root">
                        <Scene
                            key="main"
                            title="Main"
                            component={Main}
                        />

                        <Scene
                            key="viewEvents"
                            title="View Events"
                            component={ViewEvents}
                        />

                        <Scene
                            key="eventDetail"
                            title="Event Detail"
                            component={EventDetails}
                        />
                    </Scene>
                </Router>
            </Provider>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        color: 'brown',
        fontWeight: 'bold'
    },
    imageBox: {
        height: 400
    }
});
