import { useEffect, useState } from "react"
import "./AboutUs.css"
import axios from "axios"

const AboutUs = () => {
  
  const [myparags, setMyparags] = useState("")
  const [myimg, setMyimg] = useState(null)

  useEffect(() => {
    (async () => {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/aboutus`)
      const resParags = response.data?.myparags?.split("\n") || ""
      const resImg = response.data?.myimg ? 
        `${process.env.REACT_APP_SERVER_HOSTNAME}/${response.data?.myimg}` : 
        ""
      setMyparags(resParags)
      setMyimg(resImg)
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