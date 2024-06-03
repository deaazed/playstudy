import { Disponibility } from "../../services/Enums";
import Avatars from '../Avatars';

export default [
    {
        id: 1,
        name: "John",
        disponibility: Disponibility['A'],
        avatarImage: Avatars.find(a => a.id == 1)?.image
    },
    {
        id: 2,
        name: "Manon",
        disponibility: Disponibility['B'],
        avatarImage: Avatars.find(a => a.id === 5)?.image
    },
    {
        id: 3,
        name: "Vincent",
        disponibility: Disponibility['C'],
        avatarImage: Avatars.find(a => a.id === 2)?.image
    },
    {
        id: 4,
        name: "Marie",
        disponibility: Disponibility['A'],
        avatarImage: Avatars.find(a => a.id === 3)?.image
    },
    {
        id: 5,
        name: "Paul",
        disponibility: Disponibility['B'],
        avatarImage: Avatars.find(a => a.id === 4)?.image
    },
    {
        id: 6,
        name: "Julie",
        disponibility: Disponibility['C'],
        avatarImage: Avatars.find(a => a.id === 6)?.image
    },
    {
        id: 7,
        name: "Alex",
        disponibility: Disponibility['A'],
        avatarImage: Avatars.find(a => a.id === 7)?.image 
    },
    {
        id: 8,
        name: "Sophie",
        disponibility: Disponibility['B'],
        avatarImage: Avatars.find(a => a.id === 8)?.image
    },
    {
        id: 9,
        name: "Mickael",
        disponibility: Disponibility['C'],
        avatarImage: Avatars.find(a => a.id === 2)?.image
    },
    {
        id: 10,
        name: "Céline",
        disponibility: Disponibility['A'],
        avatarImage: Avatars.find(a => a.id === 3)?.image
    },
    {
        id: 11,
        name: "Jean",
        disponibility: Disponibility['B'],
        avatarImage: Avatars.find(a => a.id === 4)?.image
    },
    {
        id: 12,
        name: "Marie",
        disponibility: Disponibility['C'],
        avatarImage: Avatars.find(a => a.id === 5)?.image
    },
    {
        id: 13,
        name: "Paul",
        disponibility: Disponibility['A'],
        avatarImage: Avatars.find(a => a.id === 6)?.image
    },
    {
        id: 14,
        name: "Julie",
        disponibility: Disponibility['B'],
        avatarImage: Avatars.find(a => a.id === 7)?.image
    },
];