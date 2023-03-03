import React, { Component } from 'react'
import Login from './components/login/login'
import Menu from "./components/menu/Menu";
import ListExam from "./components/menu/ListExam"
import ListPart from './components/menu/ListPart';
import PartQuestion from './components/Exam/PartQuestion';
import ExamQuestion from './components/Exam/ExamQuestion';
import Header from './components/header';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css';
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
        {!this.state.isLoggedIn && <Login loginProp={this.setLoggedinUser} />}
        {this.state.isLoggedIn &&
          <div>
            <Header loggedInUserObj={this.state.loggedInUserObj}/>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Menu loggedInUserObj={this.state.loggedInUserObj} />}></Route>
                <Route path="exam" element={<ListExam />} />
                <Route path="practice" element={<ListPart />} />
                <Route path="question/part" element={<PartQuestion />} />
                <Route path="question/exam" element={<ExamQuestion />} />
              </Routes>
            </BrowserRouter>
          </div>}
      </div>
    )
  }
}
