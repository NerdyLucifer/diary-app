import axios from "axios";
import Router from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "../components/auth";
import PostItem from "../components/PostItem";
import postItem from "../components/PostItem";
const Index = () => {
  const { token, username, logout } = useAuth();

  useEffect(() => {
    if (!token) Router.replace("/login");
  });

  const handleLogout = () => {
    logout();
    Router.replace("/login");
  };

  const [posts, setPosts] = useState([]);

  const getPosts = () => {
    axios({
      method: "get",
      url: "https://diary-app-ash.herokuapp.com/",
      headers: {
        authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        // console.log(res);
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
  // console.log(newPost)
  const addPost = () => {
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
        // console.log(res.data);
      })
      .catch((err) => {
        console.log("Error....");
      });
  };

  // console.log(posts)
  return (
    <>
      <button type="button" onClick={handleLogout}>
        Log out
      </button>
      <h2>Hello {username}</h2>
      <div style={{ margin: "auto", width: "80%" }}>
        <form action="post">
          <input
            type="text"
            placeholder="Enter the new post"
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
          />
          <button type="button" onClick={addPost}>
            Submit
          </button>
        </form>

        <h3>Posts</h3>
        {posts.length === 0 ? (
          <h3 style={{ color: "red" }}>No posts</h3>
        ) : (
          posts.map((post) => {
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
          })
        )}
      </div>
    </>
  );
};

export default Index;
