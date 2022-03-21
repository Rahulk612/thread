import { useEffect, useState } from "react"
import {
  getComments as CommnetApi,
  createComment as CreateApi,
  deleteComment as DeleteApi,
  updateComment as UpdateApi
} from "../db";
import { Comment } from "./Comment"
import { CommentForm } from "./CommentForm"
import "./Comments.css"


export const Comments = ({currentUserId}) => {
    const [backendComments,setBackentComments] = useState([])
    const [activeComment,setActiveComment] = useState(null)
    const rootCommets = backendComments.filter((commnet)=>{
       return commnet.parentId === null
    })

    const getReplies = commnetId => {
        return backendComments.filter(comment => comment.parentId === commnetId)
        .sort((a,b)=> new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    }
    console.log("rootCommets", rootCommets);
    console.log(backendComments)
    useEffect(()=>{
        CommnetApi().then((data)=>{
            setBackentComments(data)
        })
    },[])

    const addComment = (text,parentId) => {
        CreateApi(text, parentId).then((comment) => {
          setBackentComments([...backendComments, comment]);
          setActiveComment(null);
        });
    }

    const deleteComment = (id) => {
        if(window.confirm("Are you sure you want to delete comment")){
            DeleteApi(id).then(()=>{
                const updatedBackendComments = backendComments.filter((comment)=>{
                    return comment.id!==id
                })
                setBackentComments(updatedBackendComments)
                
            })
        }
    }

const updateComment = (text,commentId)=>{
    UpdateApi(text,commentId).then(()=>{
        const UpdateddBackendComments = backendComments.map(comment => {
            if(comment.id === commentId){
                return {...comment,body:text}
            }
            return comment
        })
        setBackentComments(UpdateddBackendComments)
        setActiveComment(null);
    })
}

    return(
        <div className="comments">
           <h3 className="commnets-Heading">Commnets</h3>
           <div className="comment-formTitle">Write Commnet</div>
           <CommentForm submitLabel="Write" handleSubmit={addComment}/>
           <div className="commnets-container">
                {rootCommets.map((e)=>{
                    return (
                      <Comment
                        key={e.id}
                        comment={e}
                        replies={getReplies(e.id)}
                        currentUserId={currentUserId}
                        deleteComment={deleteComment}
                        updateComment={updateComment}
                        activeComment={activeComment}
                        setActiveComment={setActiveComment}
                        addComment={addComment}
                      />
                    );
                })}
           </div>
        </div>
    )
}