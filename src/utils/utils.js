//Добавляем UX
export function renderLoading(isloading, element) {
  if (isloading) {
    element.textContent = 'Сохранение...'
    console.log('Сохранение...')
  } else {
    element.textContent = element.value
    console.log(element.value)
  }
}
