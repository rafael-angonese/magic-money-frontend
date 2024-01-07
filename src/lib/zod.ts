import i18next from 'i18next'
import * as zod from 'zod'
import { zodI18nMap } from 'zod-i18n-map'

// import ptBrTranslation from 'zod-i18n-map/locales/pt/zod.json'
import ptBrTranslation from '@/i18n/locales/pt-Br/zod.json'

i18next.init({
  lng: 'pt-BR',
  resources: {
    'pt-BR': { zod: ptBrTranslation },
  },
})

zod.setErrorMap(zodI18nMap)

export default zod
