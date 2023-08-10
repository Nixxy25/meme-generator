import React, { useState ,useEffect} from 'react'
import "../index.css"

let url

function Meme() {

    const [meme, setMeme] = React.useState({
        topText:"",
        bottomText:"",
        randomImage:"http://i.imgflip.com/1bij.jpg",
    })

    const [allMemes, setAllMemes] = useState([])

    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
        .then(res => res.json())
        .then(data => setAllMemes(data.data.memes))
    },[])
    
    function getMemeImage(){
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        const url = allMemes[randomNumber].url
        setMeme(prevMeme =>({
            ...prevMeme,
            randomImage: url
        }))
    } 

    function handleChange(event){
        const {name, value} = event.target
        setMeme(prevMeme => {
            return{
                ...prevMeme,
                [name]: value
            }
        })
    }
  return (
    <main>
        <div className='form'>
            <input 
                type='text' 
                className='form-input'
                placeholder="topText"
                name="topText"
                onChange={handleChange}
                value={meme.topText}
            />
            <input 
                type="text"
                className='form-input'
                placeholder="bottomText"
                name="bottomText"
                onChange={handleChange}
                value={meme.bottomText}
            />
         <button onClick={getMemeImage} 
                className='form-button'>Get a new meme image  🖼</button>
       </div>
       
             <div className="meme">
                <img src={meme.randomImage} className="meme-image" />
                
                <h2 className="meme-text top">{meme.topText}</h2>

                <h2 className="meme-text bottom">{meme.bottomText}</h2>

            </div>
        
    </main>
  )
}

export default Meme