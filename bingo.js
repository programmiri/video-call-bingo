const bingo = (function () {

  const bingos = [
    '"Do you see my screen?"',
    '"You are muted!"',
    'Everybody (except Vojta) trying to stay the heck away from the start arrow at the fireplace.',
    'Video of the speaker freezing and nobody talks for 1 minute.',
    '"Who wants to start" followed by silence.',
    '"Who wants to react to that?" followed by a really long silence.',
    '"Waiting for Vojta to start!"',
    'Vojta says he will go first',
    '"I’m fine. Next."',
    '"That’s the perfect channel name!"',
    'Someone calls the unit wholesome.',
    'Divorce rate is mentioned.',
    'Someone is corrected that we don’t have "awkward" but "comfortable" silence',
    'Coffee is mentioned.',
    'The lack of coffee is mentioned.',
    'Some confusion is happening about type / version / configuration and what’s an integration anyways?',
    'Unprompted long silence.',
    'Halloween is mentioned.',
    'There are _possible_ squirrels!',
    'Basically every question followed by dead silence.',
    '"LET ME IINNNNNN" in slack.',
    '"I’m happy to see you all!"',
    "Mural gets more check-in circle decorations that yellow notes.",
    "Suddenly we talk about books and half of us get sci-fi FOMO",
    "More communication happens in the zoom chat than in the actual call.",
    "There's a mention of good skin",
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

