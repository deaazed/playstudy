import { ImageSourcePropType, ViewStyle } from "react-native";
import { Disponibility } from "./Enums";

export interface User {
    id: number,
    name: string,
    disponibility: Disponibility,
    avatarImage: undefined|ImageSourcePropType
}

export interface Game {
    name: string,
    description: string,
    color: string,
    image: undefined|ImageSourcePropType,
    level: number,
    exlpaination: string,
    progress: number,
    stages: number
}

export interface Coin {
    image: undefined|NodeRequire,
    quantity: number,
    price: number
}

export interface GameItemProps {
    game: Game,
    onPress: () => void
}

export interface CoinStoreItemProps {
    coin: Coin,
    onPress: () => void
}

export interface UserItemProps {
    style: ViewStyle | undefined,
    user: User,
    onPress: () => void
}

export interface ThemeContextType {
    mode: string,
    statusBar: string
}