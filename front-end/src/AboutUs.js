import "./AboutUs.css"
import myphoto from "./myphoto.jpg"
const AboutUs = param => {
  
  return(
    <>
    <h1>This page is all about ME!</h1>
    
    <div className="my-intro">
      <MyP p = {"My name is Qiwen Xiao, also go by Nina."}/>
      <MyP p = {"I tell everyone that Nina is my preferred name."}/>
      <MyP p = {"It is weird, isn't it? You see... my real name is Qiwen."}/>
      <MyP p = {"But I really like 'Nina.' I picked this name from a list of English names in an English class when I was really little."}/>
      <MyP p = {"I picked it because the 'n' in 'nina' assembled a cave hole. That fascinated me."}/>
      <MyP p = {"Also, my friends like to call me 'nani,'"}/>
      <MyP p = {"... which is a dramatic 'what' in English"}/>
      <MyP p = {"So wierd that I actually identify myself with this name!"}/>
    </div>

    <h1>Please enjoy my beautiful self Σ(￣。￣ﾉ)ﾉ</h1>
    <img className="my-photo" src={myphoto}/>    
    </>
  )
}

const MyP = param => {
  return <p className="my-p">{param.p}</p>
}
export default AboutUs