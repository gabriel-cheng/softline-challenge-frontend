export function documentMask(document) {
  document = document.replace(/\D/g, '')
  if (document.length <= 11) {
    document = document.replace(/(\d{3})(\d)/, '$1.$2')
    document = document.replace(/(\d{3})(\d)/, '$1.$2')
    document = document.replace(/(\d{3})(\d{1,2})$/, '$1-$2')
  } else {
    document = document.substring(0, 14)
    document = document.replace(/^(\d{2})(\d)/, '$1.$2')
    document = document.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    document = document.replace(/\.(\d{3})(\d)/, '.$1/$2')
    document = document.replace(/(\d{4})(\d{1,2})$/, '$1-$2')
  }
  return document
}