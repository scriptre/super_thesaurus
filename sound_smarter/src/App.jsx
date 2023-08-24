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
  const refineArray= makeArray.filter(n => n != '') //removes ' ' from ['mom', 'dad', ' ']
  
  
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
  //[mom, dad]
  refineArray.forEach(eachWord =>{
    const options = {
    method: 'GET',
    url: `https://wordsapiv1.p.rapidapi.com/words/${eachWord}/typeOf`,
    headers: {
      'X-RapidAPI-Key': 'd81d65a20emsh02e31624cfbeb50p1432f1jsn1552763ee756',
      'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
    }
  }

  axios(options).then(response => {
    // console.log('axios else logger', response.data.typeOf) //{word: 'example', typeOf: ['one', 'two', 'three']}
   const eachSynonym = response.data.typeOf // response.data= {word: 'example', typeOf: ['one', 'two', 'three']}
    emp.push(eachSynonym)
    
    }
  ).catch(() => {console.log('error in get request')})
  
  })
  
  setStoreWord(emp.reverse())

}

  }


useEffect(() => {
  fetchMe(newWords)
}, [findWord]);




  const handleNewWordChange=(event) =>{
    setNewWords(event.target.value)
  }

  const submitHandler = (event) =>{
    event.preventDefault()
    setFinalSentence('') //prevents final sentence from using previous submission
    

    const arrSentence= newWords.split(' ')
    const noSpaceSentence= arrSentence.filter(n => n != '')

    if (noSpaceSentence.length <= 1){
      setHistory(history.concat(noSpaceSentence))
      return setFindWord(newWords)

    }
    else{
     

      const newStorage = [...storeWord]; // Clone the storeWord array

      const longestSentence = newStorage.map(synonymList => {
        const longestWord = synonymList.reduce((acc, cur) => (cur.length > acc.length ? cur : acc), '');
        return longestWord;
      }).join(' ')

      // setStoreWord([])
      setFinalSentence(longestSentence)
      setHistory(history.concat(noSpaceSentence.join(' ')))


      return setFindWord(newWords)
    }


  }
  // console.log('New Words:', newWords)
  // console.log('Final Sentence:', finalSentence)
  // console.log('History:', history)
  console.log('Store Word:', storeWord)
 



  return (
    <div>
      <h1>Super_thesaurus</h1>
      <p>History: {history.map(n => <>{n}, </>)}</p>
      <p>Longest Sentence: {finalSentence}</p>

      
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
