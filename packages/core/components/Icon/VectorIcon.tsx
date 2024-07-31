import React from 'react'
import { TouchableOpacity, ViewStyle } from 'react-native'
import {
  AntDesign,
  Entypo,
  EvilIcons,
  Feather,
  FontAwesome,
  Fontisto,
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
  SimpleLineIcons,
  Zocial,
} from '@expo/vector-icons'

const allComponents = {
  MaterialCommunityIcons,
  MaterialIcons,
  AntDesign,
  Entypo,
  EvilIcons,
  Feather,
  FontAwesome,
  Fontisto,
  Foundation,
  Ionicons,
  Octicons,
  SimpleLineIcons,
  Zocial,
}

type VectorIconProps = {
  name: string
  size?: number
  color?: string
  style?: ViewStyle
  font?:
    | 'MaterialCommunityIcons'
    | 'MaterialIcons'
    | 'AntDesign'
    | 'Entypo'
    | 'EvilIcons'
    | 'Feather'
    | 'FontAwesome'
    | 'Fontisto'
    | 'Foundation'
    | 'Ionicons'
    | 'Octicons'
    | 'SimpleLineIcons'
    | 'Zocial'
  onPress?: () => void
  buttonStyle?: ViewStyle
}

export const VectorIcon = ({
  name,
  size,
  color,
  style,
  font = 'MaterialCommunityIcons',
  onPress,
  buttonStyle,
}: VectorIconProps) => {
  const IconComponent = allComponents[font]
  return typeof onPress === 'function' ? (
    <TouchableOpacity
      onPress={onPress}
      style={[{ justifyContent: 'center', alignItems: 'center' }, buttonStyle]}>
      {/* @ts-ignore */}
      <IconComponent name={name} size={size} color={color} style={style} />
    </TouchableOpacity>
  ) : (
    <>
      {/* @ts-ignore */}
      <IconComponent name={name} size={size} color={color} style={style} />
    </>
  )
}
