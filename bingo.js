const bingo = (function () {

  const bingos = [
    '"Do you see my screen?"',
    '"You are muted!"',
    '"Can you hear me??"',
    '"Nice background!"',
    '*mumbling*',
    'People talking in the background.',
    'Loud eating noises.',
    'Only forehead visible.',
    'Clearly doing other things on phone.',
    'Too bright background light.',
    'Person talks while muted.',
    '"I did not get that, can you repeat it?"',
    'Loud noises in someones background.',
    'Microphone freaks out.',
    'Notification sounds.',
    'Pixely blob speaking incomp-rehensible.',
    '"Can you mute yourself?"',
    'Video of the speaker freezing and nobody talks for 2 minutes.',
    '"Is person X here?"',
    '"I will look into it."',
    'Loud typing noises.',
    'Call runs over the scheduled time.',
    '"Who wants to start" followed by awkward silence.',
    '"Who just joined?"',
    '"Uhm, X, you are still sharing."',
    '"Can I share my screen?"',
    '"Can everyone go on mute?"',
    'At least one person comes way too late.',
    '"Next slide please."',
    '"Hello…, Hello? Hello!"',
    "Someone stands up and everyone looks on their headless torso.",
    '"I have to quit to stop sharing my screen."',
    "Usage of super distracting background.",
    "Free floating head in front of a photo background."
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

