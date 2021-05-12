import React from 'react'

const Hashtag = (props) => {
  console.log("hashtag props", props)
  return(
    <React.Fragment>
      <br/>
      <div>Sunt un hashtag</div>
      {/* <div>{props.text}</div>
      {props.hashtags.length > 0 && (<div>{props.hashtags}</div>)}
      <div>Posted by {props.user.email}</div>
      {Object.keys(props.prevTweet).length > 0 && (<div>{props.prevTweet}</div>)} */}
    </React.Fragment>
  )
}

export default Hashtag