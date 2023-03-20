import React, { Component } from "react";
import { Grid, Typography, Button, Container, IconButton, SvgIcon } from '@mui/material';
import dataService from '../../Network/dataService';
import resultImage from '../../images/practice-done.svg'

export default class PartQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listQuestion: [],
            questionState: [],
            questionResult: [],
            partNumber: 0,
            currentQuestion: 0,
            numberCorrect: 0,
            numberIncorrect: 0,
            showResult: false
        };
    }

    async componentDidMount() {
        const search = window.location.search;
        const params = new URLSearchParams(search);
        const partId = params.get('part');
        const partNumber = params.get('partNumber');
        this.setState({ partNumber: partNumber })
        if (partId) {
            let result = await dataService.getPartDetail(partId);
            var questionNumber = result.questionList[result.questionList.length - 1].childQuestion.length == 0 ?
                result.questionList[result.questionList.length - 1].questionNumber + result.questionList[result.questionList.length - 1].childQuestion.length : result.questionList[result.questionList.length - 1].questionNumber + result.questionList[result.questionList.length - 1].childQuestion.length - 1;
            this.setState({
                listQuestion: result.questionList,
                questionState: new Array(questionNumber).fill(0),
                questionResult: new Array(questionNumber).fill(0),
            });
        }
    }

    handleChooseAnswer(questionNumber, index, dataChildAnswer) {
        let questionState1 = [...this.state.questionState];
        let questionResult1 = [...this.state.questionResult];
        if (questionState1[questionNumber - 1] == 0) {
            questionState1[questionNumber - 1] = index;
            if (dataChildAnswer.charAt(1) == this.state.listQuestion[this.state.currentQuestion].answer.charAt(1)) {
                questionResult1[questionNumber - 1] = true;
                this.setState({ numberCorrect: this.state.numberCorrect + 1 });
            } else {
                questionResult1[questionNumber - 1] = false;
                this.setState({ numberIncorrect: this.state.numberIncorrect + 1 });
            }
            this.setState({ questionState: questionState1, questionResult: questionResult1 })
        };
    }

    handleChooseChildAnswer(questionNumber, childQuestionIndex, index, dataChildAnswer) {
        let questionState1 = [...this.state.questionState];
        let questionResult1 = [...this.state.questionResult];
        if (questionState1[questionNumber - 1] == 0) {
            questionState1[questionNumber - 1] = index;
            if (dataChildAnswer.charAt(1) == this.state.listQuestion[this.state.currentQuestion].childQuestion[childQuestionIndex].answer.charAt(1)) {
                questionResult1[questionNumber - 1] = true;
                this.setState({ numberCorrect: this.state.numberCorrect + 1 });
            } else {
                questionResult1[questionNumber - 1] = false;
                this.setState({ numberIncorrect: this.state.numberIncorrect + 1 });
            }
            this.setState({ questionState: questionState1, questionResult: questionResult1 })
        };
    }

    nextQuestion() {
        if (this.state.currentQuestion == this.state.listQuestion.length - 1) {
            this.setState({ showResult: true })
        } 
        this.setState({ currentQuestion: this.state.currentQuestion + 1 })
    }

    tryAgain() {
        this.setState( {
            listQuestion: [],
            questionState: [],
            questionResult: [],
            partNumber: 0,
            currentQuestion: 0,
            numberCorrect: 0,
            numberIncorrect: 0,
            showResult: false
        });
        this.componentDidMount()
    }

    render() {
        return (
            <div id="main-study-view" className="main-study-view">
                <Container >
                    <div className="main-study-layout">
                        <div className="study-layout-item study-layout-left small-desktop">
                            <div className="study-layout-left-wrap">
                                <Typography variant="h2" gutterBottom style={{ color: "#34447C", paddingBottom: "50px" }}>
                                    PART {this.state.partNumber}
                                </Typography>
                                <div id="question-palette-panel">
                                    <div className="current-topic-label">Test 1</div>
                                    <div className="question-palette-main">
                                        <div className="question-palette-header">
                                            <div className="question-palette-title">Question Palette</div>
                                        </div>
                                        <div className="question-palette-body">
                                            <div className="questions-list">
                                                <div className="questions-list-row">
                                                    {this.state.questionResult.map(
                                                        (data, index) => {
                                                            if (index < 24)
                                                                return (
                                                                    <IconButton className="question-item" tabIndex="0" type="button" style={{ background: this.state.questionState[index] == 0 ? "grey" : this.state.questionResult[index] == true ? "#4CAF50" : "#FF5252", color: "white" }} onClick={() => data.hasChild ? {} : this.setState({ currentQuestion: index })}>{index + 1}<span className="MuiTouchRipple-root css-w0pj6f"></span></IconButton >
                                                                )
                                                        }
                                                    )}
                                                    {/* <IconButton className="question-item p-item-current-game p-item-current-index p-item-correct" tabIndex="0" type="button">1<span className="MuiTouchRipple-root css-w0pj6f"></span>
                                                    </IconButton > */}

                                                </div>
                                            </div>
                                            <div className="questions-stat">
                                                <div className="questions-stat-item">
                                                    <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <rect y="0.5" width="10" height="10" rx="3" fill="#4CAF50"></rect></svg>
                                                    <span className="questions-stat-item-text">{this.state.numberCorrect}/{this.state.listQuestion.length} Correct</span>
                                                </div>
                                                <div className="questions-stat-item">
                                                    <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <rect y="0.5" width="10" height="10" rx="3" fill="#FF5252"></rect></svg>
                                                    <span className="questions-stat-item-text">{this.state.numberIncorrect}/{this.state.listQuestion.length} Incorrect</span>
                                                </div></div>
                                        </div>
                                        {/* <div className="question-palette-footer">
                                        <div className="question-palette-function-buttons">
                                            <button className="MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButtonBase-root button-restart-game css-100vahc" tabIndex="0" type="button">
                                                <span className="MuiButton-startIcon MuiButton-iconSizeMedium css-6xugel">
                                                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M10.5058 5.7425C10.3966 4.64209 9.92633 3.68805 9.11815 2.89296C8.33352 2.12139 7.37995 1.64787 6.26097 1.48695C6.03229 1.45392 5.80096 1.43965 5.55727 1.4153C5.55727 1.3792 5.55727 1.34086 5.55727 1.3028C5.55727 1.04813 5.55815 0.793452 5.55727 0.5385V0.105276C5.55727 0.0185192 5.45279 -0.0310161 5.3798 0.0215976L2.62209 2.01392C2.59943 2.03016 2.58589 2.05282 2.58089 2.07661C2.57971 2.08081 2.57942 2.08501 2.57942 2.08921C2.57648 2.12363 2.5906 2.15889 2.62298 2.18184L5.38068 4.13442C5.45367 4.18592 5.55727 4.13666 5.55727 4.05019V3.58562C5.55786 3.34746 5.55727 3.10958 5.55727 2.87142C5.55727 2.83363 5.55727 2.79585 5.55727 2.75919C5.96666 2.73988 6.64299 2.89185 7.04767 3.07963C7.80317 3.43002 8.38031 3.95503 8.75821 4.66896C9.1158 5.34482 9.22528 6.06182 9.09049 6.80653C8.96305 7.50954 8.63077 8.11936 8.10484 8.62814C7.45735 9.25447 6.67006 9.60961 5.7474 9.6695C4.94275 9.72184 4.19284 9.54161 3.51798 9.11762C2.70509 8.60715 2.18239 7.89855 1.95253 6.99572C1.91221 6.83788 1.88131 6.67052 1.80038 6.53115C1.63939 6.25381 1.28709 6.1525 0.971592 6.26192C0.656089 6.37163 0.483917 6.66212 0.541896 7.00915C0.642845 7.61393 0.869171 8.17617 1.20616 8.69643C1.68147 9.42966 2.31483 10.009 3.11477 10.417C4.33882 11.0417 5.62408 11.1614 6.95143 10.7903C7.99123 10.4996 8.84268 9.93089 9.49899 9.10922C10.2951 8.1132 10.6292 6.98396 10.5058 5.7425Z" fill="#007AFF"></path></svg>
                                                </span>Restart<span className="MuiTouchRipple-root css-w0pj6f">
                                                </span>
                                            </button>
                                        </div>
                                    </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="study-layout-item study-layout-mid small-desktop">
                            <div id="game-view-container">
                                {this.state.showResult &&
                                    <div id="main-game-view" className="">
                                        <div id="main-game-scroll-panel" className="main-game-object">
                                            <div id="game-done-view">
                                                <div className="done-view-title">Congratulations</div>
                                                <div className="done-view-image-wrap"><img className="done-view-image" alt="congratulations" src={resultImage} /></div>
                                                <div className="try-again-button-wrap">
                                                    <Button variant="contained" onClick={() => this.tryAgain()}>TRY AGAIN</Button>
                                                </div>
                                                <div className="continue-box-buttons">
                                                    <div className="continue-box-button">
                                                        <div className="continue-box-value" style={{ "color": "rgb(255, 82, 82)" }}>{this.state.numberIncorrect}</div>
                                                        <div className="continue-box-main">
                                                            <div className="continue-box-main-button" style={{"background":"rgb(255, 82, 82)"}}>Continue</div>
                                                            <div className="continue-box-label">Incorrect</div>
                                                        </div>
                                                    </div>
                                                    <div className="continue-box-button">
                                                        <div className="continue-box-value" style={{ "color": "rgb(130, 188, 36)" }}>{this.state.numberCorrect}</div>
                                                        <div className="continue-box-main">
                                                            <div className="continue-box-main-button" style={{ "background": "rgb(130, 188, 36)" }}>Continue</div>
                                                            <div className="continue-box-label">Correct</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="main-game-object-buttons"></div>
                                    </div>
                                }
                                {this.state.listQuestion[this.state.currentQuestion] &&
                                    <div id="main-game-view" style={{ paddingBottom: "60px", marginTop: "30px" }}>
                                        <div id="main-game-scroll-panel" className="main-game-object">
                                            <div className="game-object-view-container">
                                                <div className="normal-root-container">
                                                    <div className="game-object-view game-object-quiz">
                                                        <div className="question-index-wrap">
                                                            <div className="game-object-question quiz-game-object-question">
                                                                {this.state.listQuestion[this.state.currentQuestion].hasChild == 0 && <div className="game-object-view-aio-question-index">Question {this.state.listQuestion[this.state.currentQuestion].questionNumber}:</div>}
                                                                {this.state.listQuestion[this.state.currentQuestion].hasChild == 1 && <div className="game-object-view-aio-question-index">Question {this.state.listQuestion[this.state.currentQuestion].questionNumber + " - " + (this.state.listQuestion[this.state.currentQuestion].questionNumber + this.state.listQuestion[this.state.currentQuestion].childQuestion.length - 1)} </div>}
                                                                {this.state.listQuestion[this.state.currentQuestion].sound &&
                                                                    <div className="game-object-question-sound">
                                                                        <div className="custom-react-audio-player">
                                                                            <audio controls>
                                                                                <source src={this.state.listQuestion[this.state.currentQuestion].sound} type="audio/ogg" />
                                                                                <source src={this.state.listQuestion[this.state.currentQuestion].sound} type="audio/mpeg" />
                                                                                Your browser does not support the audio element.
                                                                            </audio>
                                                                        </div>
                                                                    </div>
                                                                }
                                                                {this.state.listQuestion[this.state.currentQuestion].image &&
                                                                    <div className="game-object-question-image">
                                                                        <div className="game-image-widget-container" style={{ "width": "300px" }}>
                                                                            <img src={this.state.listQuestion[this.state.currentQuestion].image} alt="media" style={{ "width": "100%" }} />
                                                                        </div>
                                                                    </div>
                                                                }
                                                                {this.state.listQuestion[this.state.currentQuestion].text && <div className="game-object-question-text" dangerouslySetInnerHTML={{ __html: this.state.listQuestion[this.state.currentQuestion].text }} />}
                                                            </div>
                                                        </div>
                                                        <div className="game-object-quiz-choices">

                                                            {this.state.listQuestion[this.state.currentQuestion].answer.split("|").sort().map(
                                                                (dataChildAnswer, index) => {
                                                                    if (dataChildAnswer) return (
                                                                        <div className="quiz-choice-item" onClick={() => this.handleChooseAnswer(this.state.listQuestion[this.state.currentQuestion].questionNumber, index, dataChildAnswer)}>
                                                                            <div className="quiz-choice-item-icon show-result">
                                                                                {this.state.questionState[this.state.listQuestion[this.state.currentQuestion].questionNumber - 1] != index &&
                                                                                    <svg className="quiz-choice-item-icon-svg" width="26" height="25" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                        <path d="M10.8393 0.999268H15.8345C20.8064 0.999268 24.8369 5.02977 24.8369 10.0016V14.9969C24.8369 19.9688 20.8064 23.9993 15.8345 23.9993H10.8393C5.86741 23.9993 1.83691 19.9688 1.83691 14.9969V10.0016C1.83691 5.02976 5.86741 0.999268 10.8393 0.999268Z" fill="white" stroke="#D2D2D2" strokeWidth="2"></path>
                                                                                    </svg>
                                                                                }
                                                                                {this.state.questionState[this.state.listQuestion[this.state.currentQuestion].questionNumber - 1] == index && dataChildAnswer.charAt(1) == this.state.listQuestion[this.state.currentQuestion].answer.charAt(1) &&
                                                                                    <svg width="26" height="25" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                        <path d="M15.8345 0H10.8393C5.31513 0 0.836914 4.47821 0.836914 10.0024V14.9976C0.836914 20.5218 5.31513 25 10.8393 25H15.8345C21.3587 25 25.8369 20.5218 25.8369 14.9976V10.0024C25.8369 4.47821 21.3587 0 15.8345 0Z" fill="#4CAF50"></path>
                                                                                        <path d="M17.9387 8.80472C17.8296 8.70115 17.7018 8.62102 17.5627 8.56896C17.4236 8.5169 17.276 8.49392 17.1283 8.50137C16.9807 8.50881 16.8359 8.54653 16.7023 8.61234C16.5688 8.67814 16.449 8.77074 16.3501 8.88481C15.9747 9.28527 15.6251 9.71244 15.255 10.1236L12.2267 13.5729C11.5532 12.9055 10.926 12.2594 10.273 11.64C10.0537 11.425 9.76221 11.3075 9.46065 11.3125C9.15909 11.3175 8.87131 11.4446 8.65867 11.6667C8.55432 11.7785 8.47223 11.9106 8.41705 12.0554C8.36186 12.2002 8.33467 12.3548 8.33706 12.5105C8.33945 12.6662 8.37135 12.8199 8.43095 12.9628C8.49054 13.1057 8.57668 13.235 8.6844 13.3433C9.60984 14.3045 10.5524 15.246 11.5121 16.1679C11.6133 16.2732 11.7335 16.3567 11.8659 16.4137C11.9982 16.4707 12.1401 16.5 12.2833 16.5C12.4266 16.5 12.5684 16.4707 12.7007 16.4137C12.8331 16.3567 12.9533 16.2732 13.0545 16.1679L13.1213 16.0932C14.7768 14.2244 16.4203 12.3448 18.0518 10.4546C18.1506 10.339 18.2264 10.2043 18.275 10.0582C18.3236 9.91215 18.3439 9.75755 18.3348 9.60329C18.3257 9.44902 18.2874 9.29813 18.2221 9.15926C18.1568 9.0204 18.0657 8.89628 17.9541 8.79403L17.9387 8.80472Z" fill="white"></path>
                                                                                    </svg>
                                                                                }
                                                                                {this.state.questionState[this.state.listQuestion[this.state.currentQuestion].questionNumber - 1] == index && dataChildAnswer.charAt(1) != this.state.listQuestion[this.state.currentQuestion].answer.charAt(1) &&
                                                                                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                        <path d="M15.8345 0.998291H10.8393C5.31513 0.998291 0.836914 5.4765 0.836914 11.0007V15.9959C0.836914 21.5201 5.31513 25.9983 10.8393 25.9983H15.8345C21.3587 25.9983 25.8369 21.5201 25.8369 15.9959V11.0007C25.8369 5.4765 21.3587 0.998291 15.8345 0.998291Z" fill="#FF5252"></path>
                                                                                        <g filter="url(#filter0_d_263_983)">
                                                                                            <path fillRule="evenodd" clipRule="evenodd" d="M10.5659 9.92491C10.6872 9.97551 10.7972 10.0496 10.8896 10.1429L13.339 12.5836L15.7814 10.143C15.8738 10.0496 15.9839 9.97552 16.1052 9.92491C16.2266 9.87424 16.3569 9.84814 16.4884 9.84814C16.62 9.84814 16.7503 9.87424 16.8717 9.92491C16.993 9.97554 17.1031 10.0497 17.1956 10.1432C17.3822 10.3308 17.487 10.5846 17.487 10.8491C17.487 11.1138 17.3819 11.3679 17.1952 11.5555L14.7527 13.9962L17.1955 16.4441C17.3822 16.6317 17.487 16.8856 17.487 17.1502C17.487 17.4148 17.3816 17.6693 17.1949 17.8569C17.0072 18.0434 16.7532 18.1481 16.4884 18.1481C16.2237 18.1481 15.9693 18.043 15.7815 17.8564L13.339 15.4088L10.8891 17.8569C10.7014 18.0434 10.4474 18.1481 10.1826 18.1481C9.91791 18.1481 9.66393 18.0434 9.47618 17.8569L9.47471 17.8554C9.29029 17.6669 9.18701 17.4138 9.18701 17.1502C9.18701 16.8866 9.29029 16.6335 9.47471 16.445L9.47589 16.4438L11.9254 13.9962L9.47471 11.5543C9.29029 11.3659 9.18701 11.1127 9.18701 10.8491C9.18701 10.5855 9.29086 10.3318 9.47527 10.1433C9.56779 10.0498 9.67795 9.97558 9.79937 9.92491C9.92079 9.87424 10.0511 9.84814 10.1826 9.84814C10.3142 9.84814 10.4445 9.87424 10.5659 9.92491Z" fill="white"></path>
                                                                                        </g>

                                                                                    </svg>
                                                                                }
                                                                            </div>
                                                                            <div className="quiz-choice-item-content not-selected">{dataChildAnswer}</div>
                                                                        </div>
                                                                    )
                                                                }
                                                            )}

                                                            {this.state.listQuestion[this.state.currentQuestion].hasChild == 1 && this.state.listQuestion[this.state.currentQuestion].childQuestion.map(
                                                                (dataChild, questionChildIndex) => {
                                                                    if (dataChild) return (
                                                                        <div>
                                                                            {dataChild.text && <div className="game-object-question-text" dangerouslySetInnerHTML={{ __html: dataChild.questionNumber + "." + dataChild.text }} />}
                                                                            {!dataChild.text && <div style={{ marginBottom: "30px" }} />}
                                                                            {dataChild.answer.split("|").sort().map(
                                                                                (dataChildAnswer, index) => {
                                                                                    if (dataChildAnswer) return (
                                                                                        <div className="quiz-choice-item" onClick={() => this.handleChooseChildAnswer(dataChild.questionNumber, questionChildIndex, index, dataChildAnswer)}>
                                                                                            <div className="quiz-choice-item-icon show-result">
                                                                                                {this.state.questionState[dataChild.questionNumber - 1] != index &&
                                                                                                    <svg className="quiz-choice-item-icon-svg" width="26" height="25" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                                        <path d="M10.8393 0.999268H15.8345C20.8064 0.999268 24.8369 5.02977 24.8369 10.0016V14.9969C24.8369 19.9688 20.8064 23.9993 15.8345 23.9993H10.8393C5.86741 23.9993 1.83691 19.9688 1.83691 14.9969V10.0016C1.83691 5.02976 5.86741 0.999268 10.8393 0.999268Z" fill="white" stroke="#D2D2D2" strokeWidth="2"></path>
                                                                                                    </svg>
                                                                                                }
                                                                                                {this.state.questionState[dataChild.questionNumber - 1] == index && dataChildAnswer.charAt(1) == dataChild.answer.charAt(1) &&
                                                                                                    <svg width="26" height="25" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                                        <path d="M15.8345 0H10.8393C5.31513 0 0.836914 4.47821 0.836914 10.0024V14.9976C0.836914 20.5218 5.31513 25 10.8393 25H15.8345C21.3587 25 25.8369 20.5218 25.8369 14.9976V10.0024C25.8369 4.47821 21.3587 0 15.8345 0Z" fill="#4CAF50"></path>
                                                                                                        <path d="M17.9387 8.80472C17.8296 8.70115 17.7018 8.62102 17.5627 8.56896C17.4236 8.5169 17.276 8.49392 17.1283 8.50137C16.9807 8.50881 16.8359 8.54653 16.7023 8.61234C16.5688 8.67814 16.449 8.77074 16.3501 8.88481C15.9747 9.28527 15.6251 9.71244 15.255 10.1236L12.2267 13.5729C11.5532 12.9055 10.926 12.2594 10.273 11.64C10.0537 11.425 9.76221 11.3075 9.46065 11.3125C9.15909 11.3175 8.87131 11.4446 8.65867 11.6667C8.55432 11.7785 8.47223 11.9106 8.41705 12.0554C8.36186 12.2002 8.33467 12.3548 8.33706 12.5105C8.33945 12.6662 8.37135 12.8199 8.43095 12.9628C8.49054 13.1057 8.57668 13.235 8.6844 13.3433C9.60984 14.3045 10.5524 15.246 11.5121 16.1679C11.6133 16.2732 11.7335 16.3567 11.8659 16.4137C11.9982 16.4707 12.1401 16.5 12.2833 16.5C12.4266 16.5 12.5684 16.4707 12.7007 16.4137C12.8331 16.3567 12.9533 16.2732 13.0545 16.1679L13.1213 16.0932C14.7768 14.2244 16.4203 12.3448 18.0518 10.4546C18.1506 10.339 18.2264 10.2043 18.275 10.0582C18.3236 9.91215 18.3439 9.75755 18.3348 9.60329C18.3257 9.44902 18.2874 9.29813 18.2221 9.15926C18.1568 9.0204 18.0657 8.89628 17.9541 8.79403L17.9387 8.80472Z" fill="white"></path>
                                                                                                    </svg>
                                                                                                }
                                                                                                {this.state.questionState[dataChild.questionNumber - 1] == index && dataChildAnswer.charAt(1) != dataChild.answer.charAt(1) &&
                                                                                                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                                        <path d="M15.8345 0.998291H10.8393C5.31513 0.998291 0.836914 5.4765 0.836914 11.0007V15.9959C0.836914 21.5201 5.31513 25.9983 10.8393 25.9983H15.8345C21.3587 25.9983 25.8369 21.5201 25.8369 15.9959V11.0007C25.8369 5.4765 21.3587 0.998291 15.8345 0.998291Z" fill="#FF5252"></path>
                                                                                                        <g filter="url(#filter0_d_263_983)">
                                                                                                            <path fillRule="evenodd" clipRule="evenodd" d="M10.5659 9.92491C10.6872 9.97551 10.7972 10.0496 10.8896 10.1429L13.339 12.5836L15.7814 10.143C15.8738 10.0496 15.9839 9.97552 16.1052 9.92491C16.2266 9.87424 16.3569 9.84814 16.4884 9.84814C16.62 9.84814 16.7503 9.87424 16.8717 9.92491C16.993 9.97554 17.1031 10.0497 17.1956 10.1432C17.3822 10.3308 17.487 10.5846 17.487 10.8491C17.487 11.1138 17.3819 11.3679 17.1952 11.5555L14.7527 13.9962L17.1955 16.4441C17.3822 16.6317 17.487 16.8856 17.487 17.1502C17.487 17.4148 17.3816 17.6693 17.1949 17.8569C17.0072 18.0434 16.7532 18.1481 16.4884 18.1481C16.2237 18.1481 15.9693 18.043 15.7815 17.8564L13.339 15.4088L10.8891 17.8569C10.7014 18.0434 10.4474 18.1481 10.1826 18.1481C9.91791 18.1481 9.66393 18.0434 9.47618 17.8569L9.47471 17.8554C9.29029 17.6669 9.18701 17.4138 9.18701 17.1502C9.18701 16.8866 9.29029 16.6335 9.47471 16.445L9.47589 16.4438L11.9254 13.9962L9.47471 11.5543C9.29029 11.3659 9.18701 11.1127 9.18701 10.8491C9.18701 10.5855 9.29086 10.3318 9.47527 10.1433C9.56779 10.0498 9.67795 9.97558 9.79937 9.92491C9.92079 9.87424 10.0511 9.84814 10.1826 9.84814C10.3142 9.84814 10.4445 9.87424 10.5659 9.92491Z" fill="white"></path>
                                                                                                        </g>

                                                                                                    </svg>
                                                                                                }
                                                                                            </div>
                                                                                            <div className="quiz-choice-item-content not-selected">{dataChildAnswer}</div>
                                                                                        </div>
                                                                                    )
                                                                                }
                                                                            )}
                                                                            {this.state.questionState[dataChild.questionNumber - 1] != 0 &&
                                                                                <div className="game-object-explanation quiz-explanation">
                                                                                    <div className="game-object-explanation-content" dangerouslySetInnerHTML={{ __html: dataChild.hint }}></div>
                                                                                </div>
                                                                            }
                                                                        </div>
                                                                    )
                                                                }
                                                            )
                                                            }
                                                            {/* <div className="quiz-choice-item picking">
                                                                <div className="quiz-choice-item-icon show-result">
                                                                    <svg width="26" height="25" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M15.8345 0H10.8393C5.31513 0 0.836914 4.47821 0.836914 10.0024V14.9976C0.836914 20.5218 5.31513 25 10.8393 25H15.8345C21.3587 25 25.8369 20.5218 25.8369 14.9976V10.0024C25.8369 4.47821 21.3587 0 15.8345 0Z" fill="#4CAF50"></path>
                                                                        <path d="M17.9387 8.80472C17.8296 8.70115 17.7018 8.62102 17.5627 8.56896C17.4236 8.5169 17.276 8.49392 17.1283 8.50137C16.9807 8.50881 16.8359 8.54653 16.7023 8.61234C16.5688 8.67814 16.449 8.77074 16.3501 8.88481C15.9747 9.28527 15.6251 9.71244 15.255 10.1236L12.2267 13.5729C11.5532 12.9055 10.926 12.2594 10.273 11.64C10.0537 11.425 9.76221 11.3075 9.46065 11.3125C9.15909 11.3175 8.87131 11.4446 8.65867 11.6667C8.55432 11.7785 8.47223 11.9106 8.41705 12.0554C8.36186 12.2002 8.33467 12.3548 8.33706 12.5105C8.33945 12.6662 8.37135 12.8199 8.43095 12.9628C8.49054 13.1057 8.57668 13.235 8.6844 13.3433C9.60984 14.3045 10.5524 15.246 11.5121 16.1679C11.6133 16.2732 11.7335 16.3567 11.8659 16.4137C11.9982 16.4707 12.1401 16.5 12.2833 16.5C12.4266 16.5 12.5684 16.4707 12.7007 16.4137C12.8331 16.3567 12.9533 16.2732 13.0545 16.1679L13.1213 16.0932C14.7768 14.2244 16.4203 12.3448 18.0518 10.4546C18.1506 10.339 18.2264 10.2043 18.275 10.0582C18.3236 9.91215 18.3439 9.75755 18.3348 9.60329C18.3257 9.44902 18.2874 9.29813 18.2221 9.15926C18.1568 9.0204 18.0657 8.89628 17.9541 8.79403L17.9387 8.80472Z" fill="white"></path>
                                                                    </svg>
                                                                </div>
                                                                <div className="quiz-choice-item-content correct">(A)</div>
                                                            </div> */}
                                                            {this.state.questionState[this.state.currentQuestion] != 0 &&
                                                                <div className="game-object-explanation quiz-explanation">
                                                                    <div className="game-object-explanation-content" dangerouslySetInnerHTML={{ __html: this.state.listQuestion[this.state.currentQuestion].hint }}></div>
                                                                </div>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="main-game-object-buttons" style={{ float: "right", marginRight: "50px" }}>
                                            <Button className="MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButtonBase-root main-game-object-button main-game-object-continue-button single-node css-100vahc" tabIndex="0" type="button" onClick={() => this.nextQuestion()}>
                                                Next
                                                <span className="MuiButton-endIcon MuiButton-iconSizeMedium css-1n4a93h">
                                                    <SvgIcon className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium jss3 css-vubbuv" focusable="false" viewBox="0 0 24 24" aria-hidden="true" data-testid="ArrowForwardIosIcon">
                                                        <path d="M6.23 20.23 8 22l10-10L8 2 6.23 3.77 14.46 12z"></path>
                                                    </SvgIcon>
                                                </span>
                                                <span className="MuiTouchRipple-root css-w0pj6f"></span>
                                            </Button>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
}