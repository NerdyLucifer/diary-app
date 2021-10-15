import axios from "axios";
import { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { useAuth } from "../context/auth";
import { FcBookmark } from "react-icons/fc";
import { FiBookmark } from "react-icons/fi";
const PostItem = ({ postID, content, date, deletePost, setPosts }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isfav, setIsfav] = useState(false);
  const { token } = useAuth();
  const [newContent, setNewContent] = useState(content);
  const editPost = async (postID) => {
    await axios({
      method: "put",
      url: "https://diary-app-ash.herokuapp.com/" + postID + "/updateContent",
      headers: {
        authorization: "Bearer " + token,
      },
      data: {
        content: newContent,
      },
    })
      .then(async (res) => {
        await setPosts(res.data);
      })
      .catch((err) => {
        console.log("Error....");
      });
    setIsEdit(false);
  };
  return (
    <Card style={{ width: "100%" }}>
      <Card.Header
        style={{
          backgroundColor: "#FEF2CD",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div style={{ width: "90%" }}>
          <h3 style={{ fontWeight: "bold" }}>Date: </h3>
          <h3 style={{ color: "green" }}>{date}</h3>
        </div>
        {isfav ? (
          <FcBookmark type="button" fontSize="2.5rem" onClick={()=>setIsfav(false)}/>
        ) : (
          <FiBookmark type="button" fontSize="2.3rem" onClick={()=>setIsfav(true)}/>
        )}
      </Card.Header>
      <Card.Body style={{ height: "180px" }}>
        {isEdit ? (
          <textarea
            type="text"
            placeholder="Type..."
            value={newContent}
            style={{ width: "100%" }}
            rows="7"
            onChange={(e) => setNewContent(e.target.value)}
          ></textarea>
        ) : (
          <Card.Text
            style={{ whiteSpace: "pre-wrap", overflow: "auto", height: "100%" }}
          >
            {content}
          </Card.Text>
        )}
      </Card.Body>
      <div>
        {isEdit ? (
          <>
            <Button
              type="button"
              style={{ margin: "20px" }}
              onClick={() => editPost(postID)}
            >
              Done
            </Button>
            <Button
              type="button"
              variant="danger"
              onClick={() => setIsEdit(false)}
            >
              Cancel
            </Button>
          </>
        ) : (
          <Button
            type="button"
            style={{ margin: "20px" }}
            onClick={() => setIsEdit(true)}
          >
            Edit
          </Button>
        )}
        {isEdit ? null : (
          <Button
            type="button"
            variant="danger"
            onClick={() => deletePost(postID)}
          >
            Delete
          </Button>
        )}
      </div>
    </Card>
  );
};

export default PostItem;
