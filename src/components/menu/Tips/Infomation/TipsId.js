import React, { Component } from "react";
import Container from '@mui/material/Container';
import {Grid} from "@mui/material";
import "../Tips.css";
import {useParams} from "react-router-dom";
import dataService from "../../../../Network/dataService";
export default class TipsId extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listObject: []
        };
        // this.getSelectedChannel = this.getSelectedChannel.bind(this);
    }

    async componentDidMount() {
        const search = window.location.search;
        const params = new URLSearchParams(search);
        const partId = params.get('part');
        let result = await dataService.getTip(partId);
        this.setState({
            listObject: result
        });
    }

    render() {
        const listObject = this.state.listObject
        return (
            <Container fixed>
                <div dangerouslySetInnerHTML={{__html: listObject.html}}></div>
            </Container>
        )
    }
}