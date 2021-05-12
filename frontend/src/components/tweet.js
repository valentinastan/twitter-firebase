import React from 'react'
import Hashtag from './hashtag'

const Tweet = (props) => {
  // console.log("tweet props", props)
  return(
    <React.Fragment>
      <br/>
      <div>{props.text}</div>
      {/* {(props.hashtag || []).map(hashtag => <Hashtag key={`idHashtag_${hashtag.uid}`} {...hashtag}></Hashtag>)} */}
      <div>Posted by {props.user.email}</div>
      {Object.keys(props.prevTweet).length > 0 && (<div>{props.prevTweet}</div>)}
    </React.Fragment>
  )
}

export default Tweet