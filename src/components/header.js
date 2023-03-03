import React, { Component } from 'react'

// importing material UI components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Button, Menu, MenuItem } from "@mui/material";
import dataService from '../Network/dataService';

export default class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            anchorPractice: null,
            anchorTest: null,
            anchorVocabulary: null,
            anchorTips: null
        }
    }

    handleLogout() {
        dataService.logoutApi();
        localStorage.clear('USER')
        window.location.href = "/";
    }
    handleHoverPractice(event) {
        if (this.state.anchorPractice !== event.currentTarget) {
            this.setState({ anchorPractice: event.currentTarget });
        }
    }
    handleHoverTest(event) {
        if (this.state.anchorTest !== event.currentTarget) {
            this.setState({ anchorTest: event.currentTarget });
        }
    }
    handleHoverVocabulary(event) {
        if (this.state.anchorVocabulary !== event.currentTarget) {
            this.setState({ anchorVocabulary: event.currentTarget });
        }
    }
    handleHoverTips(event) {
        if (this.state.anchorTips !== event.currentTarget) {
            this.setState({ anchorTips: event.currentTarget });
        }
    }

    handleClosePracice() {
        this.setState({ anchorPractice: null });
    }
    handleCloseTest() {
        this.setState({ anchorTest: null });
    }
    handleCloseVocabulary() {
        this.setState({ anchorVocabulary: null });
    }
    handleCloseTips() {
        this.setState({ anchorTips: null });
    }

    render() {
        return (
            <AppBar position="static" style={{ marginBottom: "20px", background: "#205E61", }}>
                {/* <Toolbar>

                    <Typography variant="h5"
                                component="div" sx={{flexGrow: 1}}>
                        <a href='/'>Perfect TOEIC</a>
                    </Typography>

                    <img src={this.props.loggedInUserObj.username.avatar}
                         style={{width: "50px", height: "50px", borderRadius: "50%"}} alt=""></img>
                    <Button disable="true" color="inherit">{this.props.loggedInUserObj.username.fullName}</Button>
                    <Button color="inherit" onClick={() => this.handleLogout()}>Log out</Button>
                </Toolbar> */}

                <div style={{ "paddingTop": "7px", "paddingBottom": "7px", "display": "flex", "justifyContent": "space-between", "alignItems": "center", "columnGap": "10px" }}>
                    <div className="license" style={{ "width": "131px", "height": "64px", "left": "158px", "top": "20px", "fontFamily": "'Inter'", "fontStyle": "normal", "fontWeight": "700", "fontSize": "30px", "lineHeight": "44px", "display": "flex", "alignItems": "center", "textAlign": "center", "color": "#FBFBFB" }}><a href='/'>Perfect TOEIC</a></div>
                    <div style={{ "display": "flex", "justifyContent": "space-between", "alignItems": "center", "columnGap": "140px" }}>
                        <div style={{ "fontFamily": "'Inter'", "fontStyle": "normal", "fontWeight": "700", "fontSize": "20px", "lineHeight": "19px", "display": "flex", "alignItems": "center", "textAlign": "center", "color": "#FBFBFB" }} onClick={() => window.location.href = "/"}>HOME</div>

                        <div>
                            <Button
                                aria-owns={this.state.anchorPractice ? "simple-menu" : undefined}
                                aria-haspopup="true"
                                onClick={(e) => this.handleHoverPractice(e)}
                                onMouseOver={(e) => this.handleHoverPractice(e)}
                            >
                                <div style={{ "fontFamily": "'Inter'", "fontStyle": "normal", "fontWeight": "700", "fontSize": "20px", "lineHeight": "19px", "display": "flex", "alignItems": "center", "textAlign": "center", "color": "#FBFBFB" }}>Practice</div>
                            </Button>
                            <Menu
                                id="simple-menu"
                                anchorEl={this.state.anchorPractice}
                                open={Boolean(this.state.anchorPractice)}
                                onClose={() => this.handleClosePracice()}
                                MenuListProps={{ onMouseLeave: () => this.handleClosePracice() }}
                            >
                                <MenuItem onClick={() => window.location.href = "/practice/?part=1"}>Part 1: Photos</MenuItem>
                                <MenuItem onClick={() => window.location.href = "/practice/?part=2"}>Part 2: Quesiont Response</MenuItem>
                                <MenuItem onClick={() => window.location.href = "/practice/?part=3"}>Part 3: Short Conversations</MenuItem>
                                <MenuItem onClick={() => window.location.href = "/practice/?part=4"}>Part 4: Short talks</MenuItem>
                                <MenuItem onClick={() => window.location.href = "/practice/?part=5"}>Part 5: Incompletes Sentences</MenuItem>
                                <MenuItem onClick={() => window.location.href = "/practice/?part=6"}>Part 6: Text Completion</MenuItem>
                                <MenuItem onClick={() => window.location.href = "/practice/?part=7"}>Part 7: Reading Comprehension</MenuItem>
                            </Menu>
                        </div>
                        <div>
                            <Button
                                aria-owns={this.state.anchorTest ? "simple-menu" : undefined}
                                aria-haspopup="true"
                                onClick={(e) => this.handleHoverTest(e)}
                                onMouseOver={(e) => this.handleHoverTest(e)}
                            >
                                <div style={{ "fontFamily": "'Inter'", "fontStyle": "normal", "fontWeight": "700", "fontSize": "20px", "lineHeight": "19px", "display": "flex", "alignItems": "center", "textAlign": "center", "color": "#FBFBFB" }}>Test</div>
                            </Button>
                            <Menu
                                id="simple-menu"
                                anchorEl={this.state.anchorTest}
                                open={Boolean(this.state.anchorTest)}
                                onClose={() => this.handleCloseTest()}
                                MenuListProps={{ onMouseLeave: () => this.handleCloseTest() }}
                            >
                                <MenuItem onClick={() => window.location.href = "/exam"}>Mini Test</MenuItem>
                                <MenuItem onClick={() => window.location.href = "/exam"}>Full Test</MenuItem>
                            </Menu>
                        </div>
                        <div style={{ "fontFamily": "'Inter'", "fontStyle": "normal", "fontWeight": "700", "fontSize": "20px", "lineHeight": "19px", "display": "flex", "alignItems": "center", "textAlign": "center", "color": "#FBFBFB" }}>VOCABULARY</div>
                        <div style={{ "fontFamily": "'Inter'", "fontStyle": "normal", "fontWeight": "700", "fontSize": "20px", "lineHeight": "19px", "display": "flex", "alignItems": "center", "textAlign": "center", "color": "#FBFBFB" }}>TIPS</div>
                    </div>
                    <div style={{ "display": "flex", "justifyContent": "flex-end", "alignItems": "center", "padding": "31px 0" }}>
                        <img src={this.props.loggedInUserObj.username.avatar}
                            style={{ width: "50px", height: "50px", borderRadius: "50%" }} alt=""></img>
                        <Button disable="true" color="inherit">{this.props.loggedInUserObj.username.fullName}</Button>
                        <Button color="inherit" onClick={() => this.handleLogout()}>Log out</Button>
                    </div>
                </div>
            </AppBar>
        );
    }
}