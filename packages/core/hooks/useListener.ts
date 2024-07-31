import { useEffect } from 'react'
import { DeviceEventEmitter } from 'react-native'

export function useListener(eventName: string, fn: (data: any) => void, inputs?: any[]) {
  useEffect(() => {
    const e = DeviceEventEmitter.addListener(eventName, fn)
    return () => {
      console.log('[Remove Event]', eventName)
      e.remove()
    }
  }, inputs ?? [])
}
