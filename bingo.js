const bingo = (function () {

  const bingos = [
    'Everybody (except Vojta) trying to stay the heck away from the start arrow at the fireplace.',
    '"Waiting for Vojta to start!"',
    'Vojta says he will go first',
    '"I’m fine. Next."',
    '"That’s the perfect channel name!"',
    'Someone asking "What did I miss" in regards to our channel name.',
    'Someone has a bad case of FOMO because they missed 2 minutes of a meeting',
    'Someone calls the unit wholesome.',
    'Divorce rate is mentioned.',
    'Someone is corrected that we don’t have "awkward" but "comfortable" silence.',
    'Coffee is mentioned.',
    'The lack of coffee is mentioned.',
    'Some confusion is happening about type / version / configuration and what’s an integration anyways?',
    'Unprompted long silence.',
    'There are _possible_ squirrels!',
    'People posting in the zoom chat how they are emotionally stunted because there are no blob cat emojis in zoom.',
    '"LET ME IINNNNNN" in slack.',
    '"I’m happy to see you all!"',
    "Mural gets more check-in circle decorations then yellow notes.",
    "Suddenly we talk about books and half of us get sci-fi FOMO.",
    "More communication happens in the zoom chat than in the actual call.",
    "There's a mention of good skin.",
    "Peter has written a blog post about something.",
    "Implementation ended in tragedy.",
    '"Good meeting"',
    '"Talk about that we are the most awesome unit."',
    '"Talk about why we are the most awesome unit."',
    ]

  const winner = [
    [0,1,2,3],
    [4,5,6,7],
    [8,9,10,11],
    [12,13,14,15],
    [0,5,10,15],
    [3, 6, 9, 12],
    [0,4,8,12],
    [1,5,9,13],
    [2,6,10,14],
    [3,7,11,15],
    [0,4,8,12],
    [1,5,9,13],
    [2,6,10,14],
    [3,7,11,15],
  ]

  const hitBingos = [];

  function shuffle(list) {
    const listToReorder = [...list]
      for (let i = listToReorder.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          const temp = listToReorder[i];
          listToReorder[i] = listToReorder[j];
          listToReorder[j] = temp;
      }
      return listToReorder
  }

  function addContentToCells(cells) {
    const randomBingos = shuffle(bingos)
     for (let i = 0; i < cells.length; i++) {
      cells[i].setAttribute('data-cell-id', i)
      cells[i].innerHTML = randomBingos[i]
     }
  } 


  function toggleClass(cell) {
    if(cell.classList.contains('bingod')) {
      cell.classList.remove("bingod")
    } else {
      cell.classList.add("bingod")      
    }
  }

  function updateBingoList(cellId) {
    const index = hitBingos.indexOf(cellId)
    if(index >= 0) {
      hitBingos.splice(index, 1);
    } else {
      hitBingos.push(cellId)
    }
  }

function checkHits(hitsNeeded, currentHits) {
  return hitsNeeded.every( entry => {
    return currentHits.includes(entry)
  })

}
  function checkForBingo() {
    if(hitBingos.length < 4) return
    const weHaveAWinner =  winner.some( winnerList => {
      const list = winnerList.map( entry => entry.toString())
      return checkHits(list, hitBingos)
    })
    if(weHaveAWinner) {
      showOverlay()
    }
  }

  function registerEventListeners() {
      addEventListener('click', function(event) {
        const cellId = event.target.getAttribute('data-cell-id')
        if(!cellId) return
        toggleClass(event.target)
        updateBingoList(cellId)
        checkForBingo()
    });
  }

  function showOverlay() {
    document.querySelector('.overlay--hidden').classList.remove('overlay--hidden')
  }

  return {
    start: function() {
      const cells = document.querySelectorAll('[data-cell-id="0"]')
      addContentToCells(cells)
      registerEventListeners()
    },
    restart: function() {
      location.reload();
    }
  };
})();

