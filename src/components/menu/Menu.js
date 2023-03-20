import React, {Component} from "react";
import dataService from "../../Network/dataService";
import part1 from '../../images/part-1.webp';
import part2 from '../../images/part-2.webp';
import part3 from '../../images/part-3.webp';
import part4 from '../../images/part-4.webp';
import part5 from '../../images/part-5.webp';
import part6 from '../../images/part-6.webp';
import part7 from '../../images/part-7.webp';
import miniTest from '../../images/mini-test.webp';
import backGround1 from '../../images/template.png'
import backGround2 from '../../images/template2.svg'
import bgo from "../../images/bg0.png"
import backGround3 from '../../images/template3.svg'
import bgReview from '../../images/bg-review.webp'
import review1 from '../../images/review-1.png'
import fb from '../../images/facebook.png'
import yt from '../../images/youtube.png'
import tw from '../../images/twitter.png'
import './Menu.css';
import {Grid, Typography, Button, Container} from '@mui/material';

export default class Menu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            result: {},
            showMore: false
        };

        // this.getSelectedChannel = this.getSelectedChannel.bind(this);
    }

    // async componentDidMount() {
    //     window.addEventListener("beforeunload", function (e) {
    //         // dataService.offline();
    //     });
    //
    //     //var username = this.props.loggedInUserObj.username.username;
    // }

    async componentDidMount() {
        let result = await dataService.getInfoHome();
        this.setState({result: result})
        console.log(result)
        //var username = this.props.loggedInUserObj.username.username;
    }

    handleClickTest() {
        if (this.props.loggedInUserObj.username === undefined) {
            window.location.href = "/login";
        } else {
            window.location.href = "/exam";
            ;
        }
    }

    handleShowMore() {
        this.setState({showMore: true})
    }

    handleShowLess() {
        this.setState({showMore: false})
    }

    render() {
        return (
            <div>
                <div className="test-item-panel-header">
                    <span style={{
                        "boxSizing": "border-box",
                        "display": "block",
                        "overflow": "hidden",
                        "width": "initial",
                        "height": "initial",
                        "background": "#3F979B",
                        "opacity": "1",
                        "border": "0px",
                        "margin": "0px",
                        "padding": "0px",
                        "position": "absolute",
                        "inset": "0px"
                    }}>
                        <div className="div-background">
                            <img src={backGround1} className="background1"/>
                            <div className="div-background2">
                                <img src={backGround2} className="background2"/>
                            </div>
                            <div className="div-background3">
                                <img src={backGround3} className="background3"/>
                            </div>
                            <div className="text-background">
                                <h1 className="text-boost">Boost...</h1>
                                <div className="text-boost2">
                                    <p>your score TOEIC with </p>
                                    <p>our online learning platform!</p>
                                </div>
                                <br/>
                                <br/>
                                <div className="text-boost3">
                                    <p>Unlimited number of exams</p>
                                    <p>Friendly interface, easy to use, time like real exam</p>
                                    <p>Practice for each part of the real exam</p>
                                    <p>Automatic scoring, detailed assessment of the exam</p>
                                </div>
                            </div>
                        </div>
                    </span>
                </div>

                <div style={{
                    "display": "flex",
                    "justifyContent": "center",
                    "alignItems": "center",
                    "flexDirection": "column",
                    marginTop: "40px"
                }}>
                    <div style={{
                        "marginBottom": "20px",
                        "marginLeft": "250px",
                        "width": "654px",
                        "fontFamily": "'Roboto'",
                        "fontStyle": "normal",
                        "fontWeight": "600",
                        "fontSize": "36px",
                        "lineHeight": "42px",
                        "display": "flex",
                        "alignItems": "center",
                        "textAlign": "center",
                        "color": "#205E61"
                    }}>FREE Online TOEIC Test
                    </div>
                    <div style={{
                        "marginBottom": "40px",
                        "width": "1112px",
                        "fontFamily": "'Roboto'",
                        "fontStyle": "normal",
                        "fontWeight": "300",
                        "fontSize": "24px",
                        "lineHeight": "28px",
                        "display": "flex",
                        "alignItems": "center",
                        "textAlign": "center",
                        "color": "#3F979B"
                    }}>Welcome to our PerfectTOEIC! We are proud to be one of the leading online learning platforms
                        for Toeic test preparation, providing you with quality study materials and free official Toeic
                        tests
                        to help you prepare well. best for the Toeic exam.
                    </div>
                </div>

                <div className="part-container-panel">
                    <div id="toeic-exam-simulator" className="part-item toeic-exam-simulator">
                        <div>
                            <Typography variant="h3" gutterBottom style={{color: "#205E61", marginTop: "70px"}}>
                                TOEIC Exam Simulator
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item>
                                    <div className="test-item-panel">
                                    <span style={{
                                        "boxSizing": "border-box",
                                        "display": "block",
                                        "overflow": "hidden",
                                        "width": "initial",
                                        "height": "initial",
                                        "background": "#3F979B",
                                        "opacity": "1",
                                        "border": "0px",
                                        "margin": "0px",
                                        "padding": "0px",
                                        "position": "absolute",
                                        "inset": "0px"
                                    }}>
                                        {/*<div style={{"background":"#3F979B"}}></div>*/}
                                        {/*<img src={miniTest} decoding="async" data-nimg="fill" className="test-tiem-panel-bg-image" style={{ "position": "absolute", "inset": "0px", "boxSizing": "border-box", "padding": "0px", "border": "none", "margin": "auto", "display": "block", "width": "0px", "height": "0px", "minWidth": "100%", "maxWidth": "100%", "minHeight": "100%", "maxHeight": "100%", "objectFit": "cover", "objectPosition": "right center" }} sizes="100vw" />*/}
                                    </span>
                                        <div className="test-item-panel-main">
                                            <div className="test-item-main-title">MINI TEST</div>
                                            <div className="test-item-main-desc dot-3">Take mini test with the number of
                                                questions and time limit reduced by half
                                            </div>
                                        </div>
                                        <div className="test-item-func-join-button-wrap">
                                            <a style={{"textDecoration": "none", "color": "inherit"}}>
                                                <Button onClick={() => this.handleClickTest()}
                                                        className="test-item-func-join-button">Join</Button>
                                            </a>
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item>
                                    <div className="test-item-panel">
                                    <span style={{
                                        "boxSizing": "border-box",
                                        "display": "block",
                                        "overflow": "hidden",
                                        "width": "initial",
                                        "height": "initial",
                                        "background": "#3F979B",
                                        "opacity": "1",
                                        "border": "0px",
                                        "margin": "0px",
                                        "padding": "0px",
                                        "position": "absolute",
                                        "inset": "0px"
                                    }}>
                                        {/*<img src={fullTest} decoding="async" data-nimg="fill" className="test-tiem-panel-bg-image" style={{ "position": "absolute", "inset": "0px", "boxSizing": "border-box", "padding": "0px", "border": "none", "margin": "auto", "display": "block", "width": "0px", "height": "0px", "minWidth": "100%", "maxWidth": "100%", "minHeight": "100%", "maxHeight": "100%", "objectFit": "cover", "objectPosition": "right center" }} sizes="100vw" />*/}
                                    </span>
                                        <div className="test-item-panel-main">
                                            <div className="test-item-main-title">FULL TEST</div>
                                            <div className="test-item-main-desc dot-3">Take full test with the same
                                                number of questions and time limit as the actual test
                                            </div>
                                        </div>
                                        <div className="test-item-func-join-button-wrap">
                                            <a style={{"textDecoration": "none", "color": "inherit"}}>
                                                <Button onClick={() => this.handleClickTest()}
                                                        className="test-item-func-join-button">Join</Button>
                                            </a>
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    </div>

                    <div id="toeic-listening" className="part-item listening">
                        <div>
                            <Typography variant="h3" gutterBottom style={{color: "#205E61", marginTop: "70px"}}>
                                Listening
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item>
                                    <a href="practice/?part=1">
                                        <div className="part-item-data">
                                            <div className="part-item-data-avatar-wrap">
                                            <span style={{
                                                boxSizing: "border-box",
                                                display: "block",
                                                overflow: "hidden",
                                                width: "initial",
                                                height: "initial",
                                                background: "none",
                                                opacity: "1",
                                                border: "0px",
                                                margin: "0px",
                                                padding: "0px",
                                                position: "absolute",
                                                inset: "0px"
                                            }}>
                                                <img alt="Part 1" src={part1} decoding="async" data-nimg="fill"
                                                     className="part-item-data-avatar" sizes="75vw" style={{
                                                    position: "absolute",
                                                    inset: "0px",
                                                    boxSizing: "border-box",
                                                    padding: "0px",
                                                    border: "none",
                                                    margin: "auto",
                                                    display: "block",
                                                    width: "0px",
                                                    height: "0px",
                                                    minWidth: "100%",
                                                    maxWidth: "100%",
                                                    minHeight: "100%",
                                                    maxHeight: "100%",
                                                    objectFit: "cover"
                                                }}/>
                                            </span>
                                            </div>
                                            <div className="part-item-data-content">
                                                <div className="part-item-data-short-name">Part 1</div>
                                                <div className="part-item-data-name">Photos</div>
                                                <div className="part-item-data-desc dot-6">Four short statements
                                                    regarding a photograph will be spoken only one time. Of these four
                                                    statements, select the one. that best describes the photograph.
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </Grid>
                                <Grid item>
                                    <a href="practice/?part=2">
                                        <div className="part-item-data">
                                            <div className="part-item-data-avatar-wrap">
                                            <span style={{
                                                boxSizing: "border-box",
                                                display: "block",
                                                overflow: "hidden",
                                                width: "initial",
                                                height: "initial",
                                                background: "none",
                                                opacity: "1",
                                                border: "0px",
                                                margin: "0px",
                                                padding: "0px",
                                                position: "absolute",
                                                inset: "0px"
                                            }}>
                                                <img alt="Part 2" src={part2} decoding="async" data-nimg="fill"
                                                     className="part-item-data-avatar" sizes="75vw" style={{
                                                    position: "absolute",
                                                    inset: "0px",
                                                    boxSizing: "border-box",
                                                    padding: "0px",
                                                    border: "none",
                                                    margin: "auto",
                                                    display: "block",
                                                    width: "0px",
                                                    height: "0px",
                                                    minWidth: "100%",
                                                    maxWidth: "100%",
                                                    minHeight: "100%",
                                                    maxHeight: "100%",
                                                    objectFit: "cover"
                                                }}/>
                                            </span>
                                            </div>
                                            <div className="part-item-data-content">
                                                <div className="part-item-data-short-name">Part 2</div>
                                                <div className="part-item-data-name">Question Response</div>
                                                <div className="part-item-data-desc dot-6">Three responses to one
                                                    question or statement will be spoken only one time. Select the best
                                                    response for the question.
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </Grid>
                                <Grid item>
                                    <a href="practice/?part=3">
                                        <div className="part-item-data">
                                            <div className="part-item-data-avatar-wrap">
                                            <span style={{
                                                boxSizing: "border-box",
                                                display: "block",
                                                overflow: "hidden",
                                                width: "initial",
                                                height: "initial",
                                                background: "none",
                                                opacity: "1",
                                                border: "0px",
                                                margin: "0px",
                                                padding: "0px",
                                                position: "absolute",
                                                inset: "0px"
                                            }}>
                                                <img alt="Part 3" src={part3} decoding="async" data-nimg="fill"
                                                     className="part-item-data-avatar" sizes="75vw" style={{
                                                    position: "absolute",
                                                    inset: "0px",
                                                    boxSizing: "border-box",
                                                    padding: "0px",
                                                    border: "none",
                                                    margin: "auto",
                                                    display: "block",
                                                    width: "0px",
                                                    height: "0px",
                                                    minWidth: "100%",
                                                    maxWidth: "100%",
                                                    minHeight: "100%",
                                                    maxHeight: "100%",
                                                    objectFit: "cover"
                                                }}/>
                                            </span>
                                            </div>
                                            <div className="part-item-data-content">
                                                <div className="part-item-data-short-name">Part 3</div>
                                                <div className="part-item-data-name">Short Conversations</div>
                                                <div className="part-item-data-desc dot-6">Conversations between two or
                                                    three people will be spoken only one time. Listen to each
                                                    conversation and select the best response for the question. There
                                                    are three questions for each conversation.
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </Grid>
                                <Grid item>
                                    <a href="practice/?part=4">
                                        <div className="part-item-data">
                                            <div className="part-item-data-avatar-wrap">
                                            <span style={{
                                                boxSizing: "border-box",
                                                display: "block",
                                                overflow: "hidden",
                                                width: "initial",
                                                height: "initial",
                                                background: "none",
                                                opacity: "1",
                                                border: "0px",
                                                margin: "0px",
                                                padding: "0px",
                                                position: "absolute",
                                                inset: "0px"
                                            }}>
                                                <img alt="Part 4" src={part4} decoding="async" data-nimg="fill"
                                                     className="part-item-data-avatar" sizes="75vw" style={{
                                                    position: "absolute",
                                                    inset: "0px",
                                                    boxSizing: "border-box",
                                                    padding: "0px",
                                                    border: "none",
                                                    margin: "auto",
                                                    display: "block",
                                                    width: "0px",
                                                    height: "0px",
                                                    minWidth: "100%",
                                                    maxWidth: "100%",
                                                    minHeight: "100%",
                                                    maxHeight: "100%",
                                                    objectFit: "cover"
                                                }}/>
                                            </span>
                                            </div>
                                            <div className="part-item-data-content">
                                                <div className="part-item-data-short-name">Part 4</div>
                                                <div className="part-item-data-name">Short Talks</div>
                                                <div className="part-item-data-desc dot-6">Short talks such as
                                                    announcements or narrations will be spoken only one time. Listen to
                                                    each talk and select the best response for the question There are
                                                    three questions for each talk.
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </Grid>
                            </Grid>
                        </div>
                    </div>

                    <div id="toeic-reading" className="part-item listening">
                        <div>
                            <Typography variant="h3" gutterBottom style={{color: "#205E61", marginTop: "70px"}}>
                                Reading
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item>
                                    <a href="practice/?part=5">
                                        <div className="part-item-data">
                                            <div className="part-item-data-avatar-wrap">
                                            <span style={{
                                                boxSizing: "border-box",
                                                display: "block",
                                                overflow: "hidden",
                                                width: "initial",
                                                height: "initial",
                                                background: "none",
                                                opacity: "1",
                                                border: "0px",
                                                margin: "0px",
                                                padding: "0px",
                                                position: "absolute",
                                                inset: "0px"
                                            }}>
                                                <img alt="Part 5" src={part5} decoding="async" data-nimg="fill"
                                                     className="part-item-data-avatar" sizes="75vw" style={{
                                                    position: "absolute",
                                                    inset: "0px",
                                                    boxSizing: "border-box",
                                                    padding: "0px",
                                                    border: "none",
                                                    margin: "auto",
                                                    display: "block",
                                                    width: "0px",
                                                    height: "0px",
                                                    minWidth: "100%",
                                                    maxWidth: "100%",
                                                    minHeight: "100%",
                                                    maxHeight: "100%",
                                                    objectFit: "cover"
                                                }}/>
                                            </span>
                                            </div>
                                            <div className="part-item-data-content">
                                                <div className="part-item-data-short-name">Part 5</div>
                                                <div className="part-item-data-name">Incompletes Sentences</div>
                                                <div className="part-item-data-desc dot-6">Select the best answer of the
                                                    four choices to complete the sentence.
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </Grid>
                                <Grid item>
                                    <a href="practice/?part=6">
                                        <div className="part-item-data">
                                            <div className="part-item-data-avatar-wrap">
                                            <span style={{
                                                boxSizing: "border-box",
                                                display: "block",
                                                overflow: "hidden",
                                                width: "initial",
                                                height: "initial",
                                                background: "none",
                                                opacity: "1",
                                                border: "0px",
                                                margin: "0px",
                                                padding: "0px",
                                                position: "absolute",
                                                inset: "0px"
                                            }}>
                                                <img alt="Part 6" src={part6} decoding="async" data-nimg="fill"
                                                     className="part-item-data-avatar" sizes="75vw" style={{
                                                    position: "absolute",
                                                    inset: "0px",
                                                    boxSizing: "border-box",
                                                    padding: "0px",
                                                    border: "none",
                                                    margin: "auto",
                                                    display: "block",
                                                    width: "0px",
                                                    height: "0px",
                                                    minWidth: "100%",
                                                    maxWidth: "100%",
                                                    minHeight: "100%",
                                                    maxHeight: "100%",
                                                    objectFit: "cover"
                                                }}/>
                                            </span>
                                            </div>
                                            <div className="part-item-data-content">
                                                <div className="part-item-data-short-name">Part 6</div>
                                                <div className="part-item-data-name">Text Completion</div>
                                                <div className="part-item-data-desc dot-6">Select the best answer of the
                                                    four choices (words, phrases, or a sentence) to complete the text.
                                                    There are four questions for each text.
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </Grid>
                                <Grid item>
                                    <a href="practice/?part=7">
                                        <div className="part-item-data">
                                            <div className="part-item-data-avatar-wrap">
                                            <span style={{
                                                boxSizing: "border-box",
                                                display: "block",
                                                overflow: "hidden",
                                                width: "initial",
                                                height: "initial",
                                                background: "none",
                                                opacity: "1",
                                                border: "0px",
                                                margin: "0px",
                                                padding: "0px",
                                                position: "absolute",
                                                inset: "0px"
                                            }}>
                                                <img alt="Part 7" src={part7} decoding="async" data-nimg="fill"
                                                     className="part-item-data-avatar" sizes="75vw" style={{
                                                    position: "absolute",
                                                    inset: "0px",
                                                    boxSizing: "border-box",
                                                    padding: "0px",
                                                    border: "none",
                                                    margin: "auto",
                                                    display: "block",
                                                    width: "0px",
                                                    height: "0px",
                                                    minWidth: "100%",
                                                    maxWidth: "100%",
                                                    minHeight: "100%",
                                                    maxHeight: "100%",
                                                    objectFit: "cover"
                                                }}/>
                                            </span>
                                            </div>
                                            <div className="part-item-data-content">
                                                <div className="part-item-data-short-name">Part 7</div>
                                                <div className="part-item-data-name">Reading Comprehension</div>
                                                <div className="part-item-data-desc dot-6">Read a range of different
                                                    texts and select the best answer of the four choices.There are
                                                    multiple questions for each text.
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </Grid>
                                <Grid item>
                                    <a href="">
                                        <div className="part-item-data-none">
                                            <div className="part-item-data-avatar-wrap">
                                            <span style={{
                                                boxSizing: "border-box",
                                                display: "block",
                                                overflow: "hidden",
                                                width: "initial",
                                                height: "initial",
                                                background: "none",
                                                opacity: "1",
                                                border: "0px",
                                                margin: "0px",
                                                padding: "0px",
                                                position: "absolute",
                                                inset: "0px"
                                            }}>
                                                {/*<img alt="Part 7" src={part7} decoding="async" data-nimg="fill" className="part-item-data-avatar" sizes="75vw" style={{ position: "absolute", inset: "0px", boxSizing: "border-box", padding: "0px", border: "none", margin: "auto", display: "block", width: "0px", height: "0px", minWidth: "100%", maxWidth: "100%", minHeight: "100%", maxHeight: "100%", objectFit: "cover" }} />*/}
                                            </span>
                                            </div>
                                            <div className="part-item-data-content" style={{width: "300px"}}>
                                                {/*<div className="part-item-data-short-name">Part 7</div>*/}
                                                {/*<div className="part-item-data-name">Reading Comprehension</div>*/}
                                                {/*<div className="part-item-data-desc dot-6">Read a range of different texts and select the best answer of the four choices.There are multiple questions for each text.</div>*/}
                                            </div>
                                        </div>
                                    </a>
                                </Grid>
                            </Grid>
                        </div>
                    </div>

                    <div style={{background: "#FFFFFF", padding: "50px 280px"}}>
                        {this.state.showMore ?
                            <>
                                <div dangerouslySetInnerHTML={{__html: this.state.result.html}}></div>
                            </> :
                            <>
                                <div>
                                    <div id='introduction'>
                                        <div className='MuiContainer-root MuiContainer-maxWidthXl css-1ll7j1d'>
                                            <div className='list-intro read-more'>
                                                <h2>
                                                    <strong>1. TOEIC Test Overview</strong>
                                                </h2>
                                                <h3>
                                                    <strong>1.1. What Is TOEIC ?</strong>
                                                </h3>
                                                <p>
                                                    <strong>TOEIC (the Test of
                                                        English for International Communication)&nbsp;
                                                    </strong>
                                                    is a standardized English
                                                    test oriented towards professionals and companies. The exam is a product of
                                                    ETS,
                                                    an American non-profit organization.&nbsp;
                                                </p>
                                                <p>Questions in the TOEIC test are
                                                    based on real-life work settings in the international environment such as
                                                    meetings, travel, telephone conversations and so on.&nbsp;
                                                </p>
                                                <h3>
                                                    <strong>
                                                        1.2.
                                                        TOEIC Test Format
                                                    </strong>
                                                </h3>
                                                <p>
                                                    The TOEIC test includes two sections: Reading
                                                    and Listening. Candidates will take the Reading section within 75 minutes
                                                    and
                                                    the Listening section within 45 minutes. The total time for a TOEIC exam is
                                                    120
                                                    minutes.&nbsp;
                                                </p>
                                                <p>Each section consists of 100 multiple choice questions.
                                                </p>
                                                <p>
                                                    Here is the new format of the exam. Like the previous format, the new format
                                                    comprises 7 parts; however, the number of questions in certain parts has
                                                    been changed.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        }
                        <div style={{marginTop:"2rem", fontSize:"20px", color:"#34447C"}}>
                            {this.state.showMore ?
                                <button
                                    style={{fontWeight:"bold"}}
                                    onClick={() => this.handleShowLess()}
                                >
                                    Show less
                                </button> :
                                <button
                                    style={{fontWeight:"bold"}}
                                    onClick={() => this.handleShowMore()}
                                >
                                    Show more
                                </button>
                            }
                        </div>
                    </div>

                </div>
            </div>

        );
    }
}