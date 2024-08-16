import { useState, useEffect } from "react"

export default function Meme() {
    const [meme, setMeme] = useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg"
    })
    const [allMemes, setAllMemes] = useState([])

    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
        .then(res => res.json())
        .then(data => setAllMemes(data.data.memes))
    }, [])

    function getMemeImage() {
        const randomNumber = Math.ceil(Math.random()*allMemes.length)
        const url = allMemes[randomNumber].url
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url
        }))
    }

    function handleChange(event) {
        const {name, value} = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }

    return (
        <main>
            <section className="form">
                <label>Top text<br/>
                    <input
                        type="text"
                        placeholder="One does not simply"
                        className="form-el"
                        name="topText"
                        value={meme.topText}
                        onChange={handleChange}
                    />
                </label>
                <label>Bottom text<br/>
                    <input
                        type="text"
                        placeholder="create a new meme!"
                        className="form-el"
                        name="bottomText"
                        value={meme.bottomText}
                        onChange={handleChange}
                    />
                </label>
                <button
                    className="form-btn"
                    onClick={getMemeImage}
                >
                    Get a new meme image 🦶🏻
                </button>
            </section>
            <section className="meme">
                <img src={meme.randomImage} className="meme-image" alt="current meme" />
                <h2 className="meme-text top">{meme.topText}</h2>
                <h2 className="meme-text bottom">{meme.bottomText}</h2>
            </section>
        </main>
    )
}