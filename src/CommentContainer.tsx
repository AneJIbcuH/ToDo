import Comment from "./Comment";

const CommentContainer: React.FC = ({ comments }) => {

  return (

    <div className="comments">
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} comments={comments} />
      ))}
    </div>

    // <div className="com0">
    //   {comments.map(comment => (
    //     <div key={comment.id} className="com1">
    //       <Comment
    //         author={comment.author}
    //         text={comment.text}
    //         date={comment.date}
    //       />
    //       {comment.replies && (
    //         <CommentContainer comments={comment.replies} />
    //       )}
    //     </div>
    //   ))}
    // </div>
  );
};

export default CommentContainer;
