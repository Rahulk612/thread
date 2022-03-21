// import { updateComment } from "../db";
import { CommentForm } from "./CommentForm";

export const Comment = ({
  comment,
  replies,
  currentUserId,
  deleteComment,
  activeComment,
  addComment,
  updateComment,
  setActiveComment,
  parentId = null,
}) => {
  const delayMin = 300000;
  const timePasses = new Date() - new Date(comment.createdAt) > delayMin;
  const canReply = Boolean(currentUserId);
  const canEdit = currentUserId === comment.userId && !timePasses;
  const canDelete = currentUserId === comment.userId && !timePasses;
  const createdAt = new Date(comment.createdAt).toDateString();
  const isReplying =
    activeComment &&
    activeComment.type === "replying" &&
    activeComment.id === comment.id;
  const isEditing =
    activeComment &&
    activeComment.type === "editing" &&
    activeComment.id === comment.id;
  const replyId = parentId ? parentId : comment.id;
  return (
    <div className="singleCommnet">
      <div className="ForImage"></div>
      <div className="singleCommnetPart">
        <div className="commnet-content">
          <div className="commnet-author">
            <h2>{comment.username}</h2>
            <p>on {createdAt}</p>
          </div>
          {!isEditing && <div className="comment-body">
            <h3>{comment.body}</h3>
          </div>}
          {isEditing && (
              <CommentForm submitLabel="Update" hasCancelButton initialText={comment.body} handleSubmit={(text)=>updateComment(text,comment.id)} handleCancel={()=>setActiveComment(null)}/>
          )}
          <div className="comment-actions">
            {canReply && (
              <div
                className="comment-action"
                onClick={() =>
                  setActiveComment({ id: comment.id, type: "replying" })
                }
              >
                Reply
              </div>
            )}
            {canEdit && (
              <div
                className="comment-action"
                onClick={() =>
                  setActiveComment({ id: comment.id, type: "editing" })
                }
              >
                Edit
              </div>
            )}
            {canDelete && (
              <div
                className="comment-action"
                onClick={() => {
                  deleteComment(comment.id);
                }}
              >
                Delete
              </div>
            )}
          </div>
          {isReplying && (
            <CommentForm
              submitLabel="Reply"
              handleSubmit={(text) => addComment(text, replyId)}
            />
          )}
          {replies.length > 0 && (
            <div className="replies">
              {replies.map((reply) => {
                return (
                  <Comment
                    comment={reply}
                    key={reply.id}
                    replies={[]}
                    currentUserId={currentUserId}
                    deleteComment={deleteComment}
                    addComment={addComment}
                    updateComment={updateComment}
                    activeComment={activeComment}
                    setActiveComment={setActiveComment}
                    parentId={comment.id}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
