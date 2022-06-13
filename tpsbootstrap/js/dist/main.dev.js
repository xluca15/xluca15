"use strict";

var _main = require("./constants/main.js");

var _questions = require("./constants/questions.js");

window.addEventListener('load', function () {
  var LTS = document.getElementsByClassName("letter__wrap");
  var searchInp = document.getElementById("search");
  var searchResults = document.getElementById("search-results");
  var res = [];
  var startBtn = document.querySelector(".form__button");

  var showQuestions = function showQuestions() {
    for (var i = 0; i < _questions.questions.length; i++) {
      document.querySelector(".form__title").innerText = _questions.questions[i].title;
    }
  };

  if (startBtn) {
    // Set on click className form__transition to form__transition-d 
    startBtn.addEventListener('click', function () {
      var tr = document.querySelector(".form__transition-d");
      tr.classList.add("form__transition");
      setTimeout(function () {
        // Remove class when the animation is done
        tr.classList.remove("form__transition");
        showQuestions();
      }, 1500);
    });
  }

  searchInp.addEventListener("keydown", function (e) {
    res = [];

    if (searchInp.value.length > 1) {
      _main.articles.data.forEach(function (article) {
        if (article.name.toLowerCase().includes(searchInp.value.toLowerCase())) {
          res.push(article);
        }
      });
    } else {
      res.push({
        name: "Escribe al menos 2 letras",
        url: "#"
      });
    }

    searchResults.innerHTML = "";
    res.forEach(function (article) {
      var item = document.createElement("section");
      item.className = "search-item";
      item.innerHTML = article.name;
      item.addEventListener("click", function () {
        window.location.href = "/".concat(article.url, ".html");
      });
      searchResults.appendChild(item);
    });

    if (e.keyCode === 13) {
      e.preventDefault();
      window.location.href = "/".concat(res[0].url, ".html");
    }
  });
  searchInp.addEventListener("blur", function () {
    searchResults.innerHTML = "";
  });
  searchInp.addEventListener("click", function () {
    res.forEach(function (article) {
      var item = document.createElement("section");
      item.className = "search-item";
      item.innerHTML = article.name;
      item.addEventListener("click", function () {
        window.location.href = "/".concat(article.url, ".html");
      });
      searchResults.appendChild(item);
    });
  });

  var _loop = function _loop(i) {
    console.log(_main.urls[i]);
    LTS[i].addEventListener("click", function () {
      window.location.href = window.location.href.replace("inicio", _main.urls[i]);
    });
  };

  for (var i = 0; i < LTS.length; i++) {
    _loop(i);
  }
});