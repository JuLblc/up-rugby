import { useCallback, useEffect, useState } from 'react'
import { getComment } from '../apiCall/comments'

import CommentInput from './CommentInput'
import Comment from './Comment'

const CommentDisplay = props => {

  const [commentData, setCommentData] = useState({
    authorname: '',
    comment: '',
    date: '',
    replies:[]
  })

  const fetchComment = useCallback(async () => {
    const resComment = await getComment(props.id)
    setCommentData(resComment.data.commentFromDB)
  }, [])

  useEffect(() => {
    fetchComment()
  }, [fetchComment])


  const [replyVisible, setReplyVisible] = useState(false)

  const updateStateFromChild = isVisible => {
    setReplyVisible(isVisible)
  }

  return (
    <>
      <Comment 
      id={props.id}
      session={props.session}
      updateStateFromChild={updateStateFromChild}
      commentData = {commentData}/>

      {commentData.replies.map(reply => <Comment commentData={reply} isReply={true}/>)}

      {replyVisible && (
        <CommentInput
          session={props.session}
          isReply={true}
          id={props.id}
          updateStateFromChild={updateStateFromChild}
        />
      )}
    </>
  )
}

export default CommentDisplay
