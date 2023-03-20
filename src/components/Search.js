import React, {Component} from "react";
import Container from '@mui/material/Container';
import {Button, Grid} from "@mui/material";
import Popup from "reactjs-popup";
import "./menu/Tips/Tips.css";
import dataService from "../Network/dataService";
import PostContent from "./menu/Tips/PostContent";
import { FaTrash, FaCalendar } from 'react-icons/fa';
import { BiEdit } from 'react-icons/bi';

export default class Search extends Component {
    static setPopupStatus;
    constructor(props) {
        super(props);
        this.state = {
            listObject: [],
            listObjectRecent: [],
            component: false,
            isClosePopup: false,
            loggedInUserObj: this.props.loggedInUserObj.username,
            keyWord: ""
        };
        // this.getSelectedChannel = this.getSelectedChannel.bind(this);
    }

    async componentDidMount() {
        const search = window.location.search;
        const params = new URLSearchParams(search);
        const keyword = params.get('keyword');
        this.setState({keyWord:keyword});
        console.log(keyword)
        let result = await dataService.getSearch(keyword);
        console.log(result)
        this.setState({
            listObject: result
        });
        let recent = await dataService.getRecent();
        this.setState({
            listObjectRecent: recent
        });
    }

    static setPopupStatus(status) {
        this.setState({isClosePopup: true, status: { ...status }})
    }

    static async handleDeletePost(id) {
        let result = await dataService.deleteContent(id);
        console.log(result);
        if (result.status === 200) {
            alert("Delete success!");
            window.location.reload();
        } else {
            alert("Bài viết đã được xoá trước đó, vui lòng tải lại trang!");
        }
    }

    render() {
        const {listObject} = this.state;
        const {listObjectRecent} = this.state;
        const {loggedInUserObj} = this.state;
        return (
            <div className="tips-listening">
                <Container fixed className="main2">
                    <div className="title-main">
                        <div style={{flexDirection:"column"}}>
                            <p className="title-main-keyword">
                                Search Result For: {this.state.keyWord}
                            </p>
                            {listObject.length === 0 &&
                                <>
                                    <p className="title-main-keyword">
                                        Sorry, but nothing matched your search terms.
                                    </p>
                                    <p className="title-main-keyword">
                                        Please try again with some different keywords.
                                    </p>
                                </>
                            }
                        </div>
                        {this.state.loggedInUserObj !== undefined && this.state.loggedInUserObj.username === 'admin' &&
                            <Popup  modal trigger={<Button style={{fontSize: '20px'}}>CREATE</Button>}>
                                <PostContent isClosePopup={Search.setPopupStatus} isSearch={true}/>
                            </Popup>
                        }
                    </div>
                    <div className="main">
                        <Grid container spacing={4}>
                            {this.state.listObject.map(
                                function (item) {
                                    return (
                                        <Grid key={item.id} item xs={12} sm={5} className="buh">
                                            <div className="admin-edit">
                                                {loggedInUserObj !== undefined && loggedInUserObj.username === 'admin' &&
                                                    <>
                                                        <Popup  modal trigger={<Button>
                                                            <BiEdit style={{fontSize: '25px'}}/>
                                                        </Button>}>
                                                            <PostContent objectPost={item} isClosePopup={Search.setPopupStatus} isSearch={true}/>
                                                        </Popup>
                                                        <Button>
                                                            <FaTrash style={{fontSize: '25px'}} onClick={() => Search.handleDeletePost(item.id)} />
                                                        </Button>
                                                    </>
                                                }
                                            </div>
                                            <a href={(item.type === 'BLOG' ? '../vocabulary/?part=' : '../tips/?part=') + item.id}>
                                                <div>
                                                    <img className="img-tips" src={item.previewImageUrl}/>
                                                </div>
                                                <div className="title-tips">
                                                    <h2>
                                                        {item.title}
                                                    </h2>
                                                </div>
                                                <div className="date-tips">
                                                    <FaCalendar />
                                                    {item.createdDate}
                                                </div>
                                                <div className="des-tips">
                                                    {item.description}
                                                </div>
                                            </a>
                                        </Grid>
                                    )
                                }
                            )}
                        </Grid>
                        <Grid>
                            <div className="recent-text">
                                Recent Posts
                            </div>
                            {listObjectRecent.length !== undefined && listObjectRecent.length !== 0 && listObjectRecent.map(function (data, index) {
                                if (index === 0 || index === 1) {
                                    return (
                                        <Grid className="fix-style" key={data.id}>
                                            <a href={(data.type === 'BLOG' ? '../vocabulary/?part=' : '../tips/?part=') + data.id}>
                                                <div>
                                                    <img className="img-recent" src={data.previewImageUrl}/>
                                                </div>
                                                <div className="title-recent">
                                                    <h2>
                                                        {data.title}
                                                    </h2>
                                                </div>
                                            </a>
                                        </Grid>
                                    )
                                }
                            })}
                        </Grid>
                    </div>

                </Container>
            </div>
        )
    }
}