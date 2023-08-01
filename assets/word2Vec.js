(function () {
  const words = Object.keys(wordVecs);

  function mag(a) {
    return Math.sqrt(a.reduce(function (sum, val) {
      return sum + val * val;
    }, 0));
  }

  function getCosSim(f1, f2) {
    return Math.abs(f1.reduce(function (sum, a, idx) {
      return sum + a * f2[idx];
    }, 0) / (mag(f1) * mag(f2)));
  }

  function getMostSimilarN(n, vec) {
    var sims = [];
    for (var word in wordVecs) {
      var sim = getCosSim(vec, wordVecs[word]);
      sims.push([word, sim]);
    }
    sims.sort(function (a, b) {
      return b[1] - a[1];
    });
    return sims.slice(0, n);
  }

  function printSimilarities(id, simWords) {
    document.querySelectorAll('#' + id + ' p')[0].innerText = 'Results:';
    const res = document.querySelectorAll('#' + id + ' p')[1];
    let wordList = document.createElement('ul');
    let wordItem;
    simWords.forEach(function (sims) {
      wordItem = document.createElement('li');
      wordItem.innerText = sims[0] + '  -  ' + String(sims[1]);
      wordList.appendChild(wordItem);
    });
    res.appendChild(wordList);
  }

  function initialize () {
    document.getElementById('list-sim-btn').addEventListener('click', function () {
      document.querySelectorAll('#sim-words-list p')[0].innerText = '';
      document.querySelectorAll('#sim-words-list p')[1].innerHTML = '';
      const word = document.getElementById('target-word').value;
      if (word == '') {
        document.querySelectorAll('#sim-words-list p')[0].innerText = 'Please enter a word. Do not leave it blank';
        return
      } else if (!wordVecs.hasOwnProperty(word)) {
        document.querySelectorAll('#sim-words-list p')[0].innerText = 'Sorry, the word you entered is not in our database. Please try another word.';
        return
      }
      let simWords = getMostSimilarN(10, wordVecs[word]);
      if (simWords[0] === false) {
        document.querySelectorAll('#sim-words-list p')[0].innerText = 'No vector was found for that word. Please try another word.';
      } else {
        printSimilarities('sim-words-list', simWords);
      }
    });

    document.getElementById('get-words').addEventListener('click', function () {
      document.querySelectorAll('#sim-words p')[0].innerText = '';
      document.querySelectorAll('#sim-words p')[1].innerHTML = '';
      const inputWord = document.getElementById('word').value;
      let inputSim = document.getElementById('similarity').value;
      let sim;
      let simWords = [];
      
      if (inputWord == '') {
        document.querySelectorAll('#sim-words p')[0].innerText = 'Please enter a word. Do not leave it blank';
        return
      } else if (!wordVecs.hasOwnProperty(inputWord)) {
        document.querySelectorAll('#sim-words p')[0].innerText = 'Sorry, the word you entered is not in our database. Please try another word.';
        return
      } else if (inputSim == '') {
        document.querySelectorAll('#sim-words p')[0].innerText = 'Please do not leave the similarity measure blank';
        return
      }
      inputSim = parseFloat(inputSim);
      if (inputSim > 1) inputSim = inputSim / 100;
      inputSim = inputSim.toFixed(4);
      words.forEach(function (word) {
        sim = getCosSim(wordVecs[word], wordVecs[inputWord]).toFixed(4);
        if (sim == inputSim) simWords.push([word, sim]);
      });
      printSimilarities('sim-words', simWords);
    });
  }

  function ready(fn) {
    if (document.readyState !== 'loading') {
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }

  ready(initialize);

})();
