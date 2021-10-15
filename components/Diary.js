import axios from "axios";
import Router from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "../context/auth";
import PostItem from "./PostItem";
import { Container } from "react-bootstrap";
import { Card, Button } from "react-bootstrap";

const Index = () => {
  const date = new Date();
  const { token, username } = useAuth();

  useEffect(() => {
    if (!token) Router.replace("/login");
  });

  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    await axios({
      method: "get",
      url: "https://diary-app-ash.herokuapp.com/",
      headers: {
        authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.log("Error....");
      });
  };

  useEffect(() => {
    getPosts();
  }, []);

  const deletePost = (postID) => {
    axios({
      method: "delete",
      url: "https://diary-app-ash.herokuapp.com/" + postID,
      headers: {
        authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.log("Error....");
      });
  };

  const [newPost, setNewPost] = useState("");
  const addPost = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: "https://diary-app-ash.herokuapp.com/",
      headers: {
        authorization: "Bearer " + token,
      },
      data: {
        content: newPost,
      },
    })
      .then((res) => {
        setPosts(res.data);
        setNewPost("");
      })
      .catch((err) => {
        console.log("Error....");
      });
  };
  return (
    <>
      {token && (
        <>
          <Container
            fluid
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h1
              style={{
                textAlign: "center",
                margin: "30px auto",
                fontWeight: "bold",
              }}
            >
              {username}'s Diary
            </h1>
            <div
              style={{
                margin: "auto",
                width: "80%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Card style={{ width: "70%", minWidth: "250px" }}>
                <Card.Header style={{ backgroundColor: "#CFF4FD" }}>
                  <h3 style={{ fontWeight: "bold" }}>Today's Date: </h3>
                  <h3 style={{ color: "green" }}>
                    {date.getDate().toString() +
                      "/" +
                      (date.getMonth() + 1).toString() +
                      "/" +
                      date.getFullYear().toString()}
                  </h3>
                </Card.Header>
                <Card.Body>
                  <Card.Text>
                    <textarea
                      type="text"
                      placeholder="Enter new entry..."
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                      style={{ width: "100%" }}
                      rows="6"
                    />
                  </Card.Text>
                  <Button variant="primary" type="button" onClick={addPost}>
                    Add Entry
                  </Button>
                </Card.Body>
              </Card>
              <div
                style={{
                  borderTop: "1px solid grey",
                  width: "100%",
                  margin: "50px auto",
                }}
              >
                <h1
                  style={{
                    textAlign: "center",
                    margin: "50px auto",
                    fontWeight: "bold",
                  }}
                >
                  Entries
                </h1>
                <div>
                  {posts.length === 0 ? (
                    <h3
                      style={{
                        color: "red",
                        textAlign: "center",
                        fontSize: "2.5rem",
                        margin: "auto",
                      }}
                    >
                      No entry to show!
                    </h3>
                  ) : (
                    <div className="posts-container">
                      {posts.map((post) => {
                        return (
                          <PostItem
                            key={post.id}
                            postID={post.id}
                            date={post.date}
                            content={post.content}
                            setPosts={setPosts}
                            deletePost={deletePost}
                          />
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Container>
        </>
      )}
    </>
  );
};

export default Index;
