import React, {Component} from 'react'

// importing material UI components
import AppBar from "@mui/material/AppBar";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSearch} from '@fortawesome/free-solid-svg-icons'
import {Button, Menu, MenuItem} from "@mui/material";
import dataService from '../Network/dataService';
import './header.css'
import {DownOutlined} from "@ant-design/icons";
import {Dropdown, Modal, Button as ButtonBoostrap} from 'react-bootstrap';
import Popup from "reactjs-popup";
import './menu/Tips/Tips.css'
import PopupUpdateUser from "./PopupUpdateUser";
import PostContent from "./menu/Tips/PostContent";

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorPractice: null,
            anchorTest: null,
            anchorVocabulary: null,
            anchorTips: null,
            anchorProfileUser: null,
            keyWord: "",
            showModal: true,
            showDropdown: false
        };
    }

    handleToggle(event) {
        this.setState({showDropdown: !event});
    }

    async handleModalClose() {
        await this.setState({showModal: false});
        console.log(this.state.showModal);
    }

    async handleModalOpen() {
        await this.setState({showModal: true});
        await this.setState({showDropdown: false});
        console.log(this.state.showModal);
    }

    handleLogout() {
        dataService.logoutApi();
        localStorage.clear('USER')
        window.location.href = "/";
    }

    handleLogin() {
        window.location.href = "/login";
    }

    handleHoverPractice(event) {
        if (this.state.anchorPractice !== event.currentTarget) {
            this.setState({anchorPractice: event.currentTarget});
        }
    }

    handleHoverTest(event) {
        if (this.state.anchorTest !== event.currentTarget) {
            this.setState({anchorTest: event.currentTarget});
        }
    }

    handleHoverProfileUser(event) {
        if (this.state.anchorProfileUser !== event.currentTarget) {
            this.setState({anchorProfileUser: event.currentTarget});
        }
    }

    handleCloseProfileUser() {
        this.setState({anchorProfileUser: null});
    }

    handleHoverPractice(event) {
        if (this.state.anchorPractice !== event.currentTarget) {
            this.setState({anchorPractice: event.currentTarget});
        }
    }

    handleHoverTips(event) {
        if (this.state.anchorTips !== event.currentTarget) {
            this.setState({anchorTips: event.currentTarget});
        }
    }

    handleClosePracice() {
        this.setState({anchorPractice: null});
    }

    handleCloseTest() {
        this.setState({anchorTest: null});
    }

    handleCloseVocabulary() {
        this.setState({anchorVocabulary: null});
    }

    handleCloseTips() {
        this.setState({anchorTips: null});
    }

    handleClickTest(url) {
        if (this.props.loggedInUserObj.username === undefined) {
            window.location.href = "/login";
        } else {
            window.location.href = url;
            ;
        }
    }

    async handleSearch(event) {
        await this.setState({keyWord: event})
    }

    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            window.location.href = "/search?keyword=" + this.state.keyWord;
        }
    };

    render() {
        console.log(this.state.showDropdown)
        return (
            <AppBar position="static" className="header-app-bar">
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

                <div className="menu-bar">
                    <div className="license perfect-toeic">
                        <a href='/'>
                            <p>
                                Perfect
                            </p>
                            <p style={{fontSize: "20px", marginTop: "-1rem"}}>
                                TOEIC
                            </p>
                        </a>
                    </div>
                    <div style={{
                        "display": "flex",
                        "justifyContent": "space-between",
                        "alignItems": "center",
                        "columnGap": "5rem"
                    }}>
                        <button className="home" onClick={() => window.location.href = "/"}>Home</button>

                        <div>
                            <button
                                style={{display: "flex"}}
                                aria-owns={this.state.anchorPractice ? "simple-menu" : undefined}
                                aria-haspopup="true"
                                onClick={(e) => this.handleHoverPractice(e)}
                                onMouseOver={(e) => this.handleHoverPractice(e)}
                            >
                                <div className="choose-menu-items">Practice</div>
                                <DownOutlined/>
                            </button>
                            <Menu
                                id="simple-menu"
                                anchorEl={this.state.anchorPractice}
                                open={Boolean(this.state.anchorPractice)}
                                onClose={() => this.handleClosePracice()}
                                MenuListProps={{onMouseLeave: () => this.handleClosePracice()}}
                            >
                                <MenuItem onClick={() => this.handleClickTest("/practice/?part=1")}>Part 1:
                                    Photos</MenuItem>
                                <MenuItem onClick={() => this.handleClickTest("/practice/?part=2")}>Part 2: Quesiont
                                    Response</MenuItem>
                                <MenuItem onClick={() => this.handleClickTest("/practice/?part=3")}>Part 3: Short
                                    Conversations</MenuItem>
                                <MenuItem onClick={() => this.handleClickTest("/practice/?part=4")}>Part 4: Short
                                    talks</MenuItem>
                                <MenuItem onClick={() => this.handleClickTest("/practice/?part=5")}>Part 5: Incompletes
                                    Sentences</MenuItem>
                                <MenuItem onClick={() => this.handleClickTest("/practice/?part=6")}>Part 6: Text
                                    Completion</MenuItem>
                                <MenuItem onClick={() => this.handleClickTest("/practice/?part=7")}>Part 7: Reading
                                    Comprehension</MenuItem>
                            </Menu>
                        </div>
                        <div>
                            <button
                                style={{display: "flex"}}
                                aria-owns={this.state.anchorTest ? "simple-menu" : undefined}
                                aria-haspopup="true"
                                onClick={(e) => this.handleHoverTest(e)}
                                onMouseOver={(e) => this.handleHoverTest(e)}
                            >
                                <div className="choose-menu-items">Test</div>
                                <DownOutlined/>
                            </button>
                            <Menu
                                id="simple-menu"
                                anchorEl={this.state.anchorTest}
                                open={Boolean(this.state.anchorTest)}
                                onClose={() => this.handleCloseTest()}
                                MenuListProps={{onMouseLeave: () => this.handleCloseTest()}}
                            >
                                <MenuItem onClick={() => this.handleClickTest("/minitest")}>Mini Test</MenuItem>
                                <MenuItem onClick={() => this.handleClickTest("/exam")}>Full Test</MenuItem>
                            </Menu>
                        </div>
                        <button className="home"
                                onClick={() => window.location.href = "/vocabulary/introduce"}>Vocabulary
                        </button>
                        <div>
                            <button
                                style={{display: "flex"}}
                                aria-owns={this.state.anchorTips ? "simple-menu" : undefined}
                                aria-haspopup="true"
                                onClick={(e) => this.handleHoverTips(e)}
                                onMouseOver={(e) => this.handleHoverTips(e)}
                            >
                                <div className="choose-menu-items">Tips</div>
                                <DownOutlined/>
                            </button>
                            <Menu
                                id="simple-menu"
                                anchorEl={this.state.anchorTips}
                                open={Boolean(this.state.anchorTips)}
                                onClose={() => this.handleCloseTips()}
                                MenuListProps={{onMouseLeave: () => this.handleCloseTips()}}
                            >
                                <MenuItem onClick={() => window.location.href = "/tips/listening"}>Listening
                                    Tips</MenuItem>
                                <MenuItem onClick={() => window.location.href = "/tips/reading"}>Reading Tips</MenuItem>
                            </Menu>
                        </div>
                        {/*<input*/}
                        {/*    placeholder="Search"*/}
                        {/*    style={{borderRadius:"5px",border:"1px solid #FFFFFF",paddingLeft:"1rem",color:"#FFFFFF",background:"rgb(32, 94, 97)",height:"2.25rem"}}*/}
                        {/*>*/}
                        {/*    KHANH*/}
                        {/*</input>*/}
                        {/*<FontAwesomeIcon icon={faSearch} />*/}
                        <div className="search-container">
                            <input onChange={event => this.handleSearch(event.target.value)}
                                   onKeyDown={(event) => this.handleKeyDown(event)} className="search-input" type="text"
                                   placeholder="Search"/>
                            <button>
                                <FontAwesomeIcon
                                    onClick={() => window.location.href = "/search?keyword=" + this.state.keyWord}
                                    icon={faSearch} className="search-icon"/>
                            </button>
                        </div>
                    </div>
                    {this.props.loggedInUserObj.username === undefined &&
                        <div style={{
                            "display": "flex",
                            "justifyContent": "flex-end",
                            "alignItems": "center",
                            "padding": "31px 0"
                        }}>
                            <div className="btn-login-logout">
                                <Button color="inherit" onClick={() => this.handleLogin()}>Login</Button>
                            </div>
                        </div>
                    }
                    {this.props.loggedInUserObj.username !== undefined &&
                        <div style={{
                            "display": "flex",
                            "justifyContent": "center",
                            "alignItems": "center",
                            "padding": "31px 0"
                        }}
                             onMouseLeave={() => this.handleModalOpen()}
                        >
                            <Dropdown style={{
                                "padding": "0px 1rem 0px 1rem"
                            }}
                                      show={this.state.showDropdown}
                                      onClick={() => this.handleToggle(this.state.showDropdown)}
                            >
                                <Dropdown.Toggle
                                    style={{
                                        background:"#205E61 !important",
                                        "display": "flex",
                                        "justifyContent": "center",
                                        "alignItems": "center"
                                    }}
                                    id="profile-dropdown">
                                    <div style={{
                                        "display": "flex",
                                        "justifyContent": "center",
                                        "alignItems": "center"
                                    }}>
                                        <img src={this.props.loggedInUserObj.username.avatar}
                                             style={{width: "50px", height: "50px", borderRadius: "50%"}} alt=""></img>
                                        <div disable="true"
                                             color="inherit">{this.props.loggedInUserObj.username.fullName}</div>
                                    </div>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item>
                                        <Popup modal
                                               onOpen={() => this.handleModalClose()}
                                               onClose={() => this.handleModalOpen()}
                                               trigger={
                                                   this.state.showModal && this.state.showDropdown &&
                                                   <button style={{marginTop: '1rem', fontSize: '16px'}}>Update
                                                       Users</button>
                                               }>
                                            <PopupUpdateUser/>
                                        </Popup>
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <div className="btn-login-logout">
                                <Button color="inherit" onClick={() => this.handleLogout()}>Log out</Button>
                            </div>
                        </div>
                    }
                </div>
            </AppBar>
        );
    }
}