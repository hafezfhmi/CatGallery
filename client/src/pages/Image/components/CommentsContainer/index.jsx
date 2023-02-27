import Button from "../../../../components/Button";
import Comment from "../Comment";

const CommentsContainer = ({ commentHooks }) => {
  return (
    <div>
      {commentHooks.comments.map((comment, index) => {
        if (
          index + 1 === commentHooks.comments.length &&
          commentHooks.hasMore
        ) {
          return null;
        }

        return (
          <Comment
            comment={comment}
            commentHooks={commentHooks}
            level={commentHooks.level}
            key={comment.id}
          />
        );
      })}

      {commentHooks.hasMore && (
        <Button
          label="More comments"
          onClick={commentHooks.handleShowMoreComment}
        />
      )}
    </div>
  );
};

export default CommentsContainer;
