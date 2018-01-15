import React, {Component} from 'react';
import {StyleSheet} from "react-native";
import {Router, Scene, Stack} from "react-native-router-flux";
import Main from "./src/containers/Main";
import ViewEvents from "./src/containers/ViewEvents";
import {createStore} from 'redux';
import reducers from './src/reducers/index';
import {editEvent} from "./src/actions/index";
import Provider from "react-redux/src/components/Provider";
import EventDetails from "./src/containers/EventDetails";
import AddEvent from "./src/containers/AddEvent";
import Login from "./src/containers/Login";
import CreateEvent from "./src/containers/CreateEvent";
import ContactUs from "./src/containers/ContactUs";
import Statistics from "./src/containers/Statistics";
import { Actions } from 'react-native-router-flux';
import applyMiddleware from "redux/es/applyMiddleware";
import thunk from "redux-thunk";
import * as firebase from 'firebase';


/*let appStore = createStore(Reducer);

console.log(appStore.getState());


let unsubscribe = appStore.subscribe(() => {
    console.log("Modified: ", appStore.getState());
    Expo.Font.loadAsync.MaterialIcons;

});*/

export default class App extends Component {


    componentWillMount() {
        var config = {
            apiKey: "AIzaSyAV_hyE2rKb5oQR0QOVE4PjAENq3APyrwo",
            authDomain: "reactmobileapp-4027c.firebaseapp.com",
            databaseURL: "https://reactmobileapp-4027c.firebaseio.com",
            projectId: "reactmobileapp-4027c",
            storageBucket: "reactmobileapp-4027c.appspot.com",
            messagingSenderId: "972749276872"
        };
        firebase.initializeApp(config);
    }

    loadCreateForm() {
        Actions.createEvents();
    }


    render() {
        const store = createStore(reducers, {}, applyMiddleware(thunk));
        return (
            <Provider store={store}>
                <Router>
                    <Scene key="root">
                        <Scene key='login' component={Login} title='Please login' />
                        <Scene
                            key="main"
                            title="Main"
                            component={Main}
                        />

                        <Scene
                            key="viewEvents"
                            title="View Events"
                            component={ViewEvents}
                            onRight={ this.loadCreateForm.bind(this) }
                        />
                        <Scene
                            key="contactUs"
                            title="Contact Us"
                            component={ContactUs}
                        />

                        <Scene
                            key="eventDetail"
                            title="Event Detail"
                            component={EventDetails}
                        />
                        <Scene
                            key="addEvents"
                            title="Add Event"
                            component={CreateEvent}
                        />
                        <Scene
                            key="statistics"
                            title="View Statistics"
                            component={Statistics}
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
