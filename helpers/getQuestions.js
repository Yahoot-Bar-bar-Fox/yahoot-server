module.exports = (questions, num) => {
  let idxDone = []
  let outQuestions = []
  while (idxDone.length < num) {
    let idRandom = Math.floor(Math.random() * (questions.length))
    if (!(idxDone.includes(idRandom))) {
      outQuestions.push(questions[idRandom])
      idxDone.push(idRandom)
    }
  }
  console.log(idxDone);

  return outQuestions
}
