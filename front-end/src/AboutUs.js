import { useEffect, useState } from "react"
import "./AboutUs.css"
import axios from "axios"

const AboutUs = () => {
  
  const [myparags, setMyparags] = useState("")
  const [myimg, setMyimg] = useState("")

  useEffect(() => {
    (async () => {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/aboutus`)
      setMyparags(response.data?.myparags?.split("\n") || "")
      setMyimg(response.data?.myimg || "")
    })()
  }, [])
  return(
    <>
    <h1>This page is all about me</h1>
    
    <div className="my-intro">
      {Array.isArray(myparags) ?
      myparags?.map((parag, i) => <MyP p={parag} key={i}/>) :
      <MyP p={myparags} />}
    </div>
    
    <h1>A picture of me Σ(￣。￣ﾉ)ﾉ</h1>
    <img className="my-photo" src={myimg}/>    
    </>
  )
}

const MyP = param => {
  return <p className="my-p">{param.p}</p>
}
export default AboutUs