import { ImageSourcePropType, ViewStyle } from "react-native";
import { Disponibility } from "./Enums";

export interface Avatar {
    id: string,
    image: Parse.File
}

export interface ParseUser {
    id: string,
    username: string,
    age: number,
    email: string,
    password: string,
    disponibility: string,
    avatar: Parse.Object | undefined
}

export interface Message {
    id: number,
    content: string,
    sender: string,
    receiver: string,
    createdAt: Date | undefined
}

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
    user: Parse.Object,
    onPress: () => void
}

export interface ThemeContextType {
    mode: string,
    statusBar: string
}