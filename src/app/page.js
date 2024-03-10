"use client"

import { Tweet } from "react-tweet";
import { getTweet } from 'react-tweet/api'
import { useState } from "react";

export default function Page() {
  const [value, setValue] = useState("")
  const [tweetId, setTweetId] = useState("")
  const [tweet, setTweet] = useState(null)

  async function handleGetTweet(id) {
    setTweetId(id)

    // fetch data tweet
    let tweet = null
    try {
      tweet = await getTweet(id)
      setTweet(tweet)
    } catch (error) {
      console.error(error)
      setTweet({ message: "error getting tweet data" })
    }
  }

  return (
    <main className="flex flex-col gap-8 p-16 h-dvh justify-center items-center">
      <div className="flex flex-row gap-2 justify-center items-center">
        <input className="border border-solid border-black p-2 rounded" type="text" placeholder="input ID here" onChange={(e) => setValue(e.target.value)} value={value} />
        <button className='bg-blue-600 text-white p-2 rounded' onClick={() => handleGetTweet(value)}>Get Tweet</button>
      </div>
      {tweetId.length ? (
        <div className="flex flex-row gap-8">
          <Tweet id={tweetId} />
          <div className="flex flex-col gap-2">
            <pre>Stats</pre>
            <pre>{JSON.stringify(tweet)}</pre>
          </div>
        </div>)
        : "no data"}
    </main>
  );
}
