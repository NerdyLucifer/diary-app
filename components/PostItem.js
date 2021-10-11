import axios from "axios";
import { useState } from "react";
import { useAuth } from "./auth";
const PostItem = ({ postID, content, date, deletePost,setPosts }) => {
  const [isEdit, setIsEdit] = useState(false);
  const {token}=useAuth();
  const [newContent,setNewContent]=useState(content)
  const editPost=(postID)=>{
    axios({
        method: "put",
        url: "https://diary-app-ash.herokuapp.com/" + postID,
        headers: {
          authorization: "Bearer " + token,
        },
        data:{
            content:newContent
        }
      })
        .then((res) => {
          setPosts(res.data)
        })
        .catch((err) => {
          console.log("Error....");
        });
        setIsEdit(false);
  }
  return (
    <div style={{ border: "2px solid black", width: "50%" }}>
      <h5>{date}</h5>
      {isEdit ? (
        <input type="text" placeholder="Type..." value={newContent} onChange={e=>setNewContent(e.target.value)}></input>
      ) : (
        <p>{content}</p>
      )}
      {isEdit ? (<>
        <button type="button" onClick={() => editPost(postID)}>
          Submit
        </button>
        <button type="button" onClick={() => setIsEdit(false)}>
         Cancel
        </button>
        </>
      ) : (
        <button type="button" onClick={() => setIsEdit(true)}>
          Edit
        </button>
      )}

      <br />
      <br />
      <button type="button" onClick={() => deletePost(postID)}>
        Delete
      </button>
    </div>
  );
};

export default PostItem;
