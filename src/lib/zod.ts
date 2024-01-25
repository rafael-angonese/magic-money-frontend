import i18next from 'i18next'
import * as z from 'zod'
import { zodI18nMap } from 'zod-i18n-map'

// import ptBrTranslation from 'zod-i18n-map/locales/pt/zod.json'
import ptBrTranslation from '@/i18n/locales/pt-br/zod.json'

i18next.init({
  lng: 'pt-BR',
  resources: {
    'pt-BR': { zod: ptBrTranslation },
  },
})

z.setErrorMap(zodI18nMap)

export default z
