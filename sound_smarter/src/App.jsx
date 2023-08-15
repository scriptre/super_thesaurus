import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [storeWord, setStoreWord] = useState([])
  const [history, setHistory] = useState([])
  const [newWords, setNewWords] = useState('')
  const [findWord, setFindWord] = useState('')
  const [finalSentence, setFinalSentence] = useState('')
  const [words, setWords] = useState([])

const fetchMe = (newWord) => {
  const makeArray= newWord.split(" ")
  const refineArray= makeArray.filter(n => n != '')

  if (refineArray.length <= 1){
  const options = {
    method: 'GET',
    url: `https://wordsapiv1.p.rapidapi.com/words/${newWord}/typeOf`,
    headers: {
      'X-RapidAPI-Key': 'd81d65a20emsh02e31624cfbeb50p1432f1jsn1552763ee756',
      'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
    }
  }

  axios(options).then(response => {
    // console.log('axios if logger', response.data) //{word: 'example', typeOf: ['one', 'two', 'three']}
    const wordData= response.data.typeOf
    setWords(wordData)
    }
  ).catch((err) => {
    console.log('No input Error')
  }
    )
}else {
  const emp= []

  refineArray.map(n =>{
    const options = {
    method: 'GET',
    url: `https://wordsapiv1.p.rapidapi.com/words/${n}/typeOf`,
    headers: {
      'X-RapidAPI-Key': 'd81d65a20emsh02e31624cfbeb50p1432f1jsn1552763ee756',
      'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
    }
  }

  axios(options).then(response => {
    // console.log('axios else logger', response.data.typeOf) //{word: 'example', typeOf: ['one', 'two', 'three']}
    const wordData= response.data.typeOf // response.data= {word: 'example', typeOf: ['one', 'two', 'three']}
    emp.push(wordData)
    
    }
  ).catch(() => {console.log('error in get request')})
  })
  console.log('emp:',emp)
  setStoreWord(emp)

}

  }

  useEffect(() => {
    fetchMe(newWords)
    console.log('storeWord in UseEffect',storeWord)
  }, [findWord]);

  const handleNewWordChange=(event) =>{
    setNewWords(event.target.value)
  }

  const submitHandler = (event) =>{
    event.preventDefault()
    setFinalSentence('') //prevents final sentence from using previous submission

    const arrSentence= newWords.split(" ")
    const noSpaceSentence= arrSentence.filter(n => n != '')

    if (noSpaceSentence.length <= 1){
      setHistory(history.concat(noSpaceSentence))
      return setFindWord(newWords)

    }
    else{
      console.log('Store Words in Submit Handler', storeWord)

      var longestSentence = ''
      storeWord.map(n=> {
        console.log('n:', n)
        const longestWord = n.reduce((acc, cur) =>{
          return cur.length > acc.length ? cur : acc
        },'')

        console.log(longestWord)

        longestSentence += ` ${longestWord}`
      
      }
      )
      

      setFinalSentence(longestSentence.trimStart())
      setHistory(history.concat(noSpaceSentence))
      console.log('Is a sentence',findWord)

      return setFindWord(newWords)
    }


  }
  console.log('New Words:', newWords)
  console.log('Store Word:', storeWord)
  console.log('Final Sentence:', finalSentence)




  return (
    <div>
      <h1>Hello World</h1>
      <p>History: {history}</p>
      <p>Longest Sentence: {finalSentence}</p>

      <ul>
      {history.map(n => {
        <h1> n</h1>
      })}
        
      </ul>
      <form onSubmit={submitHandler} >
        <input type="text" value={newWords} onChange={handleNewWordChange} />
        <button type="submit">submit</button>

      </form>
      <h1>Words List</h1>
      <ul>
        {words.map(word=>
          <p>{word}</p>
        )}
      </ul>
      

      
      
    </div>
  )
}

export default App
