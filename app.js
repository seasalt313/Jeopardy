window.addEventListener('load', function(){

  let get = document.querySelector(".get");
  get.addEventListener('click', getQuestion);

  let show = document.querySelector('.show');
  show.addEventListener('click', answerQuestion);

})

function getQuestion(){
  let parent = document.querySelector(".jeosection");

  let request = new XMLHttpRequest();
  request.open('GET', 'http://jservice.io/api/random');

  request.addEventListener('load', function(){
  let response = JSON.parse(request.responseText);
  console.log(response);

    let child = document.createElement("div");
      child.innerHTML = Mustache.render(
        document.querySelector('#jeo-template').innerHTML,
          {
            value: response[0].value,
            question: response[0].question,
            category: response[0].category.title,
            answer: response[0].answer,
          });
      parent.appendChild(child);
    })
    request.send();
  }



    function answerQuestion(){
      let answer = document.querySelector('#type');
      let parent = document.querySelector(".ul");
      let child = document.createElement('li');
      let rightAnswer = document.querySelector('.hide');
      rightAnswer.classList.remove('hide');

      console.log(answer);
      child.textContent = "Your answer: "+ answer.value;
      parent.appendChild(child);

      score(rightAnswer, answer);

    }

    function score(user, answer){
      if (user === answer) {
          console.log("your answer is correct!");
          answer.classList.add('green');
      } else {
        console.log("youre wrong");
        answer.classList.add('red');
      }
    }
