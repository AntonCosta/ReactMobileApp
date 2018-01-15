import React, {Component} from 'react';
import {View, AsyncStorage, Text, StyleSheet} from 'react-native';
import {Pie} from 'react-native-pathjs-charts'
import * as _ from "lodash";
import {connect} from "react-redux";
import {eventsFetch} from "../actions/events";
import {Actions} from 'react-native-router-flux';
// import {Svg, Circle, Rect} from 'react-native-svg';

class Statistics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [],
            filtered: []
        }
    }

    componentDidMount() {
        this.fetchEvents()
    }

    fetchEvents() {
        // let events = await AsyncStorage.getItem("events");
        // events = JSON.parse(events);
        let events = this.props.events;
        console.log(events);
        if (events === null) {
            events = [];
        }

        let filtered = this.filterByCost(events);
        console.log("Filtered: ", filtered);

        this.setState({
            events: events,
            filtered: filtered
        });
    }

    filterByCost(events) {
        console.log("Events: ", events);
        let dict = {};
        let result = [];
        for (let i = 0; i < events.length; i++) {
            let cost = events[i].nr;
            if (dict[cost] === undefined) {
                dict[cost] = 1;
            } else {
                dict[cost]++;
            }
        }

        dict = Object.keys(dict).map((key, index) => {
            result.push({
                "nr": key,
                "count": dict[key]
            })
        });

        return result;
    }

    render() {
        let data = this.state.filtered;

        let options = {
            margin: {
                top: 20,
                left: 20,
                right: 20,
                bottom: 20
            },
            width: 350,
            height: 350,
            color: '#2980B9',
            r: 50,
            R: 150,
            legendPosition: 'topLeft',
            animate: {
                type: 'oneByOne',
                duration: 200,
                fillTransition: 3
            },
            label: {
                fontFamily: 'Arial',
                fontSize: 14,
                fontWeight: true,
                color: '#ECF0F1'
            }
        };

        return (
            <View style={styles.mainStatistics}>
                <Text style={styles.title}> How many events are there for each nr of people</Text>
                <Pie
                    data={data}
                    options={options}
                    accessorKey="count"/>
            </View>
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
    mainStatistics: {
        flex: 1,
        alignItems: 'center'
    },
    title: {
        fontSize: 16
    }
});

export default connect(
    mapStateToProps,
    {eventsFetch}
)(Statistics);