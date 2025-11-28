import { TamaguiProvider, TamaguiProviderProps } from 'tamagui'
import { tamaguiConfig } from './tamagui.config'

export function Provider({ children, ...rest }: Omit<TamaguiProviderProps, 'config'>) {
  return (
    <TamaguiProvider config={tamaguiConfig} {...rest}>
      {children}
    </TamaguiProvider>
  )
}
