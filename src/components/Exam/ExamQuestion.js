import React, { Component } from "react";
import { Grid, Typography, Button, Container, IconButton, SvgIcon, Slider, Tooltip } from '@mui/material';
import dataService from '../../Network/dataService';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

export default class ExamQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listQuestion: [],
            questionState: [],
            questionResult: [],
            partNumber: 0,
            currentQuestion: 0,
            numberSelected: 0,
            showResult: false,
            numberReadingCorrect: 0,
            numberListeningCorrect: 0,
            readingScore: 0,
            listeningScore: 0,
            fullTest: 0
        };
        this.itemRefs = {};
    }

    async componentDidMount() {
        const search = window.location.search;
        const params = new URLSearchParams(search);
        const examId = params.get('exam');
        const miniExamId = params.get('mini-exam');
        if (examId) {
            let result = await dataService.getExamDetail(examId);
            var questionNumber = result.questionList[result.questionList.length - 1].childQuestion.length == 0 ?
                result.questionList[result.questionList.length - 1].questionNumber + result.questionList[result.questionList.length - 1].childQuestion.length : result.questionList[result.questionList.length - 1].questionNumber + result.questionList[result.questionList.length - 1].childQuestion.length - 1;
            this.setState({
                listQuestion: result.questionList,
                questionState: new Array(questionNumber).fill(0),
                questionResult: new Array(questionNumber).fill(0),
                fullTest: 1
            });
            console.log(result)
        }
        if (miniExamId) {
            let result = await dataService.getMiniExamDetail(miniExamId);
            var questionNumber = result.questionList[result.questionList.length - 1].childQuestion.length == 0 ?
                result.questionList[result.questionList.length - 1].questionNumber + result.questionList[result.questionList.length - 1].childQuestion.length : result.questionList[result.questionList.length - 1].questionNumber + result.questionList[result.questionList.length - 1].childQuestion.length - 1;
            this.setState({
                listQuestion: result.questionList,
                questionState: new Array(questionNumber).fill(0),
                questionResult: new Array(questionNumber).fill(0),
                fullTest: 1
            });
            console.log(result)
        }
    }

    handleChooseAnswer(parentIndex, questionNumber, index, dataChildAnswer) {
        if(this.state.showResult) return
        let questionState1 = [...this.state.questionState];
        let questionResult1 = [...this.state.questionResult];
        if (questionState1[questionNumber - 1] == 0) {
            this.setState({ numberSelected: this.state.numberSelected + 1 })
        };
        questionState1[questionNumber - 1] = index;
        if (dataChildAnswer.charAt(1) == this.state.listQuestion[parentIndex].answer.charAt(1)) {
            questionResult1[questionNumber - 1] = true;
            if (questionNumber <= 100) {
                this.setState({ numberListeningCorrect: this.state.numberListeningCorrect + 1 });
            } else {
                this.setState({ numberReadingCorrect: this.state.numberReadingCorrect + 1 });
            }
        } else {
            questionResult1[questionNumber - 1] = false;
        }
        this.setState({ questionState: questionState1, questionResult: questionResult1 })
    }

    handleChooseChildAnswer(parentIndex, questionNumber, childQuestionIndex, index, dataChildAnswer) {
        if(this.state.showResult) return
        let questionState1 = [...this.state.questionState];
        let questionResult1 = [...this.state.questionResult];
        if (questionState1[questionNumber - 1] == 0) {
            this.setState({ numberSelected: this.state.numberSelected + 1 })
        };
        questionState1[questionNumber - 1] = index;

        if (dataChildAnswer.charAt(1) == this.state.listQuestion[parentIndex].childQuestion[childQuestionIndex].answer.charAt(1)) {
            questionResult1[questionNumber - 1] = true;
            if (questionNumber <= 100) {
                this.setState({ numberListeningCorrect: this.state.numberListeningCorrect + 1 });
            } else {
                this.setState({ numberReadingCorrect: this.state.numberReadingCorrect + 1 });
            }
        } else {
            questionResult1[questionNumber - 1] = false;
        }
        this.setState({ questionState: questionState1, questionResult: questionResult1 })
    }

    submit() {
        this.setState({ showResult: true })
        this.setState({ listeningScore: this.calculateScore(this.state.numberListeningCorrect), readingScore: this.calculateScore(this.state.numberReadingCorrect) })
        window.scrollTo(0, 0);
    }

    calculateScore(numberCorrert) {
        switch (numberCorrert) {
            case 0: return 5;
            case 1: return 5;
            case 2: return 5;
            case 3: return 5;
            case 4: return 5;
            case 5: return 5;
            case 6: return 5;
            case 7: return 10;
            case 8: return 15;
            case 9: return 20;
            case 10: return 25;
            case 11: return 30;
            case 12: return 35;
            case 13: return 40;
            case 14: return 45;
            case 15: return 50;
            case 16: return 55;
            case 17: return 60;
            case 18: return 65;
            case 19: return 70;
            case 20: return 75;
            case 21: return 80;
            case 22: return 85;
            case 23: return 90;
            case 24: return 95;
            case 25: return 100;
            case 26: return 105;
            case 27: return 110;
            case 28: return 115;
            case 29: return 120;
            case 30: return 125;
        }
    }

    tryAgain() {
        this.setState({
            listQuestion: [],
            questionState: [],
            questionResult: [],
            partNumber: 0,
            currentQuestion: 0,
            numberSelected: 0,
            showResult: false,
            numberReadingCorrect: 0,
            numberListeningCorrect: 0
        });
        this.componentDidMount()
    }

    scrollTo(index) {
        this.itemRefs[index+1].scrollIntoView();
    }

    render() {
        return (
            <div id="main-study-view" className="main-study-view">
                <Container >
                    <div className="main-study-layout">
                        <div className="study-layout-item study-layout-left small-desktop">
                            <div className="study-layout-left-wrap">
                                <Typography variant="h2" gutterBottom style={{ color: "#34447C", paddingBottom: "50px" }}>
                                    {this.state.fullTest === 1 ? 'FULL TEST' : 'MINI TEST'}
                                </Typography>
                                <div id="question-palette-panel">
                                    <div className="current-topic-label">Test 1</div>
                                    <div className="question-palette-main">
                                        <div className="question-palette-header">
                                            <div className="question-palette-title">Question Palette</div>
                                        </div>
                                        <div className="question-palette-body">
                                            <div className="questions-list expand">
                                                <div className="questions-list-row">
                                                    {this.state.questionResult.map(
                                                        (data, index) => {
                                                            return (
                                                                <IconButton onClick={() => this.scrollTo(index)} className="question-item" tabIndex="0" type="button" style={{ background: this.state.showResult == false ? (this.state.questionState[index] == 0 ? "grey" : "#007aff") : (this.state.questionResult[index] == true ? "#4CAF50" : this.state.questionState[index] == 0 ? "grey" : "#FF5252"), color: "white" }}>{index + 1}<span className="MuiTouchRipple-root css-w0pj6f"></span></IconButton >
                                                            )
                                                        }
                                                    )}
                                                </div>
                                            </div>
                                            <div className="questions-stat" style={{ marginTop: "10px" }}>
                                                <div className="questions-stat-item">
                                                    <span className="questions-stat-item-text">{this.state.numberSelected}/{this.state.listQuestion.length}</span>
                                                </div>
                                                <div className="questions-stat-item">
                                                    <Button variant="contained" onClick={() => this.submit()}>Submit</Button>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="study-layout-item study-layout-mid small-desktop">
                            <div id="game-view-container">
                                {this.state.showResult &&
                                    <div id="main-game-view" className="">
                                        <div className="game-test-utils">
                                            <div className="test-clock-panel">
                                                {/* <svg className="test-clock-icon" width="27" height="30" viewBox="0 0 27 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M5.5741 0.342279C6.24457 -0.0682973 7.12015 0.142857 7.52978 0.813904C7.9394 1.48495 7.72795 2.36178 7.05748 2.77236L4.55305 4.30601C3.88259 4.71659 3.007 4.50543 2.59738 3.83439C2.18775 3.16334 2.39921 2.28651 3.06967 1.87593L5.5741 0.342279ZM0.266706 16.0566C0.238191 23.2411 6.06601 29.1161 13.2367 29.1324C20.3911 29.1473 26.238 23.3295 26.2665 16.1667C26.2964 8.98221 20.4685 3.10729 13.2965 3.09097C6.14341 3.07601 0.29522 8.89381 0.266706 16.0566ZM13.2883 5.94003C18.8568 5.94819 23.4205 10.5244 23.4218 16.1069C23.4232 21.7126 18.8459 26.2887 13.2462 26.2806C7.6764 26.2738 3.11408 21.6976 3.11272 16.1151C3.11137 10.5108 7.68862 5.93323 13.2883 5.94003ZM13.4086 14.6483V14.6482V14.6481C13.4107 14.4162 13.4129 14.1843 13.4129 13.9527C13.4129 13.7003 13.4133 13.448 13.4136 13.1956V13.1955V13.1954C13.4145 12.6069 13.4153 12.0187 13.4115 11.4311C13.4061 10.6365 12.9811 10.1415 12.3158 10.1415C11.6477 10.1415 11.2118 10.6238 11.2078 11.4269C11.1969 13.3353 11.1901 15.2451 11.2173 17.1535C11.2227 17.4812 11.3042 17.9003 11.5078 18.1197C12.8793 19.5964 14.2805 21.0421 15.6968 22.4738C16.1421 22.9238 16.7844 22.8661 17.2012 22.4217C17.6385 21.9548 17.6113 21.2671 17.1062 20.7369C16.6938 20.3051 16.2784 19.8761 15.863 19.4472C15.1528 18.7138 14.4426 17.9803 13.7469 17.2323C13.5636 17.034 13.4414 16.6993 13.4278 16.4208C13.3976 15.8318 13.4031 15.24 13.4086 14.6483ZM19.0034 0.813904C19.413 0.142857 20.2886 -0.0682973 20.9591 0.342279L23.4635 1.87593C24.134 2.28651 24.3455 3.16334 23.9358 3.83439C23.5262 4.50543 22.6506 4.71659 21.9802 4.30601L19.4757 2.77236C18.8053 2.36178 18.5938 1.48495 19.0034 0.813904Z" fill="#4A4A4A"></path>
                                                </svg> */}
                                                {/* <span style={{ "color": "rgb(38, 192, 72)", "fontSize": "16px", "fontWeight": "bold" }}>01:53:22</span> */}
                                            </div>
                                        </div>
                                        <div id="main-game-scroll-panel" className="main-game-object">
                                            <div id="test-overview" className="test-overview">
                                                <div className="test-game-done-title">Congratulations</div>
                                                <div className="MuiBox-root css-1q7njkh">
                                                    <div id="toeic-overview-panel">
                                                        <div className="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-undefined toeic-score css-1d3bbye">
                                                            <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-9 toeic-score-left css-dynhg0">
                                                                <div className="toeic-score-panel toeic-score-listing-score">
                                                                    <div className="count-questions">
                                                                        <div className="label-wrap">
                                                                            <div className="label">Listening</div>
                                                                            <div className="number">{this.state.numberListeningCorrect}/100</div>
                                                                        </div>
                                                                        <Tooltip title={this.state.listeningScore} placement="top">
                                                                            <div className="score-slider">
                                                                                <Slider defaultValue={this.state.numberListeningCorrect} aria-label="Default" valueLabelDisplay="auto" disabled="true" />
                                                                            </div>
                                                                        </Tooltip>
                                                                    </div>
                                                                </div>
                                                                <div className="toeic-score-panel toeic-score-reading-score">
                                                                    <div className="count-questions">
                                                                        <div className="label-wrap">
                                                                            <div className="label">Reading</div>
                                                                            <div className="number">{this.state.numberReadingCorrect}/100</div>
                                                                        </div>
                                                                        <Tooltip title={this.state.readingScore} placement="top">
                                                                            <div className="score-slider">
                                                                                <Slider defaultValue={this.state.numberReadingCorrect} aria-label="Default" valueLabelDisplay="auto" disabled="true" />
                                                                            </div>
                                                                        </Tooltip>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-3 toeic-score-right css-jn4ruz">
                                                                <div className="title-score">TOTAL SCORE</div>
                                                                <div className="total-score-wrap">
                                                                    <CircularProgressbar
                                                                        value={(this.state.listeningScore + this.state.readingScore) / 990}
                                                                        styles={buildStyles({
                                                                            rotation: 0,
                                                                            strokeLinecap: 'butt',
                                                                            pathTransitionDuration: 0.5,
                                                                            pathColor: '#19ce7a',
                                                                            textColor: '#f88',
                                                                            trailColor: '#d6d6d6',
                                                                            backgroundColor: '#3e98c7',
                                                                        })}
                                                                    />

                                                                    <div className="total-score-text">{this.state.listeningScore + this.state.readingScore}</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="game-buttons" style={{ marginTop: "20px" }}><Button variant="contained" onClick={() => this.tryAgain()}>TRY AGAIN</Button></div>
                                            </div>
                                        </div>
                                        <div className="main-game-object-buttons"></div>
                                    </div>
                                }
                                {this.state.listQuestion.map(
                                    (data, parentIndex) => {
                                        return (
                                            <div id="main-game-view" style={{ paddingBottom: "60px", marginTop: "30px" }} key={data.questionNumber} ref={el => (this.itemRefs[data.questionNumber] = el)}>
                                                <div id="main-game-scroll-panel" className="main-game-object">
                                                    <div className="game-object-view-container">
                                                        <div className="normal-root-container">
                                                            <div className="game-object-view game-object-quiz">
                                                                <div className="question-index-wrap">
                                                                    <div className="game-object-question quiz-game-object-question">
                                                                        {data.hasChild == 0 && <div className="game-object-view-aio-question-index">Question {data.questionNumber}:</div>}
                                                                        {data.hasChild == 1 && <div className="game-object-view-aio-question-index">Question {data.questionNumber + " - " + (data.questionNumber + data.childQuestion.length - 1)} </div>}
                                                                        {data.sound &&
                                                                            <div className="game-object-question-sound">
                                                                                <div className="custom-react-audio-player">
                                                                                    <audio controls>
                                                                                        <source src={data.sound} type="audio/ogg" />
                                                                                        <source src={data.sound} type="audio/mpeg" />
                                                                                        Your browser does not support the audio element.
                                                                                    </audio>
                                                                                </div>
                                                                            </div>
                                                                        }
                                                                        {data.image &&
                                                                            <div className="game-object-question-image">
                                                                                <div className="game-image-widget-container" style={{ "width": "300px" }}>
                                                                                    <img src={data.image} alt="media" style={{ "width": "100%" }} />
                                                                                </div>
                                                                            </div>
                                                                        }
                                                                        {data.text && <div className="game-object-question-text" dangerouslySetInnerHTML={{ __html: data.text }} />}
                                                                    </div>
                                                                </div>
                                                                <div className="game-object-quiz-choices">

                                                                    {data.answer.split("|").sort().map(
                                                                        (dataChildAnswer, index) => {
                                                                            if (dataChildAnswer) return (
                                                                                <div className="quiz-choice-item" onClick={() => this.handleChooseAnswer(parentIndex, data.questionNumber, index, dataChildAnswer)}>
                                                                                    <div className="quiz-choice-item-icon show-result">
                                                                                        {this.state.questionState[data.questionNumber - 1] != index &&
                                                                                            <svg className="quiz-choice-item-icon-svg" width="26" height="25" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                                <path d="M10.8393 0.999268H15.8345C20.8064 0.999268 24.8369 5.02977 24.8369 10.0016V14.9969C24.8369 19.9688 20.8064 23.9993 15.8345 23.9993H10.8393C5.86741 23.9993 1.83691 19.9688 1.83691 14.9969V10.0016C1.83691 5.02976 5.86741 0.999268 10.8393 0.999268Z" fill="white" stroke="#D2D2D2" strokeWidth="2"></path>
                                                                                            </svg>
                                                                                        }
                                                                                        {this.state.questionState[data.questionNumber - 1] == index && this.state.showResult == false &&
                                                                                            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                                <path d="M10.8393 1.99878H15.8345C20.8064 1.99878 24.8369 6.02928 24.8369 11.0011V15.9964C24.8369 20.9683 20.8064 24.9988 15.8345 24.9988H10.8393C5.86741 24.9988 1.83691 20.9683 1.83691 15.9964V11.0011C1.83691 6.02928 5.86741 1.99878 10.8393 1.99878Z" stroke="#007AFF" strokeWidth="2"></path>
                                                                                                <circle cx="13.3369" cy="13.4988" r="5" fill="#007AFF"></circle>
                                                                                            </svg>
                                                                                        }
                                                                                        {this.state.questionState[data.questionNumber - 1] == index && dataChildAnswer.charAt(1) == data.answer.charAt(1) && this.state.showResult &&
                                                                                            <svg width="26" height="25" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                                <path d="M15.8345 0H10.8393C5.31513 0 0.836914 4.47821 0.836914 10.0024V14.9976C0.836914 20.5218 5.31513 25 10.8393 25H15.8345C21.3587 25 25.8369 20.5218 25.8369 14.9976V10.0024C25.8369 4.47821 21.3587 0 15.8345 0Z" fill="#4CAF50"></path>
                                                                                                <path d="M17.9387 8.80472C17.8296 8.70115 17.7018 8.62102 17.5627 8.56896C17.4236 8.5169 17.276 8.49392 17.1283 8.50137C16.9807 8.50881 16.8359 8.54653 16.7023 8.61234C16.5688 8.67814 16.449 8.77074 16.3501 8.88481C15.9747 9.28527 15.6251 9.71244 15.255 10.1236L12.2267 13.5729C11.5532 12.9055 10.926 12.2594 10.273 11.64C10.0537 11.425 9.76221 11.3075 9.46065 11.3125C9.15909 11.3175 8.87131 11.4446 8.65867 11.6667C8.55432 11.7785 8.47223 11.9106 8.41705 12.0554C8.36186 12.2002 8.33467 12.3548 8.33706 12.5105C8.33945 12.6662 8.37135 12.8199 8.43095 12.9628C8.49054 13.1057 8.57668 13.235 8.6844 13.3433C9.60984 14.3045 10.5524 15.246 11.5121 16.1679C11.6133 16.2732 11.7335 16.3567 11.8659 16.4137C11.9982 16.4707 12.1401 16.5 12.2833 16.5C12.4266 16.5 12.5684 16.4707 12.7007 16.4137C12.8331 16.3567 12.9533 16.2732 13.0545 16.1679L13.1213 16.0932C14.7768 14.2244 16.4203 12.3448 18.0518 10.4546C18.1506 10.339 18.2264 10.2043 18.275 10.0582C18.3236 9.91215 18.3439 9.75755 18.3348 9.60329C18.3257 9.44902 18.2874 9.29813 18.2221 9.15926C18.1568 9.0204 18.0657 8.89628 17.9541 8.79403L17.9387 8.80472Z" fill="white"></path>
                                                                                            </svg>
                                                                                        }
                                                                                        {this.state.questionState[data.questionNumber - 1] == index && dataChildAnswer.charAt(1) != data.answer.charAt(1) && this.state.showResult &&
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

                                                                    {data.hasChild == 1 && data.childQuestion.map(
                                                                        (dataChild, questionChildIndex) => {
                                                                            if (dataChild) return (
                                                                                <div  key={dataChild.questionNumber} ref={el => (this.itemRefs[dataChild.questionNumber] = el)}>
                                                                                    {dataChild.text && <div className="game-object-question-text" dangerouslySetInnerHTML={{ __html: dataChild.questionNumber + "." + dataChild.text }} />}
                                                                                    {!dataChild.text && <div style={{ marginBottom: "30px" }} />}
                                                                                    {dataChild.answer.split("|").sort().map(
                                                                                        (dataChildAnswer, index) => {
                                                                                            if (dataChildAnswer) return (
                                                                                                <div className="quiz-choice-item" onClick={() => this.handleChooseChildAnswer(parentIndex, dataChild.questionNumber, questionChildIndex, index, dataChildAnswer)}>
                                                                                                    <div className="quiz-choice-item-icon show-result">
                                                                                                        {this.state.questionState[dataChild.questionNumber - 1] != index &&
                                                                                                            <svg className="quiz-choice-item-icon-svg" width="26" height="25" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                                                <path d="M10.8393 0.999268H15.8345C20.8064 0.999268 24.8369 5.02977 24.8369 10.0016V14.9969C24.8369 19.9688 20.8064 23.9993 15.8345 23.9993H10.8393C5.86741 23.9993 1.83691 19.9688 1.83691 14.9969V10.0016C1.83691 5.02976 5.86741 0.999268 10.8393 0.999268Z" fill="white" stroke="#D2D2D2" strokeWidth="2"></path>
                                                                                                            </svg>
                                                                                                        }
                                                                                                        {this.state.questionState[dataChild.questionNumber - 1] == index && this.state.showResult == false &&
                                                                                                            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                                                <path d="M10.8393 1.99878H15.8345C20.8064 1.99878 24.8369 6.02928 24.8369 11.0011V15.9964C24.8369 20.9683 20.8064 24.9988 15.8345 24.9988H10.8393C5.86741 24.9988 1.83691 20.9683 1.83691 15.9964V11.0011C1.83691 6.02928 5.86741 1.99878 10.8393 1.99878Z" stroke="#007AFF" strokeWidth="2"></path>
                                                                                                                <circle cx="13.3369" cy="13.4988" r="5" fill="#007AFF"></circle>
                                                                                                            </svg>
                                                                                                        }
                                                                                                        {this.state.questionState[dataChild.questionNumber - 1] == index && dataChildAnswer.charAt(1) == dataChild.answer.charAt(1) && this.state.showResult &&
                                                                                                            <svg width="26" height="25" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                                                <path d="M15.8345 0H10.8393C5.31513 0 0.836914 4.47821 0.836914 10.0024V14.9976C0.836914 20.5218 5.31513 25 10.8393 25H15.8345C21.3587 25 25.8369 20.5218 25.8369 14.9976V10.0024C25.8369 4.47821 21.3587 0 15.8345 0Z" fill="#4CAF50"></path>
                                                                                                                <path d="M17.9387 8.80472C17.8296 8.70115 17.7018 8.62102 17.5627 8.56896C17.4236 8.5169 17.276 8.49392 17.1283 8.50137C16.9807 8.50881 16.8359 8.54653 16.7023 8.61234C16.5688 8.67814 16.449 8.77074 16.3501 8.88481C15.9747 9.28527 15.6251 9.71244 15.255 10.1236L12.2267 13.5729C11.5532 12.9055 10.926 12.2594 10.273 11.64C10.0537 11.425 9.76221 11.3075 9.46065 11.3125C9.15909 11.3175 8.87131 11.4446 8.65867 11.6667C8.55432 11.7785 8.47223 11.9106 8.41705 12.0554C8.36186 12.2002 8.33467 12.3548 8.33706 12.5105C8.33945 12.6662 8.37135 12.8199 8.43095 12.9628C8.49054 13.1057 8.57668 13.235 8.6844 13.3433C9.60984 14.3045 10.5524 15.246 11.5121 16.1679C11.6133 16.2732 11.7335 16.3567 11.8659 16.4137C11.9982 16.4707 12.1401 16.5 12.2833 16.5C12.4266 16.5 12.5684 16.4707 12.7007 16.4137C12.8331 16.3567 12.9533 16.2732 13.0545 16.1679L13.1213 16.0932C14.7768 14.2244 16.4203 12.3448 18.0518 10.4546C18.1506 10.339 18.2264 10.2043 18.275 10.0582C18.3236 9.91215 18.3439 9.75755 18.3348 9.60329C18.3257 9.44902 18.2874 9.29813 18.2221 9.15926C18.1568 9.0204 18.0657 8.89628 17.9541 8.79403L17.9387 8.80472Z" fill="white"></path>
                                                                                                            </svg>
                                                                                                        }
                                                                                                        {this.state.questionState[dataChild.questionNumber - 1] == index && dataChildAnswer.charAt(1) != dataChild.answer.charAt(1) && this.state.showResult &&
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
                                                                                    {this.state.showResult &&
                                                                                        <div className="game-object-explanation quiz-explanation">
                                                                                            <div className="game-object-explanation-content" dangerouslySetInnerHTML={{ __html: dataChild.hint }}></div>
                                                                                        </div>
                                                                                    }
                                                                                </div>
                                                                            )
                                                                        }
                                                                    )
                                                                    }
                                                                    {this.state.showResult &&
                                                                        <div className="game-object-explanation quiz-explanation">
                                                                            <div className="game-object-explanation-content" dangerouslySetInnerHTML={{ __html: data.hint }}></div>
                                                                        </div>
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <div className="main-game-object-buttons" style={{ float: "right", marginRight: "50px" }}>
                                                    <Button className="MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButtonBase-root main-game-object-button main-game-object-continue-button single-node css-100vahc" tabIndex="0" type="button">
                                                        Next
                                                        <span className="MuiButton-endIcon MuiButton-iconSizeMedium css-1n4a93h">
                                                            <SvgIcon className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium jss3 css-vubbuv" focusable="false" viewBox="0 0 24 24" aria-hidden="true" data-testid="ArrowForwardIosIcon">
                                                                <path d="M6.23 20.23 8 22l10-10L8 2 6.23 3.77 14.46 12z"></path>
                                                            </SvgIcon>
                                                        </span>
                                                        <span className="MuiTouchRipple-root css-w0pj6f"></span>
                                                    </Button>
                                                </div> */}
                                            </div>
                                        )
                                    }
                                )}
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
}