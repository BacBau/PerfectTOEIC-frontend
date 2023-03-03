import React, { Component } from "react";
import Container from '@mui/material/Container';
import dataService from '../../Network/dataService';

export default class ListPart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listObject: [],
            partNumber: 0,
        };
    }
    async componentDidMount() {
        const search = window.location.search;
        const params = new URLSearchParams(search);
        const partId = params.get('part');
        this.setState({ partNumber: partId })
        let result = await dataService.listPart(partId);
        this.setState({ listObject: result.id });
    }

    render() {
        return (
            <Container fixed>
                <div id="test-list-view" className="practice-detail-view">
                    <h1 className="practice-list-view-title tilte-h1">Start your TOEIC Practice Test Part {this.state.partNumber} Now!</h1>
                    <div className="practice-list-view-main"><div className="practice-name">Part {this.state.partNumber}</div>
                        <div className="practice-list">
                            {this.state.listObject.map(
                                (data, index) => {
                                    return (
                                        <a href={"../question/part?part=" + data + "&partNumber=" + this.state.partNumber}>
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
                        </div>
                    </div>
                </div>
            </Container>
        )
    }
}