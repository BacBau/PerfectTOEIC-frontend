import React, {Component} from 'react'

// importing material UI components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import {Button, Container, Grid, Menu, MenuItem} from "@mui/material";
import dataService from '../Network/dataService';
import './header.css'
import {DownOutlined} from "@ant-design/icons";
import fb from "../images/facebook.png";
import yt from "../images/youtube.png";
import tw from "../images/twitter.png";
import ins from "../images/ins.png";
import linkedIn from "../images/linkedin.png";
import profile from '../images/profile.jpg'
import { animateScroll as scroll } from 'react-scroll'
import { scroller } from 'react-scroll'

import './footer.css'

export default class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    handleScrollToTop = () => {
        scroll.scrollToTop();
    };

    handleScrollToPosition = (id) => {
        scroller.scrollTo(id, {
            duration: 800,
            delay: 0,
            smooth: 'easeInOutQuart'
        });
    };


    render() {
        return (
            <>
                {/*<div id="review" className="review">*/}
                {/*    <div className="review-text">*/}
                {/*        <div className="review1">*/}
                {/*            <h2 style={{fontSize: "24px"}}><strong>TOEIC Test Overview</strong></h2>*/}
                {/*            <br/>*/}
                {/*            <h3 style={{fontSize: "19px"}}><strong>1.1 What Is TOEIC ?</strong></h3>*/}
                {/*            <br/>*/}
                {/*            <p style={{fontSize: "16px"}}><strong>TOEIC (the Test of English for International Communication)</strong> is a standardized English test oriented towards professionals and companies. The exam is a product of ETS, an American non-profit organization.</p>*/}
                {/*            <br/>*/}
                {/*            <p style={{fontSize: "16px"}}>Questions in the TOEIC test are based on real-life work settings in the international environment such as meetings, travel, telephone conversations and so on.</p>*/}
                {/*        </div>*/}
                {/*        <br/>*/}
                {/*        <div className="review2">*/}
                {/*            Show more*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
                {/*<div dangerouslySetInnerHTML={{__html: listObject.html}}></div>*/}

                <div className="footer2">
                    <Container fixed>
                        <Grid container spacing={2}>
                            <Grid className="grid-logo-1" item xs={12} md={4}>
                                <button onClick={() => window.location = "https://www.facebook.com/bac.bau.0611"}>
                                    <img className="profile" src={profile}/>
                                </button>
                                <button onClick={() => this.handleScrollToTop()}>
                                    <div className="logo">
                                        <p>
                                            Perfect
                                        </p>
                                        <p style={{fontSize: "20px", marginTop: "-1rem"}}>
                                            TOEIC
                                        </p>
                                    </div>
                                </button>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <div className="logo2">
                                    <button onClick={() => this.handleScrollToTop()} className="logo2-1">Home</button>
                                    <button onClick={() => this.handleScrollToPosition('toeic-listening')} className="logo2-1">Practice</button>
                                    <button onClick={() => this.handleScrollToPosition('toeic-exam-simulator')} className="logo2-1">Test</button>
                                    <button onClick={() => window.location.href = '/vocabulary/introduce'} className="logo2-1">Vocabulary</button>
                                </div>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <div className="logo2">
                                    <button className="logo2-1">About Us</button>
                                    <button className="logo2-1">Contact</button>
                                    <button className="logo2-1">Terms</button>
                                    <button className="logo2-1">Privacy</button>
                                </div>
                            </Grid>
                        </Grid>

                        <div className=""></div>
                    </Container>
                </div>

                <div id="colophon">
                    <div className="main-footer">

                    </div>
                    <div className="footer-bellow" style={{ "fontSize": "18px", "fontWeight": "500", "background": "#205E61", "color": "#FBFBFB", marginTop: "-2px" }}>
                        <Container className="footer-below-wrap MuiContainer-root MuiContainer-maxWidthXl css-1ll7j1d" style={{ "paddingTop": "7px", "paddingBottom": "7px", "display": "flex", "justifyContent": "space-between", "alignItems": "center", "columnGap": "10px" }}>
                            <div className="license" style={{ "fontStyle": "italic", "maxWidth": "60%", "fontSize": "13px", "textAlign": "justify" }}>TOEIC is a registered trademark of Educational Testing Service (ETS). This web is not affiliated with or endorsed by Educational Testing Service.</div>
                            <div className="social-main-panel" style={{ "display": "flex", "justifyContent": "flex-end", "alignItems": "center", "padding": "31px 0" }}>
                                <div className="social-label" style={{ "marginRight": "22px" }}>Connect with us</div>
                                <div className="social-link-icons" style={{ "display": "flex", "alignItems": "center" }}>
                                    <a href="https://www.facebook.com/bac.bau.0611" target="_blank">
                                        <div className="social-item-icon" style={{ "position": "relative", "width": "39px", "height": "39px", "marginLeft": "10px" }}><span style={{ "boxSizing": "border-box", "display": "block", "overflow": "hidden", "width": "initial", "height": "initial", "background": "none", "opacity": "1", "border": "0px", "margin": "0px", "padding": "0px", "position": "absolute", "inset": "0px" }}>
                                            <img src={fb} alt="facebook" sizes="100vw" decoding="async" data-nimg="fill" style={{ "position": "absolute", "inset": "0px", "boxSizing": "border-box", "padding": "0px", "border": "none", "margin": "auto", "display": "block", "width": "0px", "height": "0px", "minWidth": "100%", "maxWidth": "100%", "minHeight": "100%", "maxHeight": "100%", "objectFit": "contain" }} /></span></div>
                                    </a>
                                    <a href="https://www.instagram.com/bac_bau" target="_blank">
                                        <div className="social-item-icon" style={{ "position": "relative", "width": "39px", "height": "39px", "marginLeft": "10px" }}><span style={{ "boxSizing": "border-box", "display": "block", "overflow": "hidden", "width": "initial", "height": "initial", "background": "none", "opacity": "1", "border": "0px", "margin": "0px", "padding": "0px", "position": "absolute", "inset": "0px" }}>
                                            <img src={ins} alt="instagram" sizes="100vw" decoding="async" data-nimg="fill" style={{ "position": "absolute", "inset": "0px", "boxSizing": "border-box", "padding": "0px", "border": "none", "margin": "auto", "display": "block", "width": "0px", "height": "0px", "minWidth": "100%", "maxWidth": "100%", "minHeight": "100%", "maxHeight": "100%", "objectFit": "contain" }} /></span></div>
                                    </a>
                                    <a href="https://www.linkedin.com/in/ngodaibac" target="_blank">
                                        <div className="social-item-icon" style={{ "position": "relative", "width": "39px", "height": "39px", "marginLeft": "10px" }}><span style={{ "boxSizing": "border-box", "display": "block", "overflow": "hidden", "width": "initial", "height": "initial", "background": "none", "opacity": "1", "border": "0px", "margin": "0px", "padding": "0px", "position": "absolute", "inset": "0px" }}>
                                            <img src={linkedIn} alt="linkedIn" sizes="100vw" decoding="async" data-nimg="fill" style={{ "position": "absolute", "inset": "0px", "boxSizing": "border-box", "padding": "0px", "border": "none", "margin": "auto", "display": "block", "width": "0px", "height": "0px", "minWidth": "100%", "maxWidth": "100%", "minHeight": "100%", "maxHeight": "100%", "objectFit": "contain" }} /></span></div>
                                    </a>
                                </div>
                            </div>
                        </Container>
                    </div>
                </div>
            </>
        );
    }
}