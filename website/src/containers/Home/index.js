import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import { Layout } from "../../components/Layout";
import moment from "moment";
import {
  BackTop,
  Card,
  DatePicker,
  Divider,
  List,
  notification,
  Skeleton,
  Tooltip,
} from "antd";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import InfiniteScroll from "react-infinite-scroll-component";
import "antd/dist/antd.css";
import { Container, Row } from "react-bootstrap";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../../actions/post.actions";
import { getUserByID, votePost } from "../../actions/user.action";

/**
 * @author
 * @function Home
 **/

export const Home = (props) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.posts);
  const user = useSelector((state) => state.user.user);

  const [selectedDate, setSelectedDate] = useState(moment);
  const [loading, setLoading] = useState(false);
  const [votes, setVotes] = useState([]);
  const [data, setData] = useState([]);
  const localuser = localStorage.getItem("user");

  useEffect(() => {
    // console.log(user);
    // console.log(JSON.parse(user).iduser);
    dispatch(getAllPosts());
    dispatch(getUserByID(JSON.parse(localuser).Iduser));
  }, []);

  useEffect(() => {
    if (user) {
      setVotes(user.Votes);
    }
  }, [user]);

  useEffect(() => {
    if (posts) {
      setData(posts);
    }
  }, [posts]);

  useEffect(() => {
    onChange(moment());
  }, [votes]);

  if (localStorage.getItem("jwt") === null) {
    return <Redirect to={`/signin`}></Redirect>;
  }

  const countMyVotes = (idPost) => {
    const res = votes.filter((vote) => vote.Idpost === idPost);
    return res.length;
  };
  let todayVotes;
  const onChange = (value) => {
    setSelectedDate(value);
    let res = [...posts];
    if (votes.length > 0 && value) {
      todayVotes = votes.filter(
        (v) =>
          moment(v.VoteDate).format("DD:MM:YYYY") === value.format("DD:MM:YYYY")
      );

      for (let i = 0; i < todayVotes.length; i++) {}

      todayVotes.map((vote) => {
        let temp = posts.find((item) => vote.Idpost === item.Idpost);
        const index = res.indexOf(temp);

        temp = {
          isVoted: true,
          ...temp,
        };
        res[index] = temp;
        // res.splice(index, 1);
        // res.push(temp);
      });
    }
    setLoading(false);
    setData(res);
  };

  const onClickHeart = (param) => (e) => {
    //console.log(countMyVotes(param));
    if (countMyVotes(param) === 3) {
      notification.error({
        message: "Error",
        description: "You can have 3 votes for one post!",
      });
      return;
    }
    if (moment().format("DD:MM:YYYY") !== selectedDate.format("DD:MM:YYYY")) {
      notification.error({
        message: "Error",
        description: "You only can vote item on today!",
      });
      return;
    }
    const data = {
      IdUser: JSON.parse(localuser).Iduser,
      IdPost: param,
      VoteDate: moment().format("MM/DD/YYYY"),
    };
    dispatch(votePost(data));
  };

  const loadMoreData = () => {};

  return (
    <Layout>
      <Card>
        <h3>Hi ! </h3>
        <DatePicker
          style={{ marginBottom: "16px" }}
          value={selectedDate}
          onChange={onChange}
        />
        <div id="scrollableDiv" className="scrollable">
          <InfiniteScroll
            dataLength={posts.length}
            hasMore={posts.length < 10}
            // next={loadMoreData}
            // loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
            endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
            scrollableTarget="scrollableDiv"
          >
            <List
              loading={loading}
              dataSource={data}
              renderItem={(item) => {
                const heart = item.isVoted ? (
                  <HeartFilled style={{ color: "red" }} />
                ) : (
                  <Tooltip title="Voting item">
                    <HeartOutlined onClick={onClickHeart(item.Idpost)} />
                  </Tooltip>
                );
                return (
                  <List.Item key={item.Idpost}>
                    <List.Item.Meta
                      title={item.Title}
                      description={item.Content}
                    />
                    <div>
                      <span style={{ marginRight: "8px" }}>
                        {item.SumVotes}
                      </span>
                      {heart}
                    </div>
                  </List.Item>
                );
              }}
            />
            <BackTop
              visibilityHeight="50"
              target={() => document.getElementById("scrollableDiv")}
            >
              {/* <div className={styles['back-top']}>UP</div> */}
            </BackTop>
          </InfiniteScroll>
        </div>
      </Card>
    </Layout>
  );
};
