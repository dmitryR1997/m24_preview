import num_word from "@utils/NumWord"

export default function showTotal(currentPage, perPage, total) {
  let showing = currentPage * perPage
  let of = total

  if (total < perPage) of = perPage

  if (showing > of) showing = of
  if (total < showing) showing = of = total

  return `Показано ${showing} из ${of} ${num_word(of, [" модель", " модели", " моделей"])}`
}
