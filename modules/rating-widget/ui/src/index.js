// Export the main anonymous function
export default () => {
  // Define SimpleStarRating constructor function that takes a target element as argument
  const SimpleStarRating = function (targetElement) {
    // Helper function to get attribute from the target element
    function fetchAttribute(attributeName, defaultValue) {
      return targetElement.getAttribute(attributeName) || defaultValue;
    }

    // Initialize variables
    const maximumStars = parseInt(fetchAttribute('data-stars', 5));
    let defaultStarRating = parseFloat(fetchAttribute('data-default-rating', 0));
    let currentStarRating = -1;
    const starElements = [];

    // Style the target element
    targetElement.style.display = 'inline-block';

    // Create star elements
    for (let index = 0; index < maximumStars; index++) {
      const star = document.createElement('span');
      star.className = 'far fa-star';
      star.addEventListener('click', handleStarClick);
      if (index > 0) {
        starElements[index - 1].appendChild(star);
      } else {
        targetElement.appendChild(star);
      }
      starElements.push(star);
    }

    // Function to set the current rating
    function setCurrentRating(rating) {
      currentStarRating = rating;
      targetElement.setAttribute('data-rating', currentStarRating);
      displayCurrentRating();
    }

    // Event listeners for mouse events
    targetElement.addEventListener('mouseout', function () {
      displayCurrentRating();
    });

    targetElement.addEventListener('mouseover', function () {
      clearStarRating();
    });

    // Show the default rating initially
    displayDefaultRating();

    // Helper function to display rating
    function displayRating(rating) {
      clearStarRating();
      for (let i = 0; i < starElements.length; i++) {
        if (i >= rating) break;
        starElements[i].classList.replace('far', 'fas');
      }
    }

    // Function to display the current rating
    function displayCurrentRating() {
      const ratingAttribute = parseFloat(fetchAttribute('data-rating', 0));
      if (ratingAttribute) {
        currentStarRating = ratingAttribute;
        displayRating(currentStarRating);
      } else {
        displayDefaultRating();
      }
    }

    // Function to display the default rating
    function displayDefaultRating() {
      defaultStarRating = parseFloat(fetchAttribute('data-default-rating', 0));
      displayRating(defaultStarRating);
    }

    // Function to clear the star rating display
    function clearStarRating() {
      for (let i = 0; i < starElements.length; i++) {
        starElements[i].classList.replace('fas', 'far');
      }
    }

    // Function to handle clicking on a star
    function handleStarClick(event) {
      if (this === event.target) {
        const clickedStarIndex = starElements.indexOf(event.target);
        if (clickedStarIndex !== -1) {
          const newRating = clickedStarIndex + 1;
          setCurrentRating(newRating);
        }
      }
    }
  };

  // Register the SimpleStarRating as a widget player for ApostropheCMS
  apos.util.widgetPlayers.rating = {
    selector: '[data-rating-widget]',
    player: function (element) {
      const ratingElements = element.getElementsByClassName('simple-rating');
      for (let i = 0; i < ratingElements.length; i++) {
        const ratingElement = ratingElements[i];
        // Remove existing child spans
        while (ratingElement.firstChild) {
          ratingElement.removeChild(ratingElement.firstChild);
        }
        const _simpleStarRating = new SimpleStarRating(ratingElement);
      }

      const submitButton = element.querySelector('[data-submit-rating]');
      const ratingCard = element.querySelector('[data-reader-card]');
      const widgetId = ratingCard.getAttribute('data-widget-id');

      // Attach click event to the submit button
      submitButton.addEventListener('click', async () => {
        // Collect ratings
        const ratings = {};
        Array.from(ratingElements).forEach((el) => {
          const category = el.getAttribute('data-category');
          const rating =
            el.getAttribute('data-rating') ||
            el.getAttribute('data-default-rating');
          ratings[category] = Number(rating);
        });

        const averageRatings = await sendRatingsToServer(
          ratings,
          widgetId
        );
        // Remove the submit button
        submitButton.remove();

        // Replace the rating elements with a thank you message and average ratings
        ratingCard.innerHTML = `
            <h5 class="card-title">Thank you for your ratings!</h5>
            <div class="card-text">
              <p>Average Ratings from ${averageRatings.ratingsCount} reviews</p>
              <div>
                <p class="mb-1">Quality:</p>
                <div class="rating">${generateStars(
                  averageRatings.averageQuality
                )}</div>
              </div>
              <div>
                <p class="mb-1">Safety:</p>
                <div class="rating">${generateStars(
                  averageRatings.averageSafety
                )}</div>
              </div>
              <div>
                <p class="mb-1">Value:</p>
                <div class="rating">${generateStars(
                  averageRatings.averageValue
                )}</div>
              </div>
            </div>
          `;
      });
    }
  };

  async function sendRatingsToServer(ratings, widgetId) {
    const baseURL = window.location.origin;
    const endpoint = `${baseURL}/api/v1/rating-widget/submit`;
    const data = {
      ratings: ratings,
      widgetId: widgetId
    };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log('Success:', responseData);
      return responseData;
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  }

  function generateStars(rating, maxStars = 5) {
    let starsHTML = '';
    for (let i = 1; i <= maxStars; i++) {
      if (i <= rating) {
        starsHTML += '<span class="fas fa-star"></span>';
      } else if (i === Math.ceil(rating) && i !== rating) {
        starsHTML += '<span class="fas fa-star-half-alt"></span>';
      } else {
        starsHTML += '<span class="far fa-star"></span>';
      }
    }
    return starsHTML;
  }
};
