// import { useState } from "react";

const Comment: React.FC = ({ comment, comments }) => {
  // const [show, setShow] = useState(false)

  return (

    <div className="comment">

      <p>{comment.text}</p>
      {comment.children.map((childId) => (
        <Comment
          key={childId}
          comment={comments.find((c) => c.id === childId)}
          comments={comments}
        />
      ))}
    </div>

      // {
  //   id: 1,
  //   text: "корневой",
  //   children: [2, 3],
  // },
  // {
  //   id: 2,
  //   text: "ответ на корненой",
  //   children: [4],
  // },
  // {
  //   id: 3,
  //   text: "еще один ответ на комментарий",
  //   children: [],
  // },
  // {
  //   id: 4,
  //   text: "ответ на ответ",
  //   children: [],
  // }

    // <div className="com">
    //   {/* <h3>{author}</h3> */}
    //   <p>{id}</p>
    //   <p>{text}</p>
    //   {/* <p>{date}</p> */}
    //   {/* <button onClick={() => setShow(!show)} className={show ? "commentShow" : ""}>Добавить комментарий</button>
    //   <input type="text" className={!show ? "commentShow" : ""}/>
    //   <button onClick={() => setShow(!show)} className={!show ? "commentShow" : ""}>х</button>
    //   <button onClick={() => setShow(!show)} className={!show ? "commentShow" : ""}>+</button> */}
    // </div>
  );
};

export default Comment;
