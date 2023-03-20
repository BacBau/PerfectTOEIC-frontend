import React, { Component } from 'react'
import Login from './components/login/login'
import Menu from "./components/menu/Menu";
import ListExam from "./components/menu/Test/ListExam"
import ListPart from './components/menu/Practice/ListPart';
import PartQuestion from './components/Exam/PartQuestion';
import ExamQuestion from './components/Exam/ExamQuestion';
import Header from './components/header';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css';
import VocabularyTips from "./components/menu/Tips/VocabularyTips";
import TipsId from "./components/menu/Tips/Infomation/TipsId";
import Footer from "./components/footer";
import Search from "./components/Search";
export default class ChatApp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: JSON.parse(localStorage.getItem('USER')) ? true : false,
      loggedInUserObj: JSON.parse(localStorage.getItem('USER')) ? { username: JSON.parse(localStorage.getItem('USER'))['userInfo'] } : {}
    }
    this.setLoggedinUser = this.setLoggedinUser.bind(this)
  }

  setLoggedinUser(loggedInUserObj) {
    this.setState({ isLoggedIn: true, loggedInUserObj: { ...loggedInUserObj } })
  }

  render() {

    return (
      <div className="App">
          <div>
            <BrowserRouter>
              <Routes>
                <Route path="/login" element={<Login loginProp={this.setLoggedinUser}/>}/>
                <Route path="/" element={
                  <>
                    <Header loggedInUserObj={this.state.loggedInUserObj}/>
                    <Menu loggedInUserObj={this.state.loggedInUserObj} />
                    <Footer />
                  </>
                  } />
                <Route path="exam" element={
                  <>
                    <Header loggedInUserObj={this.state.loggedInUserObj}/>
                    <ListExam isFullTest={1} />
                    <Footer />
                  </>
                  } />
                <Route path="minitest" element={
                  <>
                    <Header loggedInUserObj={this.state.loggedInUserObj}/>
                    <ListExam isFullTest={0} />
                    <Footer />
                  </>
                } />
                <Route path="practice" element={
                  <>
                    <Header loggedInUserObj={this.state.loggedInUserObj}/>
                    <ListPart />
                    <Footer />
                  </>
                  } />
                <Route path="question/part" element={
                  <>
                    <Header loggedInUserObj={this.state.loggedInUserObj}/>
                    <PartQuestion />
                    <Footer />
                  </>
                  } />
                <Route path="question/exam" element={
                  <>
                    <Header loggedInUserObj={this.state.loggedInUserObj}/>
                    <ExamQuestion />
                    <Footer />
                  </>
                  } />
                <Route path="vocabulary/introduce" element={
                  <>
                    <Header loggedInUserObj={this.state.loggedInUserObj}/>
                    <VocabularyTips type="BLOG" loggedInUserObj={this.state.loggedInUserObj} />
                    <Footer />
                  </>
                } />
                <Route path="tips/reading" element={
                  <>
                    <Header loggedInUserObj={this.state.loggedInUserObj}/>
                    <VocabularyTips type="READING_TIP" loggedInUserObj={this.state.loggedInUserObj} />
                    <Footer />
                  </>
                } />
                <Route path="tips/listening" element={
                  <>
                    <Header loggedInUserObj={this.state.loggedInUserObj}/>
                    <VocabularyTips type="LISTENING_TIP" loggedInUserObj={this.state.loggedInUserObj} />
                    <Footer />
                  </>
                } />
                <Route path="tips/" element={
                  <>
                    <Header loggedInUserObj={this.state.loggedInUserObj}/>
                    <TipsId />
                    <Footer />
                  </>
                } />
                <Route path="vocabulary/" element={
                  <>
                    <Header loggedInUserObj={this.state.loggedInUserObj}/>
                    <TipsId />
                    <Footer />
                  </>
                } />
                <Route path="search" element={
                  <>
                    <Header loggedInUserObj={this.state.loggedInUserObj}/>
                    <Search loggedInUserObj={this.state.loggedInUserObj} />
                    <Footer />
                  </>
                } />
              </Routes>
            </BrowserRouter>
          </div>
      </div>
    )
  }
}
