import React, { Component } from 'react';
import OptionList from '../components/OptionList'

class AutoCompletet extends Component {
    constructor(){
        super();
        this.textInput = React.createRef();
        this.wrapperRef = React.createRef();
    }
    
    state = {
        filteredOptions: [],
        userInput : '',
        showOption : false,
        selectedMovieArr : []
    }

    componentDidMount(){
       this.textInput.current.focus();
       document.addEventListener('mousedown', this.handleClickOutside);
    }

    onChangeHandler = movieName => {
        this.setState({ userInput : movieName});
        if(movieName.length < 3){
            return false;
        } 
        fetch("http://www.omdbapi.com/?s="+movieName+"&type=movie&apikey=3a9021e5")
        .then(response => response.json())
        .then(data => {
            if(data.Response === "False"){
                this.setState({
                    filteredOptions: [],
                    showOption : false
                })
            }else{
                this.setState({
                    filteredOptions: data.Search,
                    showOption : true
                })
            }
            
        });
    }

    handleKeyDown = (e) => {
        if (e.key === 'Enter' && this.textInput.current) {
            this.onChangeHandler(this.textInput.current.value);
        }
    }

    selectOption = (e) => {
        let movieName = e.currentTarget.innerText;
         this.setState(prevState => ({
            selectedMovieArr: [...prevState.selectedMovieArr, movieName],
            showOption: false,
            userInput: ''
          }))
    }

    removeSelectedOption = (e) => {
        let pillToRemove = e.target.attributes.getNamedItem("data").value;
        this.setState({
            selectedMovieArr : this.state.selectedMovieArr.filter(function(movie){
                return movie !== pillToRemove;
            })
        })
    }

    handleClickOutside = (e) => {
        if (this.wrapperRef && this.wrapperRef.current && !this.wrapperRef.current.contains(e.target)) {
            this.setState({
                showOption : false
            })
        }
    }

    render() { 
        const {
            onChangeHandler,
            handleKeyDown,
            removeSelectedOption,
            state: { filteredOptions, userInput, showOption, selectedMovieArr}
          } = this;
        
        let selectedOption;
        let className = this.state.showOption ? 'options-container-show' : 'options-container-hide';
        
        if(selectedMovieArr.length > 0){
            selectedOption = (
                <ul className = "serachbox-ul">
                {selectedMovieArr.map((item,index) => {
                    return(
                    <li key = {item}>
                        <div className="search">
                            <div className="selected-pill-text" title = {item}>{item}</div>
                            <button className="delete-selected-option" data ={item} onClick={e => {removeSelectedOption(e)}}>x</button>
                        </div>         
                    </li>)
                    })}
                     <input type="text" value={userInput} className="search-box-secondary" onKeyDown={handleKeyDown} onChange={e => {onChangeHandler(e.target.value)} }/>
                </ul>    
            );
        }else{
            selectedOption = (
                <input ref={this.textInput} value={userInput} type="text" className="search-box" onKeyDown={handleKeyDown} onChange={e => {onChangeHandler(e.target.value)} }/>
            );

        }
    return (
            <div className="container"  ref={this.wrapperRef}>
               {selectedOption}
              <div className={className}>
                  {this.state.showOption ? (<OptionList showOption= {showOption} filteredOptions = {filteredOptions} selectOption = {this.selectOption}></OptionList>)
                  : (<OptionList showOption= {showOption} userInput={userInput}></OptionList>)}
              </div>
            </div>
          );;
    }
}
 
export default AutoCompletet;