import { createTamagui } from 'tamagui'
import { config } from '@tamagui/config/v3'

export const tamaguiConfig = createTamagui(config)

export type AppConfig = typeof tamaguiConfig

declare module 'tamagui' {
  // overrides TamaguiCustomConfig so your custom types
  // work everywhere you import `tamagui`
  interface TamaguiCustomConfig extends AppConfig {}
}

export default tamaguiConfig
