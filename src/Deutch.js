import React from 'react';
import './App.css';

//vocabulary componenet
export default class Deutch extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        dictionary: [], //all the words. it will be filled with data from local server
        newArticle: "-", // those 3 "new" vars store value for a new word to add
        newGerman: "",
        newEnglish: "", 
        searchValue: "" //stores value typed in searchbar
     };
     this.fillTable = this.fillTable.bind(this)
     this.specSymBtn = this.specSymBtn.bind(this)
  }

  fillTable (searchText) // fills this.state.dictionary
  {
    const fetchDict = async () => //async function coz fetching data takes some time
    {
      let res = ''; //fetch response
      if(searchText) //searching is implemented in a fetch link
      {
        res = await fetch('http://localhost:8000/dictionary?q=' + searchText)
      } else
      {
        res = await fetch('http://localhost:8000/dictionary')
      }
      const dict = await res.json()
      return dict
    }

    fetchDict() //fetchDict is still an async promise so i have to either resolve it or catch an error
      .then(dict => this.setState({dictionary: dict}))
      .catch(err => console.log(err.message))
  }

  componentDidMount() //fill table as soon as all the other DOM is loaded in
  {
    this.fillTable()
  }

  addNewWord = async (e) => {
    e.preventDefault()

    const newWord = 
    {
      article: this.state.newArticle,
      german: this.state.newGerman,
      english: this.state.newEnglish
    }
    await fetch('http://localhost:8000/dictionary',
      {
        method: 'POST',
        body: JSON.stringify(newWord),
        headers: {'Content-Type': 'application/json'}
      }
    )
    this.setState({newArticle: ""})
    this.setState({newGerman: ""})
    this.setState({newEnglish: ""})

    this.fillTable() // I call fillTable to refresh data
  }

  handleDelete = async (id) => //pass id as argument when calling, then use fetch delete method to delete object that link leads to, then refresh using fillTable
  {
      const res = await fetch('http://localhost:8000/dictionary/' + id,{method: 'DELETE'})

      this.fillTable()
  }

  specSymBtn () //I didnt like german keybord layout so i made little buttons that add symbols to your clipboard
  {
    return (
      <div className = "symBar">
        <div onClick = {() => {navigator.clipboard.writeText("ß")}}>ß</div>
        <div onClick = {() => {navigator.clipboard.writeText("ä")}}>ä</div>
        <div onClick = {() => {navigator.clipboard.writeText("ö")}}>ö</div>
        <div onClick = {() => {navigator.clipboard.writeText("ü")}}>ü</div>
      </div>
    )
    
  }

  render() 
  {
    console.log("render")
    const jsonDictionary = this.state.dictionary.map((word) => //I map this.state.dictionary and store it to this const 
          <tr className = "word" key = {word.id}>
            <td className = "delete" onClick = {() => this.handleDelete(word.id)}></td>
            <td className = "dropdown">{word.article}</td>
            <td>{word.german}</td>
            <td>{word.english}</td>
          </tr>
    )
    return (
      <div className = "Deutch">
        <h1>Deutch</h1>
        <form className = "searchBar">
          <input type = "text" placeholder = "Search" onChange = {(e) => {this.fillTable(e.target.value)}}></input>
        </form>
        <table>
          <thead>
            <tr>
              <td></td>
              <td>Article</td>
              <td>German</td>
              <td>English</td>
            </tr>
          </thead>
          <tbody>
            {jsonDictionary}
          </tbody>
          <tfoot>
            <tr>
              <td id = "submitBtn" onClick = {this.addNewWord}>+</td>
              <td className = "dropdown">
                <div>{this.state.newArticle}</div>
                <div className = "menu">
                  <div onClick = {() => this.setState({newArticle: "Der"})}><a>Der</a></div>
                  <div onClick = {() => this.setState({newArticle: "Die"})}><a>Die</a></div>
                  <div onClick = {() => this.setState({newArticle: "Das"})}><a>Das</a></div>
                </div>
              </td>
              <td className = "inputTd">
                <input type="text" placeholder = "In german" value = {this.state.newGerman} onChange = {(e) => this.setState({newGerman: e.target.value})}/>
                {this.specSymBtn()}
              </td>
              <td className = "inputTd"><input type="text" placeholder = "In english" value = {this.state.newEnglish} onChange = {(e) => this.setState({newEnglish: e.target.value})}/></td>
            </tr>
          </tfoot>
        </table>
      </div>
    )
  }
}