(function() {
  'use strict';

  let movies = [];

  const renderMovies = function() {
    $('#listings').empty();

    for (const movie of movies) {
      const $col = $('<div>').addClass('col s6');
      const $card = $('<div>').addClass('card hoverable');
      const $content = $('<div>').addClass('card-content center');
      const $title = $('<h6>').addClass('card-title truncate');

      $title.attr({
        'data-position': 'top',
        'data-tooltip': movie.Title
      });

      $title.tooltip({ delay: 50 }).text(movie.Title);

      const $poster = $('<img>').addClass('poster');

      $poster.attr({
        src: movie.Poster,
        alt: `${movie.Poster} Poster`
      });

      $content.append($title, $poster);
      $card.append($content);

      const $action = $('<div>').addClass('card-action center');
      const $plot = $('<a>');

      $plot.addClass('waves-effect waves-light btn modal-trigger');
      $plot.attr('href', `#${movie.id}`);
      $plot.text('Plot Synopsis');

      $action.append($plot);
      $card.append($action);

      const $modal = $('<div>').addClass('modal').attr('id', movie.id);
      const $modalContent = $('<div>').addClass('modal-content');
      const $modalHeader = $('<h4>').text(movie.title);
      const $movieYear = $('<h6>').text(`Released in ${movie.year}`);
      const $modalText = $('<p>').text(movie.plot);

      $modalContent.append($modalHeader, $movieYear, $modalText);
      $modal.append($modalContent);

      $col.append($card, $modal);

      $('#listings').append($col);

      $('.modal-trigger').leanModal();
    }
  };

  // ADD YOUR CODE HERE
  // - Listen for submissions on the search form. Remember to prevent the default action.
  // - Validate the user input is not blank.
  // - Clear the previous search results.
  // - Send an HTTP request to the [OMDB API](http://omdbapi.com/) search endpoint.
  //   - The API requires a key so you will need to send requests to this url instead:
  //     - https://omdb-api.now.sh/
  //     - Example: https://omdb-api.now.sh/?s=star%20wars
  // - Handle the HTTP response by pushing a new, well-formed `movie` object into the global `movies` array.
  // - Render the `movies` array to the page by calling the `renderMovies()` function with no arguments.

  let button = document.querySelector("button");
  let form = document.querySelector("form");
  let input = document.querySelector("input");

  

  button.addEventListener("click", function(event){
    event.preventDefault();
    let sValue = input.value;
    fetch('https://omdb-api.now.sh/?s=' + sValue)
      .then((response) => response.json())
      .then((response)=> {
        if (input.value == ""){
          alert ("Please input a search.")
        }else{ 
          for(let i = 0; i < response.Search.length; i++){
            movies.push(response.Search[i]);
          }
        }
        renderMovies();
        movies= []
      })   
    })

})();
