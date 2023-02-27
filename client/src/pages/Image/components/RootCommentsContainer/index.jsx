import useComment from "../../../../hooks/useComment";
import { ImageDetailContextProvider } from "../../../../context/imageDetailContext";
import CommentEditor from "../CommentEditor";
import Comment from "../Comment";
import Button from "../../../../components/Button";

const RootCommentsContainer = ({ imageId, imageCreatorId }) => {
  const commentHooks = useComment({
    imageId,
    commentId: null,
    level: 1,
    passedComment: [],
  });

  return (
    <ImageDetailContextProvider
      imageId={imageId}
      imageCreatorId={imageCreatorId}
    >
      <div>
        <CommentEditor handleSubmit={commentHooks.handleSubmitReply} />

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
                level={1}
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
      </div>
    </ImageDetailContextProvider>
  );
};

export default RootCommentsContainer;
