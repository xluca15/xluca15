import { articles, urls } from "./constants/main.js";
import { questions } from "./constants/questions.js";
window.addEventListener('load', () => {
    const LTS = document.getElementsByClassName("letter__wrap");
    const searchInp = document.getElementById("search");  
    const searchResults = document.getElementById("search-results");
    let res = [];
    const startBtn = document.querySelector(".form__button");
    
    // Questions states
    let currentQuestion = 0;
    const setCurrentQuestion = num => currentQuestion = num;

    // Answers states
    let selectedAnswer = null;
    const setSelectedAnswer = num => selectedAnswer = num;
    let correctAnswer = null;
    const setCorrectAnswer = num => correctAnswer = num;

    // Results states
    let correctAnswers = 0;
    const setCorrectAnswers = num => correctAnswers = num;
    let wrongAnswers = 0;
    const setWrongAnswers = num => wrongAnswers = num;
    let time = 0; // in ms * 100
    let counter = setInterval(() => {
        time++;
    }, 100);

    const showQuestion = () => {
        // Select question and sum up the number of questions
        let questionToShow = questions[currentQuestion];
        setCurrentQuestion(currentQuestion + 1);
        setCorrectAnswer(questionToShow.correct);

        // Select the needed elements
        const questionTitle = document.getElementById("formQuestion");
        const answersWrapper = document.getElementById("formAnswers");
        
        // Show the question title
        questionTitle.innerHTML = questionToShow.title;
        
        // Show posible answers for current question, using a template
        const ansTemplate = (text, n) => {
            // Create a element using bootstrap classes
            return `<div class="form-check">
            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault${n}">
            <label class="form-check-label" for="flexRadioDefault${n}">
              ${text}
            </label>
          </div>`;
        }

        // Clear the answers wrapper
        answersWrapper.innerHTML = "";
        // Show the answers
        questionToShow.answers.forEach((answer, i) => { 
            answersWrapper.innerHTML += ansTemplate(answer, i);
        });
        setSelectedAnswer(null);

        document.querySelectorAll(`.form-check`).forEach((el, i) => { 
            el.addEventListener('click', () => {
                setSelectedAnswer(i);
            });
        });
    }

    const showResults = () => {
        // Select the needed elements
        const questionTitle = document.getElementById("formQuestion");
        const answersWrapper = document.getElementById("formAnswers");
        counter = clearInterval(counter);
        const getScore = ()=>{
            return ((correctAnswers / (correctAnswers + wrongAnswers))*10).toFixed(2);
        }
        // Show "Resultados" as the question title
        questionTitle.innerHTML = "Resultados"; 
        // Clear the answers wrapper
        answersWrapper.innerHTML = "";
        // Show the results
        answersWrapper.innerHTML = `<h2>${getScore()}</h2><br/><p>Tardaste: ${time*0.1} segundos</p>`;
    }

    const toggleTransition = ()=>{
        // Set on click className form__transition to form__transition-d 
        startBtn.addEventListener('click', (e) => {
        if(correctAnswer != null && selectedAnswer == null){
            e.preventDefault();
            return;
        }
        const tr = document.querySelector(".form__transition-d");
        tr.classList.add("form__transition");
        // If the user finished the quiz, show the results
        if (currentQuestion === questions.length) {
            showResults();
            setTimeout(() => {
                // Remove class when the animation is done
                tr.classList.remove("form__transition");
            }, 1500);
        } else {
            // Check for correct answer, and sum needed scores
            if(selectedAnswer != null && selectedAnswer == correctAnswer){
                tr.classList.remove("incorrect");
                tr.classList.add("correct");
                setCorrectAnswers(correctAnswers + 1);
            } else if(selectedAnswer != null && selectedAnswer != correctAnswer){
                tr.classList.remove("correct");
                tr.classList.add("incorrect");
                setWrongAnswers(wrongAnswers + 1);
            }

            setTimeout(() => {
                // Remove class when the animation is done
                tr.classList.remove("form__transition");
                showQuestion();               
            }, 1500);
        }

        });
    }
        
    const initSearch = ()=>{
        searchInp.addEventListener("keydown", (e)=> {
            res = [];
            if(searchInp.value.length > 1) {     
                articles.data.forEach(article => {
                    if(article.name.toLowerCase().includes(searchInp.value.toLowerCase())) {
                        res.push(article);
                    }
                })
            }else{
                res.push({
                    name: "Escribe al menos 2 letras",
                    url: "#",
                });
            }
            searchResults.innerHTML = "";
            res.forEach(article => {
                const item = document.createElement("section");
                item.className = "search-item";
                item.innerHTML = article.name;
                item.addEventListener("click", () => {
                    window.location.href = `/${article.url}.html`;
                })
                searchResults.appendChild(item);
            })
            if(e.keyCode === 13) {
                e.preventDefault();
                window.location.href = `/${res[0].url}.html`;
            }
        })  
    }

    const showAndHideSearch = ()=>{
        // Shows results and hide them depending the action, 
        // If the user clicks outside of the input, the results will be hidden
        // If the user clicks inside the input, the results will be shown

        searchInp.addEventListener("blur", ()=> {
            searchResults.innerHTML = "";
        })
        searchInp.addEventListener("click", ()=> {
            res.forEach(article => {
                const item = document.createElement("section");
                item.className = "search-item";
                item.innerHTML = article.name;
                item.addEventListener("click", () => {
                    window.location.href = `/${article.url}.html`;
                })
                searchResults.appendChild(item);
            })
        })
    }

    if(startBtn) {
        // If the button exists, run the function to add the event listener
        toggleTransition();   
    }
    
    const assignLinksToLetters = ()=>{
        // Assign the links to the letters
        for(let i = 0; i < LTS.length; i++){
            LTS[i].addEventListener("click", ()=>{
                window.location.href = window.location.href.replace("inicio", urls[i]);
            })
        }
    }

    // Search scripts
    initSearch();
    showAndHideSearch();
    
    // Links to letters
    assignLinksToLetters();
})