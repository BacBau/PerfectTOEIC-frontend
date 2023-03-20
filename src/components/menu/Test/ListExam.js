import React, { Component } from "react";
import Container from '@mui/material/Container';
import dataService from "../../../Network/dataService";

export default class ListExam extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listObject: [],
            isFullTest: props.isFullTest
        };
        // this.getSelectedChannel = this.getSelectedChannel.bind(this);
    }

    async componentDidMount() {
        let result;
        if (this.state.isFullTest === 1) {
            result = await dataService.listExam();
        } else {
            result = await dataService.listMiniTest();
        }
        console.log(result)
        this.setState({ listObject: result.id });
    }


    render() {
        return (
            <Container fixed>
                <div id="test-list-view" className="practice-detail-view">
                    {this.state.isFullTest === 1 ?
                        <h1 className="practice-list-view-title tilte-h1">Start your TOEIC Online Full Test Now!</h1> :
                        <h1 className="practice-list-view-title tilte-h1">Start your TOEIC Online Mini Test Now!</h1>
                    }
                    <div className="practice-list-view-main"><div className="practice-name">
                        {this.state.isFullTest === 1 ? 'FULL TEST' : 'MINI TEST'}
                    </div>
                        <div className="practice-list">
                            <>
                                {this.state.isFullTest === 1 && this.state.listObject.map(
                                    function (data, index) {
                                        return (
                                            <a href={"../question/exam?exam=" + data + "&test=" + (index + 1)}>
                                                <div className="practice-list-item">
                                                    <div className="practice-item-name">TEST {index + 1}</div>
                                                    <div className="practice-item-progress">
                                                        <div className="progress-box" style={{ "border": "1px solid rgb(186, 205, 255)", "color": "rgb(101, 110, 241)", "background": "rgb(232, 238, 255)" }}>0 pts</div>
                                                    </div>
                                                </div>
                                            </a>
                                        )
                                    }
                                )}
                                {this.state.isFullTest === 0 && this.state.listObject.map(
                                    function (data, index) {
                                        return (
                                            <a href={"../question/exam?mini-exam=" + data + "&test=" + (index + 1)}>
                                                <div className="practice-list-item">
                                                    <div className="practice-item-name">TEST {index + 1}</div>
                                                    <div className="practice-item-progress">
                                                        <div className="progress-box" style={{ "border": "1px solid rgb(186, 205, 255)", "color": "rgb(101, 110, 241)", "background": "rgb(232, 238, 255)" }}>0 pts</div>
                                                    </div>
                                                </div>
                                            </a>
                                        )
                                    }
                                )}
                            </>
                        </div>
                    </div>
                </div>
            </Container>
        )
    }
}