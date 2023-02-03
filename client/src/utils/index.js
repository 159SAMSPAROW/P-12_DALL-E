import FileSaver from 'file-saver'
import { surpriseMePrompts } from '../constants'


{/* Fonction qui retourne un prompt aléatoire à partir d'une liste de prompts donnée "surpriseMePrompts".
 Il calcule un index aléatoire en utilisant Math.random() et Math.floor,
 puis il retourne un prompt correspondant à cet index.
 Si le prompt aléatoire est égal au prompt donné en argument,
 il appelle la fonction récursivement jusqu'à ce qu'un prompt différent soit retourné. */}

export function getRandomPrompt(prompt) {
    const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length)
    const randomPrompt = surpriseMePrompts[randomIndex]

    if (randomPrompt === prompt) return getRandomPrompt(prompt)

    return randomPrompt;
}

export async function downloadImage(_id, photo) {
    FileSaver.saveAs(photo, `download-${_id}.jpg`)
}